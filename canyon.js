// Ship constructor
var Canyon = function () {
}

Canyon.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(0, -1000, canvas.width, canvas.height + 1000);
}

Canyon.prototype.update = function () {};
