var EnemyShip = function (level, game, xLeft, yTop) {
	mixin(this, mixins.zone);
	this.shape = RECTANGLE;

	this.objType = 'enemyShips'

	this.level = level;
	this.game = game;
	this.height = 10;
	this.width = 10;

	this.baseYSpeed = 300 + volatilityFactor(50);
	this.baseXSpeed = 100 + volatilityFactor(40);

	this.backwardYSpeed = 100;

	// Some ships will aim at the wrong target
	this.targetYError = 10 + volatilityFactor(10);
	this.targetXError = 10 + volatilityFactor(10);

	this.xLeft = xLeft;
	this.xRight = this.xLeft + this.width;
	this.yTop = yTop;
	this.yBottom = this.yTop + this.height;

	this.tickerForIntelligence = 0;

	// The higher the intelligence, the less frequently the ship "screws up"
	this.intelligence = 30 + volatilityFactor(10);
	
	this.zIndex = 1;
};

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

EnemyShip.prototype.moveStupidly = function (elapsedTime) {
	this.yTop = this.yTop + volatilityFactor(1) * this.baseYSpeed * elapsedTime;
	this.yBottom = this.yBottom + volatilityFactor(1) * this.baseYSpeed * elapsedTime;
	this.xLeft = this.xLeft + volatilityFactor(1) * this.baseXSpeed * elapsedTime;
	this.xRight = this.xRight + volatilityFactor(1) * this.baseXSpeed * elapsedTime;
}


EnemyShip.prototype.moveAlongY = function (amount) {
	this.yTop += amount;
	this.yBottom += amount;
}

EnemyShip.prototype.moveAlongX = function (amount) {
	this.xLeft += amount;
	this.xRight += amount;
}

EnemyShip.prototype.moveTowardTarget = function (elapsedTime) {
	var targetY = this.level.ship.yTop + this.targetYError;
	var targetX = this.level.ship.xMid + this.targetXError;
	var xDirection = (this.level.ship.xMid - this.xLeft) > 0 ? 1 : -1;
	var yDirection = (this.level.ship.yTop - this.yTop) > 0 ? 1 : -1;

	// Base movement along Y axis
	this.moveAlongY(-1 * this.baseYSpeed * elapsedTime);

	// Enemy ship is above the target, move backward
	if (yDirection > 0) {
		this.moveAlongY(this.backwardYSpeed * elapsedTime);
	}

	// Move in correct direction on x axis
	this.moveAlongX(xDirection * this.baseXSpeed * elapsedTime);
}

EnemyShip.prototype.update = function (elapsedTime) {
	if (elapsedTime && this.game.currentState === 'countdown' || 
		this.game.currentState === 'playing' || 
		(this.game.currentState === 'gameOver' && !this.crashed)) {
		
		if (sourceZoneTouchGateWall(this) || sourceZoneTouchBullet(this)) {
			this.level.removeObj(this, this.objType);
		} else {
			if (this.tickerForIntelligence % this.intelligence === 0) {
				this.moveStupidly(elapsedTime);
			} else {
				this.moveTowardTarget(elapsedTime);
			}
			this.tickerForIntelligence += 1;
			
		}
		
	}
};