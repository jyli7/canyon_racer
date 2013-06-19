var Level = function (game, num) {

	// LEVEL 1
	if (num === 1) {
		this.length = 6000;
		this.warmUpLength = 1300;
		this.ship = new Ship(this, game);
		this.canyon = new Canyon(this, game);
		this.victoryZone = new VictoryZone(this, game, -1 * (this.length + canvas.height * 0.4));
		this.safeZoneManager = new SafeZoneManager(this, game);
		this.safeZoneManager.init(game.ctx);
		this.pillarManager = new PillarManager(this, game);
		this.pillarManager.init(game.ctx);

		this.entities = [this.canyon, this.victoryZone, this.ship].concat(this.safeZones).concat(this.pillars);

	// LEVEL 2
	} else if (num === 2) {
		this.length = 8000;
		this.warmUpLength = 1300;
		this.ship = new Ship(this, game);
		this.victoryZone = new VictoryZone(this, game, -1 * (this.length + canvas.height * 0.4));
		this.gateWallManager = new GateWallManager(this, game);
		this.gateWallManager.init(game.ctx);
		this.enemyShipManager = new EnemyShipManager(this, game);
		this.enemyShipManager.init(game.ctx);

		this.entities = [this.ship, this.enemyShipManager].concat(this.gateWalls).concat(this.enemyShips);

	// LEVEL 3
	} else if (num === 3) {
		this.length = 8000;
		this.warmUpLength = 1300;
		this.ship = new Ship(this, game);
		this.victoryZone = new VictoryZone(this, game, -1 * (this.length + canvas.height * 0.4));
		this.asteroidManager = new AsteroidManager(this, game);
		this.asteroidManager.init(game.ctx);
		this.entities = [this.victoryZone, this.ship].concat(this.asteroids);
	}

	this.entities.sort(function (a, b) {
		return a.zIndex - b.zIndex;
	});
}

Level.prototype.removeObj = function (obj, type) {
	var eIndex = this.entities.indexOf(obj);
	this.entities.splice(eIndex, 1);

	var oIndex = this[type].indexOf(obj);
	this[type].splice(oIndex, 1);
}

Level.prototype.addObj = function (obj, type) {
	this[type] = this[type] || [];
	this[type] = this[type].concat(obj);

	this.entities = this.entities || [];
	this.entities = this.entities.concat(obj);
}