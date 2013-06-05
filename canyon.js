var Canyon = function () {
	this.length = 500;
};

Canyon.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(0, -this.length, canvas.width, canvas.height + this.length);
};

Canyon.prototype.update = function () {};
