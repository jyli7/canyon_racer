var VictoryZone = function (level, game, yTop) {
	this.level = level;
	this.game = game;
	this.width = canvas.width;
	this.height = canvas.height;
	this.xLeft = 0;
	this.xRight = this.xLeft + this.width;
	this.yTop = yTop;
	this.yBottom = yTop + this.height;
	this.zIndex = 2;
}

VictoryZone.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, this.yTop, this.width, this.height);
}

VictoryZone.prototype.update = function () {};
