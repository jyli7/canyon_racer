window.onload = function () {
	// Set up canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d'); 
	canvas.width = 400;
	canvas.height = 200;

	// Set up game objects
	var ship = { speed: 150 };
	var canyon = {
		startGap: 100
	, gapSize: 80
	, yPosition: 100
	};

	// Handle keyboard controls
	var keysHeldDown = {};
	var then = Date.now();

	// Setup keyup, keydown listeners
	addEventListener("keydown", function (e) {
		keysHeldDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysHeldDown[e.keyCode];
	}, false);

	// Set ship and canyon positions
	var reset = function () {
		ship.x = canvas.width / 2;
		ship.y = canvas.height - 10;

		var canyonUpperYBound = 10;
		var canyonLowerYBound = 100;
		var canyonMinGapSize = 25;
		var canyonMaxGapSize = 75;
		var canyonUpperXBound = canvas.width - canyonMinGapSize;

		canyon.startGap = Math.random() * canyonUpperXBound;
		canyon.gapSize = Math.floor((Math.random() * (canyonMaxGapSize - canyonMinGapSize)) + canyonMinGapSize);
		canyon.yPosition = Math.floor(canyonLowerYBound - (Math.random() * (canyonLowerYBound - canyonUpperYBound)));
	}

	// Draw the canyon
	var drawCanyon = function () {
		ctx.beginPath();
		ctx.moveTo(0, canyon.yPosition);
		ctx.lineTo(canyon.startGap, canyon.yPosition);
		ctx.stroke();

		ctx.moveTo(canyon.startGap + canyon.gapSize, canyon.yPosition);
		ctx.lineTo(canvas.width, canyon.yPosition);
		ctx.stroke();
	};

	// Draw the ship
	var drawShip = function(){
		ctx.beginPath();
		ctx.moveTo(ship.x, ship.y);
		ctx.lineTo(ship.x + 20, ship.y);
		ctx.lineTo(ship.x + 10, ship.y - 20);
		ctx.fill();
	};

	var collision = function () {
		return (ship.x <= canyon.startGap || ship.x >= (canyon.startGap + canyon.gapSize))
			&& (ship.y <= (canyon.yPosition + 10) && ship.y >= (canyon.yPosition - 10))
	}

	var success = function () {
		return ship.y <= 5;
	}

	// Update position of ship object, check for end states
	var updateState = function (elapsedTime) {
		// Player holding up
		if (38 in keysHeldDown) { ship.y -= ship.speed * elapsedTime; }
		
		// Player holding down
		if (40 in keysHeldDown) { ship.y += ship.speed * elapsedTime; }
		
		// Player holding left
		if (37 in keysHeldDown) { ship.x -= ship.speed * elapsedTime; }
		
		// Player holding right
		if (39 in keysHeldDown) { ship.x += ship.speed * elapsedTime; }

		// Check for potential end states
		if ( collision() ) {
			console.log('collision!');
			reset();
		} else if ( success() ) {
			console.log('you won!');
			reset();
		}
	};

	// The main game loop
	var mainLoop = function () {
		var now = Date.now();
		var delta = now - then;

		updateState(delta / 1000);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawShip();
		drawCanyon();

		then = now;
	};

	// Start game, run game loop
	reset();
	setInterval(mainLoop, 1); // Execute as fast as possible	
}