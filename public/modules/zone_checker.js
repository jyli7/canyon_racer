(function (exports) {

	/////////////////////////////////////////
	// HOW POINTS AND ZONES WORK
	/////////////////////////////////////////
	
	// POINTS have an 'x' and a 'y' attribute
	// targetZones have four attributes: yBottom, yTop, xLeft, and xRight
	// SOURCE_ZONES have 3 or 4 POINTS, depending on whether the SOURCE_ZONE is a triangle or rectangle
	
	// Examples of valid questions:
	// Is a POINT in the TARGET_ZONE?
	// Is an SOURCE_ZONE fully in the TARGET_ZONE?

	exports.pointInTargetZone = function (point, targetZone) {
		return ((point.y >= targetZone.yTop && point.y <= targetZone.yBottom) &&
					 	(point.x >= targetZone.xLeft && point.x <= targetZone.xRight));
	}

	exports.pointInAnyOfTargetZones = function (point, targetZones) {
		var result = false;
		targetZones.forEach(function (targetZone) {
			if (pointInTargetZone(point, targetZone)) {
				result = true;
			};
		});
		return result;
	}

	exports.targetZoneVertexInSourceZone = function (sourceZone, targetZone) {
		var result = false;
		targetZone.points().forEach(function (point) {
			if (pointInTargetZone(point, sourceZone)) {
				result = true;
			}
		});
		return result;
	}

	exports.anyTargetZoneVertexInSourceZone = function (sourceZone, targetZones) {
		var result = false;
		targetZones.forEach(function (targetZone) {
			if (targetZoneVertexInSourceZone(sourceZone, targetZone)) {
				result = true;
			}
		});
		return result;
	}

	exports.bulletVertexInAsteroid = function (asteroid, bullets) {
		if (bullets) {
			return anyTargetZoneVertexInSourceZone(asteroid, bullets);	
		}
	}

	exports.sourceZoneEntirelyInAnyTargetZone = function (sourceZone, targetZones) {
		var result = true;
		sourceZone.points().forEach(function (point) {
			if (!pointInAnyOfTargetZones(point, targetZones)) {
				result = false;
			}
		});
		return result;
	}	

	exports.sourceZoneVertexInAnyTargetZones = function (sourceZone, targetZones) {
		var result = false;
		sourceZone.points().forEach(function (point) {
			if (pointInAnyOfTargetZones(point, targetZones)) {
				result = true;
			}
		});
		return result;
	}

	exports.sourceZoneInSafeZone = function (sourceZone) {
		return sourceZoneEntirelyInAnyTargetZone(sourceZone, sourceZone.level.safeZones);
	}

	exports.sourceZoneVertexTouchPillar = function (sourceZone) {
		return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.pillars);
	}

	exports.sourceZoneVertexTouchGateWall = function (sourceZone) {
		if (sourceZone.level.gateWalls) {
			return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.gateWalls);	
		}
	}

	exports.sourceZoneVertexTouchBullet = function (sourceZone) {
		if (sourceZone.level.bullets) {
			return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.bullets);
		}
	}

	exports.sourceZoneVertexTouchEnemyShip = function (sourceZone) {
		if (sourceZone.level.enemyShips) {
			return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.enemyShips);	
		}
	}

	exports.sourceZoneVertexTouchAsteroid = function (sourceZone) {
		if (sourceZone.level.asteroids) {
			return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.asteroids);
		}
	}

	exports.sourceZoneBeyondVictoryLine = function (sourceZone) {
		return (sourceZone.yTop <= sourceZone.level.victoryZone.yBottom);
	}

})(this);