var Ship = function (x, y, speed) {
	this.x = x;
	this.y = y;
	this.width = 20;
	this.height = 20;
	this.speed = speed;
	this.userInput = new UserInput();
}

Ship.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.beginPath();
	ctx.moveTo(this.x, this.y);
	ctx.lineTo(this.x + this.width, this.y);
	ctx.lineTo(this.x + (this.width / 2), this.y - this.height);
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