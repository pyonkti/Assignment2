var game = new Phaser.Game(1280, 578, Phaser.CANVAS, 'Javeline', { preload: preload, create: create, update: update, render: render });
var whiteAd;
var audience = new Array(new Array(7),new Array(6),new Array(5));
var background;
var runway;
var audienceSeat;
var player;

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
}
function create() {
	game.stage.backgroundColor = "#3ed8fb";
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.world.camera.position.set(0);
	background = game.add.tileSprite(0, 0, 1680, 840, 'sky');
	background.scale.set(0.8,0.7);
	background.fixedToCamera = true;
	runway = game.add.tileSprite(0, 157, 1650, 840, 'runway');
	runway.scale.set(1,0.5);
	audienceSeat = game.add.tileSprite(0, 12, 1650, 840, 'audience_seat');
	audienceSeat.scale.set(0.8,0.8);
	setAudience();
	backAndForth();
	player = game.add.sprite(50, 330,'player',0); 
	player.animations.add('play');
	player.animations.play('play', 10, true);
	player.scale.set(6);
	background.autoScroll(10,0);
	
	setLight();
}

function setAudience(){
	for(var i=0;i<3;i++)
    {
    	for(var j=0;j<audience[i].length;j++)
    	{
    		var randomAd = Math.floor(Math.random()*8)%4;
    		var randomFr = Math.floor(Math.random()*3);
    		if (randomAd == 0){
    			audience[i][j] = game.add.sprite(418 + 64 * j+32*i, 80 + 80 * i,'white_audience');   			
    		}
    		else if (randomAd == 1){
    			audience[i][j] = game.add.sprite(418 + 64 * j+32*i, 80 + 80 * i,'red_audience');
    		}
    		else if (randomAd == 2){
    			audience[i][j] = game.add.sprite(418 + 64 * j+32*i, 80 + 80 * i,'yellow_audience');
    		}
    		else if (randomAd == 3){
    			audience[i][j] = game.add.sprite(418 + 64 * j+32*i, 80 + 80 * i,'purple_audience');
    		}
    		audience[i][j].scale.set(4);
    		audience[i][j].animations.add('cheer');
    		audience[i][j].animations.play('cheer', 3, true);
    		audience[i][j].animations.next(randomFr);
    	}
    }
}

function setLight(){
	light = game.add.sprite(420,80,'light');
	light.scale.set(5,5);
	var fade = game.add.tween(light);
	fade.to({alpha:0},3000,"Linear",true);
}

function update() {

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

}
