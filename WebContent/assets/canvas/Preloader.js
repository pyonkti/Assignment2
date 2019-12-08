
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.0 (Phaser v2.6.2)


/**
 * Preloader.
 */
function Preloader() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var Preloader_proto = Object.create(Phaser.State.prototype);
Preloader.prototype = Preloader_proto;
Preloader.prototype.constructor = Preloader;

Preloader.prototype.init = function () {
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	
};

Preloader.prototype.preload = function () {
	
	this.load.pack('preloader', 'assets/pack.json');
	
	
	var _logo1 = this.add.sprite(420.0, 85.0, 'logo');
	_logo1.scale.set(3);
	_logo1.tint = 0x808000;
	
	var _logo = this.add.sprite(420.0, 83.0, 'logo');
	_logo.scale.set(3);
	
	
	this.load.setPreloadSprite(_logo, 0);
	
};

Preloader.prototype.create = function () {
	this.afterCreate();
};

/* --- end generated code --- */


Preloader.prototype.afterCreate = function () {
	// all the assets are loaded, go to the menu screen
	this.state.add("Level", Level);
	this.state.add("TitleScreen", TitleScreen, true);
	this.state.add("YourRecord",YourRecord);
	this.state.add("YouFoul",YouFoul);
	this.state.add("YouDie",YouDie);
	
};
