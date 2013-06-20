var Ship = function (level, game) {
	mixin(this, mixins.zone);
	this.shape = TRIANGLE;
	
	this.level = level;
	this.game = game;

	if (this.game.difficulty === 1) {
		this.baseSpeed = 220;
		this.extraSpeed = 250;
	} else if (this.game.difficulty === 2) {
		this.baseSpeed = 220;
		this.extraSpeed = 200;
	} else if (this.game.difficulty === 3) {
		this.baseSpeed = 325;
		this.extraSpeed = 250;
	}

	// xMid is the x coord of the middle of the triangle
	this.xMid = canvas.width / 2;

	// yTop is the y coord of the top tip of the triangle
	this.yTop = canvas.height - 200;

	this.width = 20;
	this.height = 20;
	this.userInput = new UserInput();

	this.crashed = false;
	this.zIndex = 3;

	if (this.game.difficulty === 1) {
		this.initialBulletCount = 20;
	} else if (this.game.difficulty === 2) {
		this.initialBulletCount = 20;
	} else {
		this.initialBulletCount = 10;
	}
	
	this.currentBulletCount = this.initialBulletCount;

	if (this.game.currentLevelNum === 3) {
		this.initGun();	
	}
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

Ship.prototype.isOffScreen = function () {
	return this.bottomRightX() < 0 || this.bottomLeftX() > canvas.width;
}

Ship.prototype.initGun = function () {
	var that = this;
	addEventListener("keypress", this.fireGun.bind(this));
	$('.ammo-bar-zone').removeClass('hidden');
}

Ship.prototype.fireGun = function (e, ship) {
	if (e.keyCode == 102 && this.currentBulletCount > 0) {
		this.level.bullets = this.level.bullets || [];
		var bullet = new Bullet(this.level, this.game, this.xMid, this.yTop);
		this.level.addObj(bullet, bullet.objType);
		this.currentBulletCount -= 1;
		shortenAmmoBar(this);
	}
};

Ship.prototype.refillGun = function () {
	this.currentBulletCount = this.initialBulletCount;
	refillAmmoBar(this);
}

Ship.prototype.justCrashed = function () {
	this.crashed = true;
	removeEventListener("keypress", this.fireGun.bind(this));
}