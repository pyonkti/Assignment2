var game = new Phaser.Game(1300, 600, Phaser.CANVAS, 'Javeline', { preload: preload, create: create, update: update, render: render });
var whiteAd;
var audience = new Array(4);
var background;

function preload() {
    game.load.spritesheet('white_audience', 'assets/images/audience_white_sprite.png', 24,32);
    game.load.spritesheet('red_audience', 'assets/images/audience_red_sprite.png', 24,32);
    game.load.spritesheet('yellow_audience', 'assets/images/audience_yellow_sprite.png',24,32);
    game.load.spritesheet('purple_audience', 'assets/images/audience_purple_sprite.png', 24,32);
    game.load.image('sky', 'assets/images/sky.png');
    game.load.image('audience_seat', 'assets/images/audience_seat.png');
}
function create() {
	game.stage.backgroundColor = "#4488AA";
	game.world.setBounds(0, 0, 1600, 1200);
for (var i=0; i<4; i++){
		audience[i] =  new Array(20);
	}
	background = game.add.tileSprite(0, 0, 1680, 840, 'sky');
	background.scale.set(0.8,0.8);
	background.fixedToCamera = true;
	setAudience();
}

function setAudience(){
	for(var i=0;i<4;i++)
    {
    	for(var j=0;j<20;j++)
    	{
    		var randomAd = Math.floor(Math.random()*8)%4;
    		if (randomAd == 0){
    			audience[i][j] = game.add.sprite(300 + 32 * j, 150 + 32 * i,'white_audience');   			
    		}
    		else if (randomAd == 1){
    			audience[i][j] = game.add.sprite(300 + 32 * j, 150 + 32 * i,'red_audience');
    		}
    		else if (randomAd == 2){
    			audience[i][j] = game.add.sprite(300 + 32 * j, 150 + 32 * i,'yellow_audience');
    		}
    		else if (randomAd == 3){
    			audience[i][j] = game.add.sprite(300 + 32 * j, 150 + 32 * i,'purple_audience');
    		}
    		audience[i][j].scale.set(2);
    		audience[i][j].animations.add('cheer');
    		audience[i][j].animations.play('cheer', 3, true);
    	}
    }
}

function update() {
	
}


function render() {

}
