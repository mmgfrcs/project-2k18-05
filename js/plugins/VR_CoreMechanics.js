/*:
 * @plugindesc v1.02 Configure hardcoded settings to your liking
 * @author VR
 *
 * @param Maximum Party Members
 * @type number
 * @desc The maximum number of actors that can be in the party at one time.
 * @default 4
 *
 * @param Level Up Restore Mode
 * @type select
 * @option Do not restore on Level Up
 * @value default
 * @option Restore by gained HP/MP
 * @value heal
 * @option Restore All
 * @value restore
 * @desc Choose how the game handles restoration on level up.
 * RPG Maker MV default will do nothing.
 * @default default
 *
 * @param Buff Icons Starting Position
 * @type number
 * @desc Changes the buff icon location.
 * Only change this when using a custom Iconset.
 * @default 32
 *
 * @param Debuff Icon Starting Position
 * @type number
 * @desc Changes the debuff icon location.
 * Only change this when using a custom Iconset.
 * @default 48
 *
 * @param Default in Fullscreen
 * @type boolean
 * @on Fullscreen
 * @off Windowed
 * @desc Changes the default windowed/fullscreen mode
 * @default false
 *
 * @help
 * No Commands are available.
 *
 * This plugin allows you to change and otherwise override some hardcoded
 * values in RPG Maker. These overides does NOT change anything but the 
 * required values, so in the case of Maximum Party Members parameter - for
 * example, it does not include changes in the Party Command Window to fit 
 * the new value.
 *
 * Changes:
 * v1.02 Added Default Window Mode
 * v1.01 Added Buff/Debuff Icon Start Position
 */
var params = PluginManager.parameters("VR_CoreMechanics");
var maxMembers = Number(params['Maximum Party Members']) || 4;
var lvlRestore = String(params['Level Up Restore Mode']) || 'default';
var buffStart = Number(params['Buff Icons Starting Position']) || 4;
var debuffStart = String(params['Debuff Icons Starting Position']) || 'default';
var fullscreen = String(params['Default in Fullscreen']) === 'true' || false;

 
Game_BattlerBase.ICON_BUFF_START      = buffStart || 32;
Game_BattlerBase.ICON_DEBUFF_START    = debuffStart || 48;

Game_Party.prototype.maxBattleMembers = function() {
    return maxMembers;
};

if(fullscreen) {
	var Boot_Start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		Graphics._requestFullScreen();
		Boot_Start.call(this);
	};
}

Actor_LevelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function(){
	Actor_LevelUp.call(this);
	if(lvlRestore === 'restore') this.recoverAll();
};

/*
Graphics._onKeyDown = function(event) {

};

SceneManager.onKeyDown = function(event) {

};*/
