var SafeZone = function (level, game, xLeft, yTop, width, height) {
	mixin(this, mixins.zone);
	this.shape = RECTANGLE;
	
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

SafeZone.prototype.draw = function (ctx) {
	// Draw only those SafeZones that are in advance of the ship
	var threshold = -1 * this.game.translatedDistance;
	var bottomLine = threshold + canvas.height * 1.2;
	var topLine = threshold - canvas.height * 1.2;

	if (this.yTop < bottomLine && this.yTop > topLine ) {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(this.xLeft, this.yTop, this.width, this.height);
	}
};

SafeZone.prototype.update = function () {};