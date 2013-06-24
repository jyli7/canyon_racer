window.onload = function () {
	getUserData();

	// DO NOT DISPLAY MODAL
	// $('.game-stats-link').leanModal({overlay: 0.8, closeButton: ".modal-close"});

	// Run game loop when user selects difficulty
	$('.difficulty-link').on('click', function () {
		var difficulty = parseInt($(this).data('difficulty'));
		notifyServerOfStart(difficulty);
		startGame(1, difficulty);
	});

}