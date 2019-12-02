var game = new Phaser.Game(1280, 575, Phaser.CANVAS, 'Javeline', { preload: preload, create: create, update: update, render: render });
var audience = new Array(new Array(7),new Array(6),new Array(5));
var background;
var runway = new Array(2);
var audienceSeat = new Array(3);
var player;
var javelin;
var cursors;
var ground;
var acc;
var map;
var tileset;
var layer;
var ac_ani;
var ms_ani;
var th_ani;
var space_key;
var hasThrown = false;

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
    game.load.image('light2', 'assets/images/light2.png');
    game.load.image('light3', 'assets/images/light3.png');
    game.load.image('ground', 'assets/images/ground.png');
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
	runway[1] = game.add.tileSprite(1145, 3180, 1650, 840, 'runway');
	runway[1].scale.set(1,0.5);
	ground = game.add.tileSprite(2795, 3395, 6845, 205, 'ground');
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
	setLight();
	javelin = game.add.sprite(2780,3395,'javelin');
	game.physics.enable(javelin,Phaser.Physics.ARCADE);
	javelin.body.setSize(278,10,0,0);
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
	    		var randomAd = Math.floor(Math.random()*10)%5;
	    		if (randomAd == 0){
	    			light= game.add.sprite(850*k+420+64 * j+32*i, 3035 + 80* (i+1),'light');   
		    		light.scale.set(5);
		    		var fade = game.add.tween(light);
		    		fade.to({alpha:0},2000,"Linear",true);
	    		}
	    		if (randomAd == 1){
	    			light= game.add.sprite(850*k+420+64 * j+32*i, 3035 + 80* (i+1),'light2');   
		    		light.scale.set(5);
		    		var fade = game.add.tween(light);
		    		fade.to({alpha:0},2000,"Linear",true);
	    		}	
	    		if (randomAd == 2){
	    			light= game.add.sprite(850*k+420+64 * j+32*i, 3035 + 80* (i+1),'light3');   
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


function update() {
	game.physics.arcade.collide(player, runway);
	game.physics.arcade.collide(player, ground);
	game.physics.arcade.collide(javelin, ground);
	if(javelin.y == 3535){
		javelin.body.velocity.set(0);
	}
	if (!hasThrown && cursors.right.isDown){
		acc = true;
	}
	else if(cursors.right.isUp && !acc){
		player.body.drag.x = 1000;
	}
	else if (cursors.right.isUp && acc && !hasThrown)
    {
		player.body.drag.x = 0;
        player.body.acceleration.set(1000,0);
        setTimeout("player.body.acceleration.set(0);", 200 );
        acc = false;
    }
	if(player.body.velocity.x<2){
		if(!player.animations.paused){
			player.animations.paused = true;
		}
	}else if (player.body.velocity.x<500){
		if(player.animations.paused){
			player.animations.paused = false;
		}
		ac_ani.speed = Math.floor(player.body.velocity.x/50);
	}else if(!hasThrown){
			player.animations.play('ms',ac_ani.speed);
			ms_ani.speed = Math.floor(player.body.velocity.x/50);
			if(space_key.isDown){
				dartJavelin();
			}
	}
}

function dartJavelin(){
	player.animations.play('th');
	hasThrown = true;
	game.camera.follow(javelin);
	fly(player.body.velocity.x);
}

function fly(vi){
	javelin.body.allowGravity = true;
	javelin.body.drag.x = 100;
	var randomAngle = Math.floor(Math.random()*90)*(Math.PI/180);
	var randomForceMagnitude = Math.random();	
	javelin.body.velocity.set(vi+2133*randomForceMagnitude*Math.cos(randomAngle),-2133*randomForceMagnitude*Math.sin(randomAngle));
}

function render() {
	game.debug.cameraInfo(game.camera, 32, 32);
	game.debug.body(ground,'rgba(255,0,0,0.6)',true);
}

