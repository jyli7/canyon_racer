(function (exports) {

	/////////////////////////////////////////
	// HOW POINTS AND ZONES WORK
	/////////////////////////////////////////
	
	// POINTS have an 'x' and a 'y' attribute
	// TARGET_ZONES have four attributes: yBottom, yTop, xLeft, and xRight
	// SOURCE_ZONES have 3 or 4 POINTS, depending on whether the SOURCE_ZONE is a triangle or rectangle
	
	// Examples of valid questions:
	// Is a POINT in the TARGET_ZONE?
	// Is an SOURCE_ZONE fully in the TARGET_ZONE?

	exports.pointInTargetZone = function (point, target_zone) {
		return ((point.y >= target_zone.yTop && point.y <= target_zone.yBottom) &&
					 	(point.x >= target_zone.xLeft && point.x <= target_zone.xRight));
	}

	exports.pointInAnyOfTargetZones = function (point, target_zones) {
		var result = false;
		target_zones.forEach(function (target_zone) {
			if (pointInTargetZone(point, target_zone)) {
				result = true;
			};
		});
		return result;
	}

	exports.sourceZoneEntirelyInAnyTargetZone = function (sourceZone, target_zones) {
		var result = true;
		sourceZone.points().forEach(function (point) {
			if (!pointInAnyOfTargetZones(point, target_zones)) {
				result = false;
			}
		});
		return result;
	}	

	exports.sourceZoneVertexInAnyTargetZones = function (sourceZone, target_zones) {
		var result = false;
		sourceZone.points().forEach(function (point) {
			if (pointInAnyOfTargetZones(point, target_zones)) {
				result = true;
			}
		});
		return result;
	}

	exports.sourceZoneInSafeZone = function (sourceZone) {
		return sourceZoneEntirelyInAnyTargetZone(sourceZone, sourceZone.level.safeZones);
	}

	exports.sourceZoneInPillar = function (sourceZone) {
		return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.pillars);
	}

	exports.sourceZoneInGateWall = function (sourceZone) {
		return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.gateWalls);
	}

	exports.sourceZoneInEnemyShip = function (sourceZone) {
		return sourceZoneVertexInAnyTargetZones(sourceZone, sourceZone.level.enemyShips);
	}

	exports.sourceZoneBeyondVictoryLine = function (sourceZone) {
		return (sourceZone.yTop <= sourceZone.level.victoryZone.yBottom);
	}

})(this);