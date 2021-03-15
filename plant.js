var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");


var color = {
	grass: "rgb(102 201 2)", 
	soil: "rgb(217 133 34)", 
	bean: "#fdbd05"
}


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
	draw_grass(position_y, thickness) {
		ctx.save();
		ctx.fillStyle = color.grass;
		ctx.fillRect(0, position_y, canvas.width, thickness);

		ctx.restore();
	}
	draw_soil(position_y) {
		ctx.save();

		ctx.fillStyle = color.soil
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
interface.draw_grass(canvas.height/2 + 60, 5);
interface.draw_div_button_bean_grow();




class Plant {
	constructor({x, y, rotation}) {
		this.status = "inital";
		this.bean = {
			x: x, 
			y: y, 
			rotation: rotation
		}
	}
	draw_bean(x, y, rotation, options) {
		this.x = x;
		this.y = y;
		this.rotation = rotation;

		ctx.save();

		ctx.rotate(rotation);

		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.bezierCurveTo(x, y+10, x-10, y+5, x-10, y+15);
		ctx.bezierCurveTo(x-10, y+25, x-8, y+15, x-7, y+35);
		ctx.bezierCurveTo(x-8, y+40, x-12, y+43, x-15, y+43);
		ctx.bezierCurveTo(x-30, y+43, x-30, y+23 ,x-30, y+20);
		ctx.bezierCurveTo(x-30, y+10, x-25, y-10, x-10, y-10);
		ctx.bezierCurveTo(x, y-8, x, y-5, x, y);
		
		ctx.fillStyle = options.fillStyle;
		ctx.fill();

		ctx.strokeStyle = options.strokeStyle;
		ctx.lineWidth = options.lineWidth;
		ctx.stroke();
		

		ctx.restore();
	}
	clear_bean() {
		var x = this.x;
		var y = this.y;
		var rotation = this.rotation;
		var options = {
			strokeStyle: color.soil, 
			fillStyle: color.soil, 
			lineWidth: 3, 
		}

		ctx.save();

		ctx.rotate(rotation);

		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.bezierCurveTo(x, y+10, x-10, y+5, x-10, y+15);
		ctx.bezierCurveTo(x-10, y+25, x-8, y+15, x-7, y+35);
		ctx.bezierCurveTo(x-8, y+40, x-12, y+43, x-15, y+43);
		ctx.bezierCurveTo(x-30, y+43, x-30, y+23 ,x-30, y+20);
		ctx.bezierCurveTo(x-30, y+10, x-25, y-10, x-10, y-10);
		ctx.bezierCurveTo(x, y-8, x, y-5, x, y);

		ctx.fillStyle = options.fillStyle;
		ctx.fill();

		ctx.strokeStyle = options.strokeStyle;
		ctx.lineWidth = options.lineWidth;
		ctx.stroke();

		ctx.restore();
	}
	anime_bean_grow() {
		ctx.scale(1.05, 1.05);
	}

}


class Time {
	constructor(FPS, previous) {
		this.FPS = FPS;
		this.delay = 1000/FPS;
		this.previous = previous
	}
}


class LineRoot {
  constructor(x, y ,angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;

    this.x_limit_right = x + 150;
    this.x_limit_left = x - 150;
    this.y_limit = y + 400;
  }
  anim() {
  	ctx.save();

  	ctx.strokeStyle = "black";

    ctx.moveTo(this.x, this.y);
    // 根据角度计算增长的下一个点
    this.x += 6 * Math.cos(this.angle);
    this.y += 6 * Math.sin(this.angle);

    // 新的角度计算
    var maxangle= Math.PI / 8;
    this.angle += Math.random() * maxangle - maxangle/2;
    
    ctx.lineTo(this.x, this.y);

    // 判断增长 终止的条件
    if(this.y + 10 > this.y_limit || this.y + 10 > canvas.height ) {
      console.log("root stop");
      lines.delete(this);
      return;
    } else if(this.x + 10 > this.x_limit_right || this.x + 10 < this.x_limit_left ) {
      console.log("root stop");
      lines.delete(this);
      return;
    }

    ctx.restore();
  }
}

const lines = new Set();
var line1 = new LineRoot(canvas.width/2, canvas.height/2 + 100, 90 * Math.PI/180);
var line2 = new LineRoot(canvas.width/2, canvas.height/2 + 100, 90 * Math.PI/180);
var line3 = new LineRoot(canvas.width/2, canvas.height/2 + 100, 90 * Math.PI/180);
var line4 = new LineRoot(canvas.width/2, canvas.height/2 + 100, 90 * Math.PI/180);
lines.add(line1);
lines.add(line2);
lines.add(line3);
lines.add(line4);



var data_bean = {
	x: 0, 
	y: 0, 
	rotation: 50 * Math.PI/180, 
}
var plant = new Plant(data_bean);
console.log(plant);



// Frames per second
const FPS = 60;
const delay = 1000/FPS;
let previous = 0;
function run_anime() {
	requestAnimationFrame(run_anime);

	const now = Date.now();

	if (now - previous < delay) {
  	    // Do nothing
		return;
	}

	previous = now;
	

	switch(plant.status) {
		case 'inital':
			ctx.save()
			ctx.translate(canvas.width/2, canvas.height/2+100);
			
			plant.draw_bean(plant.bean.x, plant.bean.y, plant.bean.rotation, {
				strokeStyle: "#1d1d1d", 
				fillStyle: color.bean, 
				lineWidth: 1, 
			});

			// ctx.fillRect(0, 0, 50, 50);
			// ctx.clearRect(-50, 0, 50, 50);
			ctx.restore();

			console.log('inital');
			plant.status = 'prepare';
			break;
		case 'prepare':
			console.log('prepare');
			break;
		case 'beanGrow':

			plant.status = "rootGrow";
			console.log('grow');

			break;

		case "rootGrow":

			for(let line of lines) {
			    ctx.beginPath();
			    line.anim();
			    ctx.stroke();    
			  }



			if(lines.size == 0) {
				plant.status = "beanRotation";
			}


			console.log("rootGrow");
			break;
		case "beanRotation":

			ctx.save()
			ctx.translate(canvas.width/2, canvas.height/2+100);


			plant.bean.rotation += .2 * Math.PI/180;

			plant.clear_bean();

			plant.draw_bean(plant.bean.x, plant.bean.y, plant.bean.rotation, {
				strokeStyle: "#1d1d1d", 
				fillStyle: color.bean, 
				lineWidth: 1, 
			});


			ctx.save();

			ctx.beginPath();
			ctx.moveTo(plant.bean.x, plant.bean.y);
			ctx.lineTo(plant.bean.x, plant.bean.y + 3);
			ctx.stroke();			

			ctx.restore();

			// console.log(plant.bean.rotation);

			if(plant.bean.rotation > 75 * Math.PI/180) {
				plant.status = "branchAndLeavesGrow";
			}
			

			ctx.restore();

			break;
		case "branchAndLeavesGrow":

			console.log("branchAndLeavesGrow");

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
  	console.log('go beanGrow')
  	plant.status = 'beanGrow';
  }
});

