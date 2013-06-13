var PillarManager = function (level, game) {
	this.level = level;
	this.game = game;
	this.avgSafeZonesPerPillar = 50;
};

PillarManager.prototype.init = function (ctx) {
	this.level.pillars = this.level.pillars || [];

	// Starting values	
	var safeZones = this.level.safeZones;
	var counter = 0;
	var safeZonesPerPillar = this.avgSafeZonesPerPillar;
	for (var i = 0; i < safeZones.length; i++) {
		if (counter >= safeZonesPerPillar) {
			var safeZone = safeZones[i];
			var x = safeZone.xLeft;
			var y = safeZone.yTop;

			this.level.pillars.push(new Pillar(this.level, this.game, x, y));
			counter = 0;
			safeZonesPerPillar = this.avgSafeZonesPerPillar + volatilityFactor(30);
		}
		counter ++;
	}
}
