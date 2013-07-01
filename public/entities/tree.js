var Tree = function (level, game, xLeft, yTop) {
	this.level = level;
	this.game = game;
	this.zIndex = 1;
	this.width = 20;
	this.height = 20;
	this.xLeft = xLeft;
	this.yTop = yTop;
	
	this.image = new Image();
	this.image.src = 'images/tree.png';
};

Tree.prototype.draw = function (ctx) {
	var threshold = -1 * this.game.translatedDistance;
	var bottomLine = threshold + canvas.height * 1.2;
	var topLine = threshold - canvas.height * 1.2;

	if (this.yTop < bottomLine && this.yTop > topLine ) {
		ctx.drawImage(this.image, this.xLeft, this.yTop);
	}
};

Tree.prototype.update = function () {};