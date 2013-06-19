var AsteroidManager = function (level, game) {
	this.level = level;
	this.game = game;
	this.meanWidth = 35;
	this.meanHeight = 35;
	this.widthVolatility = 10;
	this.heightVolatility = 10;
};

AsteroidManager.prototype.init = function (ctx) {
	var asteroids = [];
	for (var y = -this.level.warmUpLength * 1.25; y >= this.level.victoryZone.yBottom * 1.01; y -= 15) {
		var x = canvas.width / 2 + volatilityFactor(canvas.width / 2);
		var width = this.meanWidth + volatilityFactor(this.widthVolatility);
		var height = this.meanHeight + volatilityFactor(this.heightVolatility);
		asteroids.push(new Asteroid(this.level, this.game, x, y, width, height));
	}
	this.level.addObj(asteroids, 'asteroids');
};

AsteroidManager.prototype.update = function () {
};

AsteroidManager.prototype.draw = function () {};