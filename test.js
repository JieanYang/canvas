var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");


function dist(a,b) {
  return Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
}

function drawLeaf(context, startX, startY, height, width, angle, color) {
  context.beginPath();
  context.strokeStyle = "green";
  context.bezierCurveTo(
    startX, 
    startY, 
    startX + Math.cos(angle + Math.atan2(width/2, height/2)) * dist(height/2,width/2), 
    startY - Math.sin(angle + Math.atan2(width/2, height/2)) * dist(height/2,width/2), 
    startX + Math.cos(angle) * height, startY - Math.sin(angle) * height);
  context.fillStyle = color;
  context.stroke();
  context.fill();
  context.closePath();
  context.beginPath();
  context.bezierCurveTo(startX, startY, startX + Math.cos(angle - Math.atan2(width/2, height/2)) * dist(height/2,width/2), startY - Math.sin(angle - Math.atan2(width/2, height/2)) * dist(height/2,width/2), startX + Math.cos(angle) * height, startY - Math.sin(angle) * height);
  context.fillStyle = color;
  context.stroke();
  context.fill();
  context.closePath();
}

function drawBean_v1(x, y) {
  // context.rotate(30 * Math.PI/180);


  context.beginPath();
  context.moveTo(35,15);
  // context.moveTo(35,15);
  context.strokeStyle = "#1d1d1d";
  context.fillStyle = "#fdbd05";
  context.bezierCurveTo(45, 17, 45, 20, 45, 25);
  context.bezierCurveTo(45, 35, 35, 30, 35, 40);
  context.bezierCurveTo(35, 50, 37, 40, 38, 60);
  context.bezierCurveTo(37, 65, 33, 68, 30, 68);
  context.bezierCurveTo(15, 68, 15, 48 ,15, 45);
  context.bezierCurveTo(15, 35, 20, 15, 35, 15);
  context.stroke();
  context.fill();
  context.closePath();


  
}

drawLeaf(context, canvas.width/2, canvas.height/2, 30, 30, Math.PI/3, 'green');

context.fillRect(30,136, 60, 70)
context.scale(2, 2);
context.translate(-15, -15);
drawBean_v1(); 


// @NO:This is a scale, but not a function draw iamge wherever
function drawBean_v2_wrong(x, y) {
  
  context.scale(1, 1);
  // Coondition drawBean_v2(70, 30) equal to scale(2, 2) with drawBean_v2(35, 15)
  // context.scale(2, 2);

  context.beginPath();
  context.moveTo(x,y);
  context.strokeStyle = "#1d1d1d";
  context.fillStyle = "#fdbd05";
  context.bezierCurveTo(x*45/35, y*17/15, x*45/35, y*20/15, x*45/35, y*25/15);
  context.bezierCurveTo(x*45/35, y*35/15, x*35/35, y*30/15, x*35/35, y*40/15);
  context.bezierCurveTo(x*35/35, y*50/15, x*37/35, y*40/15, x*38/35, y*60/15);
  context.bezierCurveTo(x*37/35, y*65/15, x*33/35, y*68/15, x*30/35, y*68/15);
  context.bezierCurveTo(x*15/35, y*68/15, x*15/35, y*48/15 ,x*15/35, y*45/15);
  context.bezierCurveTo(x*15/35, y*35/15, x*20/35, y*15/15, x*35/35, y*15/15);
  context.stroke();
  context.fill();
  context.closePath();


  
}


function drawBean_v3(x, y) {

  
  // context.translate(-15, -15);
  // context.rotate(30 * Math.PI/180);


  context.beginPath();
  context.moveTo(x,y);
  // context.moveTo(35,15);
  context.strokeStyle = "#1d1d1d";
  context.fillStyle = "#fdbd05";
  context.bezierCurveTo(x+10, y+2, x+10, y+5, x+10, y+10);
  context.bezierCurveTo(x+10, y+20, x, y+15, x, y+25);
  context.bezierCurveTo(x, y+35, x+2, y+25, x+3, y+45);
  context.bezierCurveTo(x+2, y+50, x-2, y+53, x-5, y+53);
  context.bezierCurveTo(x-20, y+53, x-20, y+33 ,x-20, y+30);
  context.bezierCurveTo(x-20, y+20, x-15, y, x, y);
  context.stroke();
  context.fill();
  context.closePath();
  
}

context.scale(.5, .5);
drawBean_v3(300, 500);




// context.scale(.5, .5);
context.translate(15, 15);
context.save();
// Ajuste the coordinate point location
context.translate(canvas.width/2,canvas.height/2);
context.rotate(30 * Math.PI/180);
drawBean_v3(0, 0);
context.restore();
