window.onload = function () {
	// Set up canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d'); 
	canvas.width = 800;
	canvas.height = 400;

	// Set up game objects
	var hero = {
		speed: 300 // movement in pixels per second
	, x: canvas.width / 2
	, y: canvas.height / 2
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

	// Update position of hero object
	var updatePosition = function (modifier) {
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
	};

	// Draw the hero
	var drawHero = function(x, y){
		var x = x || 200;
		var y = y || 200;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + 20, y);
		ctx.lineTo(x + 10, y - 20);
		ctx.fill();
	}	

	// The main game loop
	var mainLoop = function () {
		var now = Date.now();
		var delta = now - then;

		updatePosition(delta / 1000);
		drawHero(hero.x, hero.y);

		then = now;
	};

	// Run loop
	setInterval(mainLoop, 1); // Execute as fast as possible	
}