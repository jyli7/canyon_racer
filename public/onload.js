window.onload = function () {
	// Run game loop when user selects difficulty
	console.log('loaded');
	$('.difficulty-link').on('click', function () {
		var difficulty = parseInt($(this).data('difficulty'));
		startGame(3, difficulty);
	});
}