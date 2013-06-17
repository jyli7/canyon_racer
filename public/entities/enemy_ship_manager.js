var EnemyShipManager = function (level, game) {
	this.level = level;
	this.game = game;
	this.baseYSpeed = 300;
	this.baseXSpeed = 100;
};

EnemyShipManager.prototype.init = function (ctx) {
	this.level.enemyShips = this.level.enemyShips || [];
	this.level.enemyShips.push(new EnemyShip(this.level, this.game, this.level.ship.x, this.level.ship.y + 100));
};

EnemyShipManager.prototype.update = function (ctx) {
	if (Math.round(this.level.ship.y) % 200 === 0) {
		var possibleStartingPositions = [[-10, this.level.ship.y + 50]
									   , [this.level.ship.x, this.level.ship.y + 200]
									   , [canvas.width + 10, this.level.ship.y + 50]];

		for (var i = 0; i < 3; i++) {
			var startingPosition = possibleStartingPositions[Math.floor(Math.random() * possibleStartingPositions.length)];
			this.level.entities.push(new EnemyShip(this.level, this.game, startingPosition[0], startingPosition[1]));
		}
	}
};

EnemyShipManager.prototype.draw = function () {};