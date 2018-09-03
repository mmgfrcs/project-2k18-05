/*:
 * @plugindesc v1.0 Change the looks of the menu shown when pressing Escape (Camp Menu)
 * @author VR
 *
 * @param Menu Background
 * @type file
 * @dir img/pictures
 * @require 1
 * @desc The background of the Camp Menu
 * @default Fountain
 *
 * @param Menu Offset
 * @type number
 * @desc The offset for the name and bars from the edge of the selection boxHeight
 * Default: 24
 * @default 24
 *
 * @param Camp Menu Help List
 * @type string[]
 * @desc The text to show for each option on the Commands list in the Camp Menu. The order matches the order on the list.
 * @default ["Access your Inventory where you can view and use items in your possession", "Access the list of skills available to the selected party member where you can use some skills that are usable out of battle.", "Access the Equipment menu where you can view and equip any equipments in your possession for the selected character.","Access the Status menu where you can view detailed statistics for the selected character.","Access the System Options menu where you can set the game's volume and a few game-wide preferences.","Open the Save window where you can save your progress.","Close the current game session, returning to main menu."]
 *
 * @requiredAssets img/pictures/Fountain
 * @help
 * No Plugin Commands Available
 */
 
var offset = Number(PluginManager.parameters("VR_EscapeMenu")['Menu Offset']);
var bg = String(PluginManager.parameters("VR_EscapeMenu")['Menu Background']);
var helpTexts = JSON.parse(PluginManager.parameters("VR_EscapeMenu")['Camp Menu Help List'] || '[]');

//Game
Game_Party.prototype.maxBattleMembers = function() {
    return 3;
};

Actor_LevelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function(){
	Actor_LevelUp.call(this);
    this.recoverAll();
};


//Scene
MapWindow_Create = Scene_Map.prototype.createMapNameWindow;
Scene_Map.prototype.createMapNameWindow = function() {
	MapWindow_Create.call(this);
    this._mapNameWindow.y = Graphics.boxHeight - this._mapNameWindow.windowHeight() - 24;
};

 //Background: Menu Scene
 Scene_Menu.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture(bg);
	this._backgroundSprite.opacity = 120;
    this.addChild(this._backgroundSprite);
	this._isBackgroundScaled = false;
};

var MenuUpdate = Scene_Menu.prototype.update;
 Scene_Menu.prototype.update = function() {
	MenuUpdate.call(this);
	if(!this._isBackgroundScaled && this._backgroundSprite.bitmap.width > 0)
	{
		this._backgroundSprite.scale.x = Number(Graphics.boxWidth / this._backgroundSprite.bitmap.width);
		this._backgroundSprite.scale.y = Number(Graphics.boxHeight / this._backgroundSprite.bitmap.height);
	}
 };
 
  //Background: Item and Skill Scene
 Scene_ItemBase.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture(bg);
	this._backgroundSprite.opacity = 160;
    this.addChild(this._backgroundSprite);
	this._isBackgroundScaled = false;
};

var ItemBaseUpdate = Scene_ItemBase.prototype.update;
 Scene_ItemBase.prototype.update = function() {
	ItemBaseUpdate.call(this);
	if(!this._isBackgroundScaled && this._backgroundSprite.bitmap.width > 0)
	{
		this._backgroundSprite.scale.x = Number(Graphics.boxWidth / this._backgroundSprite.bitmap.width);
		this._backgroundSprite.scale.y = Number(Graphics.boxHeight / this._backgroundSprite.bitmap.height);
	}
 };
 
  //Background: Equip Scene
 Scene_Equip.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture(bg);
	this._backgroundSprite.opacity = 160;
    this.addChild(this._backgroundSprite);
	this._isBackgroundScaled = false;
};

var EquipUpdate = Scene_Equip.prototype.update;
 Scene_Equip.prototype.update = function() {
	EquipUpdate.call(this);
	if(!this._isBackgroundScaled && this._backgroundSprite.bitmap.width > 0)
	{
		this._backgroundSprite.scale.x = Number(Graphics.boxWidth / this._backgroundSprite.bitmap.width);
		this._backgroundSprite.scale.y = Number(Graphics.boxHeight / this._backgroundSprite.bitmap.height);
	}
 };

   //Background: Status Scene
 Scene_Status.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture(bg);
	this._backgroundSprite.opacity = 160;
    this.addChild(this._backgroundSprite);
	this._isBackgroundScaled = false;
};

var StatusUpdate = Scene_Status.prototype.update;
 Scene_Status.prototype.update = function() {
	StatusUpdate.call(this);
	if(!this._isBackgroundScaled && this._backgroundSprite.bitmap.width > 0)
	{
		this._backgroundSprite.scale.x = Number(Graphics.boxWidth / this._backgroundSprite.bitmap.width);
		this._backgroundSprite.scale.y = Number(Graphics.boxHeight / this._backgroundSprite.bitmap.height);
	}
 };
 
   //Background: Options Scene
 Scene_Options.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture(bg);
	this._backgroundSprite.opacity = 160;
    this.addChild(this._backgroundSprite);
	this._isBackgroundScaled = false;
};

var OptionsUpdate = Scene_Options.prototype.update;
 Scene_Options.prototype.update = function() {
	OptionsUpdate.call(this);
	if(!this._isBackgroundScaled && this._backgroundSprite.bitmap.width > 0)
	{
		this._backgroundSprite.scale.x = Number(Graphics.boxWidth / this._backgroundSprite.bitmap.width);
		this._backgroundSprite.scale.y = Number(Graphics.boxHeight / this._backgroundSprite.bitmap.height);
	}
 };
 
   //Background: Game End Scene
 Scene_GameEnd.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture(bg);
	this._backgroundSprite.opacity = 160;
    this.addChild(this._backgroundSprite);
	this._isBackgroundScaled = false;
};

var GameEndUpdate = Scene_GameEnd.prototype.update;
 Scene_GameEnd.prototype.update = function() {
	GameEndUpdate.call(this);
	if(!this._isBackgroundScaled && this._backgroundSprite.bitmap.width > 0)
	{
		this._backgroundSprite.scale.x = Number(Graphics.boxWidth / this._backgroundSprite.bitmap.width);
		this._backgroundSprite.scale.y = Number(Graphics.boxHeight / this._backgroundSprite.bitmap.height);
	}
 };
 
var Scene_MenuCreate = Scene_Menu.prototype.create;
var Scene_MenuUpdate = Scene_Menu.prototype.update;
var Scene_ItemCreate = Scene_Item.prototype.create;
 
 Scene_Menu.prototype.create = function() {
    Scene_MenuCreate.call(this);
	
	/*
	this._commandWindow
	this._goldWindow
	this._statusWindow
	*/
	
	console.log(PluginManager.parameters("VR_EscapeMenu"));
	
	this._helpWindow = new Window_MenuHelp(0, this._statusWindow.height);
	this._campWindow = new Window_CampMenuLbl(0, 0, "Camp Menu");
	
	this.addWindow(this._helpWindow);
	this.addWindow(this._campWindow);

	
	console.log(this._txts);
	
	this._commandWindow.x = 0;
	this._commandWindow.y = 80;
	
	this._statusWindow.y = 0;
	
	this._statusWindow.x = this._commandWindow.width;
	
	this._goldWindow.x = this._helpWindow.windowWidth();	
	this._goldWindow.y = this._statusWindow.height;
	
	this._helpWindow.opacity = 0;
	this._commandWindow.opacity = 0;
	//this._goldWindow.opacity = 0;
	this._statusWindow.opacity = 0;
};

Scene_Menu.prototype.drawText = function(){
	Scene_MenuUpdate.call(this);
	this._helpWindow.setText(helpTexts[this._commandWindow.index()]);
}

Scene_Menu.prototype.update = function(){
	Scene_MenuUpdate.call(this);
	this._helpWindow.setText(helpTexts[this._commandWindow.index()]);
}

Scene_Item.prototype.create = function() {
    Scene_ItemCreate.call(this);
	
	this._menuLbl = new Window_CampMenuLbl(0, 0, "Items");
	this.addWindow(this._menuLbl);
	
	this._categoryWindow.height = Graphics.boxHeight - this._helpWindow.height * 2;
	
	this._itemWindow.x = this._categoryWindow.width;
	this._itemWindow.width = (Graphics.boxWidth - this._itemWindow.x) / 2
	this._itemWindow.height = Graphics.boxHeight - (this._helpWindow.height * 2) - this._statusWindow.height;
	
	this._infoWindow.x = this._itemWindow.x + this._itemWindow.width;
	this._infoWindow.width = (Graphics.boxWidth - this._itemWindow.x) / 2
	this._infoWindow.height = Graphics.boxHeight - (this._helpWindow.height * 2) - this._statusWindow.height;
	
	this._itemActionWindow.x = this._itemWindow.x;
	this._itemActionWindow.width = this._itemWindow.width;
	this._itemActionWindow.height = this._itemWindow.height;
	
	this._helpWindow.y = this._itemWindow.height + this._statusWindow.height + this._helpWindow.height;
		
	this._actorWindow.x = this._itemWindow.x;
	this._actorWindow.y = this._menuLbl.height;
	this._actorWindow.width = this._itemWindow.width * 2;
	this._actorWindow.height = this._categoryWindow.height + this._helpWindow.height;
};

Scene_SkillCreate = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
    Scene_SkillCreate.call(this);
	
	this._menuLbl = new Window_CampMenuLbl(0, 0, "Skills");
	this.addWindow(this._menuLbl);
	
	this._itemWindow.height = Graphics.boxHeight - this._menuLbl.height - this._statusWindow.height - this._helpWindow.height;
	
	//this._statusWindow
	//this._skillTypeWindow

	this._helpWindow.y = this._itemWindow.height + this._statusWindow.height + this._menuLbl.fittingHeight(2);
};

Scene_EquipCreate = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function() {
    Scene_EquipCreate.call(this);
	
	this._menuLbl = new Window_CampMenuLbl(0, 0, "Equipments");
	this.addWindow(this._menuLbl);
	
	this._itemWindow.height = Graphics.boxHeight - this._menuLbl.height - this._helpWindow.height;
	
	//this._statusWindow.height = Graphics.boxHeight - this._menuLbl.height - this._helpWindow.height;
	this._slotWindow.height = Graphics.boxHeight - this._menuLbl.height - this._helpWindow.height - this._statusWindow.height;
	this._compareWindow.height = this._slotWindow.height;
	//this._itemActionWindow.height = this._slotWindow.height;
	this._infoWindow.height = this._compareWindow.height;
	this._itemWindow.height = this._compareWindow.height;
	this._requirementWindow.height = this._compareWindow.height;
	//this._lowerRightWindows.height = this._compareWindow.height;
	//this._statusWindow
	//this._skillTypeWindow

	this._helpWindow.y = this._menuLbl.height + this._slotWindow.height + this._menuLbl.fittingHeight(2);
};



Scene_Row.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture(bg);
	this._backgroundSprite.opacity = 140;
    this.addChild(this._backgroundSprite);
	this._isBackgroundScaled = false;
};

var RowUpdate = Scene_Row.prototype.update;
Scene_Row.prototype.update = function() {
	RowUpdate.call(this);
	if(!this._isBackgroundScaled && this._backgroundSprite.bitmap.width > 0)
	{
		this._backgroundSprite.scale.x = Number(Graphics.boxWidth / this._backgroundSprite.bitmap.width);
		this._backgroundSprite.scale.y = Number(Graphics.boxHeight / this._backgroundSprite.bitmap.height);
	}
 };

 //Window
MapWindow_Open = Window_MapName.prototype.open;
Window_MapName.prototype.open = function() {
    MapWindow_Open.call(this);
	this._showCount += 240;
};
 
function Window_MenuHelp() {
    this.initialize.apply(this, arguments);
}

Window_MenuHelp.prototype = Object.create(Window_Help.prototype);
Window_MenuHelp.prototype.constructor = Window_MenuHelp;

Window_MenuHelp.prototype.initialize = function(x, y) {
	//Window_Help.prototype.initialize.call(this);
	Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
	this._text = '';
	this.x = x;
	this.y = y;
}

var SetWindowHelpText = Window_MenuHelp.prototype.setText;
Window_MenuHelp.prototype.setText = function(text) {
	var txt2 = this.sliceText(text, this.windowWidth() - 18 - this.textWidth("ZZZ"));
	SetWindowHelpText.call(this, txt2[0]);
	this.drawText(txt2[1], 6, this.lineHeight(), this.windowWidth(),'left' );
};

Window_MenuHelp.prototype.windowWidth = function() {
    return Graphics.boxWidth - 240;
};

Window_MenuHelp.prototype.windowHeight = function() {
    return this.fittingHeight(2);
};

Window_MenuHelp.prototype.sliceText = function(text, width) { // modified by Bahamut
	var words = text.split(" ");
	if (words.length === 1)
		return words;
	var result = ["",""];
	var len = 0;
	for (var i = 0; i < words.length; i += 1) {
		len += this.textWidth(words[i]) + this.textWidth(" ");
		if(len > width) result[1] += words[i] + " ";
		else result[0] += words[i] + " ";
	}
	return result
}

function Window_CampMenuLbl() {
    this.initialize.apply(this, arguments);
}

Window_CampMenuLbl.prototype = Object.create(Window_Base.prototype);
Window_CampMenuLbl.prototype.constructor = Window_CampMenuLbl;

Window_CampMenuLbl.prototype.initialize = function(x, y, text) {
	Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
	this.opacity = 0;
	this.contents.fontSize=48;
	this.drawText(text,x,y,this.windowWidth()-32);
	this.contents.fontSize = this.standardFontSize();
	
}

Window_CampMenuLbl.prototype.windowWidth = function() {
    return 300;
};

Window_CampMenuLbl.prototype.windowHeight = function() {
    return 80;
};

function Window_DescriptionMenuLbl() {
    this.initialize.apply(this, arguments);
}

Window_DescriptionMenuLbl.prototype = Object.create(Window_CampMenuLbl.prototype);
Window_DescriptionMenuLbl.prototype.constructor = Window_DescriptionMenuLbl;

Window_DescriptionMenuLbl.prototype.initialize = function(x, y, text, desc) {
	Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
	this.opacity = 0;
	this.contents.fontSize=48;
	this.drawText(text,x,y + 12,this.windowWidth() / 5);
	this.contents.fontSize = 20;
	var txt = this.sliceText(desc, this.windowWidth() * 4 / 5 - 18 - this.textWidth("ZZZ"));
	this.drawText(txt[0], x + (this.windowWidth() / 5) + 12, y - 6,this.windowWidth() * 4 / 5);
	this.drawText(txt[1], x + (this.windowWidth() / 5) + 12, y - 10 + this.lineHeight(),this.windowWidth() * 4 / 5);
	this.contents.fontSize = this.standardFontSize();
}

Window_DescriptionMenuLbl.prototype.sliceText = function(text, width) { // modified by Bahamut
	var words = text.split(" ");
	if (words.length === 1)
		return words;
	var result = ["",""];
	var len = 0;
	for (var i = 0; i < words.length; i += 1) {
		len += this.textWidth(words[i]) + this.textWidth(" ");
		if(len > width) result[1] += words[i] + " ";
		else result[0] += words[i] + " ";
	}
	return result
}

Window_DescriptionMenuLbl.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_DescriptionMenuLbl.prototype.windowHeight = function() {
    return this.fittingHeight(2);
};

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var x = rect.x;
    var y = rect.height - this.lineHeight() * 1.5;
    var width = rect.width - x - this.textPadding();
    var lineHeight = this.lineHeight();
    
	var x2 = x + offset;
	var width2 = rect.width - (offset * 2);
	
    this.changeTextColor(this.hpColor(actor));
    this.drawText(actor.name(), x + (rect.width/2) - this.textWidth(actor.name()) + offset, y, width2);
	
    this.drawActorLevel(actor, x2, y - lineHeight, rect.width);
    this.drawActorIcons(actor, x2, y - lineHeight * 4);
    //this.drawActorClass(actor, x, y);
    this.drawActorHp(actor, x2, y - lineHeight * 3, width2);
	//this.drawText(actor._hp + '/', x2 + width2 - this.textWidth(actor._hp) - this.textWidth(actor.hp) - this.textWidth('/'), y - lineHeight * 3, this.textWidth(actor._hp) + this.textWidth('/'), 'right');
	//this.changeTextColor(this.hpGaugeColor1());
	//this.drawText(actor.hp, x2 + width2 - this.textWidth(actor.hp), y - lineHeight * 3, this.textWidth(actor.hp), 'right');
    //this.changeTextColor(this.systemColor());
	this.drawActorMp(actor, x2, y - lineHeight * 2, width2);
	//this.drawText(actor._mp, x2 + width2 - this.textWidth(actor._mp), y - lineHeight * 2, this.textWidth(actor._mp), 'right');
};

Window_MenuStatus.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
	var center = (rect.width / 2) - (Window_Base._faceWidth / 2);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.width);
    this.changePaintOpacity(true);
};

Window_MenuStatus.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    var bitmap = ImageManager.loadPicture(faceName + "_" + (faceIndex+1));
	var dw = 300 - offset * 2;
	var dh = Math.floor(dw * 32 / 15) - 80;
	this.contents.blt(bitmap, 0, 0, 300, 560, x + offset, y + (offset/2), dw, dh);
	//Loaded picture is 600x1280. Scale it down
	//bitmap.scale.x = 0.5;
	//bitmap.scale.y = 0.5;

};

Window_MenuStatus.prototype.drawActorLevel = function(actor, x, y, width) {
	var lineHeight = this.lineHeight() * 0.8;
	var tWidth = this.textWidth(actor.level);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + this.textWidth(TextManager.levelA) + 6, y, 36);
	var curr = actor.currentExp() - actor.expForLevel(actor.level);
    var tot = actor.expForLevel(actor.level + 1) - actor.expForLevel(actor.level);
	var x2 = x + 80
	this.drawGauge(x2, y - 6, width - (offset * 2) - 80, curr/tot,this.textColor(28), this.textColor(29));
	

	//this.drawActorLevel(actor, x + 72, y);
};

Window_MenuStatus.prototype.windowWidth = function() {
    return Graphics.boxWidth - 300;
};

Window_MenuStatus.prototype.windowHeight = function() {
    return Graphics.boxHeight - Window_MenuHelp.prototype.windowHeight();
};

Window_MenuStatus.prototype.numVisibleRows = function() {
    return 1;
};

Window_MenuStatus.prototype.maxCols = function() {
    return 3;
};

Window_MenuCommand.prototype.lineHeight = function() {
    return 60;
};

Window_MenuCommand.prototype.windowWidth = function() {
    return 300;
};

Window_MenuCommand.prototype.maxCols = function() {
	return 1;
};

