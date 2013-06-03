window.onload = function () {
	// Set up canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d'); 
	canvas.width = 400;
	canvas.height = 200;

	// Set up game objects
	var hero = { speed: 150 };
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

	var reset = function () {
		// Put hero in starting position
		hero.x = canvas.width / 2;
		hero.y = canvas.height - 10;

		var canyonUpperYBound = 10;
		var canyonLowerYBound = 100;
		var canyonMinGapSize = 25;
		var canyonMaxGapSize = 75;
		var canyonUpperXBound = canvas.width - canyonMinGapSize;

		canyon.startGap = Math.random() * canyonUpperXBound;
		canyon.gapSize = Math.floor((Math.random() * (canyonMaxGapSize - canyonMinGapSize)) + canyonMinGapSize);
		canyon.yPosition = Math.floor(canyonLowerYBound - (Math.random() * (canyonLowerYBound - canyonUpperYBound)));
	}

	var drawCanyon = function () {
		ctx.beginPath();
		ctx.moveTo(0, canyon.yPosition);
		ctx.lineTo(canyon.startGap, canyon.yPosition);
		ctx.stroke();

		ctx.moveTo(canyon.startGap + canyon.gapSize, canyon.yPosition);
		ctx.lineTo(canvas.width, canyon.yPosition);
		ctx.stroke();
	};

	// Draw the hero
	var drawHero = function(){
		ctx.beginPath();
		ctx.moveTo(hero.x, hero.y);
		ctx.lineTo(hero.x + 20, hero.y);
		ctx.lineTo(hero.x + 10, hero.y - 20);
		ctx.fill();
	};

	var collision = function () {
		return (hero.x <= canyon.startGap || hero.x >= (canyon.startGap + canyon.gapSize))
			&& (hero.y <= (canyon.yPosition + 10) && hero.y >= (canyon.yPosition - 10))
	}

	var success = function () {
		return hero.y <= 5;
	}

	// Update position of hero object
	var update = function (modifier) {
		if (38 in keysHeldDown) { // Player holding up
			hero.y -= hero.speed * modifier;
		}
		if (40 in keysHeldDown) { // Player holding down
			hero.y += hero.speed * modifier;
		}
		if (37 in keysHeldDown) { // Player holding left
			hero.x -= hero.speed * modifier;
		}
		if (39 in keysHeldDown) { // Player holding right
			hero.x += hero.speed * modifier;
		}

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

		update(delta / 1000);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawHero();
		drawCanyon();

		then = now;
	};

	// Run loop
	reset();
	setInterval(mainLoop, 1); // Execute as fast as possible	
}