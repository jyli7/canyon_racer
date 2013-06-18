window.onload = function () {
	// Run game loop when user hits enter
	var gameBegun = false;
	addEventListener("keydown", function (e) {
		if (e.keyCode == 13 && !gameBegun) {
			startGame();
			playSound('level-1-theme.wav');
			gameBegun = true;
		}
	}, false);
}