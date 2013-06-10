var SafeZoneManager = function (game) {
	this.game = game;
	this.currentPhase = 0;
	
	this.baseWidth = canvas.width;
	this.baseHeight = canvas.height / 2;
	this.baseX = 0;
	this.baseY = canvas.height - this.baseHeight;

	this.meanWidth = this.game.ship.width * 3;
	this.meanHeight = canvas.height / 6;
	this.meanX = canvas.width / 2 - this.meanWidth / 2;

	this.maxWidth = this.game.ship.width * 5;
	this.minWidth = this.game.ship.width * 2;

	this.minimumX = 0;
	this.maximumX = canvas.width - this.maxWidth;

	this.initialXVolatility = 0.10;
	this.initialYVolatility = 0.05;
	this.initialWidthVolatility = 0.03;
	this.initialHeightVolatility = 0.02;

	this.phaseSettings = {
		0: {
			xVolatility: this.initialXVolatility
		, maxWidth: this.maxWidth
		, meanWidth: this.meanWidth
		}

	, 1: {
			xVolatility: this.initialXVolatility * 1.2
		, maxWidth: this.maxWidth * 0.9
		, meanWidth: this.meanWidth * 0.9
		}

	, 2: {
			xVolatility: this.initialXVolatility * 1.4
		, maxWidth: this.maxWidth * 0.8
		, meanWidth: this.meanWidth * 0.8
		}
	}

};

SafeZoneManager.prototype.initBaseZone = function (ctx) {
	this.game.safeZones = this.game.safeZones || [];
	this.game.safeZones.push(new SafeZone(this.game, this.baseX, this.baseY, this.baseWidth, this.baseHeight));
}

SafeZoneManager.prototype.getPhase = function (y) {
	if (y <= -this.game.canyon.length * 0.7) {
		return 2;
	} else if (y <= -this.game.canyon.length * 0.5) {
		return 1;
	} else if (y <= this.baseY) {
		return 0;
	}
}

SafeZoneManager.prototype.initAllOtherZones = function (ctx) {
	this.game.safeZones = this.game.safeZones || [];

	// Starting values
	var x = this.meanX;
	var width = this.meanWidth;
	var height = this.meanHeight;

	// Set the x, y, width, height for lots of safeZones, add them to the SafeZone array
	for (var y = this.baseY; y >= -this.game.canyon.length; y -= 3) {
		var phase = this.getPhase(y);

		// Tweak the x, width, and height values each time through the loop
		x *= volatilityMultiple(this.phaseSettings[phase].xVolatility);
		width *= volatilityMultiple(this.initialWidthVolatility);
		height *= volatilityMultiple(this.initialHeightVolatility);

		// Ad hoc fixes
		if (x <= this.minimumX) { x += 50; }
		if (x >= this.maximumX) { x -= 50; }
		if (width <= this.minWidth || width >= this.phaseSettings[phase].maxWidth) { 
			width = this.phaseSettings[phase].meanWidth
		};

		this.game.safeZones.push(new SafeZone(this.game, x, y, width, height));
	}
}

SafeZoneManager.prototype.init = function (ctx) {
	this.initBaseZone(ctx);
	this.initAllOtherZones(ctx);
}