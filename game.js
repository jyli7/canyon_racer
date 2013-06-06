var Game = function (ctx, scrollSpeed) {
	this.ctx = ctx;
	this.scrollSpeed = 2;
	this.possibleStates = ["loss", "alive", "victory"];
	this.state = "";
};

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

Game.prototype.beyondVictoryLine = function () {
	if (this.ship.y <= this.victoryZone.yBottom) {
	  return true;	
	} else {
		return false;
	}
}

Game.prototype.update = function (delta) {
	this.entities.forEach (function (entity) {
		entity.update(delta);
	});

	if ( this.beyondVictoryLine() ) {
		this.enterVictoryState();
	} else if ( !this.inSafeZone() ) {
		this.enterLoseState();
	}
};

Game.prototype.draw = function (ctx) {
	var that = this;
	this.ctx.clearRect(0, -this.translatedDistance, canvas.width, canvas.height);

	this.ctx.translate(0, this.scrollSpeed);
	this.translatedDistance += this.scrollSpeed;

	this.entities.forEach (function (entity) {
		entity.draw(that.ctx);
	});
}

Game.prototype.init = function () {
	// Bring canvas back to original position
	this.state = "alive";
	this.ctx.translate(0, -this.translatedDistance);
	this.translatedDistance = 0;
	this.ship = new Ship();
	this.canyon = new Canyon();
	this.initSafeZones();
	this.victoryZone = new VictoryZone(-1 * (this.canyon.length + canvas.height * 0.4));

	// TO DO: Figure out why I need this particular order.
	this.entities = [this.canyon, this.victoryZone].concat(this.safeZones).concat(this.ship);
}

Game.prototype.refreshOnEnter = function () {
	var that = this;
	var startGameOnEnter = function (e) {
		if (e.keyCode == 13) {
			that.refresh();
			removeEventListener("keydown", startGameOnEnter);
		}
	}
	this.listener = addEventListener("keydown", startGameOnEnter);
}

Game.prototype.enterVictoryState = function () {
	if (this.state !== "victory") {
		document.getElementById('primary-message').innerHTML = "You won!";
		document.getElementById('secondary-message').innerHTML = "Press 'Enter' to play again";
		this.state = "victory";
		this.refreshOnEnter();
	}
}

Game.prototype.enterLoseState = function () {
	if (this.state !== "loss") {
		var that = this;
		document.getElementById('primary-message').innerHTML = "You crashed!";
		document.getElementById('secondary-message').innerHTML = "Press 'Enter' to play again";
		this.ship.crashed = true;
		this.state = "loss";
		this.refreshOnEnter();
	}
}

Game.prototype.refresh = function () {
	document.getElementById('primary-message').innerHTML = "";
	document.getElementById('secondary-message').innerHTML = "";
	console.log('refresh');
	clearInterval(this.loop);
	startGame();
}

// Setup base safe zone, somewhat randomly generate other safe zones
Game.prototype.initSafeZones = function () {
	this.safeZones = [];
	
	// For the base safe zone
	var baseWidth = canvas.width;
	var baseHeight = canvas.height / 2;
	var baseX = 0;
	var baseY = canvas.height - baseHeight;

	// For the other safe zones
	var standardWidth = this.ship.width * 3;
	var standardHeight = canvas.height / 6;
	var standardX = canvas.width / 2 - standardWidth / 2.
	
	// Create base safeZone
	this.safeZones.push(new SafeZone(baseX, baseY, baseWidth, baseHeight));

	// Starting from the top of the baseSafeZone, create other safeZones
	var x = standardX;
	var width = standardWidth;
	var height = standardHeight;

	// Minima and maxima
	var minimumWidth = this.ship.width * 2;
	var maximumWidth = this.ship.width * 6;
	var minimumX = 0;
	var maximumX = canvas.width - maximumWidth;

	xVolatility = 0.08;
	yVolatility = 0.05;
	widthVolatility = 0.03;
	heightVolatility = 0.02;

	var phaseOneReached = false;
	var phaseTwoReached = false;

	// Set the x, y, width, height for lots of canyons
	for (var y = baseY; y >= -this.canyon.length; y -= 3) {
		if (y <= -this.canyon.length * 0.5 && !phaseTwoReached) { 
			maximumWidth *= 0.8;
			standardWidth *= 0.8;
			xVolatility *= 1.1;
			phaseTwoReached = true;
		} else if (y <= -this.canyon.length * 0.3 && !phaseOneReached) {
			maximumWidth = maximumWidth * 0.9;
			standardWidth = standardWidth * 0.9;
			xVolatility *= 1.1;
			phaseOneReached = true;
		}

		// Ad hoc fixes
		if (x <= minimumX) { x += 50; }
		if (x >= maximumX) { x -= 50; }
		if (width <= minimumWidth || width >= maximumWidth) { width = standardWidth };

		x = x * volatilityMultiple(xVolatility);
		width = width * volatilityMultiple(widthVolatility);
		height = height * volatilityMultiple(heightVolatility);
		this.safeZones.push(new SafeZone(x, y, width, height));
	}
}

var startGame = function () {
	// Hide the start screen
	document.getElementById('start-screen').className = 'hidden';
	document.getElementById('primary-message').innerHTML = "";
	document.getElementById('secondary-message').innerHTML = "";

	// Set up the canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 600;

	// Init the game
	var game = new Game();
	game.ctx = ctx;
	game.init(ctx);
	game.draw(ctx);

	// Start the countdown, 3...2...1
	// TO DO: THIS IS MESSY!!!!
	var count = 3;
	var countdown = setInterval(function () {
		// At end of countdown, stop the countdown and start the game loop
		var countdownElement = document.getElementById('countdown');
		if (count > 0) {
			countdownElement.innerHTML = count;
			count--;
		} else {
			clearInterval(countdown);
			countdownElement.innerHTML = "";
			
			// Start the game loop	
			var then = Date.now();
			game.loop = setInterval(function () {
				var now = Date.now();
				var delta = (now - then) / 1000;
				
				game.update(delta);
				game.draw(ctx);

				then = now;
			}, 10); // Execute as fast as possible
		}
	}, 500);
}
