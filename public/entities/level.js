var Level = function (game, num) {
	if (num === 1) {
		this.ship = new Ship(this, game);
		this.canyon = new Canyon(this, game);
		this.victoryZone = new VictoryZone(this, game, -1 * (this.canyon.length + canvas.height * 0.4));
		this.safeZoneManager = new SafeZoneManager(this, game);
		this.safeZoneManager.init(game.ctx);
		this.pillarManager = new PillarManager(this, game);
		this.pillarManager.init(game.ctx);

		this.entities = [this.canyon, this.victoryZone, this.ship].concat(this.safeZones).concat(this.pillars);
		this.entities.sort(function (a, b) {
			return a.zIndex - b.zIndex;
		});
	} else if (num === 2) {
		console.log('eay');
		this.ship = new Ship(this, game);
		// this.canyon = new Canyon(this, game);
		// this.victoryZone = new VictoryZone(this, game, -1 * (this.canyon.length + canvas.height * 0.4));
		// this.safeZoneManager = new SafeZoneManager(this, game);
		// this.safeZoneManager.init(game.ctx);
		// this.pillarManager = new PillarManager(this, game);
		// this.pillarManager.init(game.ctx);
		this.entities = [this.ship];
		// this.entities = [this.canyon, this.victoryZone, this.ship].concat(this.safeZones).concat(this.pillars);
		// this.entities.sort(function (a, b) {
		// 	return a.zIndex - b.zIndex;
		// });
	}
}