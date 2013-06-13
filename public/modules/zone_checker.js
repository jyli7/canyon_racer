(function (exports) {

	exports.inZone = function (point, zone) {
		return ((point.y >= zone.yTop && point.y <= zone.yBottom) &&
					 	(point.x >= zone.xLeft && point.x <= zone.xRight));
	}

	exports.inAnyOfZones = function (point, zones) {
		var result = false;
		zones.forEach(function (zone) {
			if (inZone(point, zone)) {
				result = true;
			};
		});
		return result;
	}

	exports.entireShipInAnyZones = function (level, zones) {
		var result = true;
		level.ship.points().forEach(function (point) {
			if (!inAnyOfZones(point, zones)) {
				result = false;
			}
		});
		return result;
	}

	exports.shipVertexInAnyZones = function (level, zones) {
		var result = false;
		level.ship.points().forEach(function (point) {
			if (inAnyOfZones(point, zones)) {
				result = true;
			}
		});
		return result;
	}

	exports.shipInASafeZone = function (level) {
		return this.entireShipInAnyZones(level, level.safeZones);
	}

	exports.shipInAPillar = function (level) {
		return this.shipVertexInAnyZones(level, level.pillars);
	}

	exports.shipBeyondVictoryLine = function (level) {
		return (level.ship.y <= level.victoryZone.yBottom);
	}

})(this);