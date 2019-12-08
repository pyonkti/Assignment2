function YourRecord() {
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var YourRecord_proto = Object.create(Phaser.State.prototype);
YourRecord.prototype = YourRecord_proto;
YourRecord.prototype.constructor = YourRecord;

YourRecord.prototype.init = function (record) {
	this.record = record;
};

YourRecord.prototype.preload = function () {
	
	this.load.pack('preloader', 'assets/pack.json');
	
};

YourRecord.prototype.create = function () {
	this.stage.backgroundColor = "#ffffff";
	var style = { font: "65px Arial", fill: "#000000", align: "center" };
	this.add.text(520,300,this.record,style);
	
	var pressEnter = this.add.sprite(500.0, 500.0, 'press-enter-text');
	pressEnter.scale.set(3);
	
	
	// public fields
	
	this.fPressEnter = pressEnter;
	this.afterCreate();
	
};

/* --- end generated code --- */

YourRecord.prototype.afterCreate = function() {
	var startKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	startKey.onDown.add(this.startGame, this);
	this.startMusic();
	//
	this.time.events.loop(700, this.blinkText, this);
};

YourRecord.prototype.startMusic = function() {
	this.music = this.add.audio("success");
	this.music.loop = false;

	this.music.play();
};

YourRecord.prototype.startGame = function() {
	this.state.start("Level");
};

YourRecord.prototype.blinkText = function() {
	if (this.fPressEnter.alpha) {
		this.fPressEnter.alpha = 0;
	} else {
		this.fPressEnter.alpha = 1;
	}
};
