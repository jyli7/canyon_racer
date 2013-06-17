var EnemyShipManager = function (level, game) {
	this.level = level;
	this.game = game;
};

EnemyShipManager.prototype.init = function (ctx) {
	this.level.enemyShips = this.level.enemyShips || [];
	this.level.enemyShips.push(new EnemyShip(this.level, this.game, this.level.ship.x - 100, this.level.ship.y + 100));
}

