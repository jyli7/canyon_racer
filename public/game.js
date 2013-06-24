var Game = function (level, difficulty) {
	var that = this;
	this.difficulty = difficulty;

	this.currentLevelNum = level;
	this.currentState = 'countdown';
	this.theme = new Audio("sounds/" + 'level-' + this.currentLevelNum + '.wav');

	if (this.difficulty === 1 || this.difficulty === 2) {
		this.scrollSpeed = 3.8;
	} else if (this.difficulty === 3) {
		this.scrollSpeed = 5.9;
	}

	if (this.currentLevelNum === 2) {
		this.scrollSpeed *= 0.60;
	}
	if (this.currentLevelNum === 3) {
		this.scrollSpeed *= 0.62;
	}
	
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

			if (ship.isOffScreen()) {
				return 'loss';
			}

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
				setMessage('primary-message', 'Victory!');
				if (this.difficulty === 3) {
					setMessage('secondary-message', "Game totally beaten!");
					var userName = prompt("Very few people have beaten this on hellish. We want to remember you. What is your name?");
					notifyServerOfWin(this.difficulty, userName);
					this.currentState = 'gameOver';
				} else {
					setMessage('secondary-message', "Press 'Enter' to play harder difficulty");	
					this.initRefreshOnEnter();
					this.currentLevelNum = 1;
					this.difficulty += 1;
					this.currentLevelObj.ship.baseSpeed *= 2;
					this.currentState = 'gameOver';
					notifyServerOfWin(this.difficulty);
				}
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
			this.currentLevelObj.ship.justCrashed();
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
	setUpAmmoBar(this.currentLevelObj.ship);
	initDifficultyDisplay(this.difficulty);

	// Bring canvas back to original position
	this.translatedDistance = 0;
}

Game.prototype.initRefreshOnEnter = function () {
	var that = this;
	var startGameOnEnter = function (e) {
		if (e.keyCode == 13) {
			that.refresh(that.currentLevelNum, that.difficulty);
			removeEventListener("keypress", startGameOnEnter);
		}
	}
	this.listener = addEventListener("keypress", startGameOnEnter);
}

Game.prototype.refresh = function (level, difficulty) {
	wipeAllMessages();
	clearInterval(this.loop);
	this.theme.pause();
	startGame(level, difficulty);
	this.currentLevelObj.ship.refillGun();
}

var startGame = function (level, difficulty) {
	// Hide the start screen
	$('.hidden-upon-start').addClass('hidden');
	wipeAllMessages();

	// Set up the canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 600;

	// Init the game
	var game = new Game(level, difficulty);

	if (playSounds) { game.theme.play() };

	game.ctx = ctx;
	game.init(ctx);
	game.draw(ctx);

	var then = Date.now();

	// MAIN GAME LOOP
	game.loop = setInterval(function () {
		var nextState = game.states[game.currentState].call(game);

		// if nextState is returned, update current state
		if (nextState !== undefined) {
			game.currentState = nextState;
		}
		
		var now = Date.now();
		game.loopTimeElapsed = (now - then) / 1000;
		then = now;
		
	}, 10); // Execute as fast as possible
}
