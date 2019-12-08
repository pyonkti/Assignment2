function Bar (aGame, aX, aY) {
	Phaser.Sprite.call(this, aGame, aX, aY, "bar");
	this.game.physics.arcade.enable(this);
	this.body.allowGravity = false;
	this.body.bounce.set(1);
	this.body.acceleration.set(0,-1600);
	//this.afterCreate();
	aGame.add.existing(this);	
}

var Bar_proto = Object.create(Phaser.Sprite.prototype);
Bar.prototype = Bar_proto;
Bar.prototype.constructor = Bar;

/* --- end generated code --- */

Bar.prototype.afterCreate = function() {
	this.initX = this.x;
	this.initY = this.y;
	this.kind = "Bar";
};


Bar.prototype.reset = function() {
	this.x = this.initX;
	this.y = this.initY;
	this.body.velocity.y = 0;
	//this.animations.play('idle');
};