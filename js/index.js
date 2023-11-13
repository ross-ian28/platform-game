// Create drawing variables
var canvas;
var ctx;

// Runs once page has loaded
window.onload = function() {
	// Assign canvas and context variables
	canvas = document.getElementById("game-canvas");
	ctx = canvas.getContext("2d");


	// Draw on canvas
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,1280,720);
}