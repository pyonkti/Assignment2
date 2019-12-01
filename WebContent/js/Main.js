var game = new Phaser.Game(1280, 575, Phaser.CANVAS, 'Javeline', { preload: preload, create: create, update: update, render: render });
var audience = new Array(new Array(7),new Array(6),new Array(5));
var background;
var runway = new Array(2);
var audienceSeat = new Array(3);
var player;
var cursors;
var ground;
var acc;
var map;
var tileset;
var layer;

function preload() {
    game.load.spritesheet('white_audience', 'assets/images/audience_white_sprite.png', 24,32);
    game.load.spritesheet('red_audience', 'assets/images/audience_red_sprite.png', 24,32);
    game.load.spritesheet('yellow_audience', 'assets/images/audience_yellow_sprite.png',24,32);
    game.load.spritesheet('purple_audience', 'assets/images/audience_purple_sprite.png', 24,32);
    game.load.spritesheet('player', 'assets/images/res_viewer_sprite.png', 24,32);
    game.load.image('sky', 'assets/images/sky.png');
    game.load.image('audience_seat', 'assets/images/audience_seat.png');
    game.load.image('runway', 'assets/images/runway.png');
    game.load.image('light', 'assets/images/light.png');
    game.load.image('ground', 'assets/images/ground.png');
}

function create() {
	game.stage.backgroundColor = "#3ed8fb";
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 654;
	game.world.setBounds(0, 0, 9600, 3600);
	background = game.add.tileSprite(0, 0, 8500, 3600, 'sky');
	background.autoScroll(10,0);
	setLight();
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
	cursors = game.input.keyboard.createCursorKeys();
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
	light = game.add.sprite(420,80,'light');
	light.scale.set(5,5);
	var fade = game.add.tween(light);
	fade.to({alpha:0},3000,"Linear",true);
}

function setPlayer(){
	player = game.add.sprite(50, 3350,'player'); 
	player.animations.add('accelerate',[0,1,2],60,true);
	player.animations.play('accelerate', 10, true);
	game.physics.enable(player,Phaser.Physics.ARCADE);
	player.scale.set(6);
	player.body.allowGravity = true;
	player.body.bounce.setTo(0.1);
	player.body.collideWorldBounds = true;
	player.body.maxVelocity.set(600);
}


function update() {
	game.physics.arcade.collide(player, runway);
	game.physics.arcade.collide(player, ground);
	if (cursors.right.isDown){
		acc = true;
	}
	if(cursors.right.isUp){
		player.body.drag.x = 800;
	}
	if (cursors.right.isUp && acc)
    {
		player.body.drag.x = 0;
        player.body.acceleration.set(800,0);
        setTimeout("player.body.acceleration.set(0);", 100 );
        acc = false;
    }
}

function render() {
	game.debug.cameraInfo(game.camera, 32, 32);
	var zone = new Phaser.Rectangle(player.x,player.y,player.width,player.height);
		game.context.fillStyle = 'rgba(255,0,0,0.6)';
		game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
	var zone2 = new Phaser.Rectangle(runway[0].body.x,runway[0].body.y,runway[0].body.width,runway[0].body.height);
    	game.context.fillStyle = 'rgba(255,0,0,0.6)';
    	game.context.fillRect(zone2.x, zone2.y, zone2.width, zone2.height);
	
}

