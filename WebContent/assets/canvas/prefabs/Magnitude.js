function Magnitude (aGame, aX, aY) {
	Phaser.Sprite.call(this, aGame, aX+550, aY-450, "magnitude");
	this.game.physics.arcade.enable(this);
	this.body.allowGravity = false;
	this.body.setSize(25,25,0,-25);
	this.body.immovable = true;	
	//this.afterCreate();
	aGame.add.existing(this);	
}

var Magnitude_proto = Object.create(Phaser.Sprite.prototype);
Magnitude.prototype = Magnitude_proto;
Magnitude.prototype.constructor = Magnitude;

/* --- end generated code --- */

Magnitude.prototype.afterCreate = function() {
	this.initX = this.x;
	this.initY = this.y;
	this.kind = "Magnitude";
};


Magnitude.prototype.reset = function() {
	this.x = this.initX;
	this.y = this.initY;
	this.body.velocity.y = 0;
	//this.animations.play('idle');
};
