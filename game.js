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
	initializeEngine("/misc/beast");
	canvW = window.innerWidth;
	canvH = window.innerHeight;
	canvas = createCanvas(canvW, canvH);
	var ctx = canvas.getContext("2d");
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	
	//myUsername = document.getElementById("myusername").innerHTML;
	
	beast = new Sprite(125, 0);
	beast.setCostume("stance1.png");
	beast.setCostume("stance2.png");
	beast.setCostume("stance3.png");
	beast.w = 4;
	beast.h = 4;
	beast.health = 100;
	beast.energy = 100;
	beast.food = 5;
	
	var playerX = 0, playerY = canvH-(64*3.6)*2.1;
	
	player.health = 100;
	player.energy = 100;
	player.food = 5;
	
	player.hands = new Sprite(playerX, playerY);
	player.hands.setCostume("hands_white_idle.png");
	player.hands.w = 4;
	player.hands.h = 4;
	
	player.head = new Sprite(playerX, playerY);
	player.head.setCostume("head_white.png");
	player.head.w = 4;
	player.head.h = 4;
	
	player.shirt = new Sprite(playerX, playerY);
	player.shirt.setCostume("shirt_white_idle.png");
	player.shirt.w = 4;
	player.shirt.h = 4;
	
	diss = new Sprite(210, 145);
	diss.setCostume("diss.png");
	diss.w = 4;
	diss.h = 4;
	diss.hidden = true;
	
	msgText = new Text("Message", 80, 150, "left", "16", "white", "10");
	msgText.hidden = true;
	
	foodItem = new Sprite(200, 300);
	foodItem.setCostume("ultimatum.png");
	foodItem.w = 2;
	foodItem.h = 1;
	foodItem.hidden = true;
	
	//Menu background
	var menubg = new Rectangle(0, canvH-64*3.6, canvW, canvH, "#555566");
	
	var btnW = window.innerWidth / 1.33;
	buttons[0] = new Button(window.innerWidth/2 - btnW/2, menubg.y + 20, btnW, 30, "Attack");
	buttons[0].stroke = 4;
	
	buttons[1] = new Button(window.innerWidth/2 - btnW/2, menubg.y + 60, btnW, 30, "Diss");
	buttons[1].stroke = 4;
	
	buttons[2] = new Button(window.innerWidth/2 - btnW/2, menubg.y + 120, btnW, 30, "Eat");
	buttons[2].stroke = 4;
	
	buttons[3] = new Button(window.innerWidth/2 - btnW/2, menubg.y + 180, btnW, 30, "Customize");
	buttons[3].stroke = 4;
	buttons[3].hidden = true;
	
	buttons[4] = new Button(window.innerWidth/2 - btnW/2, menubg.y + 20, btnW, 30, "Shirt color");
	buttons[4].stroke = 4;
	buttons[5] = new Button(window.innerWidth/2 - btnW/2, menubg.y + 60, btnW, 30, "Head color");
	buttons[5].stroke = 4;
	buttons[6] = new Button(window.innerWidth/2 - btnW/2, menubg.y + 100, btnW, 30, "Hands color");
	buttons[6].stroke = 4;
	buttons[7] = new Button(window.innerWidth/2 - btnW/2, menubg.y + 160, btnW, 30, "Back");
	buttons[7].stroke = 4;
	buttons[4].hidden = true;
	buttons[5].hidden = true;
	buttons[6].hidden = true;
	buttons[7].hidden = true;
	buttons[8] = new Button(window.innerWidth - 120, 20, 100, 30, "Login");
	
	new Text("The Beast", 20, 45, "left", "12", "white", 1);
	new Rectangle(20, 50, 120, 20, "#333");
	
	healthBarBeast = new Rectangle(20+3, 50+3, (120-6) * beast.health / 100, 4, "#009900");
	energyBarBeast = new Rectangle(20+3, 50+8, (120-6) * beast.energy / 100, 4, "#ce3bce");
	
	var plyName = new Text("Player", 20, 95, "left", "12", "white", 1);
	new Rectangle(20, 100, 120, 20, "#333");
	
	healthBarPlayer = new Rectangle(20+3, 100+3, (120-6) * player.health / 100, 4, "#009900");
	energyBarPlayer = new Rectangle(20+3, 100+8, (120-6) * player.energy / 100, 4, "#ce3bce");
	
	foodBarPlayer[0] = new Rectangle(20+4, 100+13, (120-6) * 1/5 - 2, 4, "#9e845d");
	foodBarPlayer[1] = new Rectangle(20+4 + (120-6) * 1/5, 100+13, (120-6) * 1/5 - 2, 4, "#9e845d");
	foodBarPlayer[2] = new Rectangle(20+4 + (120-6) * 2/5, 100+13, (120-6) * 1/5 - 2, 4, "#9e845d");
	foodBarPlayer[3] = new Rectangle(20+4 + (120-6) * 3/5, 100+13, (120-6) * 1/5 - 2, 4, "#9e845d");
	foodBarPlayer[4] = new Rectangle(20+4 + (120-6) * 4/5, 100+13, (120-6) * 1/5 - 2, 4, "#9e845d");
	
	foodBarBeast[0] = new Rectangle(20+4, 50+13, (120-6) * 1/5 - 2, 4, "#9e845d");
	foodBarBeast[1] = new Rectangle(20+4 + (120-6) * 1/5, 50+13, (120-6) * 1/5 - 2, 4, "#9e845d");
	foodBarBeast[2] = new Rectangle(20+4 + (120-6) * 2/5, 50+13, (120-6) * 1/5 - 2, 4, "#9e845d");
	foodBarBeast[3] = new Rectangle(20+4 + (120-6) * 3/5, 50+13, (120-6) * 1/5 - 2, 4, "#9e845d");
	foodBarBeast[4] = new Rectangle(20+4 + (120-6) * 4/5, 50+13, (120-6) * 1/5 - 2, 4, "#9e845d");
	
	finishFade = new Rectangle(0, 0, window.innerWidth, canvH, "rgba(255, 255, 255, 0.0)");
	finishFade.hidden = true;
	
	fbX = window.innerWidth/2 - btnW/2;
	//fbY = window.innerHeight/2 - 200;
	fbY = canvH+10;
	
	finishBox[0] = new Rectangle(fbX, fbY, btnW, 400, "#333333");
	finishBox[0].stroke = 4;
	finishBox[1] = new Text("Time Over", window.innerWidth/2, fbY+40, "center", "20px", "white", "bold");
	finishBox[2] = new Rectangle(fbX + (btnW/3), fbY+50, btnW/3, 3, "#ffffff");
	finishBox[3] = new Text("Score: 0", fbX + 30, fbY+80, "left", "17px", "white", "normal");
	finishBox[4] = new Text("High Score: 0", fbX + 30, fbY+110, "left", "17px", "white", "normal");
	finishBox[5] = new Text("High Scores", window.innerWidth/2, fbY+160, "center", "20px", "white", "bold");
	finishBox[6] = new Rectangle(fbX + (btnW/3), fbY+170, btnW/3, 3, "#ffffff");
	finishBox[7] = new Text("1. Username - 10", fbX + 30, fbY+200, "left", "17px", "white", "normal");
	finishBox[8] = new Text("2. Username - 10", fbX + 30, fbY+220, "left", "17px", "white", "normal");
	finishBox[9] = new Text("3. Username - 10", fbX + 30, fbY+240, "left", "17px", "white", "normal");
	finishBox[10] = new Text("4. Username - 10", fbX + 30, fbY+260, "left", "17px", "white", "normal");
	finishBox[11] = new Text("5. Username - 10", fbX + 30, fbY+280, "left", "17px", "white", "normal");
	finishBox[12] = new Button(window.innerWidth/2 - btnW/4, fbY + 320, btnW/2, 30, "Play again");
	finishBox[12].stroke = 2;
	
	var stanceDirection = 0;
	setInterval(function() {
		if(beast.costumeName === "stance1.png") {
			stanceDirection = 0;
			beast.setCostume("stance2.png");
		} else if (beast.costumeName === "stance2.png" && stanceDirection === 0) {
			beast.setCostume("stance3.png");
		} else if (beast.costumeName === "stance2.png" && stanceDirection === 1) {
			beast.setCostume("stance1.png");
		} else if (beast.costumeName === "stance3.png") {
			stanceDirection = 1;
			beast.setCostume("stance2.png");
		}
	}, 300);
	
	myUsername = document.getElementById("username").innerHTML;
	if(myUsername != null && myUsername != "") {
		loggedIn = true;
		plyName.text = myUsername;
		buttons[3].hidden = false;
		buttons[8].hidden = true;
	}
	
	otherData = document.getElementById("beast_data").innerHTML.split(" ");
	
	getMyData();
	updateGameData();
	
	setAvatar();
	
	setInterval(function() {
		if(loggingIn == false)
			Update();
	}, 1000/60);
}

function Update() {
	buttons[2].text = "Eat";
	updateButtons();
	if(buttons[0].pressed && turn == 0) {
		hurtBeast(10);
	}
	if(buttons[1].pressed && turn == 0) {
		dissBeast();
	}
	if(buttons[2].pressed && turn == 0 && player.food > 0) {
		eatFood();
	}
	if(buttons[3].pressed) {
		buttons[3].pressed = false;
		customizing = true;
	}
	if(buttons[4].pressed) {
		gameData[1]++;
		if(gameData[1] == 6) gameData[1] = 0;
		setAvatar();
	}
	if(buttons[5].pressed) {
		gameData[2]++;
		if(gameData[2] == 3) gameData[2] = 0;
		setAvatar();
	}
	if(buttons[6].pressed) {
		gameData[3]++;
		if(gameData[3] == 4) gameData[3] = 0;
		setAvatar();
	}
	if(buttons[7].pressed) {
		buttons[7].pressed = false;
		customizing = false;
		updateGameData();
	}
	if(buttons[8].pressed) {
		canvas.style.display = "none";
		document.getElementById("divLogin").style.display = "inline";
		loggingIn = true;
	}
	if(customizing == true) {
		buttons[0].hidden = true;
		buttons[1].hidden = true;
		buttons[2].hidden = true;
		buttons[3].hidden = true;
		buttons[4].hidden = false;
		buttons[5].hidden = false;
		buttons[6].hidden = false;
		buttons[7].hidden = false;
	} else {
		buttons[0].hidden = false;
		buttons[1].hidden = false;
		buttons[2].hidden = false;
		if(loggedIn)
			buttons[3].hidden = false;
		buttons[4].hidden = true;
		buttons[5].hidden = true;
		buttons[6].hidden = true;
		buttons[7].hidden = true;
	}
	if(finishBox[12].pressed) {
		location.reload();
	}
	for(i = 0; i < buttons.length; i++) {
		if(i != 8) {
			if(turn == 0)
				buttons[i].color = "#444444";
			else {
				buttons[i].color = "#666666";
			}
		}
	}
	if(turn == 1) {
		turn = 2;
		var randNum = Math.round(Math.random() * 2);
		if(randNum == 0) {
			battto = setTimeout(beastAttack, Math.random() * 1000 + 1000);
		} else if(randNum == 1) {
			battto = setTimeout(dissPlayer, Math.random() * 1000 + 1000);
		} else if(randNum == 2) {
			if(beast.food > 0 && beast.energy < 100) {
				battto = setTimeout(beastEatFood, Math.random() * 1000 + 1000);
			} else {
				battto = setTimeout(beastAttack, Math.random() * 1000 + 1000);
			}
		}
	}
	
	for(i = 0; i < foodBarPlayer.length; i++) {
		foodBarPlayer[i].hidden = true;
		if(player.food >= i + 1)
			foodBarPlayer[i].hidden = false;
	}
	for(i = 0; i < foodBarBeast.length; i++) {
		foodBarBeast[i].hidden = true;
		if(beast.food >= i + 1)
			foodBarBeast[i].hidden = false;
	}
	
	if(beast.health < 0) beast.health = 0;
	if(player.health < 0) player.health = 0;
	if(beast.health > 100) beast.health = 100;
	if(player.health > 100) player.health = 100;
	
	if(beast.energy < 0) beast.energy = 0;
	if(player.energy < 0) player.energy = 0;
	if(beast.energy > 100) beast.energy = 100;
	if(player.energy > 100) player.energy = 100;
	
	if(beast.food < 0) beast.food = 0;
	if(player.food < 0) player.food = 0;
	if(beast.food > 5) beast.food = 5;
	if(player.food > 5) player.food = 5;
	
	if(player.health == 0) {
		player.health = 1;
		finishGame(0);
	}
	if(beast.health == 0) {
		beast.health = 1;
		finishGame(1);
	}
	
	healthBarBeast.w = (120-6) * beast.health / 100;
	healthBarPlayer.w = (120-6) * player.health / 100;
	energyBarBeast.w = (120-6) * beast.energy / 100;
	energyBarPlayer.w = (120-6) * player.energy / 100;
	
	drawCanvas();
}

function hurtBeast(health) {
	var randNum = Math.round(Math.random());
	if(randNum == 0)
		dropFood(0);
	turn = 2;
	beast.health -= health * (player.energy / 100);
	score += 100 * scoreMultiplier;
	score = Math.round(score);
	showMessage("Punch!", 1);
	player.energy -= health;
	beastBlink();
}

function dissBeast() {
	turn = 2;
	score += 50 * scoreMultiplier;
	score = Math.round(score);
	beast.energy -= 20 * (player.energy / 100);
	showMessage("Sad!", 0);
	diss.setCostume("diss.png");
	diss.x = player.shirt.x + 150;
	diss.y = player.shirt.y;
	diss.hidden = false;
	setTimeout(function() {
		diss.hidden = true;
		turn = 1;
	}, 1000);
}

function dissPlayer() {
	turn = 2;
	player.energy -= 20 * (beast.energy / 100);
	showMessage("Sad!", 1);
	diss.setCostume("diss2.png");
	diss.x = beast.x - 80;
	diss.y = beast.y-30;
	diss.hidden = false;
	setTimeout(function() {
		diss.hidden = true;
		turn = 0;
	}, 1000);
}

function beastAttack() {
	var randNum = Math.round(Math.random());
	if(randNum == 0)
		dropFood(1);
	beast.setCostume("punch1.png");
	beast.energy -= 10;
	player.health -= 10 * (beast.energy / 100);
	showMessage("Punch!", 0);
	playerBlink();
	setTimeout(function() {
		turn = 0;
		beast.setCostume("stance1.png");
	}, 500);
}

function showMessage(message, pos) {
	msgText.text = message;
	if(pos == 0) {
		msgText.x = 100;
		msgText.y = canvH-(64*3.6)*2.1;
	} else {
		msgText.x = 300;
		msgText.y = 400;
	}
	msgText.color = "#ffffff";
	var frames = 0;
	var msgX = 100;
	var msgMove = setInterval(function() {
		msgX *= 0.99;
		if(pos == 0) {
			msgText.x = msgX;
		} else {
			msgText.x = -msgX + 300;
		}
		msgText.hidden = false;
		if(frames > 30)
			msgText.color = getDarkerColor(msgText.color);
		if(frames > 60) {
			msgText.hidden = true;
			clearInterval(msgMove);
		}
		frames++;
	}, 1000/60);
}

function playerBlink() {
	var hurtTime = 40;
	var xMove = 5;
	var origX = player.x;
	var hurtLoop = setInterval(function() {
		player.shirt.hidden = !player.shirt.hidden;
		player.head.hidden = !player.head.hidden;
		player.hands.hidden = !player.hands.hidden;
		hurtTime--;
		player.x = origX + xMove;
		if(hurtTime % 2 == 0)
			xMove = -xMove;
		if(hurtTime <= 0) {
			clearInterval(hurtLoop);
			player.x = origX;
		}
	}, 1000/20);
}

function beastBlink() {
	var hurtTime = 40;
	var xMove = 5;
	var origX = beast.x;
	var hurtLoop = setInterval(function() {
		beast.hidden = !beast.hidden;
		hurtTime--;
		beast.x = origX + xMove;
		if(hurtTime % 2 == 0)
			xMove = -xMove;
		if(hurtTime <= 0) {
			clearInterval(hurtLoop);
			beast.x = origX;
			turn = 1;
		}
	}, 1000/20);
}

function dropFood(pos) {
	var randNum = Math.round(Math.random() * 2);
	if(randNum == 0) {
		foodItem.setCostume("ultimatum.png");
	} else if(randNum == 1) {
		foodItem.setCostume("monstrosity.png");
	} else if(randNum == 2) {
		foodItem.setCostume("knuckle.png");
	}
	
	var foodX = 100;
	var foodY = 0;
	var bounce = 10;
	foodItem.x = 100;
	foodItem.y = 150;
	if(pos == 1) {
		foodItem.x = 200;
		foodItem.y = 300;
	}
	var frames = 0;
	var foodMove = setInterval(function() {
		foodX *= 0.99;
		if(pos == 0) {
			foodItem.x = foodX;
		} else {
			foodItem.x = -foodX + 200;
		}
		foodItem.y -= foodY;
		foodY -= 0.5;
		if(pos == 0) {
			if(foodItem.y >= 200) {
				foodY = bounce;
				bounce -= 2;
			}
			if(bounce < 0) bounce = 0;
		} else {
			if(foodItem.y >= 300) {
				foodY = bounce;
				bounce -= 2;
			}
			if(bounce < 0) bounce = 0;
		}
		foodItem.hidden = false;
		if(foodX < 20) {
			foodItem.hidden = true;
			clearInterval(foodMove);
			if(pos == 0)
				player.food++;
			else
				beast.food++;
		}
		frames++;
	}, 1000/60);
}

function eatFood() {
	player.energy += 30;
	turn = 1;
	player.food--;
	scoreMultiplier -= 0.05;
	if(scoreMultiplier < 0.1) scoreMultiplier = 0.1;
}

function beastEatFood() {
	beast.energy += 30;
	turn = 0;
	beast.food--;
}

function finishGame(pos) {
	finishFade.hidden = false;
	var fadeAmt = 0;
	var fadeAnim = setInterval(function() {
		finishFade.color = "rgba(255, 255, 255, " + fadeAmt + ")";
		fadeAmt += 0.025;
		if(fadeAmt >= 1) {
			clearInterval(fadeAnim);
			finishFade.color = "#ffffff";
		}
	}, 1000/60);
	if(pos == 0)
		finishBox[1].text = "You Lost...";
	else
		finishBox[1].text = "You Won!";
	if(score > gameData[0]) {
		gameData[0] = score;
	}
	if(loggedIn)
		updateGameData();
	finishBox[3].text = "Score: " + score;
	if(gameData[0] == "undefined" || gameData[0] == null) {
		finishBox[4].text = "High Score: Not signed in";
	} else {
		finishBox[4].text = "High Score: " + gameData[0];
	}
	sortScores();
	if(usernames[0] == null)
		finishBox[7].text = "1. Not taken";
	else
		finishBox[7].text = "1. " + usernames[0] + " - " + scores[0];
	if(usernames[1] == null)
		finishBox[8].text = "2. Not taken";
	else
		finishBox[8].text = "2. " + usernames[1] + " - " + scores[1];
	if(usernames[2] == null)
		finishBox[9].text = "3. Not taken";
	else
		finishBox[9].text = "3. " + usernames[2] + " - " + scores[2];
	if(usernames[3] == null)
		finishBox[10].text = "4. Not taken";
	else
		finishBox[10].text = "4. " + usernames[3] + " - " + scores[3];
	if(usernames[4] == null)
		finishBox[11].text = "5. Not taken";
	else
		finishBox[11].text = "5. " + usernames[4] + " - " + scores[4];
	
	var fbOffsets = [];
	for(i = 0; i < finishBox.length; i++) {
		fbOffsets[i] = finishBox[i].y - fbY;
	}
	setTimeout(function() {
		var moveBox = setInterval(function() {
			fbY = lerp(fbY, canvH/2 - 200, 0.1);
			for(i = 0; i < finishBox.length; i++) {
				finishBox[i].y = fbOffsets[i] + fbY;
			}
		}, 1000/60);
	}, 1000);
}

function setAvatar() {
	if(gameData[1] == 0) {
		player.shirt.setCostume("shirt_white_idle.png");
	} else if(gameData[1] == 1) {
		player.shirt.setCostume("shirt_red_idle.png");
	} else if(gameData[1] == 2) {
		player.shirt.setCostume("shirt_blue_idle.png");
	} else if(gameData[1] == 3) {
		player.shirt.setCostume("shirt_green_idle.png");
	} else if(gameData[1] == 4) {
		player.shirt.setCostume("shirt_gray_idle.png");
	} else if(gameData[1] == 5) {
		player.shirt.setCostume("shirt_pink_idle.png");
	}
	
	if(gameData[2] == 0) {
		player.head.setCostume("head_white.png");
	} else if(gameData[2] == 1) {
		player.head.setCostume("head_tone1.png");
	} else if(gameData[2] == 2) {
		player.head.setCostume("head_tone2.png");
	}
	
	if(gameData[3] == 0) {
		player.hands.setCostume("hands_white_idle.png");
	} else if(gameData[3] == 1) {
		player.hands.setCostume("hands_tone1_idle.png");
	} else if(gameData[3] == 2) {
		player.hands.setCostume("hands_tone2_idle.png");
	} else if(gameData[3] == 3) {
		player.hands.setCostume("hands_tone3_idle.png");
	}
}




//----MISC----//

function lerp(a, b, f) {
	return a + f * (b - a);
}

function getMyData() {
	if(loggedIn) {
		if(document.getElementById("my_data").innerHTML == "") {
			gameData = [0, 0, 0, 0];
		} else {
			gameData = document.getElementById("my_data").innerHTML.split("|");
		}
	}
}

function sortScores() {
	$.ajax({
		url: '/get_beast_data.php',
		type: 'post',
		success: function(output) {
			otherData = output.split(" ");
			var numSc = 0;
			for(i = 1; i < otherData.length; i += 2) {
				if(otherData[i] != "-1") {
					scores[numSc] = otherData[i];
					usernames[numSc] = otherData[i-1];
					numSc++;
				}
				if(numSc == 5) break;
			}
			scores.sort(function(a, b){return b-a});
			return scores;
		},
		async: false
	});
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


function updateGameData() {
	var game_data = "";
	for(i = 0; i < gameData.length; i++) {
		if(i != gameData.length-1)
			game_data += gameData[i] + "|";
		else
			game_data += gameData[i];
	}
	$.ajax({
		url: '/core/init.php',
		data: {action: 'setbeastdata', param: game_data},
		type: 'post',
		success: function(output) {
			console.log("Updated game data!");
		},
		async: false
	});
}