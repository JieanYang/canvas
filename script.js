//Thanks to http://www.maissan.net/articles/simulating-vines/ !

function drawVineWithLattice(context, x, y, interations) {
  
  // Set stroke colour
  context.lineWidth = 0.5;
  context.strokeStyle = "green";

  // Create initial branch
  var branches = new Array();
  branches.push({
    points:new Array({x:x, y:y}, {x:x, y:y}, {x:x, y:y}, {x:x, y:y}), 
    angle:0
  });
  
  // Start drawing splines at t=0
  var t = 0;
  
  // Drawing interval
  var interval = setInterval(function() {
      
    // Draw branches
    for (var i in branches) {
      
      // Draw spline segment
      var ax = (-branches[i].points[0].x + 3*branches[i].points[1].x - 3*branches[i].points[2].x + branches[i].points[3].x) / 6;
      var ay = (-branches[i].points[0].y + 3*branches[i].points[1].y - 3*branches[i].points[2].y + branches[i].points[3].y) / 6;
      var bx = (branches[i].points[0].x - 2*branches[i].points[1].x + branches[i].points[2].x) / 2;
      var by = (branches[i].points[0].y - 2*branches[i].points[1].y + branches[i].points[2].y) / 2;
      var cx = (-branches[i].points[0].x + branches[i].points[2].x) / 2;
      var cy = (-branches[i].points[0].y + branches[i].points[2].y) / 2;
      var dx = (branches[i].points[0].x + 4*branches[i].points[1].x + branches[i].points[2].x) / 6;
      var dy = (branches[i].points[0].y + 4*branches[i].points[1].y + branches[i].points[2].y) / 6;
      context.beginPath();
      context.moveTo(
        ax*Math.pow(t, 3) + bx*Math.pow(t, 2) + cx*t + dx, 
        ay*Math.pow(t, 3) + by*Math.pow(t, 2) + cy*t + dy
      );
      context.lineTo(
        ax*Math.pow(t+0.1, 3) + bx*Math.pow(t+0.1, 2) + cx*(t+0.1) + dx, 
        ay*Math.pow(t+0.1, 3) + by*Math.pow(t+0.1, 2) + cy*(t+0.1) + dy
      );
      context.stroke();
      context.closePath();      
    }
    
    // Advance t
    t += 0.1;
    
    // When finished drawing splines, create a new set of branches
    if (t >= 1) {   
      
      // Create array to store next iteration of branchces
      var new_branches = new Array();
      
      // Iterate over each branch
      for (var j in branches) {
        
        // Replace with 2 new branches
        for (var k = 0; k < 2; k++) {
          
          // Generate random deviation from previous angle
          var angle = branches[j].angle - (Math.random() * 180 - 90);         
          

          // Generate random length
          var length = Math.random() * 15 + 4;
          
          // Calculate new point
          var x2 = branches[j].points[3].x + Math.sin(Math.PI * angle / 180) * length;
          var y2 = branches[j].points[3].y - Math.cos(Math.PI * angle / 180) * length;
          
          // Add to new branch array 
          new_branches.push({
            points:new Array(
              branches[j].points[1],
              branches[j].points[2],
              branches[j].points[3],
              {x:x2, y:y2}
            ),
            angle:angle
          });
        }
      }
      
      // Sort branches by distance to lattice

      while (new_branches.length > 20) {
        new_branches.splice(Math.floor(Math.random() * new_branches.length), 1);
      } 
      
      // Replace old branch array with new
      branches = new_branches;
      
      // Restart drawing splines at t=0
      t = 0;
    }
    
    // Count interations
    interations--;
    if (interations < 0) clearInterval(interval);
      
  }, 16.67);
  
  // Return interval
  return interval;
}

var canvas = document.getElementById("theCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");
drawVineWithLattice(context, canvas.width/2, canvas.height/2, 500);