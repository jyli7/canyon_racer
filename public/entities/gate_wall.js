var GateWall = function (level, game, xStart, xEnd, y) {
	this.level = level;
	this.game = game;
	this.xLeft = xStart;
	this.xRight = xEnd;
	this.yBottom = y;
	this.yTop = this.yBottom - 5;
	
	this.height = 5;
	this.width = this.xRight - this.xLeft;
	this.zIndex = 0;
};

GateWall.prototype.draw = function (ctx) {
	// Draw only those GateWalls that are in advance of the ship
	var threshold = -1 * this.game.translatedDistance;
	var bottomLine = threshold + canvas.height * 1.2;
	var topLine = threshold - canvas.height * 1.2;

	if (this.yTop < bottomLine && this.yTop > topLine ) {
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fillRect(this.xLeft, this.yTop, this.width, this.height);
	}
};

GateWall.prototype.update = function () {};