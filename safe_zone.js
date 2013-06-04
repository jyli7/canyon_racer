// Ship constructor
var SafeZone = function (xLeft, yTop, width, height) {
	this.width = width;
	this.height = height;
	this.xLeft = xLeft;
	this.xRight = this.xLeft + this.width;
	this.yTop = yTop;
	this.yBottom = yTop + this.height;
}

SafeZone.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(this.xLeft, this.yTop, this.width, this.height);
}

SafeZone.prototype.update = function () {};
