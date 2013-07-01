window.onload = function () {
	getUserData();

	// DO NOT DISPLAY MODAL
	// $('.game-stats-link').leanModal({overlay: 0.8, closeButton: ".modal-close"});

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

		// Turn sounds off
		if (src === 'images/volume-icon.png') {
			$image.attr('src', 'images/volume-icon-off.png');
			playSounds = false;

		// Turn sounds off
		} else {
			playSounds = true;
			$image.attr('src', 'images/volume-icon.png');

		}
	});

}