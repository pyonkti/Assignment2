function Bar2 (aGame, aX, aY) {
	Phaser.Sprite.call(this, aGame, aX, aY, "bar2");
	this.game.physics.arcade.enable(this);
	this.body.allowGravity = false;
	this.anchor.setTo(0.5);
	//this.afterCreate();
	aGame.add.existing(this);	
}

var Bar2_proto = Object.create(Phaser.Sprite.prototype);
Bar2.prototype = Bar2_proto;
Bar2.prototype.constructor = Bar2;

/* --- end generated code --- */

Bar2.prototype.afterCreate = function() {
	this.initX = this.x;
	this.initY = this.y;
	this.kind = "Bar2";
};


Bar2.prototype.reset = function() {
	this.x = this.initX;
	this.y = this.initY;
	this.body.velocity.y = 0;
	//this.animations.play('idle');
};