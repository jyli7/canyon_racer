var Ship = function (x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.userInput = new UserInput();
}

Ship.prototype.draw = function (ctx) {
	ctx.beginPath();
	ctx.moveTo(this.x, this.y);
	ctx.lineTo(this.x + 20, this.y);
	ctx.lineTo(this.x + 10, this.y - 20);
	ctx.fill();
}

Ship.prototype.update = function (elapsedTime) {
	// Player holding up
	if (this.userInput.keyPressed(38)) { this.y -= this.speed * elapsedTime; }
	
	// Player holding down
	if (this.userInput.keyPressed(40)) { this.y += this.speed * elapsedTime; }
	
	// Player holding left
	if (this.userInput.keyPressed(37)) { this.x -= this.speed * elapsedTime; }
	
	// Player holding right
	if (this.userInput.keyPressed(39)) { this.x += this.speed * elapsedTime; }
}