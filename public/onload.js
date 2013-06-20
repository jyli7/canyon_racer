window.onload = function () {
	getUserData();
	// Run game loop when user selects difficulty
	$('.difficulty-link').on('click', function () {
		var difficulty = parseInt($(this).data('difficulty'));
		notifyServerOfStart(difficulty);
		startGame(1, difficulty);
	});

	$('.difficulty-link').on('mouseenter', function () {
		$('.completion-counts').removeClass('hidden');
			var difficulty = parseInt($(this).data('difficulty'));
			if (difficulty === 1) {
				$('.start-count').html(globalVars.userData.beginnerStartCount);
		  	$('.win-count').html(globalVars.userData.beginnerWinCount);	
			} else if (difficulty === 2) {
				$('.start-count').html(globalVars.userData.normalStartCount);
		  	$('.win-count').html(globalVars.userData.normalWinCount);	
			} else if (difficulty === 3) {
				$('.start-count').html(globalVars.userData.hellishStartCount);
		  	$('.win-count').html(globalVars.userData.hellishWinCount);
			}
	});

	$('.difficulty-link').on('mouseleave', function (){
		$('.completion-counts').addClass('hidden');
	});

}