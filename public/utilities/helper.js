var TRIANGLE = 0;
var RECTANGLE = 1;
var userStats = {};

// Given a bound, returns anything between that bound and -1 * that bound.
// e.g. give it 100, and it returns something between -100 and 100
var volatilityFactor = function (bound) {
	return Math.random() * bound * 2 - bound;
}

var setMessage = function (id, message) {
	document.getElementById(id).innerHTML = message;
}

var wipeAllMessages = function () {
	setMessage('primary-message', "");
	setMessage('secondary-message', "");
}

var mixin = function (obj, mixin) {
	for (var i in mixin) {
		obj[i] = mixin[i];
	}
}

var setUpAmmoBar = function (ship) {
	$('.ammo-count').html(ship.initialBulletCount);
}

var shortenAmmoBar = function (ship) {
	var totalWidth = $('.ammo-bar-container').width();
	var widthReduction = totalWidth / ship.initialBulletCount;
	var currentWidth = $('.ammo-bar').width();
	$('.ammo-bar').width(currentWidth - widthReduction);
	$('.ammo-count').html(ship.currentBulletCount);
}

var refillAmmoBar = function (ship) {
	var totalWidth = $('.ammo-bar-container').width();
	$('.ammo-bar').width(totalWidth);
	$('.ammo-count').html(ship.initialBulletCount);
}

var initDifficultyDisplay = function (difficulty) {
	var text;
	if (difficulty === 1) {
		text = "Beginner"
	} else if (difficulty === 2) {
		text = "Normal"
	} else if (difficulty === 3) {
		text = "Hellish"
	}
	$('.difficulty-value').html(text);
}


var notifyServerOfStart = function (difficulty) {
	$.ajax({
	  type: "POST",
	  url: '../started',
	  data: {difficulty: difficulty},
	  success: function () { console.log('posted') }
	});
};

var notifyServerOfWin = function (difficulty, userName) {
	$.ajax({
	  type: "POST",
	  url: '../won',
	  data: {difficulty: difficulty, userName: userName},
	  success: function () { console.log('posted') }
	});
};

var getUserData = function (difficulty) {
	$.ajax({
	  type: "GET",
	  url: '../user_data',
	  success: function (res) {
	  	userStats = res;

	  	// DO NOT SHOW USER STATS
		// $('.beginner-start-count').html(userStats.beginnerStartCount);
		// $('.beginner-win-count').html(userStats.beginnerWinCount);
		// $('.normal-start-count').html(userStats.normalStartCount);
		// $('.normal-win-count').html(userStats.normalWinCount);
		// $('.hellish-start-count').html(userStats.hellishStartCount);
		// $('.hellish-win-count').html(userStats.hellishWinCount);

		// userStats.hellishWinnerNames.forEach(function (name) {
		// 	$('.hellish-winners').append('<li>' + name + '</li>');
		// });
	  }
	});
}