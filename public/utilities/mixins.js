var mixins = {
	zone: {
		shape: RECTANGLE
	, xLeft: 0
	, xRight: 0
	, yBottom: 0
	, yTop: 0
	, xMid: 0
	, width: 0
	, height: 0
	, points: function () {
			if (this.shape === RECTANGLE) {
				return [{x: this.xLeft, y: this.yBottom},
								{x: this.xRight, y: this.yBottom},
								{x: this.xLeft, y: this.yTop},
								{x: this.xRight, y: this.yTop}];
			} else if (this.shape === TRIANGLE) {
				return [{x: this.bottomLeftX(), y: this.bottomLeftY()},
								{x: this.bottomRightX(), y: this.bottomRightY()},
								{x: this.xMid, y: this.yTop}];
			}
		}

	// These functions are only for triangles
	, bottomLeftX: function () {
			return this.xMid - (this.width / 2);
		}

	, bottomLeftY: function () {
			return this.yTop + this.height;
		}

	, bottomRightX: function () {
			return this.xMid + (this.width / 2);
		}

	, bottomRightY: function () {
			return this.yTop + this.height;
		}

	}
}