var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
var sound2 = new Audio("audio/score.mp3");
var sound = new Audio("audio/getcoffee.mp3");
var bgReady = false;
var bgImage = new Image();
var mmReady = false;
var mmImage = new Image();
var coffeeReady = false;
var coffeeImage = new Image();
var coffee = {};
var coffeesCaught = 0;
var keysDown = {};
var then = Date.now();
var mm = {
	speed: 256
};

console.log('opa')

bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/scenario.png";

mmImage.onload = function () {
	mmReady = true;
};
mmImage.src = "img/mm.png";

coffeeImage.onload = function () {
	coffeeReady = true;
};
coffeeImage.src = "img/coffee.png";

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var reset = function () {
	mm.x = canvas.width / 2;
	mm.y = canvas.height / 2;
	coffee.x = 32 + (Math.random() * (canvas.width - 64));
	coffee.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function (modifier) {
	if (38 in keysDown) {
		mm.y -= mm.speed * modifier;
	}
	if (40 in keysDown) {
		mm.y += mm.speed * modifier;
	}
	if (37 in keysDown) {
		mm.x -= mm.speed * modifier;
	}
	if (39 in keysDown) {
		mm.x += mm.speed * modifier;
	}

	if (
		mm.x <= (coffee.x + 32)
		&& coffee.x <= (mm.x + 32)
		&& mm.y <= (coffee.y + 32)
		&& coffee.y <= (mm.y + 32)
	) {
		++coffeesCaught;
		sound.play();
		reset();
	}
		if($("#seconds").text() == "0"){
		history.go(0);
	}
};

var render = function () {
	if (bgReady) {
		context.drawImage(bgImage, 0, 0);
	}

	if (mmReady) {
		context.drawImage(mmImage, mm.x, mm.y);
	}

	if (coffeeReady) {
		context.drawImage(coffeeImage, coffee.x, coffee.y);
	}
	$("#counter").text(coffeesCaught);
};

var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	then = now;
};

reset();
setInterval(main, 1);
sound2.play();
