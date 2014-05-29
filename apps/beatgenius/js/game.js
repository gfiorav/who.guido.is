window.onload = function () {
	initialize();
	registerEventListeners();
	draw();
} 

function initialize () {
	// Check if Firefox or Opera or IE
    var isFirefox 			= (navigator.userAgent.toLowerCase().indexOf('firefox') > -1);
    var isOpera 			= (navigator.userAgent.toLowerCase().indexOf('opera') > -1);
   	var isIE 				= (navigator.appName == 'Microsoft Internet Explorer')

    if(isFirefox || isOpera || isIE) {
        var noSupportBanner = document.getElementById("noSupportBanner");

        noSupportBanner.style.display        	  = "block";
    }

	canvas 				= document.getElementById("canvas");
	ctx 				= canvas.getContext("2d");	
	canvas.width 		= 500;
	canvas.height 		= 500;

	fps 				= 1000;

	keys 				= ["q", "w", "e", 
	"a", "s", "d", 
	"z", "x", "c"];

	dimension 		 	= 3;
	length				= canvas.width;

	pad_dimension 		= length /dimension;
	n_pads 				= 9;

	pads 				= [];

	highlightTime 		= 15;
	highlightColor 		= "yellow";

	help 				= document.getElementById("help");
	helpLife			= 10;

	initializePads();

	initializeSounds();
}

function registerEventListeners () {
	document.addEventListener('keypress', function () {
		var key 		= String.fromCharCode(event.keyCode);

		triggerSound(key);
		if(helpLife > 0)
			help.style.visibility 				= "hidden";
		helpLife 		 	= 0;
	});

	var keys 			= document.getElementsByName("key");

	for ( i = 0; i < keys.length; i++) {
		keys [i].addEventListener('click', function () {


			triggerSound(event.currentTarget.id);

			if(helpLife > 0) {
				help.style.visibility 				= "visible";
				helpLife--;
			}else {
				help.style.visibility 				= "hidden";
			}
		});
	}
}

function draw() {
	setInterval(update, 1000/fps);
}

function update() {
	canvas.width 		= canvas.width;

	for( i = 0; i < pads.length; i++) {
		checkHighlight(pads [i]);

		ctx.fillStyle 			= pads [i].color;
		ctx.fillRect(pads [i].x, pads [i].y, 
			pad_dimension, pad_dimension);
	}
}

function checkHighlight (pad) {
	if( pad.isHighLighted && pad.timeToHighlight == 0) {
		pad.color 				= pad.originalColor;
		pad.isHighLighted 		= false;
	}else if( pad.timeToHighlight > 0 ) {
		pad.timeToHighlight--;
	}
}

function initializePads () {
	for( i = 0; i < n_pads; i++) {
		addPad();
		pads [i].key  	= keys [i];
	}

	positionPads();
} 

function addPad () {
	var pad 			= new Object();

	var color 			= randomColor();
	pad.color 			= color;
	pad.originalColor 	= color;

	pad.timeToHighlight = 0;
	pad.isHighLighted 	= false;

	pad.x 				= 0;
	pad.y 				= 0;

	pads.push(pad);
}

function positionPads () {
	var step 			= length /dimension;
	var x 				= 0;
	var y				= 0;

	for ( j = 0; j < n_pads; j++) {
		pads [j].x 				= step *x;
		pads [j].y 				= step *y;
		
		if(x < 2) {
			x++;
		} else {
			x 						= 0;
			y++;
		}
	}
}

function randomColor () {
	var color 			= "rgb(" + Math.floor(Math.random() *256) 
		+ "," + Math.floor(Math.random() *256) 
		+ "," + Math.floor(Math.random() *256) 
		+ ")";

return color;
}

function initializeSounds () {
	q = new Audio("snd/tm.wav"); 
	w = new Audio("snd/rm.wav");
	e = new Audio("snd/cr.wav");
	a = new Audio("snd/cy.wav");
	s = new Audio("snd/cp.wav");
	d = new Audio("snd/oh.wav");
	z = new Audio("snd/bd.wav");
	x = new Audio("snd/sd.wav");
	c = new Audio("snd/hh.wav");

}

function triggerSound (key) {
	switch ( key ) {
		case "q" :
		q.currentTime 				= 0;
		q.play();
		highlight(key);
		break;

		case "w" :
		w.currentTime 				= 0;
		w.play();
		highlight(key);
		break;

		case "e" :
		e.currentTime 				= 0;
		e.play();
		highlight(key);
		break;

		case "a" :
		a.currentTime 				= 0;
		a.play();
		highlight(key);
		break;

		case "s" :
		s.currentTime 				= 0;
		s.play();
		highlight(key);
		break;

		case "d" :
		d.currentTime 				= 0;
		d.play();
		highlight(key);
		break;

		case "z" :
		z.currentTime 				= 0;
		z.play();
		highlight(key);
		break;

		case "x" :
		x.currentTime 				= 0;
		x.play();
		highlight(key);
		break;

		case "c" :
		c.currentTime 				= 0;
		c.play();
		highlight(key);
		break;


		default :
		break;

	}
}

function highlight (key) {
	i 					= 0;
	while( pads [i].key != key)
		i++;

	pads [i].timeToHighlight 			= highlightTime;
	pads [i].color 						= highlightColor;
	pads [i].isHighLighted 				= true;
}