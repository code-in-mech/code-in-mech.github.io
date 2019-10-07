function restart(){
	location.reload();
}


let x;
function start(){
		x = setInterval(update,100);
}



function drawRect(x,y,w,h,color) {
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h);
}


var score = 0;
const canvas = document.getElementById('game1');
const ctx = canvas.getContext('2d');
const car1 = new Image();
car1.src = "car1.JPG";
const player = {
	x: canvas.width/2,
	y: 620,
	width: 50,
	height: 80,
	color: 'red'
};

const enemy = [];

for (var i = 0; i <8; i++) {
	enemy[i] = {
		x: Math.random()*550,
		y: -i*50,
		width: 50,
		height: 50,
		color: 'blue'
	};
}
const road1 = [];
const road2 = [];

for (var i = 0; i <7; i++) {
	road1[i] = {
		x: 175,
		y: i*112 -84,
		width: 20,
		height: 84,
		color: 'white'
	};
}

for (var i = 0; i <7; i++) {
	road2[i] = {
		x: 405,
		y: i*112 -84,
		width: 20,
		height: 84,
		color: 'white'
	};
}

var speed = 7;

document.addEventListener("keydown", movement);

let d;

function movement(evnt) {
	let key = evnt.keyCode;
	if(key==37){
		d = "LEFT";
	}
	else if(key==39){
		d = "RIGHT";
	}
	else if(key==38){
		d = "UP";
	}
	else if(key==40){
		d = "DOWN";
	}
}


function collision(player,enemy) {
	for (var i = 0; i < 8; i++) {
		if ((enemy[i].x>player.x && enemy[i].x<player.x + 50)||(enemy[i].x<player.x && enemy[i].x + 50 > player.x)) {
			if ((enemy[i].y>player.y && enemy[i].y<player.y + 80)||(enemy[i].y<player.y && enemy[i].y + 50 > player.y)) {
				return true;
			}
		}
	}
	return false;
}


function enemy_collision(enemy){
	for (var i = 0; i < 8; i++) {
		for (var j = 0; i < 8; j++) {
			if ((enemy[i].x>enemy[j].x && enemy[i].x<enemy[j].x + 50)||(enemy[i].x<enemy[j].x && enemy[i].x + 50 > enemy[j].x)) {
				if ((enemy[i].y>enemy[j].y && enemy[i].y<enemy[j].y + 50)||(enemy[i].y<enemy[j].y && enemy[i].y + 50 > enemy[j].y)) {
					enemy[i].y = 0;
					enemy[i].x= Math.random()*550;	
				}
			}
		}
	}
}


function update() {
	ctx.drawImage(car1,player.x,player.y,player.width,player.height);

	if (d == "LEFT" && player.x>0) {
		player.x -=25;
		d = null;
	}
	else if (d=="RIGHT" && player.x<550) {
		player.x += 25;
		d = null;
	}
	else if (d=="UP" && player.y>0) {
		player.y -= 25;
		d = null;
	}
	else if (d=="DOWN" && player.y<620) {
		player.y += 25;
		d = null;
	}

	for (var i = 0; i <8; i++) {
		if (enemy[i].y>=900) {
			enemy[i].y = -i*50;
			enemy[i].x= Math.random()*550;
			score +=1;
			speed +=0.2;

		}
		else{
			enemy[i].y +=speed;
		}
	}
	for (var i = 0; i <7; i++) {
		if (road1[i].y>=700) {
			road1[i].y = -84;
			road1[i].x= 175;

		}
		else{
			road1[i].y +=20;
		}
	}
	for (var i = 0; i <7; i++) {
		if (road2[i].y>=700) {
			road2[i].y = -84;
			road2[i].x= 405;

		}
		else{
			road2[i].y +=20;
		}
	}
	speed +=0.1;
	drawRect(0,0,600,900,"black");
	for (var i = 0; i < 7; i++) {
		drawRect(road1[i].x,road1[i].y,road1[i].width,road1[i].height,road1[i].color);
	}
	for (var i = 0; i < 7; i++) {
		drawRect(road2[i].x,road2[i].y,road2[i].width,road2[i].height,road2[i].color);
	}
	ctx.drawImage(car1,player.x,player.y,player.width,player.height);
	for(var i = 0; i<8; i++){
		drawRect(enemy[i].x,enemy[i].y,enemy[i].width,enemy[i].height,enemy[i].color);
	}
	if(collision(player,enemy)){
		clearInterval(x);
		text1 = "GAME OVER ";
		text2 = "score:- " + score;
		ctx.fillStyle = "grey";
		ctx.font = "45px Changa one";
		ctx.fillText(text1,150,170);
		ctx.fillText(text2,200,225);
	}
}