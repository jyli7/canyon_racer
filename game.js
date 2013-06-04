var Game = function () {};

Game.prototype.collisionOccured = function () {
	return (this.ship.x <= this.canyon.startGap || 
					this.ship.x >= (this.canyon.startGap + this.canyon.gapSize)) &&
				 (this.ship.y <= (this.canyon.yPosition + 10) 
					&& 
					this.ship.y >= (this.canyon.yPosition - 10))
}

Game.prototype.successOccured = function () {
	return this.ship.y <= 5;
}

Game.prototype.update = function (delta) {
	this.ship.update(delta);
	this.canyon.update(delta);

	if ( this.collisionOccured() ) {
		console.log('collision!');
		this.init();
	} else if ( this.successOccured() ) {
		console.log('you won!');
		this.init();
	}
};

Game.prototype.draw = function (ctx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	this.ship.draw(ctx);
	this.canyon.draw(ctx);
}

Game.prototype.init = function () {
	this.ship = new Ship(canvas.width / 2, canvas.height - 10, 150);;
	this.canyon = new Canyon();
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