var Bullet = function (level, game, xMid, yTop) {
	mixin(this, mixins.zone);
	this.shape = RECTANGLE;
	this.objType = 'bullets';
	
	this.level = level;
	this.game = game;
	this.zIndex = 2;
	this.width = 5;
	this.height = 5;
	this.xMid = xMid;
	this.xLeft = this.xMid - this.width / 2;
	this.yTop = yTop;
	this.xRight = this.xLeft + this.width;
	this.yBottom = this.yTop + this.height;

	this.baseSpeed = 750;
};

Bullet.prototype.draw = function (ctx) {
	// Draw only those pillars that are in advance of the ship
	// TODO: REFACTOR THIS "IN ADVANCE" CODE (Also in safe_zone.js)
	var threshold = -1 * this.game.translatedDistance;
	var bottomLine = threshold + canvas.height * 1.2;
	var topLine = threshold - canvas.height * 1.2;

	if (this.yTop < bottomLine && this.yTop > topLine ) {
		ctx.fillStyle = "hex(#800000)";
		ctx.fillRect(this.xLeft, this.yTop, this.width, this.height);
	}
};

Bullet.prototype.update = function (elapsedTime) {
	this.yBottom -= this.baseSpeed * elapsedTime
	this.yTop -= this.baseSpeed * elapsedTime;
};