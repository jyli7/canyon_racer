var Ship = function (level, game) {
	mixin(this, mixins.zone);
	this.shape = TRIANGLE;
	
	this.level = level;
	this.game = game;

	// xMid is the x coord of the middle of the triangle
	this.xMid = canvas.width / 2;

	// yTop is the y coord of the top tip of the triangle
	this.yTop = canvas.height - 200;

	this.width = 20;
	this.height = 20;
	this.baseSpeed = 275;
	this.extraSpeed = 200;
	this.userInput = new UserInput();

	this.crashed = false;
	this.zIndex = 3;
};

Ship.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.beginPath();
	ctx.moveTo(this.bottomLeftX(), this.bottomLeftY());
	ctx.lineTo(this.bottomRightX(), this.bottomRightY());
	ctx.lineTo(this.xMid, this.yTop);
	ctx.fill();
};


Ship.prototype.update = function (elapsedTime) {
	if (elapsedTime && this.game.currentState === 'countdown' || 
		this.game.currentState === 'playing' || 
		(this.game.currentState === 'gameOver' && !this.crashed)) {
		this.yTop -= this.baseSpeed * elapsedTime;

		// Player holding up
		if (this.userInput.keyIsHeld(38)) { this.yTop -= this.extraSpeed * elapsedTime; }
		
		// Player holding down
		if (this.userInput.keyIsHeld(40)) { this.yTop += this.extraSpeed * elapsedTime; }
		
		// Player holding left
		if (this.userInput.keyIsHeld(37)) { this.xMid -= this.extraSpeed * elapsedTime; }
		
		// Player holding right
		if (this.userInput.keyIsHeld(39)) { this.xMid += this.extraSpeed * elapsedTime; }
	}
};

Ship.prototype.entirelyInAnyZones = function (zones) {
	var result = true;
	this.points().forEach(function (point) {
		if (!inAnyOfZones(point, zones)) {
			result = false;
		}
	});
	return result;
}	

Ship.prototype.vertexInAnyZones = function (zones) {
	var result = false;
	this.points().forEach(function (point) {
		if (inAnyOfZones(point, zones)) {
			result = true;
		}
	});
	return result;
}

Ship.prototype.inASafeZone = function () {
	return this.entirelyInAnyZones(this.level.safeZones);
}

Ship.prototype.inAPillar = function () {
	return this.vertexInAnyZones(this.level.pillars);
}

Ship.prototype.inEnemyShip = function () {
	return this.vertexInAnyZones(this.level.enemyShips);
}

Ship.prototype.inAGateWall = function () {
	return this.vertexInAnyZones(this.level.gateWalls);
}

Ship.prototype.beyondVictoryLine = function () {
	return (this.y <= this.level.victoryZone.yBottom);
}

