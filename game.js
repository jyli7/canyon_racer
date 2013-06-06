var Game = function (ctx, scrollSpeed) {
	var that = this;
	this.ctx = ctx;
	this.scrollSpeed = 2.2;
	this.currentState = 'countdown';
	this.countdownCount = 0;
	this.countdownDisplay = 3;
	this.states = {
		countdown: function () {
			if (that.countdownDisplay < 0) {
				countdownElement.innerHTML = "";
				return 'playing';
			} else if (that.countdownCount % 120 === 0) {
				if (that.countdownDisplay !== 0) { countdownElement.innerHTML = that.countdownDisplay; }
				that.countdownDisplay -= 1;
			}
			that.countdownCount += 1;
		}

	, playing: function () {
			this.update(this.loopTimeElapsed);
			this.draw(ctx);

			if ( this.beyondVictoryLine() ) {
				return 'victory';
			} else if ( !this.inSafeZone() ) {
				return 'loss';
			}
		}

	, victory: function () {
			document.getElementById('primary-message').innerHTML = "You won!";
			document.getElementById('secondary-message').innerHTML = "Press 'Enter' to play again";
			this.refreshOnEnter();
			this.currentState = 'gameOver';
		}
	
	, loss: function () {
			document.getElementById('primary-message').innerHTML = "You crashed!";
			document.getElementById('secondary-message').innerHTML = "Press 'Enter' to play again";
			this.ship.crashed = true;
			this.refreshOnEnter();
			this.currentState = 'gameOver';
		}

	, gameOver: function () {
			this.update(this.loopTimeElapsed);
			this.draw(ctx);
		}
	};
};

var countdownInitiated = false;
var countdownFinished = false;

var countdownCount = 0;
var countdownDisplay = 3;
var countdownElement = document.getElementById('countdown');

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
			removeEventListener("keypress", startGameOnEnter);
		}
	}
	this.listener = addEventListener("keypress", startGameOnEnter);
}

Game.prototype.refresh = function () {
	document.getElementById('primary-message').innerHTML = "";
	document.getElementById('secondary-message').innerHTML = "";
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

	// Set the x, y, width, height for lots of safeZones
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

	var then = Date.now();
	console.log(game.currentState);

	game.loop = setInterval(function () {
		// consider passing in game
		var stateFunction = game.states[game.currentState];
		var nextState = stateFunction.call(game);

		if (nextState !== undefined) {
			game.currentState = nextState;
		}
		
		var now = Date.now();
		game.loopTimeElapsed = (now - then) / 1000;
		then = now;
		
	}, 10); // Execute as fast as possible
}
