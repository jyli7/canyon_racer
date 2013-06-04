(function (exports) {
	exports.UserInput = function () {
		// Handle keyboard controls
		var keysHeldDown = {};

		// Setup keyup, keydown listeners
		addEventListener("keydown", function (e) {
			keysHeldDown[e.keyCode] = true;
		}, false);

		addEventListener("keyup", function (e) {
			delete keysHeldDown[e.keyCode];
		}, false);

		this.keyPressed = function (key) {
			return key in keysHeldDown;
		};
	}

})(this);