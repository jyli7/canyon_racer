var EnemyShip = function (level, game, xLeft, yTop) {
	this.level = level;
	this.game = game;
	this.height = 10;
	this.width = 10;

	this.xLeft = xLeft;
	this.xRight = this.xLeft + this.width;
	this.yTop = yTop;
	this.yBottom = this.yTop + this.height;
	
	this.zIndex = 1;
};

EnemyShip.prototype.draw = function (ctx) {
	// Draw only those GateWalls that are in advance of the ship
	var threshold = -1 * this.game.translatedDistance;
	var bottomLine = threshold + canvas.height * 1.2;
	var topLine = threshold - canvas.height * 1.2;

	if (this.yTop < bottomLine && this.yTop > topLine ) {
		ctx.fillStyle = "rgb(222, 4, 4)";
		ctx.fillRect(this.xLeft, this.yTop, this.width, this.height);
	}
};

EnemyShip.prototype.update = function () {};