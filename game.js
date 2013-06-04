var Game = function () {};

Game.prototype.inSafeZone = function () {
	for (var i = 0; i < this.safeZones.length; i ++) {
		var zone = this.safeZones[i];
		if (this.ship.x >= zone.xLeft && this.ship.x <= zone.xRight
		  && this.ship.y >= zone.yTop && this.ship.y <= zone.yBottom) {
		  return true;	
		}
	}
	
	return false;
}

Game.prototype.successoccurred = function () {
	// return this.ship.y <= 5;
}

Game.prototype.update = function (delta) {
	this.ship.update(delta);
	this.canyon.update(delta);

	if ( !this.inSafeZone() ) {
		console.log('collision!');
		this.init();
	} else if ( this.successoccurred() ) {
		console.log('you won!');
		this.init();
	}
};

Game.prototype.draw = function (ctx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	this.canyon.draw(ctx);
	this.safeZones.forEach (function (zone) {
		zone.draw(ctx);
	});
	this.ship.draw(ctx);
}

Game.prototype.init = function () {
	this.ship = new Ship(canvas.width / 2, canvas.height - 10, 200);
	this.canyon = new Canyon();
	this.initSafeZones();
}

Game.prototype.initSafeZones = function () {
	this.safeZones = [];
	
	// For the base safe zone
	var baseWidth = canvas.width;
	var baseHeight = canvas.height / 8;
	var baseX = 0;
	var baseY = canvas.height - baseHeight;

	// For the other safe zones
	var standardWidth = this.ship.width * 10;
	var standardHeight = canvas.height / 2;
	var standardX = canvas.width / 2 - standardWidth / 2.
	
	// Create base safeZone
	this.safeZones.push(new SafeZone(baseX, baseY, baseWidth, baseHeight));

	// Starting from the top of the baseSafeZone, create other safeZones
	var x = standardX;
	var width = standardWidth;
	var height = standardHeight;

	for (var y = baseY; y >= -1000; y -= standardHeight * 0.3) {
		x = x + Math.floor(Math.random() * 20 - 10);
		width = width + Math.floor(Math.random() * 40 - 30);
		height = height + Math.floor(Math.random() * 40 - 30);
		this.safeZones.push(new SafeZone(x, y, width, height));
	}
}

window.onload = function () {
	// Set up canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d'); 
	canvas.width = 800;
	canvas.height = 600;

	var game = new Game();
	game.init();

	// Run game loop
	var then = Date.now();
	setInterval(function () {
		var now = Date.now();
		var delta = (now - then) / 1000;
		
		game.update(delta);
		game.draw(ctx);

		then = now;
	}, 10); // Execute as fast as possible	
}