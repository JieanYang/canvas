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
  
  context.fillRect(30,136, 60, 70)

  context.scale(2, 2);
  // context.translate(100, 0)
  // context.rotate(30 * Math.PI/180);


  context.beginPath();
  context.moveTo(35,15);
  // context.moveTo(35,15);
  context.strokeStyle = "#1d1d1d";
  context.fillStyle = "#fdbd05";
  context.bezierCurveTo(45, 17, 45, 20, 45, 25);
  // context.bezierCurveTo(45, 15, 45, 15, 45, 25);
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

drawBean_v1(); 



// function drawBean_v2(x, y) {
  
//   context.scale(2, 2);
//   // context.translate(100, 0)
//   // context.rotate(30 * Math.PI/180);

//   context.beginPath();
//   context.moveTo(x/35,y/15);
//   context.strokeStyle = "#1d1d1d";
//   context.fillStyle = "#fdbd05";
//   context.bezierCurveTo(x*45/35, y*17/15, x*45/35, y*20/15, x*45/35, y*25/15);
//   // context.bezierCurveTo(x*45/35, y*15/15, x*45/35, y*15/15, x*45/35, y*25/15);
//   context.bezierCurveTo(x*45/35, y*35/15, x*35/35, y*30/15, x*35/35, y*40/15);
//   context.bezierCurveTo(x*35/35, y*50/15, x*37/35, y*40/15, x*38/35, y*60/15);
//   context.bezierCurveTo(x*37/35, y*65/15, x*33/35, y*68/15, x*30/35, y*68/15);
//   context.bezierCurveTo(x*15/35, y*68/15, x*15/35, y*48/15 ,x*15/35, y*45/15);
//   context.bezierCurveTo(x*15/35, y*35/15, x*20/35, y*15/15, x*35/35, y*15/15);
//   context.stroke();
//   context.fill();
//   context.closePath();


  
// }

// drawBean_v2()