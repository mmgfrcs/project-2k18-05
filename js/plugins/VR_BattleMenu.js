/*:
 * @plugindesc v1.01 Revamp the battle menu to fit the game's theme
 * @author VR
 *
 *
 * @help
 * No Commands are available.
 *
 * Changes
 * v1.01 Added Yanfly CTB override - CTB turn order now instantly vanishes when
 * skill/item menu is open.
 */

Scene_Battle.prototype.updateWindowPositions = function() {
	if (this._enemyWindow.active) {
		var posY = 216;
		this._statusWindow.y += 16;
		if(this._statusWindow.y >= posY) this._statusWindow.y = posY;
	}
	else
	{
		var posY = 144;
		this._statusWindow.y -= 16;
		if(this._statusWindow.y <= posY) this._statusWindow.y = posY;
	}
	
};

Scene_Battle.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_BattleHelp(0,0,this._statusWindow.y);
    this._helpWindow.visible = false;
    this.addWindow(this._helpWindow);
};

Scene_Battle.prototype.createStatusWindow = function() {
    this._statusWindow = new Window_CustBattleStatus(Graphics.boxWidth - 192, 120, 240, 400);
    this.addWindow(this._statusWindow);
	
	this._statusWindow.x = Graphics.boxWidth - this._statusWindow.windowWidth();
	this._statusWindow.y = 144;
	
	this._statusWindow.width = this._statusWindow.windowWidth();
	this._statusWindow.height = this._statusWindow.windowHeight();
};

Scene_Battle.prototype.createSkillWindow = function() {
    var wy = this._helpWindow.y + this._helpWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._skillWindow = new Window_BattleSkill(0, wy, Graphics.boxWidth - this._statusWindow.width, wh);
    this._skillWindow.setHelpWindow(this._helpWindow);
    this._skillWindow.setHandler('ok',     this.onSkillOk.bind(this));
    this._skillWindow.setHandler('cancel', this.onSkillCancel.bind(this));
    this.addWindow(this._skillWindow);
};

Scene_Battle.prototype.createItemWindow = function() {
    var wy = this._helpWindow.y + this._helpWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_BattleItem(0, wy, Graphics.boxWidth - this._statusWindow.width, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
};

Battle_ActorSelect = Scene_Battle.prototype.selectActorSelection;
Battle_ActorSelectOk = Scene_Battle.prototype.onActorOk;
Battle_ActorSelectCancel = Scene_Battle.prototype.onActorCancel;
Battle_EnemySelect = Scene_Battle.prototype.selectEnemySelection;
Battle_EnemySelectOk = Scene_Battle.prototype.onEnemyOk;
Battle_EnemySelectCancel = Scene_Battle.prototype.onEnemyCancel;

Scene_Battle.prototype.selectActorSelection = function() {
	Battle_ActorSelect.call(this);
	this._actorCommandWindow.hide();
};

Scene_Battle.prototype.onActorOk = function() {
	Battle_ActorSelectOk.call(this);
	this._actorCommandWindow.show();
};

Scene_Battle.prototype.onActorCancel = function() {
    Battle_ActorSelectCancel.call(this);
	this._actorCommandWindow.show();
};

Scene_Battle.prototype.selectEnemySelection = function() {
	Battle_EnemySelect.call(this);
	this._actorCommandWindow.hide();
};

Scene_Battle.prototype.onEnemyOk = function() {
	Battle_EnemySelectOk.call(this);
	this._actorCommandWindow.show();
};

Scene_Battle.prototype.onEnemyCancel = function() {
	Battle_EnemySelectCancel.call(this);
	this._actorCommandWindow.show();
};

Window_PartyCommand.prototype.initialize = function() {
    var y = Graphics.boxHeight - this.windowHeight();
	var x = Graphics.boxWidth - this.windowWidth();
    Window_Command.prototype.initialize.call(this, x, y);
    this.openness = 0;
    this.deactivate();
};

Window_PartyCommand.prototype.windowWidth = function() {
	return 240;
}

Window_ActorCommand.prototype.initialize = function() {
    var y = Graphics.boxHeight - this.windowHeight();
	var x = Graphics.boxWidth - this.windowWidth();
    Window_Command.prototype.initialize.call(this, x, y);
    this.openness = 0;
    this.deactivate();
    this._actor = null;
};

Window_ActorCommand.prototype.windowWidth = function() {
	return 240;
}
 
function Window_BattleHelp() {
    this.initialize.apply(this, arguments);
}

Window_BattleHelp.prototype = Object.create(Window_Help.prototype);
Window_BattleHelp.prototype.constructor = Window_BattleHelp;

Window_BattleHelp.prototype.initialize = function(x, y, height) {
    var width = Graphics.boxWidth;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._text = '';
};

function Window_CustBattleStatus() {
    this.initialize.apply(this, arguments);
}

Window_CustBattleStatus.prototype = Object.create(Window_BattleStatus.prototype);
Window_CustBattleStatus.prototype.constructor = Window_CustBattleStatus;

Window_CustBattleStatus.prototype.initialize = function(x, y, width, height) {
	width = width || 240;
	height = height || 100;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
	//this.opacity = 0;
    this.openness = 0;
};

Window_CustBattleStatus.prototype.windowWidth = function() {
    return 240;
};

Window_CustBattleStatus.prototype.windowHeight = function() {
    return 400;
};

Window_CustBattleStatus.prototype.itemHeight = function() {
    return 120;
};

Window_CustBattleStatus.prototype.itemWidth = function() {
    return 236;
};

Window_CustBattleStatus.prototype.numVisibleRows = function() {
    return 3;
};

Window_CustBattleStatus.prototype.basicAreaRect = function(index) {
    var rect = this.itemRectForText(index);
	rect.height = 64;
    return rect;
};

Window_CustBattleStatus.prototype.gaugeAreaRect = function(index) {
    var rect = this.itemRectForText(index);
	rect.y += 64;
    return rect;
};

Window_BattleStatus.prototype.gaugeAreaWidth = function() {
    return 192;
};

Window_CustBattleStatus.prototype.drawBasicArea = function(rect, actor) {
	//this.drawActorFace(actor, rect.x + rect.width - 80, rect.y + 12, 60, 60);
    this.drawActorName(actor, rect.x + 0, rect.y, 196);
    this.drawActorIcons(actor, rect.x + 0, rect.y + 28, 196);
};

Window_CustBattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
    this.drawActorBar(actor, rect.x + 0, rect.y, 196);
    //this.drawActorMpNoTxt(actor, rect.x + rect.width - 120 - 32,  rect.y + 28, 120);
};

Window_CustBattleStatus.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, 8, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, 8, color1, color2);
};

Window_CustBattleStatus.prototype.drawActorBar = function(actor, x, y, width) {
    width = width || 186;
	//HP
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(x, y + 12, width / 2, actor.hpRate(), color1, color2);
	this.contents.fontSize = 30;
    this.changeTextColor(color1);
    this.drawCurrentAndMax(0, actor.hp, actor.mhp, x - (width / 2), y, width,
                           this.hpColor(actor, color1), this.hpColor(actor));
	//MP
	this.resetTextColor();
	this.drawText("/",(width/2) - 8, y,32,'center');
	
	color1 = this.mpGaugeColor1();
    color2 = this.mpGaugeColor2();
    this.drawGauge(x + (width / 2) , y + 12, width / 2, actor.mpRate(), color1, color2);
    this.changeTextColor(color1);
    this.drawCurrentAndMax(1, actor.mp, actor.mmp, x, y, width,
                           color1, this.mpColor(actor));
	this.resetFontSettings();
	

};

//Override Yanfly CTB

if(Imported.YEP_X_BattleSysCTB) {
	Window_CTBIcon.prototype.reduceOpacity = function() {
		this.contentsOpacity = 0;
	};
}
//Window_Base

Window_Base.prototype.hpColor = function(actor, color) {
    var normal = color || this.normalColor();
	if (actor.isDead() || actor._hp < actor.mhp * 0.2) {
        return this.deathColor();
    } else if (actor._hp < actor.mhp * 0.5) {
        return this.crisisColor();
    } else {
        return normal;
    }
};

Window_Base.prototype.drawCurrentAndMax = function(type, current, max, x, y, width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth('0000');
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
	/*
    if (x3 >= x + labelWidth) {
        this.changeTextColor(color1);
        this.drawText(current, x3, y, valueWidth, 'right');
        this.changeTextColor(color2);
        this.drawText('/', x2, y, slashWidth, 'right');
        this.drawText(max, x1, y, valueWidth, 'right');
    } else {
	*/
        this.changeTextColor(color1);
        if(type === 0) {
			this.drawText(current, x1, y, valueWidth - 8, 'right');
		}
		else this.drawText(current, x1 - 8, y, valueWidth, 'left');
    //}
};

