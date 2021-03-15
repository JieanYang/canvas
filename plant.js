var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");



class Interface {
	constructor() {

	}
	draw_sky(position_y) {
		ctx.save();



		var gradient = ctx.createLinearGradient(0, 0,0, canvas.height/2);

		// Add three color stops
		gradient.addColorStop(0, 'rgb(36 183 246)');
		gradient.addColorStop(.25, 'rgb(63 193 248)');
		gradient.addColorStop(.5, 'rgb(92 203 250)');
		gradient.addColorStop(.75, 'rgb(127 215 252)');
		gradient.addColorStop(1, 'rgb(157 226 254)');

		// Set the fill style and draw a rectangle
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, position_y);


		ctx.restore();
	}
	draw_soil(position_y) {
		ctx.save();

		ctx.fillStyle = "rgb(217 133 34)";
		ctx.fillRect(0, position_y, canvas.width, canvas.height - position_y);

		ctx.fillStyle = "rgb(123 76 20)";
		ctx.fillRect(0, position_y, canvas.width, 2);



		ctx.restore();



	}
	draw_div_button_bean_grow() {
		ctx.save();
		ctx.translate(20, 10);

		ctx.save()
		ctx.lineWidth = 2;
		ctx.fillStyle = '#fff';
		ctx.strokeStyle = '#9e9e9e';
		ctx.rect(0, 0, 100, 50);
		ctx.fill();
		ctx.stroke();
		ctx.restore();

		ctx.save();
		ctx.font = ctx.font.replace(/\d+px/, "16px");
		ctx.fillStyle = "black";
		ctx.strokeText('Bean Grow', 10, 30);
		ctx.fillText('Bean Grow', 10, 30);
		ctx.restore();

		ctx.restore();
	}
}

var interface = new Interface();
interface.draw_soil(canvas.height/2 + 65);
interface.draw_sky(canvas.height/2 + 65);
interface.draw_div_button_bean_grow();




class Plant {
	constructor(x, y) {
		this.status = "inital";
		this.bean = {
			x: x, 
			y: y
		}
	}
	set_timeSetting(obj) {
		this.FPS = obj.FPS;
		this.FPS_origin = obj.FPS;
		this.delay = obj.delay;
		this.delay_origin = obj.delay;
		this.previous = obj.previous;
		this.previous_origin = obj.previous;
	}
	draw_bean(x, y, rotation, options) {

		ctx.rotate(rotation);

		ctx.beginPath();
		ctx.moveTo(x,y);
		// ctx.moveTo(35,15);
		ctx.strokeStyle = options.strokeStyle;
		ctx.fillStyle = options.fillStyle;
		ctx.bezierCurveTo(x+10, y+2, x+10, y+5, x+10, y+10);
		ctx.bezierCurveTo(x+10, y+20, x, y+15, x, y+25);
		ctx.bezierCurveTo(x, y+35, x+2, y+25, x+3, y+45);
		ctx.bezierCurveTo(x+2, y+50, x-2, y+53, x-5, y+53);
		ctx.bezierCurveTo(x-20, y+53, x-20, y+33 ,x-20, y+30);
		ctx.bezierCurveTo(x-20, y+20, x-15, y, x, y);
		ctx.stroke();
		ctx.fill();
	}
	anime_bean_grow() {
		ctx.scale(1.05, 1.05);
	}

}



var plant = new Plant(0, 0);
// Frames per second
let FPS = 60; 
plant.set_timeSetting({
	FPS: FPS,  
	delay: 1000/FPS, 
	previous: 0, 
});
console.log(plant);
function run_anime() {
	requestAnimationFrame(run_anime);

	switch(plant.status) {
		case 'inital':
			ctx.translate(canvas.width/2, canvas.height/2+100);
			ctx.save();
			plant.draw_bean(plant.bean.x, plant.bean.y, 90 * Math.PI/180, {
				strokeStyle: "#1d1d1d", 
				fillStyle: "#fdbd05"
			});
			ctx.restore();
			ctx.fillRect(0, 0, 50, 50);
			// ctx.clearRect(-50, 0, 50, 50);

			console.log('inital');
			plant.status = 'prepare';
			break;
		case 'prepare':

			break;
		case 'beanGrow':
			console.log('grow');
			break;

		default:
			console.log('no status');
	}
}

run_anime();




canvas.addEventListener('click',function(e){
  // console.log('click mouse', e.pageX, e.pageY)
  if(
  	(e.pageX >= 20 && e.pageX <= 120)
  	&&
  	(e.pageY >= 10 && e.pageY <= 60)
  ) {
  	plant.status = 'beanGrow';
  }
});

