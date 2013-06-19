var AsteroidManager = function (level, game) {
	this.level = level;
	this.game = game;
	this.meanWidth = 30;
	this.meanHeight = 30;
	this.widthVolatility = 5;
	this.heightVolatility = 5;
};

AsteroidManager.prototype.init = function (ctx) {
	var asteroids = [];
	for (var y = -this.level.warmUpLength * 1.25; y >= this.level.victoryZone.yBottom * 1.01; y -= 10) {
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