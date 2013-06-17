var Ship = function (level, game) {
	this.level = level;
	this.game = game;

	// x is the x coord of the middle of the triangle
	this.x = canvas.width / 2;

	// y is the y coord of the top tip of the triangle
	this.y = canvas.height - 200;

	this.width = 20;
	this.height = 20;
	this.baseSpeed = 260;
	this.extraSpeed = 200;
	this.userInput = new UserInput();
	this.crashed = false;
	this.zIndex = 3;
};

Ship.prototype.bottomLeftX = function () {
	return this.x - (this.width / 2);
}

Ship.prototype.bottomLeftY = function () {
	return this.y + this.height;
}

Ship.prototype.bottomRightX = function () {
	return this.x + (this.width / 2);
}

Ship.prototype.bottomRightY = function () {
	return this.y + this.height;
}

Ship.prototype.points = function () {
	return [{x: this.bottomLeftX(), y: this.bottomLeftY()},
			{x: this.bottomRightX(), y: this.bottomRightY()},
			{x: this.x, y: this.y}];
}

Ship.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.beginPath();
	ctx.moveTo(this.bottomLeftX(), this.bottomLeftY());
	ctx.lineTo(this.bottomRightX(), this.bottomRightY());
	ctx.lineTo(this.x, this.y);
	ctx.fill();
};


Ship.prototype.update = function (elapsedTime) {
	if (elapsedTime && this.game.currentState === 'countdown' || 
		this.game.currentState === 'playing' || 
		(this.game.currentState === 'gameOver' && !this.crashed)) {
		this.y -= this.baseSpeed * elapsedTime;

		// Player holding up
		if (this.userInput.keyIsHeld(38)) { this.y -= this.extraSpeed * elapsedTime; }
		
		// Player holding down
		if (this.userInput.keyIsHeld(40)) { this.y += this.extraSpeed * elapsedTime; }
		
		// Player holding left
		if (this.userInput.keyIsHeld(37)) { this.x -= this.extraSpeed * elapsedTime; }
		
		// Player holding right
		if (this.userInput.keyIsHeld(39)) { this.x += this.extraSpeed * elapsedTime; }
	}
};