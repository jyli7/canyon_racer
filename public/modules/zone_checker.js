(function (exports) {
	exports.inSafeZone = function (game) {
		for (var i = 0; i < game.safeZones.length; i ++) {
			var zone = game.safeZones[i];
			if ((game.ship.y >= zone.yTop && game.ship.y <= zone.yBottom) &&
				((game.ship.x >= zone.xLeft && game.ship.x <= zone.xRight) ||
				(game.ship.getRight() >= zone.xLeft && game.ship.getRight() <= zone.xRight))) {
			  return true;
			}
		}
		return false;
	}

	exports.collidedWithPillar = function (game) {
		for (var i = 0; i < game.pillars.length; i ++) {
			var zone = game.pillars[i];
			if ((game.ship.y >= zone.yTop && game.ship.y <= zone.yBottom) &&
				((game.ship.x >= zone.xLeft && game.ship.x <= zone.xRight) ||
				(game.ship.getRight() >= zone.xLeft && game.ship.getRight() <= zone.xRight))) {
			  return true;
			}
		}
		return false;
	}

	exports.inVictoryZone = function (game) {
		if (game.ship.y <= game.victoryZone.yBottom) {
		  return true;	
		} else {
			return false;
		}
	}

})(this);