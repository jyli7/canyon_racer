var AsteroidManager = function (level, game) {
	this.level = level;
	this.game = game;
	if (this.game.difficulty === 1) {
		this.meanWidth = 25;
		this.meanHeight = 25;
		this.widthVolatility = 10;
		this.heightVolatility = 10;
		this.meanSpeed = 40;
		this.speedVolatility = 30;
		this.distanceBetweenAsteroids = 28;
	} else if (this.game.difficulty === 2) {
		this.meanWidth = 30;
		this.meanHeight = 30;
		this.widthVolatility = 15;
		this.heightVolatility = 15;
		this.meanSpeed = 50;
		this.speedVolatility = 40;
		this.distanceBetweenAsteroids = 22;
	} else {
		this.meanWidth = 40;
		this.meanHeight = 40;
		this.widthVolatility = 25;
		this.heightVolatility = 25;
		this.meanSpeed = 60;
		this.speedVolatility = 40;
		this.distanceBetweenAsteroids = 18;
	}
	
	
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