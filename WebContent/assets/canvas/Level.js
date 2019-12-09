function Level() {

	Phaser.State.call(this);

}

var Level_proto = Object.create(Phaser.State.prototype);
Level.prototype = Level_proto;
Level.prototype.constructor = Level;

Level.prototype.init = function() {
	hitGround = false;
	exists = false;
	bar1_exists = false;
	acc = false;
	acc2 = false;
	isUp = false;
	isDead = false;
	flashOnce = true;
	txtIdleOnce = true;
	txtThrowOnce = true;
	this.physics.startSystem(Phaser.Physics.ARCADE);
	this.bgm = this.add.audio("level_BGM");
	this.bgm.loop = true;
	this.bgm.play();
};

Level.prototype.preload = function() {

	this.load.pack('preloader', 'assets/pack.json');

};

Level.prototype.create = function() {
	this.physics.startSystem(Phaser.Physics.ARCADE);
	this.physics.arcade.gravity.y = 654;
	this.world.setBounds(0, 0, 9640, 3600);
	var background = this.add.tileSprite(0, 0, 9640, 3600, 'sky');
	background.scale.set(10);
	background.autoScroll(10,0);
	var runway = new Array(2);
	runway[0] = this.add.tileSprite(0, 3180, 1650, 840, 'runway');
	runway[0].scale.set(1,0.5);
	runway[1] = this.add.tileSprite(1130, 3180, 1650, 840, 'runway');
	runway[1].scale.set(1,0.5);
	var ground = this.add.tileSprite(2780, 3395, 6845, 205, 'ground');
	this.physics.enable(runway,Phaser.Physics.ARCADE);
	this.physics.enable(ground,Phaser.Physics.ARCADE);
	runway[0].body.immovable = true;
	runway[0].body.moves = false;
	runway[1].body.immovable = true;
	runway[1].body.moves = false;
	ground.body.immovable = true;
	ground.body.moves = false;
	runway[0].body.setSize(1650,20,0,730);
	runway[1].body.setSize(1650,20,0,730);
	ground.body.setSize(6845,20,0,150);
	var audience = new Array(new Array(7),new Array(6),new Array(5));
	var audienceSeat = new Array(3);
	for(var i=0 ; i<3; i++){
		audienceSeat[i] = this.add.tileSprite(850*i, 3035, 1650, 840, 'audience_seat');
		audienceSeat[i].scale.set(0.8,0.8);
	}
	for(var k=0; k<3;k++)
	{
		for(var i=0;i<3;i++)
	    {
	    	for(var j=0;j<audience[i].length;j++)
	    	{
	    		var randomAd = Math.floor(Math.random()*8)%4;
	    		var randomFr = Math.floor(Math.random()*3);
	    		if (randomAd == 0){
	    			audience[i][j] = this.add.sprite(audienceSeat[k].x+420 + 64 * j+32*i, audienceSeat[k].y  + 80 * (i+1),'white_audience');   			
	    		}
	    		else if (randomAd == 1){
	    			audience[i][j] = this.add.sprite(audienceSeat[k].x+420 + 64 * j+32*i, audienceSeat[k].y + 80 * (i+1),'red_audience');
	    		}
	    		else if (randomAd == 2){
	    			audience[i][j] = this.add.sprite(audienceSeat[k].x+420 + 64 * j+32*i, audienceSeat[k].y +  80 * (i+1),'yellow_audience');
	    		}
	    		else if (randomAd == 3){
	    			audience[i][j] = this.add.sprite(audienceSeat[k].x+420 + 64 * j+32*i, audienceSeat[k].y + 80 * (i+1),'purple_audience');
	    		}
	    		audience[i][j].scale.set(4);
	    		audience[i][j].animations.add('cheer');
	    		audience[i][j].animations.play('cheer', 3, true);
	    		audience[i][j].animations.next(randomFr);
	    	}
	    }
	}
	var player = new Player(this.game,100,3450);

	var javelin = new Javelin(this.game,player.x,player.y);
	
	cursors = this.input.keyboard.createCursorKeys();
	space_key = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
	this.decelerate = function(){player.body.acceleration.set(0);};
	this.camera.follow(player);
	
	this.fBackground = background;
	this.fRunway0 = runway[0];
	this.fRunway1 = runway[1];
	this.fGround = ground;
	this.fPlayer = player;
	this.fJavelin = javelin;
	this.fCursors = cursors;
	this.fSpace_key = space_key;
};


var hitGround = false;
var exists = false;
var bar1_exists = false;
var acc = false;
var acc2 = false;
var isUp = false;
var isDead = false;
var flashOnce = true;
var txt_Idle;
var txt_Ms;
var txtIdleOnce = true;
var txtThrowOnce = true;

Level.prototype.update = function() {
	
	this.physics.arcade.collide(this.fGround,this.fPlayer);
	this.physics.arcade.collide(this.fGround,this.fJavelin);
	this.physics.arcade.collide(this.fRunway0, this.fPlayer);
	this.physics.arcade.collide(this.fRunway1, this.fPlayer);
	this.physics.arcade.collide(this.fRunway0, this.fJavelin);
	this.physics.arcade.collide(this.fRunway1, this.fJavelin);
	if(exists){
		this.physics.arcade.collide(bar_0, magnitude);
	}
	if(isDead){
		if(flashOnce){
			this.flash();
			this.fBackground.autoScroll(-100,0);
			flashOnce = false;
			this.bgm.destroy(false);
			this.audioThunder = this.add.audio("thunder");
			this.audioThunder.play();
	}
		var tempJavelin = this.fJavelin;
		this.physics.arcade.overlap(this.fJavelin,this.fPlayer,function(){
			tempJavelin.body.acceleration.set(0);
			tempJavelin.body.velocity.set(0);
			isDead = false;
			});
		if(!isDead){
			this.camera.fade(0x000000,1500);
			var state = this.state;
			setTimeout(function(){state.start("YouDie",true,true);}, 2000);
		}
	}
	
	if(this.checkFoul() && !this.fPlayer.hasThrown){
		this.camera.fade(0xffffff,1500);
		var state = this.state;
		setTimeout(function(){state.start("YouFoul",true,true);}, 1500);
	}
	
	if(this.fJavelin.body.y >= 3500 && !this.fJavelin.hitGround){
		this.fJavelin.hitGround = true;
		this.fJavelin.body.allowGravity = false;
		this.fJavelin.body.velocity.set(0);
		if (this.checkFoul()){
			this.camera.follow(this.fPlayer,null,0.1,0.1);
			this.camera.fade(0xffffff,1500);
			var state = this.state;
			setTimeout(function(){state.start("YouFoul",true,true);}, 1500);
		}else{
			var record = Number((this.fJavelin.body.x-2000)/76).toFixed(2);
			this.camera.fade(0xffffff,3000);
			var state = this.state;
			setTimeout(function(){state.start("YourRecord",true,true,record);}, 4000);
		}
	}
	if(bar1_exists){
		if(bar_1.angle >= 0){
			bar_1.body.angularVelocity = -200;
		}else if(bar_1.angle <= -90){
			bar_1.body.angularVelocity = 200;
		}
	}
	
	if(this.fPlayer.body.velocity.x<2){
		StateIdle.play(this.fPlayer);	
	}
	
	if(this.fPlayer.state.StateName == "Idle" && this.fPlayer.body.velocity.x>2){
		this.fPlayer.state = StateAccelerate;
		StateAccelerate.play(this.fPlayer);
		txt_Idle.destroy();
	}
	else if(this.fPlayer.state.StateName == "Idle"){ 
		this.keepUp("slow");
		var style = { font: "40px Arial", fill: "#000000", align: "center" };
		if(txtIdleOnce){
			txt_Idle = this.add.text(this.fPlayer.body.x+200,this.fPlayer.body.y-300,"Tap -> rapidly to acquire more speed!",style);
			txtIdleOnce = false;
		}
	}
	if(this.fPlayer.state.StateName == "Accelerating" && this.fPlayer.body.velocity.x<2){
		this.fPlayer.state = StateIdle;
		StateIdle.play(this.fPlayer);
	}
	else if(this.fPlayer.state.StateName == "Accelerating"){ 
		this.fPlayer.ac_ani.speed = Math.floor(this.fPlayer.body.velocity.x/50);
		this.keepUp("slow");
	}
	if(this.fPlayer.state.StateName == "Accelerating" && this.fPlayer.body.velocity.x>700){
		this.fPlayer.state = StateMaxSpeed;
		StateMaxSpeed.play(this.fPlayer);
	}
	if(this.fPlayer.state.StateName == "MaxSpeed" && this.fPlayer.body.velocity.x<650){
		this.fPlayer.state = StateAccelerate;
		StateAccelerate.play(this.fPlayer);
		txt_Ms.destroy();
	}
	if(this.fPlayer.state.StateName == "MaxSpeed"){ 
		this.fPlayer.ms_ani.speed = Math.floor(this.fPlayer.body.velocity.x/50);
		this.keepUp("fast");
		var style = { font: "40px Arial", fill: "#000000", align: "center" };
		if(txtThrowOnce){
			txt_Ms = this.add.text(this.fPlayer.body.x,this.fPlayer.body.y-300,"Press Space to throw the javelin!",style);
			txtThrowOnce = false;
		}
		this.txtKeepUp();
		if(this.fSpace_key.isDown){
			acc2 = true;
			txt_Ms.destroy();
		}
		if(this.fSpace_key.isUp && acc2 && !this.checkFoul() && !this.fPlayer.hasThrown){
			this.fPlayer.state = StateThrow;		
			StateThrow.play(this.fPlayer);
			this.dartJavelin();
		}
	}
	
	if(isDead){
			this.fJavelin.body.allowGravity = false;
			var turnAngle;
			var distance = Number(Math.sqrt(Math.pow(Math.abs(this.fPlayer.body.x-this.fJavelin.body.x-25),2)+Math.pow(Math.abs(this.fPlayer.y-this.fJavelin.body.y-25),2))).toFixed(2);
			this.fJavelin.body.acceleration.set((1000*(this.fPlayer.body.x-this.fJavelin.body.x-25)/distance)-this.fJavelin.body.velocity.x,(1000*(this.fPlayer.body.y-this.fJavelin.body.y-25)/distance)-this.fJavelin.body.velocity.y);	
			if(this.fJavelin.body.velocity.x>0){
				turnAngle = Math.atan(this.fJavelin.body.velocity.y/this.fJavelin.body.velocity.x)*(180/Math.PI);
				this.fJavelin.angle = turnAngle;
			}
			if(this.fJavelin.body.velocity.x<0 && this.fJavelin.body.velocity.y<=0){
				turnAngle = -180+Math.atan(this.fJavelin.body.velocity.y/this.fJavelin.body.velocity.x)*(180/Math.PI);
				this.fJavelin.angle = turnAngle;
			}else if(this.fJavelin.body.velocity.x<0 && this.fJavelin.body.velocity.y>0){
				turnAngle = 180+Math.atan(this.fJavelin.body.velocity.y/this.fJavelin.body.velocity.x)*(180/Math.PI);
				this.fJavelin.angle = turnAngle;
			}	
	}
	this.movePlayer();
	if(final_decision && !this.fJavelin.hitGround){
		this.keepDirection();
	}
};

Level.prototype.flash = function() {

    this.camera.flash(0xffffff, 500);

};

Level.prototype.keepDirection = function() {
	var turnAngle;
	if(this.fJavelin.body.velocity.x>0){
		turnAngle = Math.atan(this.fJavelin.body.velocity.y/this.fJavelin.body.velocity.x)*(180/Math.PI);
		this.fJavelin.angle = turnAngle;
	}
}

Level.prototype.movePlayer = function() {
	if (!this.fPlayer.hasThrown && this.fCursors.right.isDown){
		acc = true;
	}
	else if(this.fCursors.right.isUp && !acc){
		this.fPlayer.body.drag.x = 1000;
	}
	else if (this.fCursors.right.isUp && acc && !this.fPlayer.hasThrown && !this.checkFoul())
    {
		this.fPlayer.body.drag.x = 0;
		this.fPlayer.body.acceleration.set(1000,0);
        setTimeout(this.decelerate, 100);
        acc = false;
    }
};

Level.prototype.keepUp = function(a){
	if(a == "slow"){
		this.fJavelin.body.x = this.fPlayer.body.x-150;
		this.fJavelin.body.y = this.fPlayer.body.y+120;
	}else if (a == "fast" && !this.fPlayer.hasThrown){
		this.fJavelin.body.x = this.fPlayer.body.x-150;
		this.fJavelin.body.y = this.fPlayer.body.y+55;
	}
};

Level.prototype.txtKeepUp = function(){
		txt_Ms.x = this.fPlayer.body.x;
		txt_Ms.y = this.fPlayer.body.y-300;
};

Level.prototype.checkFoul= function() {
	if(this.fPlayer.body.x>=2750){
		return true;
	}
	return false;
};

Level.prototype.dartJavelin = function(){
	this.fPlayer.hasThrown = true;
	this.fPlayer.animations.paused = true;
	this.camera.follow(this.fJavelin);
	this.fly();
};

var bar_0;
var bar_1;
var magnitude;
var angle;
var tempSpeed;
var tempGame;

Level.prototype.fly = function(){
	tempSpeed = this.fPlayer.body.velocity.x;
	this.fPlayer.body.velocity.set(0);
	magnitude = new Magnitude(this.game,this.fPlayer.x,this.fPlayer.y);
	angle = new Angle(this.game,this.fPlayer.x-50,this.fPlayer.y-100);	
	bar_0 = new Bar(this.game,this.fPlayer.x+573,this.fPlayer.y+50);
	bar_1 = new Bar2(this.game,this.fPlayer.x+50,this.fPlayer.y-44);
	exists = true;
	tempGame = this;
	this.fSpace_key.onDown.add(this.moveOn);	
};

Level.prototype.moveOn = function(){
	bar_0.body.velocity.set(0);
	bar_0.body.acceleration.set(0);
	bar1_exists = true;
	tempGame.fSpace_key.onDown.add(tempGame.moveOn_2);
};
var final_decision = false;
Level.prototype.moveOn_2 = function(){
	bar_0.destroy();
	bar_1.destroy();
	magnitude.destroy();
	angle.destroy();
	bar1_exists = false;
	tempGame.fPlayer.animations.paused = false;
	tempGame.fPlayer.body.velocity.set(tempSpeed,0);
	tempGame.fJavelin.body.allowGravity = true;
	tempGame.fJavelin.body.drag.x = 100;
	var setAngle = -bar_1.angle*(Math.PI/180);
	var forceMagnitude = 1-(bar_0.y-magnitude.y)/500;	
	tempGame.fJavelin.body.velocity.set(tempSpeed+1650*forceMagnitude*Math.cos(setAngle),-1650*forceMagnitude*Math.sin(setAngle));
	final_decision = true;
	var randomEvent = Math.floor(Math.random()*4);	
	if(randomEvent == 0 && -bar_1.angle>40 && forceMagnitude>0.8){
		setTimeout(function(){isDead = true;}, 2000);
	}
};