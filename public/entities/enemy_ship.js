var EnemyShip = function (level, game, xLeft, yTop) {
	this.level = level;
	this.game = game;
	this.height = 20;
	this.width = 20;

	this.baseYSpeed = 300;
	this.baseXSpeed = 100;

	this.xLeft = xLeft;
	this.xRight = this.xLeft + this.width;
	this.yTop = yTop;
	this.yBottom = this.yTop + this.height;
	
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
			// Create replacement ship
			
		} else {
			var targetY = this.level.ship.y;
			var targetX = this.level.ship.x;
			var xDirection = (this.level.ship.x - this.xLeft) > 0 ? 1 : -1;
			var yDirection = (this.level.ship.y - this.yTop) > 0 ? 1 : -1;

			// TODO: Should not need to change all four of these
			// If at a right angle, don't change direction

			// if (Math.abs(this.yTop - targetY) < 20) {
			// 	baseYSpeed = 5;
			// }

			this.yTop = this.yTop + yDirection * this.baseYSpeed * elapsedTime;
			this.yBottom = this.yBottom + yDirection * this.baseYSpeed * elapsedTime;
			this.xLeft = this.xLeft + xDirection * this.baseXSpeed * elapsedTime;
			this.xRight = this.xRight + xDirection * this.baseXSpeed * elapsedTime;
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
