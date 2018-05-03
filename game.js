var canvW, canvH;
var canvas;
var textBox;

waitForElement("#container", function() {
	Start();
});

function Start() {
	initializeEngine("");
	canvW = window.innerWidth;
	canvH = window.innerHeight;
	canvas = createCanvas(canvW, canvH);
	var ctx = canvas.getContext("2d");
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	
	//new Text("The Beast", 20, 45, "left", "12", "white", 1);
	
	textBox = new Sprite(0,0);
	textBox.setCostume("ministry-of-love/game_engine/images/text-box.png");
	
	setInterval(function() {
		Update();
	}, 1000/60);
}

function Update() {
	// Code goes under here
	
	// --------------------
	drawCanvas();
}



//----MISC----//

function lerp(a, b, f) {
	return a + f * (b - a);
}

function waitForElement(elementPath, callback) {
	window.setTimeout(function() {
		if($(elementPath).length) {
			callback(elementPath, $(elementPath));
		} else {
			waitForElement(elementPath, callback);
		}
	}, 500)
}
