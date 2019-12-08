function YouFoul() {
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var YouFoul_proto = Object.create(Phaser.State.prototype);
YouFoul.prototype = YouFoul_proto;
YouFoul.prototype.constructor = YouFoul;

YouFoul.prototype.init = function () {
};

YouFoul.prototype.preload = function () {
	
	this.load.pack('preloader', 'assets/pack.json');
	
};

YouFoul.prototype.create = function () {
	this.stage.backgroundColor = "#ffffff";
	var style = { font: "65px Arial", fill: "#000000", align: "center" };
	this.add.text(450,300,"You Fouled!",style);
	
	var pressEnter = this.add.sprite(500.0, 500.0, 'press-enter-text');
	pressEnter.scale.set(3);
	
	
	// public fields
	
	this.fPressEnter = pressEnter;
	this.afterCreate();
	
};

/* --- end generated code --- */

YouFoul.prototype.afterCreate = function() {
	var startKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	startKey.onDown.add(this.startGame, this);
	this.startMusic();
	//
	this.time.events.loop(700, this.blinkText, this);
};

YouFoul.prototype.startMusic = function() {
	this.music = this.add.audio("failure");
	this.music.loop = false;

	this.music.play();
};

YouFoul.prototype.startGame = function() {
	this.state.start("Level");
};

YouFoul.prototype.blinkText = function() {
	if (this.fPressEnter.alpha) {
		this.fPressEnter.alpha = 0;
	} else {
		this.fPressEnter.alpha = 1;
	}
};