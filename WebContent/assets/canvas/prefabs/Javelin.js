function Javelin(aGame, aX, aY) {
	Phaser.Sprite.call(this, aGame, aX+100, aY+30, "javelin");
	this.anchor.setTo(0.9, 0.5);
	this.hitGround = false;
	//this.state = StateIdle;
	this.game.physics.arcade.enable(this);
	this.body.allowGravity = false;
	//this.afterCreate();
	aGame.add.existing(this);
}

/** @type Phaser.Sprite */
var Javelin_proto = Object.create(Phaser.Sprite.prototype);
Javelin.prototype = Javelin_proto;
Javelin.prototype.constructor = Javelin;

/* --- end generated code --- */

Javelin.prototype.afterCreate = function() {
	this.initX = this.x;
	this.initY = this.y;
	this.kind = "javelin";
};


Javelin.prototype.reset = function() {
	this.x = this.initX;
	this.y = this.initY;
	this.body.velocity.y = 0;
	//this.animations.play('idle');
};

