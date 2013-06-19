var SafeZoneManager = function (level, game) {
	this.level = level;
	this.game = game;
	this.currentPhase = 0;

	this.warmUpWidth = canvas.width*0.9;
	this.warmUpHeight = canvas.height * 0.5;
	this.warmUpX = canvas.width * 0.05;

	if (game.difficulty === 1) {
		this.maxWidth = this.level.ship.width * 8;
		this.minWidth = this.level.ship.width * 4;

	} else if (game.difficulty === 2) {
		this.maxWidth = this.level.ship.width * 6;
		this.minWidth = this.level.ship.width * 3;

	} else if (game.difficulty === 3) {
		this.maxWidth = this.level.ship.width * 3;
		this.minWidth = this.level.ship.width * 1.95;
		this.initialXVolatilityBound = 40;
	}

	this.minimumX = 0;
	this.maximumX = canvas.width - this.maxWidth;

	this.meanWidth = (this.maxWidth + this.minWidth) / 2;
	this.meanHeight = canvas.height * 0.2;
	this.meanX = canvas.width * 0.5 - this.meanWidth * 0.5;

	this.initialXVolatilityBound = 40;
	this.widthVolatilityBound = this.meanWidth * 0.1;

	this.phaseSettings = {
		0: {
			xVolatilityBound: this.initialXVolatilityBound
		, maxWidth: this.maxWidth
		, meanWidth: this.meanWidth
		}

	, 1: {
			xVolatilityBound: this.initialXVolatilityBound * 1.17
		, maxWidth: this.maxWidth
		, meanWidth: this.meanWidth
		}

	, 2: {
			xVolatilityBound: this.initialXVolatilityBound * 1.2
		, maxWidth: this.maxWidth
		, meanWidth: this.meanWidth
		}
	}

};

SafeZoneManager.prototype.initWarmUpZones = function (ctx) {
	this.level.safeZones = this.level.safeZones || [];
	for (var y = canvas.height; y >= -this.level.warmUpLength * 1.02; y -= this.warmUpHeight*.99) {
		this.level.safeZones.push(new SafeZone(this.level, this.game, this.warmUpX, y, this.warmUpWidth, this.warmUpHeight));	
	}
}

SafeZoneManager.prototype.getPhase = function (y) {
	// If we've traversed 7/10 of the canyon, we're in phase 2
	if (y <= -this.level.canyon.length * 0.7) {
		return 2;
	// If we've traversed between 5/10 and 7/10 of canyon, we're in phase 1
	} else if (y <= -this.level.canyon.length * 0.5) {
		return 1;
	// If we've traversed less than 5/10 of the canyon, we're in phase 0
	} else if (y <= canvas.height) {
		return 0;
	}
}

SafeZoneManager.prototype.initAllOtherZones = function (ctx) {
	this.level.safeZones = this.level.safeZones || [];

	// Starting values
	var x = this.meanX;
	var width = this.meanWidth;
	var height = this.meanHeight;

	// Set the x, y, width, height for lots of safeZones, add them to the SafeZone array
	for (var y = -this.level.warmUpLength * 0.95; y >= this.level.victoryZone.yBottom * 1.01; y -= 4) {
		var phase = this.getPhase(y);
		var phaseSettings = this.phaseSettings[phase];

		// Tweak the x, width, and height values each time through the loop
		x += volatilityFactor(phaseSettings.xVolatilityBound);
		width += volatilityFactor(this.widthVolatilityBound);

		if (x <= this.minimumX) { x += 50; }
		if (x >= this.maximumX) { x -= 50; }
		if (width <= this.minWidth || width >= phaseSettings.maxWidth) { 
			width = phaseSettings.meanWidth
		};

		// Don't let the canyon be too much a straight shot
		this.level.safeZones.push(new SafeZone(this.level, this.game, x, y, width, height));
	}
}

SafeZoneManager.prototype.init = function (ctx) {
	this.initWarmUpZones(ctx);
	this.initAllOtherZones(ctx);
}