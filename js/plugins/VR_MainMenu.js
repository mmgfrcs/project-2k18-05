/*:
 * @plugindesc v1.00 Revamp the main menu
 * @author VR
 *
 * @param Game Logo
 * @type file
 * @dir img/pictures
 * @desc The logo to show on the Main Menu. This logo must be 640x300 in dimension.
 * @default Fountain
 *
 * @param Logo Pos X
 * @parent Game Logo
 * @type number
 * @desc The X position of the logo. 0 is left.
 * @default 80
 *
 * @param Logo Pos Y
 * @parent Game Logo
 * @type number
 * @desc The Y position of the logo. 0 is top.
 * @default 120
 *
 * @param Logo Scale X
 * @parent Game Logo
 * @type number
 * @desc The length of the logo shown relative to the size of the original logo. 100 is 100%
 * @default 100
 *
 * @param Logo Scale Y
 * @parent Game Logo
 * @type number
 * @desc The width of the logo shown relative to the size of the original logo. 100 is 100%
 * @default 100
 *
 *
 * @help
 * No Commands are available.
 */
 
var logo = String(PluginManager.parameters("VR_MainMenu")['Game Logo']);
var xpos = Number(PluginManager.parameters("VR_MainMenu")['Logo Pos X']);
var ypos = Number(PluginManager.parameters("VR_MainMenu")['Logo Pos Y']);
var xsize = Number(PluginManager.parameters("VR_MainMenu")['Logo Scale X']);
var ysize = Number(PluginManager.parameters("VR_MainMenu")['Logo Scale Y']);

//Draw game logo in Foreground
Scene_Title.prototype.createForeground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture(logo);
    this.addChild(this._backgroundSprite);
	this._backgroundSprite.x = xpos;
	this._backgroundSprite.y = ypos;
	this._backgroundSprite.scale.x = xsize / 100;
	this._backgroundSprite.scale.y = ysize / 100;
};

Title_CreateCmdWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	Title_CreateCmdWindow.call(this);
	this._commandWindow.setHandler('quit', this.commandQuit.bind(this));
};

Scene_Title.prototype.commandQuit = function() {
	this._commandWindow.close();
	this.fadeOutAll();
	SceneManager.exit();
};

//Change the Title Command Window
var TitleCommand_MakeList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
	if(Imported.YEP_CreditsPage)
	{
		TitleCommand_MakeList.call(this);
		this.addCommand('Exit', 'quit');
		//this.addCommandAt(1, ' ', 'blank', false);
	}
	else
	{
		this.addCommand(TextManager.newGame,   'newGame');
		//this.addCommand('',   '', false);
		this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
		this.addCommand(TextManager.options,   'options');
	}
};

TitleCommand_UpdatePlacement = Window_TitleCommand.prototype.updatePlacement;
Window_TitleCommand.prototype.updatePlacement = function() {
	TitleCommand_UpdatePlacement.call(this);
    this.x = Graphics.boxWidth - this.width;
    this.y = (Graphics.boxHeight - this.height) / 1.33;
};

Window_TitleCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

Window_TitleCommand.prototype.itemTextAlign = function() {
    return 'right';
};

Window_TitleCommand.prototype.lineHeight = function() {
	return 36 * 1.5;
};

Window_TitleCommand.prototype.windowWidth = function() {
    return 400;
};

Window_TitleCommand.prototype.standardFontSize = function() {
    return 34;
};

TitleCommand_Initialize = Window_TitleCommand.prototype.initialize;
Window_TitleCommand.prototype.initialize = function() {
	TitleCommand_Initialize.call(this);
    this.opacity = 0;
};
/*
Window_Selectable.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = index === 1 ? this.itemHeight() * 2 : this.itemHeight();
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
	if(index > 1) rect.y += rect.height;
    return rect;
};*/