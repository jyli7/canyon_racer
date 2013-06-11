// Turn this into a simple object, put inside module

var SafeZoneManager = function (game) {
	// TOASK: should I have all this stuff up here?
	this.game = game;
	this.currentPhase = 0;
	
	this.baseWidth = canvas.width;
	this.baseHeight = canvas.height * 0.5;
	this.baseX = 0;
	this.baseY = canvas.height - this.baseHeight;

	this.maxWidth = this.game.ship.width * 4;
	this.minWidth = this.game.ship.width * 2;
	this.minimumX = 25;
	this.maximumX = canvas.width - 25;

	this.meanWidth = (this.maxWidth + this.minWidth) / 2;
	this.meanHeight = canvas.height * 0.2;
	this.meanX = canvas.width * 0.5 - this.meanWidth * 0.5;

	this.initialXVolatilityBound = 45;
	this.widthVolatilityBound = this.meanWidth * 0.1;
	// this.heightVolatilityBound = this.meanHeight * 0.1;

	this.phaseSettings = {
		0: {
			xVolatilityBound: this.initialXVolatilityBound
		, maxWidth: this.maxWidth
		, meanWidth: this.meanWidth
		}

	, 1: {
			xVolatilityBound: this.initialXVolatilityBound * 1.2
		, maxWidth: this.maxWidth
		, meanWidth: this.meanWidth
		}

	, 2: {
			xVolatilityBound: this.initialXVolatilityBound * 1.4
		, maxWidth: this.maxWidth
		, meanWidth: this.meanWidth
		}
	}

};

SafeZoneManager.prototype.initBaseZone = function (ctx) {
	this.game.safeZones = this.game.safeZones || [];
	this.game.safeZones.push(new SafeZone(this.game, this.baseX, this.baseY, this.baseWidth, this.baseHeight));
}

SafeZoneManager.prototype.getPhase = function (y) {
	// If we've traversed 7/10 of the canyon, we're in phase 2
	if (y <= -this.game.canyon.length * 0.7) {
		return 2;
	// If we've traversed between 5/10 and 7/10 of canyon, we're in phase 1
	} else if (y <= -this.game.canyon.length * 0.5) {
		return 1;
	// If we've traversed less than 5/10 of the canyon, we're in phase 0
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
		var phaseSettings = this.phaseSettings[phase];

		// Tweak the x, width, and height values each time through the loop
		// (TOASK: move this elsewhere?)
		x += volatilityFactor(phaseSettings.xVolatilityBound);
		width += volatilityFactor(this.widthVolatilityBound);

		// Ad hoc fixes (TOASK: move this elsewhere?)
		if (x <= this.minimumX) { x += 50; }
		if (x >= this.maximumX) { x -= 50; }
		if (width <= this.minWidth || width >= phaseSettings.maxWidth) { 
			width = phaseSettings.meanWidth
		};

		// Don't let the canyon be too much a straight shot
		this.game.safeZones.push(new SafeZone(this.game, x, y, width, height));
	}
}

SafeZoneManager.prototype.init = function (ctx) {
	this.initBaseZone(ctx);
	this.initAllOtherZones(ctx);
}