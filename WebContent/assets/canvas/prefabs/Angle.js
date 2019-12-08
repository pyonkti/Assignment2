function Angle (aGame, aX, aY) {
	Phaser.Sprite.call(this, aGame, aX+100, aY-90, "angle");
	this.game.physics.arcade.enable(this);
	this.body.allowGravity = false;
	this.body.setSize(25,25,0,-25);
	this.body.immovable = true;	
	this.scale.set(3);
	//this.afterCreate();
	aGame.add.existing(this);	
}

var Angle_proto = Object.create(Phaser.Sprite.prototype);
Angle.prototype = Angle_proto;
Angle.prototype.constructor = Angle;

/* --- end generated code --- */

Angle.prototype.afterCreate = function() {
	this.initX = this.x;
	this.initY = this.y;
	this.kind = "Angle";
};


Angle.prototype.reset = function() {
	this.x = this.initX;
	this.y = this.initY;
	this.body.velocity.y = 0;
	//this.animations.play('idle');
};