var EnemyShip = function (level, game, xLeft, yTop) {
	this.level = level;
	this.game = game;
	this.height = 10;
	this.width = 10;

	this.baseYSpeed = 300;
	this.baseXSpeed = 150;

	this.xLeft = xLeft;
	this.xRight = this.xLeft + this.width;
	this.yTop = yTop;
	this.yBottom = this.yTop + this.height;
	
	this.zIndex = 1;
};

EnemyShip.prototype.points = function () {
	return [{x: this.xLeft, y: this.yBottom},
			{x: this.xRight, y: this.yBottom},
			{x: this.xLeft, y: this.yTop},
			{x: this.xRight, y: this.yTop}];
}

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

EnemyShip.prototype.update = function (elapsedTime) {
	if (elapsedTime && this.game.currentState === 'countdown' || 
		this.game.currentState === 'playing' || 
		(this.game.currentState === 'gameOver' && !this.crashed)) {
		
		var targetY = this.level.ship.y;
		var targetX = this.level.ship.x;
		var xDirection = (this.level.ship.x - this.xLeft) > 0 ? 1 : -1;
		var yDirection = (this.level.ship.y - this.yTop) > 0 ? 1 : -1;

		this.yTop = this.yTop + yDirection * this.baseYSpeed * elapsedTime;
		this.xLeft = this.xLeft + xDirection * this.baseXSpeed * elapsedTime
	}
};