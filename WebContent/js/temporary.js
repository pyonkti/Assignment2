var game = new Phaser.Game(1280, 575, Phaser.CANVAS, 'Javeline', { preload: preload, create: create, update: update, render: render });
var audience = new Array(new Array(7),new Array(6),new Array(5));
var background;
var runway = new Array(2);
var audienceSeat = new Array(3);
var player;
var javelin;
var ground;
var ac_ani;
var ms_ani;
var th_ani;
var cursors;
var space_key;
var magnitude;
var angle;
var bar = new Array(2);
var hasThrown = false;
var hitGround = false;
var hasFoul = false;
var exists = false;

function preload() {
    game.load.spritesheet('white_audience', 'assets/images/audience_white_sprite.png', 24,32);
    game.load.spritesheet('red_audience', 'assets/images/audience_red_sprite.png', 24,32);
    game.load.spritesheet('yellow_audience', 'assets/images/audience_yellow_sprite.png',24,32);
    game.load.spritesheet('purple_audience', 'assets/images/audience_purple_sprite.png', 24,32);
    game.load.spritesheet('player', 'assets/images/res_viewer_sprite.png', 24,32);
    game.load.image('javelin', 'assets/images/javelin.png');
    game.load.image('sky', 'assets/images/sky.png');
    game.load.image('audience_seat', 'assets/images/audience_seat.png');
    game.load.image('runway', 'assets/images/runway.png');
    game.load.image('light', 'assets/images/light.png');
    game.load.image('ground', 'assets/images/ground.png');
    game.load.image('magnitude', 'assets/images/magnitude.png');
    game.load.image('angle', 'assets/images/angle.png');
    game.load.image('bar', 'assets/images/bar.png');
    game.load.image('bar2', 'assets/images/bar2.png');
}

function create() {
	game.stage.backgroundColor = "#3ed8fb";
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 654;
	game.world.setBounds(0, 0, 9640, 3600);
	background = game.add.tileSprite(0, 0, 9640, 3600, 'sky');
	background.scale.set(10);
	background.autoScroll(10,0);
	runway[0] = game.add.tileSprite(0, 3180, 1650, 840, 'runway');
	runway[0].scale.set(1,0.5);
	runway[1] = game.add.tileSprite(1130, 3180, 1650, 840, 'runway');
	runway[1].scale.set(1,0.5);
	ground = game.add.tileSprite(2780, 3395, 6845, 205, 'ground');
	game.physics.enable(runway,Phaser.Physics.ARCADE);
	game.physics.enable(ground,Phaser.Physics.ARCADE);
	runway[0].body.immovable = true;
	runway[0].body.moves = false;
	runway[1].body.immovable = true;
	runway[1].body.moves = false;
	ground.body.immovable = true;
	ground.body.moves = false;
	runway[0].body.setSize(1650,20,0,730);
	runway[1].body.setSize(1650,20,0,730);
	ground.body.setSize(6845,20,0,150);
	setAudience();
	setPlayer();
	javelin = game.add.sprite(player.body.x-100,player.body.y+120,'javelin');
	javelin.anchor.x = 0.9;
	javelin.anchor.y = 0.5;
	setLight();
	game.physics.enable(javelin,Phaser.Physics.ARCADE);
	javelin.body.allowGravity = false;
	cursors = game.input.keyboard.createCursorKeys();
	space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	game.camera.follow(player);
}

function setAudience(){
	for(var i=0 ; i<3; i++){
		audienceSeat[i] = game.add.tileSprite(850*i, 3035, 1650, 840, 'audience_seat');
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
	    			audience[i][j] = game.add.sprite(audienceSeat[k].x+420 + 64 * j+32*i, audienceSeat[k].y  + 80 * (i+1),'white_audience');   			
	    		}
	    		else if (randomAd == 1){
	    			audience[i][j] = game.add.sprite(audienceSeat[k].x+420 + 64 * j+32*i, audienceSeat[k].y + 80 * (i+1),'red_audience');
	    		}
	    		else if (randomAd == 2){
	    			audience[i][j] = game.add.sprite(audienceSeat[k].x+420 + 64 * j+32*i, audienceSeat[k].y +  80 * (i+1),'yellow_audience');
	    		}
	    		else if (randomAd == 3){
	    			audience[i][j] = game.add.sprite(audienceSeat[k].x+420 + 64 * j+32*i, audienceSeat[k].y + 80 * (i+1),'purple_audience');
	    		}
	    		audience[i][j].scale.set(4);
	    		audience[i][j].animations.add('cheer');
	    		audience[i][j].animations.play('cheer', 3, true);
	    		audience[i][j].animations.next(randomFr);
	    	}
	    }
	}
}

function setLight(){
	for(var k=0; k<3;k++)
	{
		for(var i=0;i<3;i++)
	    {
	    	for(var j=0;j<5;j++)
	    	{
	    		var randomAd = Math.floor(Math.random()*10)%2;
//	    		var randomFr = Math.floor(Math.random()*3);
	    		if (randomAd == 0){
	    			light= game.add.sprite(850*k+420+64 * j+32*i, 3035 + 80* (i+1),'light');   
		    		light.scale.set(5);
		    		var fade = game.add.tween(light);
		    		fade.to({alpha:0},2000,"Linear",true);
	    		}	
	    	}
	    }
	}
	fade.delay(5000);
	fade.onComplete.addOnce(setLight);
}

function setPlayer(){
	player = game.add.sprite(50, 3350,'player'); 
	ac_ani = player.animations.add('accelerate',[0,1,2],30,true);
	ms_ani = player.animations.add('ms',[3,4,5],30,true);
	th_ani = player.animations.add('th',[6,7,8,9,10,11,12,13],30,false);
	player.animations.play('accelerate');
	player.animations.paused = true;
	game.physics.enable(player,Phaser.Physics.ARCADE);
	player.scale.set(6);
	player.body.allowGravity = true;
	player.body.bounce.setTo(0.1);
	player.body.collideWorldBounds = true;
	player.body.maxVelocity.set(800);
}

var acc = false;
var acc2 = false;
var isUp =false;

function update() {
	game.physics.arcade.collide(player, runway);
	game.physics.arcade.collide(player, ground);
	game.physics.arcade.collide(javelin, ground);
	if(exists){
		game.physics.arcade.collide(magnitude, bar[0]);
	}
	if(javelin.body.y >= 3500 && !hitGround){
		hitGround = true;
		javelin.body.allowGravity = false;
		javelin.body.velocity.set(0);
		hasFoul = checkFoul();
		if (hasFoul){
			game.camera.follow(player,null,0.1,0.1);
		}
	}
	if (!hasThrown && cursors.right.isDown){
		acc = true;
	}
	else if(cursors.right.isUp && !acc){
		player.body.drag.x = 1000;
	}
	else if (cursors.right.isUp && acc && !hasThrown && !checkFoul())
    {
		player.body.drag.x = 0;
        player.body.acceleration.set(1000,0);
        setTimeout("player.body.acceleration.set(0);", 100 );
        acc = false;
    }
	if(player.body.velocity.x<2){
		if(!isUp){
			keepUp("slow");
		}
		if(!player.animations.paused){
			player.animations.paused = true;
		}
	}else if (player.body.velocity.x<650){
		if(player.animations.paused){
			player.animations.paused = false;
		}
		if(!isUp){
			keepUp("slow");
			ac_ani.speed = Math.floor(player.body.velocity.x/50);
		}else{
			keepUp("fast");
		}
	}else if(!hasThrown){
			player.animations.play('ms',ac_ani.speed);
			isUp = true;
			keepUp("fast");
			ms_ani.speed = Math.floor(player.body.velocity.x/50);
			if(space_key.isDown){
				acc2 = true;
			}
			if(space_key.isUp && acc2 && !checkFoul()){
				dartJavelin();
				acc2 = false;
			}
	}
	if(checkFoul()){
		keepUp("fast");
	}
	if(bar1_exist){
		if(bar[1].angle >= 0){
			bar[1].body.angularVelocity = -200;
		}else if(bar[1].angle <= -90){
			bar[1].body.angularVelocity = 200;
		}
	}
	if(hasThrown && !hitGround){
		keepDirection();
	}
}

function keepUp(a){
	if(a == "slow" && !hasThrown){
		javelin.body.x = player.body.x-100;
		javelin.body.y = player.body.y+120;
	}else if (a == "fast" && !hasThrown){
		javelin.body.x = player.body.x-100;
		javelin.body.y = player.body.y+55;
	}
}

function dartJavelin(){
	player.animations.play('th');
	player.animations.paused = true;
	hasFoul = checkFoul();
	if(!hasFoul){
		game.camera.follow(javelin);
	}
	fly(player.body.velocity.x);
}

function checkFoul(){
	if(player.body.x>=2680){
		return true;
	}
	return false;
}

var tempSpeed;
function fly(vi){
	tempSpeed = player.body.velocity.x;
	magnitude = game.add.sprite(player.body.x+550,player.body.y-300,'magnitude');
	angle = game.add.sprite(player.body.x+100,player.body.y-90,'angle');
	angle.scale.set(3);
	bar[0] = game.add.sprite(player.body.x+573,player.body.y+200,'bar');
	bar[1] = game.add.sprite(player.body.x+100,player.body.y+56,'bar2');
	game.physics.enable(magnitude,Phaser.Physics.ARCADE);
	game.physics.enable(bar[0],Phaser.Physics.ARCADE);
	game.physics.enable(bar[1],Phaser.Physics.ARCADE);
	bar[0].body.allowGravity = false;
	bar[1].body.allowGravity = false;
	bar[1].anchor.setTo(0.5);
	magnitude.body.allowGravity = false;
	magnitude.body.setSize(25,25,0,-25);
	magnitude.body.immovable = true;
	bar[0].body.bounce.set(1);
	player.body.velocity.set(0);
	bar[0].body.acceleration.set(0,-1600);
	exists = true;
	hasThrown = true;
	space_key.onDown.add(moveOn);
}

var decision_1 = false;
var bar1_exist = false;
function moveOn(){
	if(!decision_1){
		bar[0].body.velocity.set(0);
		bar[0].body.acceleration.set(0);
		bar1_exist = true;
		space_key.onDown.add(moveOn_2);
		decision_1 = true;
	}
}

var decision_2 = false;
function moveOn_2(){
	if(!decision_2){
		bar[0].destroy();
		bar[1].destroy();
		magnitude.destroy();
		angle.destroy();
		bar1_exist = false;
		player.animations.paused = false;
		player.body.velocity.set(tempSpeed,0);
		javelin.body.allowGravity = true;
		javelin.body.drag.x = 100;
		var setAngle = -bar[1].angle*(Math.PI/180);
		var forceMagnitude = 1-(bar[0].y-magnitude.y)/500;	
		javelin.body.velocity.set(tempSpeed+1650*forceMagnitude*Math.cos(setAngle),-1650*forceMagnitude*Math.sin(setAngle));
		decision_2 = true;
	}
}


function keepDirection(){
	var turnAngle;
	if(javelin.body.velocity.x>0){
		turnAngle = Math.atan(javelin.body.velocity.y/javelin.body.velocity.x)*(180/Math.PI);
		javelin.angle = turnAngle;
	}
}

function render() {
}
