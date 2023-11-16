// Create drawing variables
var canvas;
var ctx;

// Create game variables
var gameLoop;
var player;
var borders = [];

var upKey;
var downKey;
var leftKey;
var rightKey;

// Runs once page has loaded
window.onload = function() {
	// Assign canvas and context variables
	canvas = document.getElementById("game-canvas");
	ctx = canvas.getContext("2d");

	// Setup key listeners
	setupInputs();

	// Create player
	player = new Player(100, 400);

	// Create Borders
	for (let i = 0; i < 6; i++) {
		borders.push(new Border(100 * i, 620, 100, 100, 1));
	}
	borders.push(new Border(0, 520, 100, 100, 2));

	for (let i = 0; i < 3; i++) {
		borders.push(new Border(600, 420 + 100 * i, 100, 100, 2));
	}

	// Start game loop
	gameLoop = setInterval(step, 1000/30);

   // Draw on canvas
   ctx.fillStyle = "white";
   ctx.fillRect(0,0,1280,720);
}

function step() {
  // Step player
  player.step();


	// Draw everything
  draw();
}

function draw() {
  // Clear the canvas
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,1280,720);


	// Draw the player
	player.draw();

	// Draw the borders

	for (let i = 0; i < borders.length; i++) {
		borders[i].draw();
	}
}

function setupInputs() {
	document.addEventListener("keydown", function(event) {
		if (event.key === "w" || event.key === "ArrowUp") {
			upKey = true;
		} else if (event.key === "a" || event.key === "ArrowLeft") {
			leftKey = true;
		} else if (event.key === "s" || event.key === "ArrowDown") {
			downKey = true;
		} else if (event.key === "d" || event.key === "ArrowRight") {
			rightKey = true;
		}
	});

	document.addEventListener("keyup", function(event) {
		if (event.key === "w" || event.key === "ArrowUp") {
			upKey = false;
		} else if (event.key === "a" || event.key === "ArrowLeft") {
			leftKey = false;
		} else if (event.key === "s" || event.key === "ArrowDown") {
			downKey = false;
		} else if (event.key === "d" || event.key === "ArrowRight") {
			rightKey = false;
		}
	});
}

function checkIntersection(r1, r2) {
	if (r1.x >= r2.x + r2.width) {
		return false;
	} else if (r1.x + r1.width <= r2.x) {
		return false;
	} else if (r1.y >= r2.y + r2.height) {
		return false;
	} else if (r1.y + r1.height <= r2.y) {
		return false;
	} else {
		return true;
	}
}