var Canyon = function () {};

Canyon.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(0, -500, canvas.width, canvas.height + 500);
};

Canyon.prototype.update = function () {};
