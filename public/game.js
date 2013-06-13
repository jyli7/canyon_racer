var Game = function (ctx, scrollSpeed) {
	var that = this;
	this.ctx = ctx;
	this.scrollSpeed = 3.1;
	this.currentLevel = 1;
	this.currentState = 'countdown';
	
	this.countdownInterval = 80;
	this.levelDisplayLength = this.countdownInterval * 2;
	this.countdownTicker = 0;
	this.countdownCount = 3;
	this.states = {
		countdown: function () {
			this.update(this.loopTimeElapsed);
			this.draw(ctx);

			var countdownElement = document.getElementById('countdown');
			// Level Display
			if (that.countdownTicker < this.levelDisplayLength) {
				setMessage('primary-message', 'Level ' + that.currentLevel);
				setMessage('secondary-message', 'Use all of the arrow keys');
			}

			// Countdown Display
			if (that.countdownCount < 0) {
				countdownElement.innerHTML = "";
				wipeAllMessages();
				return 'playing';
			
			// If count is above level display length, show the count
			} else if (that.countdownTicker >= that.levelDisplayLength && that.countdownTicker % that.countdownInterval === 0) {
				wipeAllMessages();
				countdownElement.innerHTML = that.countdownCount;
				that.countdownCount -= 1;
			}
			that.countdownTicker += 1;
		}

	, playing: function () {
			this.update(this.loopTimeElapsed);
			this.draw(ctx);

			if ( shipBeyondVictoryLine(this) ) {
				return 'victory';
			} else if ( !shipInASafeZone(this) || shipInAPillar(this) ) {
				return 'loss';
			}
		}

	, victory: function () {
			setMessage('primary-message', 'You won!');
			setMessage('secondary-message', "Press 'Enter' to play again");
			this.initRefreshOnEnter();
			this.currentState = 'gameOver';
		}
	
	, loss: function () {
			setMessage('primary-message', 'You crashed!');
			setMessage('secondary-message', "Press 'Enter' to play again");
			this.ship.crashed = true;
			this.initRefreshOnEnter();
			this.currentState = 'gameOver';
		}

	, gameOver: function () {
			this.update(this.loopTimeElapsed);
			this.draw(ctx);
		}
	};
};

Game.prototype.initRefreshOnEnter = function () {
	var that = this;
	var startGameOnEnter = function (e) {
		if (e.keyCode == 13) {
			that.refresh();
			removeEventListener("keypress", startGameOnEnter);
		}
	}
	this.listener = addEventListener("keypress", startGameOnEnter);
}

Game.prototype.update = function (delta) {
	this.entities.forEach (function (entity) { entity.update(delta); });
};

Game.prototype.draw = function (ctx) {
	var that = this;
	this.ctx.clearRect(0, -this.translatedDistance, canvas.width, canvas.height);

	this.ctx.translate(0, this.scrollSpeed);
	this.translatedDistance += this.scrollSpeed;

	this.entities.forEach (function (entity) { entity.draw(that.ctx); });
}

Game.prototype.init = function () {
	// Bring canvas back to original position
	this.ctx.translate(0, -this.translatedDistance);
	this.translatedDistance = 0;

	this.ship = new Ship(this);
	this.canyon = new Canyon(this);
	this.victoryZone = new VictoryZone(this, -1 * (this.canyon.length + canvas.height * 0.4));
	this.safeZoneManager = new SafeZoneManager(this);
	this.safeZoneManager.init(this.ctx);
	this.pillarManager = new PillarManager(this);
	this.pillarManager.init(this.ctx);

	this.entities = [this.canyon, this.victoryZone, this.ship].concat(this.safeZones).concat(this.pillars);
	this.entities.sort(function (a, b) {
		return a.zIndex - b.zIndex;
	});
}

Game.prototype.refresh = function () {
	wipeAllMessages();
	clearInterval(this.loop);
	startGame();
}

var startGame = function () {
	// Hide the start screen
	document.getElementById('start-screen').className = 'hidden';
	wipeAllMessages();

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

	// MAIN GAME LOOP
	game.loop = setInterval(function () {
		var nextState = game.states[game.currentState].call(game);

		if (nextState !== undefined) {
			game.currentState = nextState;
		}
		
		var now = Date.now();
		game.loopTimeElapsed = (now - then) / 1000;
		then = now;
		
	}, 10); // Execute as fast as possible
}
