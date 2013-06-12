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

	exports.entireShipInAnyZones = function (game, zones) {
		var result = true;
		game.ship.points().forEach(function (point) {
			if (!inAnyOfZones(point, zones)) {
				result = false;
			}
		});
		return result;
	}

	exports.shipPointInAnyZones = function (game, zones) {
		var result = false;
		game.ship.points().forEach(function (point) {
			if (inAnyOfZones(point, zones)) {
				result = true;
			}
		});
		return result;
	}

	exports.shipInASafeZone = function (game) {
		return this.entireShipInAnyZones(game, game.safeZones);
	}

	exports.shipInAPillar = function (game) {
		return this.shipPointInAnyZones(game, game.pillars);
	}

	exports.shipBeyondVictoryLine = function (game) {
		return (game.ship.y <= game.victoryZone.yBottom);
	}

})(this);