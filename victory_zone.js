// Ship constructor
var VictoryZone = function () {}

VictoryZone.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, -600, canvas.width, canvas.height / 2);
}

VictoryZone.prototype.update = function () {};
