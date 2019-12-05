window.onload = function() {
	var game = new Phaser.Game(1280, 720, Phaser.AUTO, "Javeline");

	// Add the States your game has.
	game.state.add("Boot", Boot);
	game.state.add("Preloader", Preloader);
	game.state.start("Boot");
};


