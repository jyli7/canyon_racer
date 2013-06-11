var Pillar = function (game, xLeft, yTop) {
	this.game = game;
	this.zIndex = 2;
	this.width = 20;
	this.height = 20;
	this.xLeft = xLeft;
	this.yTop = yTop;
	this.xRight = this.xLeft + this.width;
	this.yBottom = yTop + this.height;
};

Pillar.prototype.draw = function (ctx) {
	// Draw only those pillars that are in advance of the ship
	// TODO: REFACTOR THIS "IN ADVANCE" CODE (Also in safe_zone.js)
	var threshold = -1 * this.game.translatedDistance;
	var bottomLine = threshold + canvas.height * 1.2;
	var topLine = threshold - canvas.height * 1.2;

	if (this.yTop < bottomLine && this.yTop > topLine ) {
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fillRect(this.xLeft, this.yTop, this.width, this.height);
	}
};

Pillar.prototype.update = function () {};