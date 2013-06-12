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

var playSound = function (file) {
	var snd = new Audio("sounds/" + file); // buffers automatically when created
	snd.play();
	snd.loop = true;
}
