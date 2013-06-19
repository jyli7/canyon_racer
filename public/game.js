var Game = function (level) {
	var that = this;
	this.scrollSpeed = 3.3;
	this.currentLevelNum = level || 1;
	this.currentState = 'countdown';
	this.theme = new Audio("sounds/" + 'level-' + this.currentLevelNum + '.wav');
	
	this.countdownInterval = 80;
	this.levelDisplayLength = this.countdownInterval * 2;
	this.countdownTicker = 0;
	this.countdownCount = 3;
	this.states = {
		countdown: function () {
			this.update(this.loopTimeElapsed);
			this.draw(that.ctx);

			var countdownElement = document.getElementById('countdown');
			// Level Display
			if (that.countdownTicker < this.levelDisplayLength) {
				setMessage('primary-message', 'Level ' + that.currentLevelNum);
				if (this.currentLevelNum === 3) {
					setMessage('secondary-message', "Press 'F' to fire! (Limited ammo)");
				} else {
					setMessage('secondary-message', 'Use all of the arrow keys');
				}
				
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
			this.draw(that.ctx);
			var ship = this.currentLevelObj.ship;

			if (this.currentLevelNum === 1) {
				if ( sourceZoneBeyondVictoryLine(ship) ) {
					return 'victory';
				} else if ( !sourceZoneInSafeZone(ship) || sourceZoneVertexTouchPillar(ship) ) {
					return 'loss';
				}	
			} else if (this.currentLevelNum === 2) {
				if ( sourceZoneBeyondVictoryLine(ship) ) {
					return 'victory';
				} else if ( sourceZoneVertexTouchGateWall(ship) || sourceZoneVertexTouchEnemyShip(ship) ) {
					return 'loss';
				}
			} else if (this.currentLevelNum === 3) {
				if ( sourceZoneBeyondVictoryLine(ship) ) {
					return 'victory';
				} else if ( sourceZoneVertexTouchAsteroid(ship) ) {
					return 'loss';
				}
			}
		}

	, victory: function () {
			if (this.currentLevelNum === 3) {
				setMessage('primary-message', 'Congrats - you beat Canyon Racer!');
				setMessage('secondary-message', "Press 'Enter' to try the game on a higher difficulty");
				this.initRefreshOnEnter();
				// TODO: CHANGE THIS TO START SCREEN
				this.currentLevelNum = 1;
				this.currentLevelObj.ship.baseSpeed *= 2;
				this.currentState = 'gameOver';
			} else {
				setMessage('primary-message', 'You won!');
				setMessage('secondary-message', "Press 'Enter' to start next level");
				this.currentLevelNum += 1;
				this.currentLevelObj.ship.baseSpeed *= 2;
				this.initRefreshOnEnter();
				this.currentState = 'gameOver';
			}
		}
	
	, loss: function () {
			setMessage('primary-message', 'You crashed!');
			setMessage('secondary-message', "Press 'Enter' to play again");
			this.currentLevelObj.ship.crashed = true;
			this.initRefreshOnEnter();
			this.currentState = 'gameOver';
		}

	, gameOver: function () {
			this.update(this.loopTimeElapsed);
			this.draw(that.ctx);
		}
	};
};

Game.prototype.update = function (delta) {
	this.currentLevelObj.entities.forEach (function (entity) { entity.update(delta); });
};

Game.prototype.draw = function (ctx) {
	var that = this;
	this.ctx.clearRect(0, -this.translatedDistance, canvas.width, canvas.height);

	this.ctx.translate(0, this.scrollSpeed);
	this.translatedDistance += this.scrollSpeed;

	this.currentLevelObj.entities.forEach (function (entity) { entity.draw(that.ctx); });
}

Game.prototype.init = function () {
	this.currentLevelObj = new Level(this, this.currentLevelNum);

	// Bring canvas back to original position
	this.ctx.translate(0, -this.translatedDistance);
	this.translatedDistance = 0;

}

Game.prototype.initRefreshOnEnter = function () {
	var that = this;
	var startGameOnEnter = function (e) {
		if (e.keyCode == 13) {
			that.refresh(that.currentLevelNum);
			removeEventListener("keypress", startGameOnEnter);
		}
	}
	this.listener = addEventListener("keypress", startGameOnEnter);
}

Game.prototype.refresh = function (level) {
	wipeAllMessages();
	clearInterval(this.loop);
	this.theme.pause()
	startGame(level);
	refillAmmoBar();
}

var startGame = function (level) {
	// Hide the start screen
	document.getElementById('start-screen').className = 'hidden';
	wipeAllMessages();

	// Set up the canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 600;

	// Init the game
	var game = new Game(level);

	game.theme.play();

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
