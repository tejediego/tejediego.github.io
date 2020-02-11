var cwidth = 400;
var cheight = 300;
var dicex = 50;
var dicey = 50;
var dicewidth = 100;
var diceheight = 100;
var dotrad = 6;
var ctx;
var dx;
var dy;
var firstturn = true;
var point;
var bank;
var betField;  
	
function init() {
	bank = 100;
	betField  = document.getElementById('bet');
	dx = dicex; 
	dy = dicey;
	drawface(1);
	dx = dicex + 150;
	drawface(1);
	bank = 100;
	listeners(); 
}

function listeners() {
	betField.addEventListener('input', raiseBet, false);
	betField.addEventListener('keyup', raiseBet, false);
}

function raiseBet() {
	//var bet = Number(document.f.bet.value); 
	//if(betField.value > bank) {

	//}
}

function subirBanco(apuesta) {
}

function bajarBanco(apuesta) {
}

function tirardado() {
	var sum;
	var ch = 1+Math.floor(Math.random()*6);
	sum = ch;
	dx = dicex;
	dy = dicey;
	drawface(ch);
	dx = dicex + 150;
	ch=1 + Math.floor(Math.random()*6);
	sum += ch;
	drawface(ch);
	if (firstturn) {
		switch(sum) {
			case 7:
			case 11:
				document.f.outcome.value="¡Ganador!";
				subirBanco(Number(document.f.bet.value));
				document.f.bank.value = bank;
				break;
			case 2:
			case 3:
			case 12:
				document.f.outcome.value="Has perdido"; 
				bajarBanco(Number(document.f.bet.value));
				document.f.bank.value = bank;
				break;
			default:
				point = sum;
				document.f.pv.value=point;
				firstturn = false;
				document.f.stage.value="Es necesario otro tiro";
				document.f.outcome.value="   ";
				document.f.bank.value = bank;
		}
	} else {
		switch(sum) {
			case point:
				document.f.outcome.value="¡Ganador!";
				document.f.stage.value="De regreso al primer tiro";
				document.f.pv.value=" ";
				subirBanco(Number(document.f.bet.value));
				document.f.bank.value = bank;
				firstturn = true;
				break;
			case 7:
				document.f.outcome.value="Has perdido";
				document.f.stage.value="De regreso al primero tiro";
				document.f.pv.value=" ";
				bajarBanco(Number(document.f.bet.value));
				document.f.bank.value = bank;
				firstturn = true;
				break;
			}
		}
}
function drawface(n) {
	ctx = document.getElementById('canvas').getContext('2d');  
	ctx.lineWidth = 5;
	ctx.clearRect(dx,dy,dicewidth,diceheight);
	ctx.strokeRect(dx,dy,dicewidth,diceheight)
	var dotx;
	var doty;
	ctx.fillStyle = "#009966";
	switch(n) {
		case 1:
			draw1();
			break;
		case 2:
			draw2();
			break;
		case 3:
			draw2();
			draw1();
			break;
		case 4:
			draw4();
			break;
		case 5:
			draw4();
			draw1();
			break;
		case 6:
			draw4();
			draw2mid();
			break;
		default: 
			draw(1);
			break;
	}
}
function draw1() {
	var dotx;
	var doty;
	ctx.beginPath();
	dotx = dx + .5*dicewidth;
	doty = dy + .5*diceheight;
	ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
	ctx.closePath();
	ctx.fill();
}
function draw2() {
	var dotx;
	var doty;
	ctx.beginPath();
	dotx = dx + 3*dotrad;
	doty = dy + 3*dotrad;
	ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
	dotx = dx+dicewidth-3*dotrad;
	doty = dy+diceheight-3*dotrad;
	ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
	ctx.closePath();
	ctx.fill();
}
function draw4() {
	var dotx;
	var doty;
	ctx.beginPath();
	dotx = dx + 3*dotrad;
	doty = dy + 3*dotrad;
	ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
	dotx = dx+dicewidth-3*dotrad;
	doty = dy+diceheight-3*dotrad;
	ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
	ctx.closePath();
	ctx.fill();
	ctx.beginPath();
	dotx = dx + 3*dotrad;
	doty = dy + diceheight-3*dotrad;
	ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
	dotx = dx+dicewidth-3*dotrad;
	doty = dy+ 3*dotrad;
	ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
	ctx.closePath();
	ctx.fill();	
}
function draw2mid() {
	var dotx;
	var doty;
	ctx.beginPath();
	dotx = dx + 3*dotrad;
	doty = dy + .5*diceheight;
	ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
	dotx = dx+dicewidth-3*dotrad;
	doty = dy + .5*diceheight;
	ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
	ctx.closePath();
	ctx.fill();
}