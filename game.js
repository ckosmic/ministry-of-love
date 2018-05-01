var buttons = [];
var beast;
var player = [];
var diss;
var msgText;
var foodItem;

var canvW, canvH;

var healthBarBeast, healthBarPlayer;
var energyBarBeast, energyBarPlayer;
var foodBarPlayer = [], foodBarBeast = [];

var scores = [];
var usernames = [];

var finishFade;
var finishBox = [];
var fbX, fbY;

var myUsername;
var loggedIn = false;

var turn = 0;
var healthBeast = 100, healthPlayer = 100;
var energyBeast = 100, energyPlayer = 100;
var score = 0;
var scoreMultiplier = 1;

var gameData = [];
var otherData = [];

var customizing = false;

var canvas;
var loggingIn = false;

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
	
	new Text("The Beast", 20, 45, "left", "12", "white", 1);
	
	setInterval(function() {
		Update();
	}, 1000/60);
}

function Update() {
	
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
