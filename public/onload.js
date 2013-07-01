window.onload = function () {
	getUserData();

	// Run game loop when user selects difficulty
	$('.difficulty-link').on('click', function () {
		var difficulty = parseInt($(this).data('difficulty'));
		notifyServerOfStart(difficulty);
		startGame(3, difficulty);
	});

	$('.volume-toggle').on('click', function (e) {
		e.preventDefault();
		var $image = $(this).find('img');
		var src = $image.attr('src');
		var yoshiSound = new Audio("sounds/yoshi.mp3");

		// Turn sounds off
		if (src === 'images/volume-icon.png') {
			$image.attr('src', 'images/volume-icon-off.png');
			playSounds = false;

		// Turn sounds on
		} else {
			playSounds = true;
			yoshiSound.play();
			$image.attr('src', 'images/volume-icon.png');
		}
	});

}