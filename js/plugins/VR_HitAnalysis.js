/*:
 * @plugindesc v1.00 Gives a window that analyzes hits and damages. 
 * @author VR
 *
 * @help
 * On every skill with multiple hits, put this notetag:
 * 
 * <AnalyzedHit: x>
 * 
 * Where x is the number of hits of that skill. This number of hits will be 
 * considered in the attack damage.
 */

 //Scene
 var SceneBattle_CreateWin = Scene_Battle.prototype.createAllWindows; 
 Scene_Battle.prototype.createAllWindows = function() {
    SceneBattle_CreateWin.call(this);
    this.createHitAnalysisWindow();
};

Scene_Battle.prototype.createHitAnalysisWindow = function() {
    var x = 0;
    var y = Graphics.boxHeight - 180;
    this._hitAnalysis = new Window_HitAnalysis(x, y);
    this._hitAnalysis.visible = false;
    this.addWindow(this._hitAnalysis);
};

Scene_Battle.prototype.analyzeHit = function() {
    var target = this._enemyWindow.enemy();
    if(this._actorWindow.visible) target = this._actorWindow.actor();
    var caster = BattleManager.actor();
    var action = BattleManager.inputtingAction();
    if(this._enemyWindow.visible) { //We are dealing with hits against the enemy
        this._hitAnalysis.applyEnemyAnalysis(target, caster, action);
    }
    else { //We are dealing with hits against another actor/party member
        this._hitAnalysis.applyAllyAnalysis(target, caster, action);
    }
    this._hitAnalysis.show();
};

var Battle_SelectActor = Scene_Battle.prototype.selectActorSelection;
Scene_Battle.prototype.selectActorSelection = function() {
    Battle_SelectActor.call(this);
    this.analyzeHit();
};

var Battle_ActorOk = Scene_Battle.prototype.onActorOk;
Scene_Battle.prototype.onActorOk = function() {
    Battle_ActorOk.call(this);
    this._hitAnalysis.hide();
};

var Battle_ActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    Battle_ActorCancel.call(this);
    this._hitAnalysis.hide();
};

var Battle_SelectEnemy = Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
    Battle_SelectEnemy.call(this);
    this.analyzeHit();
};

var Battle_EnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
    Battle_EnemyOk.call(this);
    this._hitAnalysis.hide();
};

var Battle_EnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    Battle_EnemyCancel.call(this);
    this._hitAnalysis.hide();
};

var Battle_Update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    if(this._enemyWindow.visible || this._actorWindow.visible) this.analyzeHit();
    Battle_Update.call(this);
}

//BattleManager
BattleManager.prototype.setTemporaryAction = function(action) {
    this._origAction = this._action;
    this._action = action;
}

BattleManager.prototype.revertTemporaryAction = function(action) {
    this._action = this._origAction;
}

//Window

function Window_HitAnalysis() {
    this.initialize.apply(this, arguments);
}

Window_HitAnalysis.prototype = Object.create(Window_Base.prototype);
Window_HitAnalysis.prototype.constructor = Window_HitAnalysis;

Window_HitAnalysis.prototype.initialize = function(x, y) {
	Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
};

Window_HitAnalysis.prototype.windowWidth = function() {
    return 560;
};

Window_HitAnalysis.prototype.windowHeight = function() {
    return 180;
};

Window_HitAnalysis.prototype.applyEnemyAnalysis = function(target, caster, action) {
    var hitRate = action.itemHit(target);
    var dmg = this.analyzeDamage(target, action);
    var cnt = action.itemCnt(target);
    var cri = action.itemCri(target);
    var cDmg = [];

    if(Imported.YEP_X_CriticalControl) cDmg = [action.applyItemCriticalMult(dmg[0], 0, target), action.applyItemCriticalMult(dmg[1], 0, target)];
    else cDmg = [dmg[0] * 3, dmg[1] * 3];

    var avgCDmg = (cDmg[0] + cDmg[1])/2;
    cDmg = [cDmg[0], cDmg[1], avgCDmg / target.hp];
    /*
    var ctaAction = new Game_Action(caster);
    BattleManager.setTemporaryAction(ctaAction);
    var ctaSkill = BattleManager.getCounterSkill(caster, target);
    ctaAction.setSkill(ctaSkill.id);
    ctaAction.setTarget($gameTroops.members.find(function(e) {
        return e === target;
    }).id);
    var ctaDamage = this.analyzeDamage(target, ctaAction);
 */
    this.drawAnalysis(hitRate, dmg, cnt, [0,0], cri, cDmg, this.loadHits(action.item().id));
};

Window_HitAnalysis.prototype.applyAllyAnalysis = function(target, caster, action) {
    var hitRate = action.itemHit(target);
    var dmg = this.analyzeDamage(target, action);
    var cri = action.itemCri(target);
    var cDmg = [];
    if(Imported.YEP_X_CriticalControl) cDmg = [action.applyItemCriticalMult(dmg[0], 0, target), action.applyItemCriticalMult(dmg[1], 0, target)];
    else cDmg = [dmg[0] * 3, dmg[1] * 3];
    this.drawAnalysis(hitRate, dmg, 0, [0,0], cri, cDmg, this.loadHits(action.item().id));
};

Window_HitAnalysis.prototype.itemRect = function(index){
    var rect = new Rectangle();
    rect.width = this.contentsWidth() / 3;
    rect.height = this.contentsHeight();
    rect.x = this.windowWidth() / 3 * index;
    rect.y = 0;
    return rect;
}

Window_HitAnalysis.prototype.drawAnalysis = function(hit, dmg, counter, counterDmg, critChance, critDmg, hits) {
    this.contents.clear();
    var critRect = this.itemRect(0);

    //Critical rate
    var hitRate = hits || 1;
    if(critChance > 0){
        var criRateTxt = (Math.round(critChance * 1000) / 10).toFixed(1) + '%';
        this.makeFontBigger();
        this.drawText(criRateTxt, critRect.x, critRect.y, this.textWidth(criRateTxt), 'left');
        this.resetFontSettings();

        //Critical Label
        this.contents.fontSize = 20;
        this.drawText('Critical Rate', critRect.x, critRect.y + this.lineHeight(), this.textWidth('Critical Rate'));
        
        //Critical damage
        if(dmg[0] > 0 || dmg[1] > 0)
        {
            var percHP = Math.ceil(critDmg[2] * hitRate * 100);
            if(percHP >= 100) this.changeTextColor('#ffffaa');
            else this.changeTextColor('#ff8888');
            var criDmgTxt = Math.round(critDmg[0] * hitRate) + '-' + Math.round(critDmg[1] * hitRate) +  ' (' + Math.min(percHP, 100) + '%)';
            this.drawText(criDmgTxt, critRect.x, critRect.y + this.lineHeight() * 2, this.textWidth(criDmgTxt));
        }
        this.resetFontSettings();
    }

    var targetRect = this.itemRect(1);
    if(critChance > 0) {
        //Counter rate
        var cntTxt = (Math.round(counter * 1000) / 10).toFixed(1) + '%';
        this.makeFontBigger();
        this.drawText(cntTxt, targetRect.x + targetRect.width / 2 - this.textWidth(cntTxt) / 2, targetRect.y, this.textWidth(cntTxt), 'center');
        this.resetFontSettings();

        //Counter Label
        this.contents.fontSize = 20;
        this.drawText('Counter Rate', targetRect.x + targetRect.width / 2 - this.textWidth('Counter Rate') / 2, targetRect.y + this.lineHeight(), this.textWidth('Counter Rate'), 'center');
        this.resetFontSettings();
        /*
        //Counter DMG
        var cntDmgTxt = Math.round(counterDmg[0]) + ' - ' + Math.round(counterDmg[1]);
        this.drawText(cntDmgTxt, targetRect.x, targetRect.y + this.lineHeight() * 3 + 10, this.textWidth(cntDmgTxt), 'left');
        */
    } else {
        //Counter rate
        var cntTxt = (Math.round(counter * 1000) / 10).toFixed(1) + '%';
        this.makeFontBigger();
        this.drawText(cntTxt, critRect.x, critRect.y, this.textWidth(cntTxt), 'left');
        this.resetFontSettings();

        //Counter Label
        this.contents.fontSize = 20;
        this.drawText('Counter Rate', critRect.x, critRect.y + this.lineHeight(), this.textWidth('Counter Rate'), 'left');
        this.resetFontSettings();
    }
    var casterRect = this.itemRect(2);
    
    //Hit rate
    var hitTxt = (Math.round(hit * 1000) / 10).toFixed(1) + '%';
    this.makeFontBigger();
    this.drawText(hitTxt, casterRect.width - (this.windowWidth() - this.contentsWidth()) + this.textPadding() + casterRect.x - this.textWidth(hitTxt), casterRect.y, this.textWidth(hitTxt), 'right');
    this.resetFontSettings();

    //Label
    this.contents.fontSize = 20;
    this.drawText('Hit Rate', casterRect.width - (this.windowWidth() - this.contentsWidth()) + this.textPadding() + casterRect.x - this.textWidth('Hit Rate'), casterRect.y + this.lineHeight(), this.textWidth('Hit Rate'), 'right');
    this.resetFontSettings();

    //Hit DMG
    this.contents.fontSize = 23;

    if(dmg[0] != 0 || dmg[1] != 0) {
        percHP = Math.ceil(dmg[2] * hitRate * 100);
        if(dmg[0]>0 || dmg[1]>0) {
            if(percHP >= 100) this.changeTextColor('#ffffaa');
            else this.changeTextColor('#ff8888');
        } else {
            percHP = Math.abs(percHP);
            this.changeTextColor('#88ff88');
        }
        var hitDmgTxt = Math.round(dmg[0] * hitRate) + '-' + Math.round(dmg[1] * hitRate) +  ' (' + Math.min(percHP, 100) + '%)';
        this.drawText(hitDmgTxt, casterRect.width - (this.windowWidth() - this.contentsWidth()) + this.textPadding() + casterRect.x - this.textWidth(hitDmgTxt), casterRect.y + this.lineHeight() * 2, this.textWidth(hitDmgTxt), 'right');
    } else this.drawText(' ', casterRect.width - (this.windowWidth() - this.contentsWidth()) + this.textPadding() + casterRect.x, casterRect.y + this.lineHeight() * 2, this.textWidth(" "), 'right');
    
    this.resetFontSettings();

    //Hits
    this.contents.fontSize = 23;
    var hitAmtTxt = hitRate + ' Hit' + (hitRate > 1 || hitRate == 0 ? 's' : '');
    this.drawText(hitAmtTxt, casterRect.width - (this.windowWidth() - this.contentsWidth()) + this.textPadding() + casterRect.x - this.textWidth(hitAmtTxt), casterRect.y + this.lineHeight() * 3, this.textWidth(hitAmtTxt), 'right');
    this.resetFontSettings();
};

Window_HitAnalysis.prototype.loadHits = function(skillId) {
    return Number($dataSkills[skillId].meta.AnalyzedHit);
}

Window_HitAnalysis.prototype.analyzeDamage = function(target, action) {
    var baseValue = action.evalDamageFormula(target);
    var value = baseValue * action.calcElementRate(target);
    if (action.isPhysical()) {
        value *= target.pdr;
    }
    if (action.isMagical()) {
        value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    
    var variance = action.item().damage.variance / 100;
    var avg = value / target.hp;
    return [value * (1-variance), value * (1+variance), avg];
}