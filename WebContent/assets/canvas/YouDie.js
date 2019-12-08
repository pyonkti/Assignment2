/**
 * YouDie.
 */
function YouDie() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var YouDie_proto = Object.create(Phaser.State.prototype);
YouDie.prototype = YouDie_proto;
YouDie.prototype.constructor = YouDie;

YouDie.prototype.init = function () {
	
};

YouDie.prototype.preload = function () {
	
	this.load.pack('preloader', 'assets/pack.json');
	
};

YouDie.prototype.create = function () {
	this.stage.backgroundColor = "#000000";
	var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
	this.add.text(480,300,"You Died",style);
	
	var pressEnter = this.add.sprite(500.0, 500.0, 'press-enter-text');
	pressEnter.scale.set(3);
	
	this.fPressEnter = pressEnter;
	this.afterCreate();
	
};

/* --- end generated code --- */

YouDie.prototype.afterCreate = function() {
	var startKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	startKey.onDown.add(this.startGame, this);
	//
	this.time.events.loop(700, this.blinkText, this);
};

YouDie.prototype.startGame = function() {
	this.state.start("Level");
};

YouDie.prototype.blinkText = function() {
	if (this.fPressEnter.alpha) {
		this.fPressEnter.alpha = 0;
	} else {
		this.fPressEnter.alpha = 1;
	}
};