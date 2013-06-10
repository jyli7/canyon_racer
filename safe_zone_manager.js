var SafeZoneManager = function (game) {
	this.game = game;
};

SafeZoneManager.prototype.init = function (ctx) {
	this.game.safeZones = [];
	
	// For the base safe zone
	var baseWidth = canvas.width;
	var baseHeight = canvas.height / 2;
	var baseX = 0;
	var baseY = canvas.height - baseHeight;
	
	// Create base safeZone
	this.game.safeZones.push(new SafeZone(this.game, baseX, baseY, baseWidth, baseHeight));

	// For the other safe zones
	var standardWidth = this.game.ship.width * 3;
	var standardHeight = canvas.height / 6;
	var standardX = canvas.width / 2 - standardWidth / 2.

	// Starting from the top of the baseSafeZone, create other safeZones
	var x = standardX;
	var width = standardWidth;
	var height = standardHeight;

	// Minima and maxima
	var minimumWidth = this.game.ship.width * 2;
	var maximumWidth = this.game.ship.width * 6;
	var minimumX = 0;
	var maximumX = canvas.width - maximumWidth;

	xVolatility = 0.08;
	yVolatility = 0.05;
	widthVolatility = 0.03;
	heightVolatility = 0.02;

	var phaseOneReached = false;
	var phaseTwoReached = false;

	// Set the x, y, width, height for lots of safeZones, add them to the SafeZone queue
	for (var y = baseY; y >= -this.game.canyon.length; y -= 3) {
		if (y <= -this.game.canyon.length * 0.5 && !phaseTwoReached) { 
			maximumWidth *= 0.8;
			standardWidth *= 0.8;
			xVolatility *= 1.2;
			phaseTwoReached = true;
		} else if (y <= -this.game.canyon.length * 0.3 && !phaseOneReached) {
			maximumWidth = maximumWidth * 0.9;
			standardWidth = standardWidth * 0.9;
			xVolatility *= 1.4;
			phaseOneReached = true;
		}

		// Ad hoc fixes
		if (x <= minimumX) { x += 50; }
		if (x >= maximumX) { x -= 50; }
		if (width <= minimumWidth || width >= maximumWidth) { width = standardWidth };

		x = x * volatilityMultiple(xVolatility);
		width = width * volatilityMultiple(widthVolatility);
		height = height * volatilityMultiple(heightVolatility);
		this.game.safeZones.push(new SafeZone(this.game, x, y, width, height));
	}
}