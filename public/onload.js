window.onload = function () {
	getUserData();
	// Run game loop when user selects difficulty
	$('.difficulty-link').on('click', function () {
		var difficulty = parseInt($(this).data('difficulty'));
		notifyServerOfStart(difficulty);
		startGame(1, difficulty);
	});

	// TODO: Figure out how to display the user stats, if at all.

	// $('.difficulty-link').on('mouseenter', function () {
	// 	$('.completion-counts').removeClass('hidden');
	// 		var difficulty = parseInt($(this).data('difficulty'));
	// 		if (difficulty === 1) {
	// 			$('.start-count').html(userStats.beginnerStartCount);
	// 	  	$('.win-count').html(userStats.beginnerWinCount);	
	// 		} else if (difficulty === 2) {
	// 			$('.start-count').html(userStats.normalStartCount);
	// 	  	$('.win-count').html(userStats.normalWinCount);	
	// 		} else if (difficulty === 3) {
	// 			$('.start-count').html(userStats.hellishStartCount);
	// 	  	$('.win-count').html(userStats.hellishWinCount);
	// 		}
	// });

	// $('.difficulty-link').on('mouseleave', function (){
	// 	$('.completion-counts').addClass('hidden');
	// });

}