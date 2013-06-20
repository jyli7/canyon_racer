window.onload = function () {
	// Run game loop when user selects difficulty
	$('.difficulty-link').on('click', function () {
		var difficulty = parseInt($(this).data('difficulty'));
		notifyServerOfStart(difficulty);
		startGame(3, difficulty);
	});

	var notifyServerOfStart = function (difficulty) {
		$.ajax({
		  type: "POST",
		  url: '../started',
		  data: {difficulty: difficulty},
		  success: function () { console.log('posted') }
		});
	};
}