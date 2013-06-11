var Ship = function (game) {
	this.game = game;
	this.x = canvas.width / 2;
	this.y = canvas.height - 100;

	this.width = 20;
	this.height = 20;
	this.baseSpeed = 175;
	this.extraSpeed = 200;
	this.userInput = new UserInput();
	this.crashed = false;
	this.zIndex = 3;
};

Ship.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.beginPath();
	ctx.moveTo(this.x, this.y);
	ctx.lineTo(this.x + this.width, this.y);
	ctx.lineTo(this.x + (this.width / 2), this.y - this.height);
	ctx.fill();
};

Ship.prototype.getRight = function () {
	return this.x + this.width;
}

Ship.prototype.update = function (elapsedTime) {
	if (this.game.currentState === 'playing' || ('gameOver' && !this.crashed)) {
		// Make the ship go forward some amount, automatically
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