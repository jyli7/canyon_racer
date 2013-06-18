var Level = function (game, num) {

	// LEVEL 1
	if (num === 1) {
		this.length = 2000;
		this.warmUpLength = 1300;
		this.ship = new Ship(this, game);
		this.canyon = new Canyon(this, game);
		this.victoryZone = new VictoryZone(this, game, -1 * (this.length + canvas.height * 0.4));
		this.safeZoneManager = new SafeZoneManager(this, game);
		this.safeZoneManager.init(game.ctx);
		this.pillarManager = new PillarManager(this, game);
		this.pillarManager.init(game.ctx);

		this.entities = [this.canyon, this.victoryZone, this.ship].concat(this.safeZones).concat(this.pillars);
		this.entities.sort(function (a, b) {
			return a.zIndex - b.zIndex;
		});

	// LEVEL 2
	} else if (num === 2) {
		this.length = 3000;
		this.warmUpLength = 1300;
		this.ship = new Ship(this, game);
		this.victoryZone = new VictoryZone(this, game, -1 * (this.length + canvas.height * 0.4));
		this.gateWallManager = new GateWallManager(this, game);
		this.gateWallManager.init(game.ctx);
		this.enemyShipManager = new EnemyShipManager(this, game);
		this.enemyShipManager.init(game.ctx);

		this.entities = [this.ship, this.enemyShipManager].concat(this.gateWalls).concat(this.enemyShips);
		this.entities.sort(function (a, b) {
			return a.zIndex - b.zIndex;
		});
	}
}