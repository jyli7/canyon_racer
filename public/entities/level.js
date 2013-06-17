var Level = function (game, num) {
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
		this.entities.sort(function (a, b) {
			return a.zIndex - b.zIndex;
		});
	} else if (num === 2) {
		this.length = 6000;
		this.warmUpLength = 1300;
		this.ship = new Ship(this, game);
		this.victoryZone = new VictoryZone(this, game, -1 * (this.length + canvas.height * 0.4));
		this.gateWallManager = new GateWallManager(this, game);
		this.gateWallManager.init(game.ctx);
		debugger;

		// this.safeZoneManager = new SafeZoneManager(this, game);
		// this.safeZoneManager.init(game.ctx);
		// this.pillarManager = new PillarManager(this, game);
		// this.pillarManager.init(game.ctx);
		this.entities = [this.ship].concat(this.gateWalls);
		// this.entities = [this.canyon, this.victoryZone, this.ship].concat(this.safeZones).concat(this.pillars);
		this.entities.sort(function (a, b) {
			return a.zIndex - b.zIndex;
		});
	}
}