var EnemyShipManager = function (level, game) {
	this.level = level;
	this.game = game;
	this.baseYSpeed = 300;
	this.baseXSpeed = 100;
	this.distanceBetweenShipBatches = 75;
};

EnemyShipManager.prototype.init = function (ctx) {
	this.level.enemyShips = this.level.enemyShips || [];
};

EnemyShipManager.prototype.update = function (ctx) {
	if (this.game.currentState === 'playing' && Math.round(this.level.ship.yTop) % this.distanceBetweenShipBatches === 0) {
		var possibleStartingPositions = [[-10, this.level.ship.yTop + 50]
									   , [this.level.ship.xMid, this.level.ship.yTop + 200]
									   , [canvas.width + 10, this.level.ship.yTop + 50]];

		var newShips = [];
		for (var i = 0; i < 2; i++) {
			var startingPosition = possibleStartingPositions[Math.floor(Math.random() * possibleStartingPositions.length)];
			newShips.push(new EnemyShip(this.level, this.game, startingPosition[0], startingPosition[1]));
		}
		this.level.enemyShips = this.level.enemyShips.concat(newShips);
		this.level.entities = this.level.entities.concat(newShips);
	}
};

EnemyShipManager.prototype.draw = function () {};