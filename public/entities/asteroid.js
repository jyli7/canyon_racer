var Asteroid = function (level, game, xLeft, yTop, width, height) {
	mixin(this, mixins.zone);
	this.shape = RECTANGLE;
	this.objType = 'asteroids';
	
	this.level = level;
	this.game = game;
	this.width = width;
	this.height = height;

	this.xLeft = xLeft;
	this.xRight = this.xLeft + this.width;
	this.yTop = yTop;
	this.yBottom = yTop + this.height;
	this.zIndex = 1;
};

Asteroid.prototype.draw = function (ctx) {
	// Draw only those objects that are in advance of the ship
	var threshold = -1 * this.game.translatedDistance;
	var bottomLine = threshold + canvas.height * 1.2;
	var topLine = threshold - canvas.height * 1.2;

	if (this.yTop < bottomLine && this.yTop > topLine ) {
		ctx.fillStyle = "rgb(125, 123, 123)";
		ctx.fillRect(this.xLeft, this.yTop, this.width, this.height);
	}
};

Asteroid.prototype.update = function (elapsedTime) {
	if (elapsedTime && this.game.currentState === 'countdown' || this.game.currentState === 'playing') {
		var resultHash = anySourceZoneVertexInTargetZone(this.level.bullets, this) || {};
		var bulletHitAsteroid = resultHash.result;
		var relevantBullet = resultHash.sourceZone;

		if (bulletHitAsteroid) {
			this.level.removeObj(this, this.objType);
			this.level.removeObj(relevantBullet, relevantBullet.objType);
		}
	}
};