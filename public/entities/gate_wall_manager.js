var GateWallManager = function (level, game) {
	this.level = level;
	this.game = game;
	this.meanGapSize = this.level.ship.width * 4;
	this.meanX = canvas.width * 0.5 - this.meanGapSize * 0.5;
	this.meanYInterval = 600;
	this.xVolatility = 300;
	this.gapSizeVolatility = 10;

	this.minimumX = 0;
	this.maximumX = canvas.width - this.gapSize;
};

GateWallManager.prototype.init = function (ctx) {
	this.level.gateWalls = this.level.gateWalls || [];

	var x = this.meanX;
	var gapSize = this.meanGapSize;
	var yInterval = this.meanYInterval;

	for (var y = -this.level.warmUpLength * 0.95; y >= this.level.victoryZone.yBottom * 1.01; y-= this.meanYInterval) {
		x += volatilityFactor(this.xVolatility);
		gapSize += volatilityFactor(this.gapSizeVolatility);

		// Ad hoc fixes (TOASK: move this elsewhere?)
		if (x <= this.minimumX) { x += 50; }
		if (x >= this.maximumX) { x -= 50; }

		this.level.gateWalls.push(new GateWall(this.level, this.game, 0, x, y));
		this.level.gateWalls.push(new GateWall(this.level, this.game, x + gapSize, canvas.width, y));
	}
}