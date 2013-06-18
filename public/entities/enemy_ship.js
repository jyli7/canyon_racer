var EnemyShip = function (level, game, xLeft, yTop) {
	this.level = level;
	this.game = game;
	this.height = 10;
	this.width = 10;

	this.baseYSpeed = 300 + volatilityFactor(50);
	this.baseXSpeed = 75 + volatilityFactor(50);

	// TODO: Refactor this backward speed business
	this.backwardSpeed = 175;

	this.targetYError = 20 + volatilityFactor(20);
	this.targetXError = 20 + volatilityFactor(20);

	this.xLeft = xLeft;
	this.xRight = this.xLeft + this.width;
	this.yTop = yTop;
	this.yBottom = this.yTop + this.height;

	this.findTargetTicker = 0;

	this.intelligence = 20 + volatilityFactor(10);
	
	this.zIndex = 1;
};

EnemyShip.prototype.points = function () {
	return [{x: this.xLeft, y: this.yBottom},
			{x: this.xRight, y: this.yBottom},
			{x: this.xLeft, y: this.yTop},
			{x: this.xRight, y: this.yTop}];
}

EnemyShip.prototype.draw = function (ctx) {
	// Draw only those GateWalls that are in advance of the ship
	var threshold = -1 * this.game.translatedDistance;
	var bottomLine = threshold + canvas.height * 1.2;
	var topLine = threshold - canvas.height * 1.2;

	if (this.yTop < bottomLine && this.yTop > topLine ) {
		ctx.fillStyle = "rgb(222, 4, 4)";
		ctx.fillRect(this.xLeft, this.yTop, this.width, this.height);
	}
};

EnemyShip.prototype.update = function (elapsedTime) {
	if (elapsedTime && this.game.currentState === 'countdown' || 
		this.game.currentState === 'playing' || 
		(this.game.currentState === 'gameOver' && !this.crashed)) {
		
		if (this.inAGateWall()) {
			// Destroy this ship
			var index = this.level.entities.indexOf(this);
			this.level.entities.splice(index, 1);
			var that = this;

		// TODO: Eliminate need for yTop, yBottom
		} else {
			if (this.findTargetTicker % this.intelligence === 0) {
				this.yTop = this.yTop + -1 * this.baseYSpeed * elapsedTime;
				this.yBottom = this.yBottom + -1 * this.baseYSpeed * elapsedTime;
				this.xLeft = this.xLeft + volatilityFactor(1) * this.baseXSpeed * elapsedTime;
				this.xRight = this.xRight + volatilityFactor(1) * this.baseXSpeed * elapsedTime;
			} else {
				var targetY = this.level.ship.yTop + this.targetYError;
				var targetX = this.level.ship.xMid + this.targetXError;
				var xDirection = (this.level.ship.xMid - this.xLeft) > 0 ? 1 : -1;
				var yDirection = (this.level.ship.yTop - this.yTop) > 0 ? 1 : -1;

				this.yTop = this.yTop + -1 * this.baseYSpeed * elapsedTime;
				this.yBottom = this.yBottom + -1 * this.baseYSpeed * elapsedTime;


				// Enemy ship is above the target
				if (yDirection > 0) {
					this.yTop += this.backwardSpeed * elapsedTime;
					this.yBottom += this.backwardSpeed * elapsedTime;
				}

				this.xLeft = this.xLeft + xDirection * this.baseXSpeed * elapsedTime;
				this.xRight = this.xRight + xDirection * this.baseXSpeed * elapsedTime;	
			}
			this.findTargetTicker += 1;
			
		}
		
	}
};

// TO DO: GET RID OF THIS, I.E. REFACTOR INTO A MIXIN
EnemyShip.prototype.entirelyInAnyZones = function (zones) {
	var result = true;
	this.points().forEach(function (point) {
		if (!inAnyOfZones(point, zones)) {
			result = false;
		}
	});
	return result;
}	

EnemyShip.prototype.vertexInAnyZones = function (zones) {
	var result = false;
	this.points().forEach(function (point) {
		if (inAnyOfZones(point, zones)) {
			result = true;
		}
	});
	return result;
}

EnemyShip.prototype.inASafeZone = function () {
	return this.entirelyInAnyZones(this.level.safeZones);
}

EnemyShip.prototype.inAPillar = function () {
	return this.vertexInAnyZones(this.level.pillars);
}

EnemyShip.prototype.inAGateWall = function () {
	return this.vertexInAnyZones(this.level.gateWalls);
}

EnemyShip.prototype.beyondVictoryLine = function () {
	return (this.y <= this.level.victoryZone.yBottom);
}