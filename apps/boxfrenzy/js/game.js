window.onload = function () {
	registerEventListeners();
	initialize();
	draw();
}

function registerEventListeners () {
	var title 		= document.getElementById("title");

	title.addEventListener('mouseover', function () {
		gravity				= -0.005;
		var quote 			= document.getElementById("quote");
		var random 			= Math.floor(Math.random() *quotes.length);
		quote.innerHTML 	= quotes [random];
	});

	title.addEventListener('mouseout', function () {
		gravity 			= 0.65;
		quote.innerHTML 	= "";
	});

	title.addEventListener('click', function () {
		if(!frenzyMode) {
			frenzyMode 			= true;
			
			var title 			= document.getElementById("title");
			var container 		= document.getElementById("canvasContainer");
			var quote 			= document.getElementById("quote");
			var body 			= document.body;

			body.style.background 	 	= "white";

			var color 					= randomColor();
			title.style.color 			= color;
			quote.style.color 			= color;
			container.style.borderColor = color;
		}
		else {
			frenzyMode 			= false;
			changeTitleColor();
		}

		
	});

	var quote 				= document.getElementById("quote");

	quote.innerHTML 		= "hover over 'box frenzy' to make boxes float! " 
								+"Click on it for the magic to begin...";


}

function initialize () {
	canvas 				= document.getElementById("canvas");
	ctx 				= canvas.getContext("2d");
	canvas.width 		= 1000;
	canvas.height 		= 500;
	canvas.zIndex 		= 5;

	width 				= canvas.width;
	height 				= canvas.height;

	fps 				= 28;

	frenzyMode 			= false;

	gravity 			= 0.65;
	
	max_boxes 			= 60;
	n_boxes 			= 0;
	box_width 			= 70;
	box_height 			= 70;
	
	boxes 				= [];

	quotes 			= [];
	populateQuotes();

}

function draw () {

	setInterval(update, 1000/fps);
	setInterval(addBox, 500);
}

function addBox() {

	if( boxes.length < max_boxes && gravity > 0) {
		var box 			= new Object();

		box.x 				= Math.floor(Math.random() *(width));
		box.y 				= Math.floor(Math.random() *(height));

		box.x_vel 			= Math.floor(Math.random() *100);
		box.y_vel 			= Math.floor(Math.random() *100);

		box.life 			= 100;
		box.dead 			= false;

		box.color 			= randomColor();

boxes.push(box);
n_boxes++;

}else if(n_boxes == 0) {
	boxes 				= [ ];
} 
}

function update () {

	// Reset
	canvas.width		= canvas.width;


	for (i in boxes) {

		if(boxes[i].life > 0) {
			ctx.fillStyle		= boxes[i].color;
			ctx.fillRect (boxes[i].x, boxes[i].y, box_width, box_height);
			
			if(!frenzyMode)
				ctx.fillStyle		= "#F5821D";
			else
				ctx.fillStyle 		= "white";

			ctx.fillRect (boxes[i].x +3, boxes[i].y +3, box_width-6, box_height -6);

		}else if (boxes[i].life == 0 && !boxes[i].dead){
			boxes[i].dead 			= true;
			n_boxes--;
		}

		if(boxes[i].x >= 0 && boxes[i].x <= width -box_width) {

		}	
		else if(boxes[i].x < 0) {
			boxes[i].x 					= 0;
			boxes[i].x_vel				= (-1)* 0.5 *boxes[i].x_vel;

			if(gravity > 0)
				boxes[i].life--;

			if(frenzyMode)
				changeTitleColor(boxes[i]);
		}
		else if(boxes[i].x > width -box_width) {
			boxes[i].x 					= width -box_width;
			boxes[i].x_vel				= (-1)* 0.5 *boxes[i].x_vel;
			if(gravity > 0)
				boxes[i].life--;
			
			if(frenzyMode)
				changeTitleColor(boxes[i]);
		}

		if(boxes[i].y >= 0 && boxes[i].y <= height -box_height) {
			boxes[i].y_vel 				= boxes[i].y_vel +gravity;
		}	
		else if(boxes[i].y < 0){
			boxes[i].y 					= 0;
			boxes[i].y_vel				= (-1)* 0.5 *boxes[i].y_vel;
			if(gravity > 0)
				boxes[i].life--;
			
			if(frenzyMode)
				changeTitleColor(boxes[i]);

		}
		else if(boxes[i].y > height -box_height){
			boxes[i].y 		 			= height -box_height;
			boxes[i].y_vel				= (-1)* 0.5 *boxes[i].y_vel;
			if(gravity > 0)
				boxes[i].life--;

			
		}

		boxes[i].x 				= boxes[i].x +boxes[i].x_vel;
		boxes[i].y 				= boxes[i].y +boxes[i].y_vel;

	}

}

function changeTitleColor (box) {

	var title 			= document.getElementById("title");
	var container 		= document.getElementById("canvasContainer");
	var quote 			= document.getElementById("quote");
	var body 			= document.body;

	if(box != null) {
		body.style.background 	 	= "white";
		title.style.color 			= box.color;
		quote.style.color 			= box.color;
		container.style.borderColor = box.color;
	}
	else {
		body.style.background 		= "#F5821D";
		title.style.color 			= "white";
		quote.style.color 			= "white";
		container.style.borderColor = "white";
	}


}

function randomColor () {
	var color 			= "rgb(" + Math.floor(Math.random() *256) 
			+ "," + Math.floor(Math.random() *256) 
			+ "," + Math.floor(Math.random() *256) 
			+ ")";

	return color;
}

 function populateQuotes () {
 	quotes.push("don't let gravity keep you from dreaming of flying...");
	quotes.push("freedom comes when you no longer feel tied to the ground...");
	quotes.push("don't fear ingravity...");
	quotes.push("it is our mission to defy what is settled...");
	quotes.push("guido fioravantti 2013");

 }