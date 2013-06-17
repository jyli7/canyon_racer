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
	if (this.game.currentState === 'playing' && Math.round(this.level.ship.y) % 150 === 0) {
		var possibleStartingPositions = [[-10, this.level.ship.y + 50]
									   , [this.level.ship.x, this.level.ship.y + 200]
									   , [canvas.width + 10, this.level.ship.y + 50]];

		var newShips = [];
		for (var i = 0; i < 3; i++) {
			var startingPosition = possibleStartingPositions[Math.floor(Math.random() * possibleStartingPositions.length)];
			newShips.push(new EnemyShip(this.level, this.game, startingPosition[0], startingPosition[1]));
		}
		this.level.enemyShips = this.level.enemyShips.concat(newShips);
		this.level.entities = this.level.entities.concat(newShips);
	}
};

EnemyShipManager.prototype.draw = function () {};