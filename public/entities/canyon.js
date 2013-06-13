var Canyon = function (level, game) {
	this.level = level;
	this.game = game;
	this.length = 2000;
	this.warmUpLength = 1300;
	this.zIndex = 0;
};

Canyon.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(86, 57, 29)";
	ctx.fillRect(0, -this.length, canvas.width, canvas.height + this.length);
};

Canyon.prototype.update = function () {};