function Player(aGame, aX, aY) {
	Phaser.Sprite.call(this, aGame, aX, aY, "player");
	this.anchor.setTo(0.5, 0.5);
	this.ac_ani = this.animations.add('accelerate_animation',[0,1,2],30,true);
	this.ms_ani = this.animations.add('ms_animation',[3,4,5],30,true);
	this.th_ani = this.animations.add('th_animation',[6,7,8,9,10,11,12,13],30,false);

	this.hasThrown = false;
	this.state = StateIdle;

	this.game.physics.arcade.enable(this);	
	this.scale.set(6);
	this.body.setSize(24,32,10,0);
	this.body.allowGravity = true;
	this.body.maxVelocity.set(800);
	this.afterCreate();
	aGame.add.existing(this);
}

var StateIdle = new UState("Idle");
	StateIdle.play = function(RefObject){
		RefObject.animations.paused = true;
	};

var StateAccelerate = new UState("Accelerating");
	StateAccelerate.play = function(RefObject){
		RefObject.animations.paused = false;
		RefObject.animations.play('accelerate_animation');
	};
	
var StateMaxSpeed = new UState("MaxSpeed");
	StateMaxSpeed.play = function(RefObject){
		RefObject.animations.play('ms_animation');
	};
	
var StateThrow = new UState("Throw");
	StateThrow.play = function(RefObject){
		RefObject.animations.play('th_animation');
	};	
	
function UState(RefStateName) {
	    this.StateName = RefStateName; 
	}
	
	
	
/** @type Phaser.Sprite */
var Player_proto = Object.create(Phaser.Sprite.prototype);
Player.prototype = Player_proto;
Player.prototype.constructor = Player;

/* --- end generated code --- */

Player.prototype.afterCreate = function() {
	this.initX = this.x;
	this.initY = this.y;
	this.kind = "player";
};


Player.prototype.reset = function() {
	this.x = this.initX;
	this.y = this.initY;
	this.body.velocity.y = 0;
	//this.animations.play('idle');
};

