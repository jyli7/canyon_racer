var Canyon = function () {
	var canyonUpperYBound = 10;
	var canyonLowerYBound = 100;
	var canyonMinGapSize = 25;
	var canyonMaxGapSize = 75;
	var canyonUpperXBound = canvas.width - canyonMinGapSize;

	this.startGap = Math.random() * canyonUpperXBound;
	this.gapSize = Math.floor((Math.random() * (canyonMaxGapSize - canyonMinGapSize)) + canyonMinGapSize);
	this.yPosition = Math.floor(canyonLowerYBound - (Math.random() * (canyonLowerYBound - canyonUpperYBound)));
}

Canyon.prototype.draw = function (ctx) {
	ctx.beginPath();
	ctx.moveTo(0, this.yPosition);
	ctx.lineTo(this.startGap, this.yPosition);
	ctx.stroke();

	ctx.moveTo(this.startGap + this.gapSize, this.yPosition);
	ctx.lineTo(canvas.width, this.yPosition);
	ctx.stroke();
}

Canyon.prototype.update = function () {};
