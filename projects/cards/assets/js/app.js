var cwidth = 900;
	var cheight = 400;
	var ctx;
	var firstpick = true;
	var firstcard = -1;
	var secondcard;
	var backcolor = "rgb(0,0,0)";
	var tablecolor = "rgb(255,255,255)";
	var deck = [];
	var firstsx = 30;
	var firstsy = 50;
	var margin = 30;
	var cardwidth = 100;
	var cardheight = 100;
	var tid;
	var matched;
	var starttime;
	var count = 0;
	var pairs = [
		["images/select/ryu.gif","images/lose/ryu.gif"],
	    ["images/select/ken.gif","images/lose/ken.gif"],
	    ["images/select/chunli.gif","images/lose/chunli.gif"],
	    ["images/select/guile.gif","images/lose/guile.gif"],	   
	    ["images/select/zangief.gif","images/lose/zangief.gif"]	   
	]
	
function Card(sx,sy,swidth,sheight, img, info) {
	this.sx = sx;
	this.sy = sy;
	this.swidth = swidth;
	this.sheight = sheight;
	this.info = info;
	this.img = img;
	this.draw = drawback;
}

function makedeck() {
	var i;
	var acard;
	var bcard;
	var pica;
	var picb;
	var cx = firstsx;
	var cy = firstsy;
	for(i=0;i<pairs.length;i++) {
		pica = new Image();
		pica.src = pairs[i][0];
		acard = new Card(cx,cy,cardwidth,cardheight,pica,i);
		deck.push(acard);
		picb = new Image();
		picb.src = pairs[i][1];		
		bcard = new Card(cx,cy+cardheight+margin,cardwidth,cardheight,picb,i);
		deck.push(bcard);
		cx = cx+cardwidth+ margin;
		acard.draw();
		bcard.draw();

	}
	
}

function shuffle() {

var i;
var k;
var holderinfo;
var holderimg;
var dl = deck.length
var nt;
	for (nt=0;nt<3*dl;nt++) { 
	  i = Math.floor(Math.random()*dl);
	  k = Math.floor(Math.random()*dl);
	  holderinfo = deck[i].info;
	  holderimg = deck[i].img;
	  deck[i].info = deck[k].info;
	  deck[i].img = deck[k].img;
	  deck[k].info = holderinfo;
	  deck[k].img = holderimg;
	}
}


function drawback() {
	ctx.fillStyle = backcolor;
	ctx.fillRect(this.sx,this.sy,this.swidth,this.sheight);	
}


function choose(ev) {
	var out;
	var mx;
	var my;
	var pick1;
	var pick2;
	if ( ev.layerX ||  ev.layerX == 0) { // Firefox
   			mx= ev.layerX;
    		my = ev.layerY;
  		} else if (ev.offsetX || ev.offsetX == 0) { // Opera
    		mx = ev.offsetX;
    		my = ev.offsetY;
  		}
	var i;
	for (i=0;i<deck.length;i++){
		var card = deck[i];
		if (card.sx >=0)  
		if ((mx>card.sx)&&(mx<card.sx+card.swidth)&&(my>card.sy)&&(my<card.sy+card.sheight)) {

			if ((firstpick)|| (i!=firstcard)) {
				break;}
		}
	}
	if (i<deck.length) {  
		if (firstpick) {
			firstcard = i;
			firstpick = false;
			ctx.drawImage(card.img,card.sx,card.sy,card.swidth,card.sheight); 
		}
		else {
			secondcard = i;
			ctx.drawImage(card.img,card.sx,card.sy,card.swidth,card.sheight); 
		  	if (card.info==deck[firstcard].info) {
				matched = true;
				count++;
				ctx.fillStyle= tablecolor;
				ctx.fillRect(10,340,900,100);
				ctx.fillStyle=backcolor;
				ctx.fillText("Número de parejas encontradas: "+String(count),10,360);
				if (count>= .5*deck.length) {
					var now = new Date();
					var nt = Number(now.getTime());
					var seconds = Math.floor(.5+(nt-starttime)/1000); 
					ctx.fillStyle= tablecolor;
					ctx.fillRect(0,0,900,400);
					ctx.fillStyle=backcolor;
					out = "You finished in "+String(seconds)+ " secs.";
					ctx.fillText(out,10,100);
					ctx.fillText("Recarga la página para volver a jugar.",10,300);
					return;
				}
				
			}
			else {
				matched = false;
			}
			firstpick = true;
			tid = setTimeout(flipback,1000);
		}
	}
}

function flipback() {
	var card;
	if (!matched) {
	deck[firstcard].draw();
	deck[secondcard].draw();
	}
	else {
		ctx.fillStyle = tablecolor;
				ctx.fillRect(deck[secondcard].sx,deck[secondcard].sy,deck[secondcard].swidth,deck[secondcard].sheight);
				ctx.fillRect(deck[firstcard].sx,deck[firstcard].sy,deck[firstcard].swidth,deck[firstcard].sheight);
				deck[secondcard].sx = -1;
				deck[firstcard].sx = -1;
	}
}

function init(){
   ctx = document.getElementById('canvas').getContext('2d'); 
   canvas1 = document.getElementById('canvas');
   canvas1.addEventListener('click',choose);
   makedeck();
   shuffle();
   ctx.font="bold 20pt sans-serif";
   ctx.fillText("Haz click en dos cartas para encontrar una pareja",10,20);
   ctx.fillText("Número de parejas encontradas: 0",10,360);
   starttime = new Date();
   starttime = Number(starttime.getTime());
  } 




