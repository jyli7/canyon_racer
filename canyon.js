// Ship constructor
var Canyon = function () {
}

Canyon.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

Canyon.prototype.update = function () {};
