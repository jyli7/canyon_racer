var EnemyShipManager = function (level, game) {
	this.level = level;
	this.game = game;

	if (this.game.difficulty === 1) {
		this.distanceBetweenShipBatches = 100;
	} else if (this.game.difficulty === 2) {
		this.distanceBetweenShipBatches = 80;
	} else if (this.game.difficulty === 3) {
		this.distanceBetweenShipBatches = 50;
	}
	
};

EnemyShipManager.prototype.init = function (ctx) {
	this.level.enemyShips = this.level.enemyShips || [];
};

EnemyShipManager.prototype.update = function (ctx) {
	if (this.game.currentState === 'playing' && Math.round(this.level.ship.yTop) % this.distanceBetweenShipBatches === 0) {
		if (this.game.currentLevelNum === 2) {
			var possibleStartingPositions = [[-10, this.level.ship.yTop + 50]
									   , [this.level.ship.xMid, -this.game.translatedDistance + canvas.height + 100]
									   , [canvas.width + 10, this.level.ship.yTop + 50]];

			var newShips = [];
			for (var i = 0; i < 1; i++) {
				var startingPosition = possibleStartingPositions[Math.floor(Math.random() * possibleStartingPositions.length)];
				newShips.push(new EnemyShip(this.level, this.game, startingPosition[0], startingPosition[1]));
			}
			this.level.addObj(newShips, 'enemyShips');
		}
	}
};

EnemyShipManager.prototype.draw = function () {};