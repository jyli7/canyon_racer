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

Game.prototype.successOccured = function () {
	// return this.ship.y <= 5;
}

Game.prototype.update = function (delta) {
	this.ship.update(delta);
	this.canyon.update(delta);

	if ( !this.inSafeZone() ) {
		console.log('collision!');
		this.init();
	} else if ( this.successOccured() ) {
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
	this.safeZones = []
	// Create base safeZone
	this.safeZones.push(new SafeZone(0, 150, canvas.width, canvas.height - 150));

	// Create other safe zones
	this.safeZones.push(new SafeZone(0, 0, this.ship.width * 3, canvas.height));	
}

window.onload = function () {
	// Set up canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d'); 
	canvas.width = 400;
	canvas.height = 200;

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