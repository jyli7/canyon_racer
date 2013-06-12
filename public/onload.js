window.onload = function () {
	// Run game loop when user hits enter
	var theme = document.getElementById('theme');
	theme.play();
	var gameBegun = false;
	addEventListener("keydown", function (e) {
		if (e.keyCode == 13 && !gameBegun) {
			startGame();
			gameBegun = true;
		}
	}, false);
}