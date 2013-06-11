var PillarManager = function (game) {
	this.game = game;	
	this.safeZonesPerPillar = 40;
};

PillarManager.prototype.init = function (ctx) {
	this.game.pillars = this.game.pillars || [];

	// Starting values
	
	var safeZones = this.game.safeZones;
	var counter = 0;

	for (var i = 0; i < safeZones.length; i++) {
		if (counter % this.safeZonesPerPillar === 0) {
			var safeZone = safeZones[i];
			var x = safeZone.xLeft;
			var y = safeZone.yTop;

			this.game.pillars.push(new Pillar(this.game, x, y));
		}
		
		counter ++;
	}
}
