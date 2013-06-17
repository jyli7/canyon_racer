(function (exports) {

	// TODO: Refactor so this is not redundant
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

})(this);