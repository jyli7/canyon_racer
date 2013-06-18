var Canyon = function (level, game) {
	this.level = level;
	this.game = game;
	this.length = this.level.length;
	this.zIndex = 0;
};

Canyon.prototype.draw = function (ctx) {
	if (this.game.currentLevelNum === 3) {
		ctx.fillStyle = "rgb(125, 123, 123)";
	} else {
		ctx.fillStyle = "rgb(86, 57, 29)";
	}
	
	ctx.fillRect(0, -this.length, canvas.width, canvas.height + this.length);
};

Canyon.prototype.update = function () {};