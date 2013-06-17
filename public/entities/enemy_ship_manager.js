var EnemyShipManager = function (level, game) {
	this.level = level;
	this.game = game;
};

EnemyShipManager.prototype.init = function (ctx) {
	this.level.enemyShips = this.level.enemyShips || [];
	this.level.enemyShips.push(new EnemyShip(this.level, this.game, this.level.ship.x - 100, this.level.ship.y + 200));
}

EnemyShipManager.prototype.update = function (ctx) {
	if (Math.round(this.level.ship.y) % 250 === 0) {
		this.level.entities.push(new EnemyShip(this.level, this.game, this.level.ship.x - 100, this.level.ship.y + 100));
	}
}

EnemyShipManager.prototype.draw = function () {}