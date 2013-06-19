var AsteroidManager = function (level, game) {
	this.level = level;
	this.game = game;
	this.meanWidth = 40; this.meanHeight = 40;
	this.widthVolatility = 20;
	this.heightVolatility = 30;
	this.meanSpeed = 60;
	this.speedVolatility = 50;
	this.distanceBetweenAsteroids = 18;
};

AsteroidManager.prototype.init = function (ctx) {
	var asteroids = [];
	for (var y = -this.level.warmUpLength * 1.25; y >= this.level.victoryZone.yBottom * 1.1; y -= this.distanceBetweenAsteroids) {
		var x = canvas.width / 2 + volatilityFactor(canvas.width / 2);
		var width = this.meanWidth + volatilityFactor(this.widthVolatility);
		var height = this.meanHeight + volatilityFactor(this.heightVolatility);
		var speed = this.meanSpeed + volatilityFactor(this.speedVolatility);
		asteroids.push(new Asteroid(this.level, this.game, x, y, width, height, speed));
	}
	this.level.addObj(asteroids, 'asteroids');
};

AsteroidManager.prototype.update = function () {
};

AsteroidManager.prototype.draw = function () {};