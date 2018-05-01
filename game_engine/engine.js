var ctx, c;

var mouseX = [-1, -1, -1], mouseY = [-1, -1, -1], mouseDown = false;
var ongoingTouches = [];

var container;

var engine_buttons = [];
var engine_texts = [];
var engine_images = [];
var engine_rectangles = [];
var engine_sprites = [];

var backgroundColor = "#000000";

var gameRoot = "";
var engineRoot = "";

window.addEventListener('load', function() {
	container = document.createElement("div");
	container.id = "container";
	document.body.appendChild(container);
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		function reorient(e) {
			var portrait = (window.orientation % 180 == 0);
			$("body > div").css("-webkit-transform", !portrait ? "rotate(-90deg)" : "");
			$("body > div").css("-webkit-transform-origin", "left top");
			$("body > div").css("-webkit-transition", "all 1s ease-in-out");
		}
	}
	var scripts = document.getElementsByTagName("script");
	for(var i = 0; i < scripts.length; i++) {
		if(scripts[i].src.split("/")[scripts[i].src.split("/").length-1] == "engine.js") {
			engineRoot = scripts[i].src.substring(0, scripts[i].src.lastIndexOf("/") + 1);
		}
	}
});

function initializeEngine(root) {
	gameRoot = root;
}

function createCanvas(width, height) {
	var canv = document.createElement("canvas");
	canv.width = width;
	canv.height = height;
	container.appendChild(canv);
	c = canv;
	ctx = c.getContext("2d");
	
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		c.addEventListener("touchstart", getMouseDown, false);
		c.addEventListener("touchend", getMouseUp, false);
		c.addEventListener("touchcancel", getMouseCancel, false);
		c.addEventListener("touchmove", getMouseMove, false);
	} else {/*
		c.addEventListener("mousestart", getMouseDown, false);
		c.addEventListener("mouseend", getMouseUp, false);
		c.addEventListener("mousecancel", getMouseCancel, false);
		c.addEventListener("mousemove", getMouseMove, false);
		*/
	}
	return c;
}

function Button(x, y, w, h, text) {
	this.type = "button";
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.text = text;
	this.index = engine_buttons.length;
	this.pressed = false;
	this.down = false;
	this.downLastFrame = false;
	this.up = false;
	this.frames = 0;
	this.hidden = false;
	this.color = "#444444";
	this.stroke = 0;
	this.strokeColor = "#000000";
	this.layer = getTotalObjects();
	this.remove = function() {
		for(i = this.index+1; i < engine_buttons.length; i++) {
			engine_buttons[i].index--;
		}
		engine_buttons.splice(this.index, 1);
	}
	engine_buttons.push(this);
}

function Text(text, x, y, align, fontSize, color, weight) {
	this.type = "text";
	this.text = text;
	this.x = x;
	this.y = y;
	this.align = align;
	this.fontSize = fontSize;
	this.color = color;
	this.weight = weight;
	this.index = engine_texts.length;
	this.hidden = false;
	this.layer = getTotalObjects();
	this.remove = function() {
		for(i = this.index+1; i < engine_texts.length; i++) {
			engine_texts[i].index--;
		}
		engine_texts.splice(this.index, 1);
	}
	engine_texts.push(this);
}

function Picture(path, x, y) {
	this.type = "picture";
	this.path = gameRoot + "/images/" + path;
	this.x = x;
	this.y = y;
	this.img = new Image();
	var imgW, imgH;
	this.img.addEventListener("load", function() {
		imgW = this.naturalWidth;
		imgH = this.naturalheight;
	});
	this.img.src = this.path;
	this.w = imgW;
	this.h = imgH;
	this.index = engine_images.length;
	this.hidden = false;
	this.layer = getTotalObjects();
	this.remove = function() {
		for(i = this.index+1; i < engine_images.length; i++) {
			engine_images[i].index--;
		}
		engine_images.splice(this.index, 1);
	}
	engine_images.push(this);
}

function Rectangle(x, y, w, h, color, stroke, strokeColor) {
	this.type = "rectangle";
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
	this.stroke = 0;
	if(stroke != 0) {
		this.stroke = stroke;
		this.strokeColor = strokeColor;
	} else {
		this.stroke = 0;
		this.strokeColor = "#000000";
	}
	this.index = engine_rectangles.length;
	this.hidden = false;
	this.layer = getTotalObjects();
	this.remove = function() {
		for(i = this.index+1; i < engine_rectangles.length; i++) {
			engine_rectangles[i].index--;
		}
		engine_rectangles.splice(this.index, 1);
	}
	this.show = function() {
		this.hidden = false;
	}
	this.hide = function() {
		this.hidden = true;
	}
	engine_rectangles.push(this);
}

function Sprite(x, y) {
	this.type = "sprite";
	this.x = x;
	this.y = y;
	this.costumeName = "spriteplaceholder.png";
	this.path = engineRoot + "images/" + this.costumeName;
	var imgObject = new Image();
	imgObject.src = this.path;
	this.costume = imgObject;
	this.w = 1;
	this.h = 1;
	this.index = engine_sprites.length;
	this.hidden = false;
	this.layer = getTotalObjects();
	this.setCostume = function(path) {
		this.costumeName = path;
		this.path = gameRoot + "/images/" + this.costumeName;
		var newImgObject = new Image();
		newImgObject.src = this.path;
		this.costume = newImgObject;
	}
	this.remove = function() {
		for(i = this.index+1; i < engine_sprites.length; i++) {
			engine_sprites[i].index--;
		}
		engine_sprites.splice(this.index, 1);
	}
	this.show = function() {
		this.hidden = false;
	}
	this.hide = function() {
		this.hidden = true;
	}
	engine_sprites.push(this);
}

function buttonDown(btn) {
	btn.downLastFrame = btn.down;
	btn.down = false;
	for(var i = 0; i < mouseX.length; i++) {
		if(mouseX[i] > btn.x && mouseX[i] < btn.x + btn.w && mouseY[i] > btn.y && mouseY[i] < btn.y + btn.h && mouseDown == true) {
			btn.down = true;
		}
	}
	engine_buttons[btn.index] = btn;
	return btn.down;
}

function buttonUp(btn) {
	if(btn.up) btn.up = false;
	if(btn.down == false && btn.downLastFrame == true) {
		btn.up = true;
		engine_buttons[btn.index] = btn;
		return true;
	}
}

function buttonPressed(btn) {
	if(btn.pressed) btn.pressed = false;
	if(btn.down) {
		btn.frames++;
	}
	if(btn.up && btn.frames > 0 && btn.frames <= 20) {
		btn.pressed = true;
	}
	if(btn.up) btn.frames = 0;
	engine_buttons[btn.index] = btn;
	return btn.pressed;
}

function updateButtons() {
	for(var i = 0; i < engine_buttons.length; i++) {
		if(engine_buttons[i].hidden == false) {
			buttonDown(engine_buttons[i]);
			buttonUp(engine_buttons[i]);
			buttonPressed(engine_buttons[i]);
		}
	}
}

function setBackgroundColor(color) {
	backgroundColor = color;
}

function drawCanvas() {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, c.width, c.height);
	
	var currentLayer = 0;
	var engine_objects = [];
	engine_objects.push.apply(engine_objects, engine_buttons);
	engine_objects.push.apply(engine_objects, engine_images);
	engine_objects.push.apply(engine_objects, engine_rectangles);
	engine_objects.push.apply(engine_objects, engine_sprites);
	engine_objects.push.apply(engine_objects, engine_texts);
	
	engine_objects.sort(function(a, b){return a.layer-b.layer});
	
	for(i = 0; i < engine_objects.length; i++) {
		if(engine_objects[i].hidden == false) {
			//Draw engine_buttons
			if(engine_objects[i].type == "button") {
				ctx.fillStyle = engine_objects[i].color;
				if(engine_objects[i].down) {
					ctx.fillStyle = getDarkerColor(engine_objects[i].color);
				}
				ctx.fillRect(engine_objects[i].x, engine_objects[i].y, engine_objects[i].w, engine_objects[i].h);
				if(engine_objects[i].stroke) {
					ctx.strokeStyle = engine_objects[i].strokeColor;
					ctx.strokeRect(engine_objects[i].x, engine_objects[i].y, engine_objects[i].w, engine_objects[i].h);
				}
				ctx.fillStyle = "#ffffff";
				ctx.font = "normal 15px Verdana";
				ctx.textAlign = "center";
				if(engine_objects[i].text != "")
					ctx.fillText(engine_objects[i].text, engine_objects[i].x + engine_objects[i].w/2, engine_objects[i].y + engine_objects[i].h/2 + 5);
			}
			if(engine_objects[i].type == "text") {
				ctx.fillStyle = engine_objects[i].color;
				ctx.font = engine_objects[i].weight + " " + engine_objects[i].fontSize + " Verdana";
				ctx.textAlign = engine_objects[i].align;
				ctx.fillText(engine_objects[i].text, engine_objects[i].x, engine_objects[i].y);
			}
			if(engine_objects[i].type == "rectangle") {
				ctx.fillStyle = engine_objects[i].color;
				ctx.fillRect(engine_objects[i].x, engine_objects[i].y, engine_objects[i].w, engine_objects[i].h);
				if(engine_objects[i].stroke) {
					ctx.strokeStyle = engine_objects[i].strokeColor;
					ctx.strokeRect(engine_objects[i].x, engine_objects[i].y, engine_objects[i].w, engine_objects[i].h);
				}
			}
			if(engine_objects[i].type == "picture") {
				engine_objects[i].img.onload = function() {
					ctx.drawImage(engine_objects[i].img, engine_objects[i].x, engine_objects[i].y, engine_objects[i].w, engine_objects[i].h);
				};
			}
			if(engine_objects[i].type == "sprite") {
				if(engine_objects[i].hidden == false && imageLoaded(engine_objects[i].costume)) {
					var width = engine_objects[i].costume.width;
					var height = engine_objects[i].costume.width;
					ctx.drawImage(engine_objects[i].costume, engine_objects[i].x, engine_objects[i].y, width * engine_objects[i].w, height * engine_objects[i].h);
				} else {
					console.log("Sprite " + engine_objects[i].path + " hidden or not loaded");
				}
			}
		}
	}
}


//TOUCH AND MOUSE FUNCTIONS


function getMouseDown (e) {
	if(isWebApp())
		e.preventDefault();
	mouseDown = true;
	var touches = e.changedTouches;
	for(var i = 0; i < touches.length; i++) {
		ongoingTouches.push(copyTouch(touches[i]));
	}
	for(var j = 0; j < ongoingTouches.length; j++) {
		mouseX[j] = ongoingTouches[j].pageX;
		mouseY[j] = ongoingTouches[j].pageY;
	}
}
function getMouseUp (e) {
	if(isWebApp())
		e.preventDefault();
	var touches = e.changedTouches;
	for(var i = 0; i < touches.length; i++) {
		var idx = ongoingTouchIndexById(touches[i].identifier);
		ongoingTouches.splice(idx, 1);
	}
	for(var j = 0; j < mouseX.length; j++) {
		if(ongoingTouches != null) {
			mouseX[j] = -1;
			mouseY[j] = -1;
		}
	}
    for(var j = 0; j < ongoingTouches.length; j++) {
		mouseX[j] = ongoingTouches[j].pageX;
		mouseY[j] = ongoingTouches[j].pageY;
	}
	if(ongoingTouches.length == 0) mouseDown = false;
}
function getMouseCancel(e) {
	if(isWebApp())
		e.preventDefault();
	var touches = e.changedTouches;
	for(var i = 0; i < touches.length; i++) {
		var idx = ongoingTouchIndexById(touches[i].identifier);
		ongoingTouches.splice(idx, 1);
	}
}
function getMouseMove(e) {
	console.log(isWebApp());
	if(isWebApp())
		e.preventDefault();
	var touches = e.changedTouches;
	for(var i = 0; i < touches.length; i++) {
		var idx = ongoingTouchIndexById(touches[i].identifier);
		ongoingTouches.splice(idx, 1, copyTouch(touches[i]));
	}
	for(var j = 0; j < ongoingTouches.length; j++) {
		mouseX[j] = ongoingTouches[j].pageX;
		mouseY[j] = ongoingTouches[j].pageY;
	}
}

function copyTouch(touch) {
  return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}

function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;
    
    if (id == idToFind) {
      return i;
    }
  }
  return -1;
}





//MISC

function isWebApp() {
	return (/iPhone|iPad|iPod/i.test(navigator.userAgent) && "standalone" in window.navigator && window.navigator.standalone);
}

function getBrighterColor(inputcol) {
	var outp = "#";
	for(var i = 1; i < inputcol.length; i++) {
		if(inputcol.substring(i, i+1) == "0") outp += "1";
		if(inputcol.substring(i, i+1) == "1") outp += "2";
		if(inputcol.substring(i, i+1) == "2") outp += "3";
		if(inputcol.substring(i, i+1) == "3") outp += "4";
		if(inputcol.substring(i, i+1) == "4") outp += "5";
		if(inputcol.substring(i, i+1) == "5") outp += "6";
		if(inputcol.substring(i, i+1) == "6") outp += "7";
		if(inputcol.substring(i, i+1) == "7") outp += "8";
		if(inputcol.substring(i, i+1) == "8") outp += "9";
		if(inputcol.substring(i, i+1) == "9") outp += "a";
		if(inputcol.substring(i, i+1) == "a") outp += "b";
		if(inputcol.substring(i, i+1) == "b") outp += "c";
		if(inputcol.substring(i, i+1) == "c") outp += "d";
		if(inputcol.substring(i, i+1) == "d") outp += "e";
		if(inputcol.substring(i, i+1) == "e") outp += "f";
		if(inputcol.substring(i, i+1) == "f") outp += "f";
	}
	return outp;
}

function getDarkerColor(inputcol) {
	var outp = "#";
	for(var i = 1; i < inputcol.length; i++) {
		if(inputcol.substring(i, i+1) == "0") outp += "0";
		if(inputcol.substring(i, i+1) == "1") outp += "0";
		if(inputcol.substring(i, i+1) == "2") outp += "1";
		if(inputcol.substring(i, i+1) == "3") outp += "2";
		if(inputcol.substring(i, i+1) == "4") outp += "3";
		if(inputcol.substring(i, i+1) == "5") outp += "4";
		if(inputcol.substring(i, i+1) == "6") outp += "5";
		if(inputcol.substring(i, i+1) == "7") outp += "6";
		if(inputcol.substring(i, i+1) == "8") outp += "7";
		if(inputcol.substring(i, i+1) == "9") outp += "8";
		if(inputcol.substring(i, i+1) == "a") outp += "9";
		if(inputcol.substring(i, i+1) == "b") outp += "a";
		if(inputcol.substring(i, i+1) == "c") outp += "b";
		if(inputcol.substring(i, i+1) == "d") outp += "c";
		if(inputcol.substring(i, i+1) == "e") outp += "d";
		if(inputcol.substring(i, i+1) == "f") outp += "e";
	}
	return outp;
}

function imageLoaded(img) {
	if(!img.complete) return false;
	if(typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) return false;
	return true;
}

function scalePreserveAspectRatio(imgW, imgH, maxW, maxH) {
	return(Math.min((maxW/imgW), (maxH/imgH)));
}

function getTotalObjects() {
	return engine_buttons.length + engine_images.length + engine_rectangles.length + engine_sprites.length + engine_texts.length;
}
