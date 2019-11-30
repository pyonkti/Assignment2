var game = new Phaser.Game(1280, 575, Phaser.CANVAS, 'Javeline', { preload: preload, create: create, update: update, render: render });
var audience = new Array(new Array(7),new Array(6),new Array(5));
var background;
var runway = new Array(2);
var audienceSeat = new Array(3);
var player;
var cursors;
var ground;
var acc;

function preload() {
    game.load.spritesheet('white_audience', 'assets/images/audience_white_sprite.png', 24,32);
    game.load.spritesheet('red_audience', 'assets/images/audience_red_sprite.png', 24,32);
    game.load.spritesheet('yellow_audience', 'assets/images/audience_yellow_sprite.png',24,32);
    game.load.spritesheet('purple_audience', 'assets/images/audience_purple_sprite.png', 24,32);
    game.load.spritesheet('player', 'assets/images/res_viewer_sprite.png', 24,32);
    game.load.image('sky', 'assets/images/sky.png');
    game.load.image('audience_seat', 'assets/images/audience_seat.png');
    game.load.image('runway', 'assets/images/runway.png');
    game.load.image('ground', 'assets/images/ground.png');
}

function create() {
	game.stage.backgroundColor = "#3ed8fb";
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 654;
	game.world.setBounds(0, 0, 8000, 3600);
	background = game.add.tileSprite(0, 3000, 1680, 840, 'sky');
	background.scale.set(0.8,0.7);
	background.autoScroll(10,0);
	runway[0] = game.add.tileSprite(0, 3180, 1650, 840, 'runway');
	runway[0].scale.set(1,0.5);
	runway[1] = game.add.tileSprite(1130, 3180, 1650, 840, 'runway');
	runway[1].scale.set(1,0.5);
	ground = game.add.tileSprite(2780, 3180, 1650, 840, 'ground');
	ground.scale.set(1,0.5);
	game.physics.enable(runway,Phaser.Physics.ARCADE);
	game.physics.enable(ground,Phaser.Physics.ARCADE);
	runway[0].body.immovable = true;
	runway[0].body.moves = false;
	runway[1].body.immovable = true;
	runway[1].body.moves = false;
	ground.body.immovable = true;
	ground.body.moves = false;
	setAudience();
	//backAndForth();
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

function setPlayer(){
	player = game.add.sprite(50, 3350,'player'); 
	game.physics.enable(player,Phaser.Physics.ARCADE);
	player.body.velocity.set(0,-2000);
	player.scale.set(6);
	player.body.allowGravity = true;
	player.animations.add('play');
	player.animations.play('play', 10, true);
	player.body.collideWorldBounds = true;
}

function update() {
	if (cursors.right.isDown){
		acc = true;
	}
	if (cursors.right.isUp && acc)
    {
        player.body.acceleration.set(333,0);
        setTimeout("player.body.acceleration.set(0);", 200 );
        acc = false;
    }
	if (cursors.left.isDown){
		 player.body.velocity.set(0);
	}
}

function backAndForth(){
	//定义移动的距离
	var rumbleOffset = 50;
	//从相机当前的位置开始移动
	var properties = {
		x: background.x + rumbleOffset
	};
	//持续时间
	var duration = 1000;
	//重复次数
	var repeat = -1;
	//动画方式，支持对象和字符串两种方式
	var ease = Phaser.Easing.Linear.None;
	//设置为true可以自动开始，false则需要手动调用start()方法
	var autoStart = true;
	//延迟x毫秒后开始
	var delay = 0;
	//是否回到起始位置
	var yoyo = true;
	
	var quake = game.add.tween(background)
		.to(properties, duration, ease, autoStart, delay, 0, yoyo);
		quake.repeat(repeat);
	//我们定义结束后重新开始动画
	
	//开始动画
	quake.start();
}


function render() {
	var p_zone = player.getBounds();
    	game.context.fillStyle = 'rgba(0,0,0,0.6)';
    	game.context.fillRect(p_zone.x, p_zone.y, p_zone.width, p_zone.height);
	 var zone = new Phaser.Rectangle(player.body.x,player.body.y,player.body.width,player.body.height);
	    game.context.fillStyle = 'rgba(255,0,0,0.6)';
	    game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
	   // game.debug.spriteBounds(player, 'pink', false);
	game.debug.cameraInfo(game.camera, 32, 32);
}
