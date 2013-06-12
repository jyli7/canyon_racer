var PillarManager = function (game) {
	this.game = game;	
	this.avgSafeZonesPerPillar = 50;
};

PillarManager.prototype.init = function (ctx) {
	this.game.pillars = this.game.pillars || [];

	// Starting values	
	var safeZones = this.game.safeZones;
	var counter = 0;
	var safeZonesPerPillar = this.avgSafeZonesPerPillar;
	for (var i = 0; i < safeZones.length; i++) {
		if (counter >= safeZonesPerPillar) {
			var safeZone = safeZones[i];
			var x = safeZone.xLeft;
			var y = safeZone.yTop;

			this.game.pillars.push(new Pillar(this.game, x, y));
			counter = 0;
			safeZonesPerPillar = this.avgSafeZonesPerPillar + volatilityFactor(30);
		}
		counter ++;
	}
}
