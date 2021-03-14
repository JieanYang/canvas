var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");


class background {
	constructor() {

	}
}


class Plant {
	constructor(x, y) {
		status: "inital", 
		this.bean = {
			x: x, 
			y: y
		}
	}
	draw_bean(x, y, rotation, options) {

		context.rotate(rotation);

		context.beginPath();
		context.moveTo(x,y);
		// context.moveTo(35,15);
		context.strokeStyle = options.strokeStyle;
		context.fillStyle = options.fillStyle;
		context.bezierCurveTo(x+10, y+2, x+10, y+5, x+10, y+10);
		context.bezierCurveTo(x+10, y+20, x, y+15, x, y+25);
		context.bezierCurveTo(x, y+35, x+2, y+25, x+3, y+45);
		context.bezierCurveTo(x+2, y+50, x-2, y+53, x-5, y+53);
		context.bezierCurveTo(x-20, y+53, x-20, y+33 ,x-20, y+30);
		context.bezierCurveTo(x-20, y+20, x-15, y, x, y);
		context.stroke();
		context.fill();
	}
	anime_bean_grow() {

	}

	anime() {
		switch(this.status) {
			case 'inital':
				beak;
			default:
				consol.log('no status');
		}
	}

}


context.translate(canvas.width/2, canvas.height/2+100);
var plant = new Plant(0, 0);
plant.draw_bean(plant.bean.x, plant.bean.y, 30 * Math.PI/180, {
	strokeStyle: "#1d1d1d", 
	fillStyle: "#fdbd05"
});





