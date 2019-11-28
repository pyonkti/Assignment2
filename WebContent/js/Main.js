var game = new Phaser.Game(1600, 1200, Phaser.CANVAS, 'Javeline', { preload: preload, create: create, update: update, render: render });
var whiteAd;
var audience = new Array(4);

function preload() {
    game.load.spritesheet('white_audience', 'assets/images/audience_white_sprite.png', 24,32);
    game.load.spritesheet('red_audience', 'assets/images/audience_red_sprite.png', 24,32);
    game.load.spritesheet('yellow_audience', 'assets/images/audience_yellow_sprite.png',24,32);
    game.load.spritesheet('purple_audience', 'assets/images/audience_purple_sprite.png', 24,32);

}
function create() {
for (var i=0; i<4; i++){
		audience[i] =  new Array(10);
	}
	setAudience();
}

function setAudience(){
	for(var i=0;i<4;i++)
    {
    	for(var j=0;j<10;j++)
    	{
    		var randomAd = Math.floor(Math.random()*8)%4;
    		var randomPose = Math.floor(Math.random()*6)%3;
    		if (randomAd == 0){
    			audience[i][j] = game.add.sprite(300 + 32 * j, 100 + 32 * i,'white_audience');   			
    		}
    		else if (randomAd == 1){
    			audience[i][j] = game.add.sprite(300 + 32 * j, 100 + 32 * i,'red_audience');
    		}
    		else if (randomAd == 2){
    			audience[i][j] = game.add.sprite(300 + 32 * j, 100 + 32 * i,'yellow_audience');
    		}
    		else if (randomAd == 3){
    			audience[i][j] = game.add.sprite(300 + 32 * j, 100 + 32 * i,'purple_audience');
    		}
    		audience[i][j].scale.set(2);
    		audience[i][j].animations.add('cheer');
    		audience[i][j].animations.play('cheer', 1, true);
    	}
    }
}

function update() {
	
}


function render() {

}
