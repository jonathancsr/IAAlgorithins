let cols = 25;
let rows = 25;
let grid= new Array(cols)

let openSet = [];
let closedSet = [];
let start;
let end;
let w;
let h;
let path = [];

function removeFromArray(arr, elt){
  arr.splice(arr.indexOf(elt),1)
}

function heuristic(a,b){
  let d = abs(a.x-b.x) + abs(a.y-b.y);
  return d;
}

function Stop(i,j) {
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;

  this.show = function (color) {
    fill(color);
    noStroke(0);
    rect(this.x * w,this.y * h, w - 1,h - 1)
  }

  this.addNeighbors = function(grid){
    if(this.x < cols - 1){
      this.neighbors.push(grid[this.x+1][this.y]);
    }
    if(this.x > 0){
      this.neighbors.push(grid[this.x-1][this.y]);
    }
    if(this.y < rows - 1){
      this.neighbors.push(grid[this.x][this.y+1]);
    }
    if(this.y > 0){
      this.neighbors.push(grid[this.x][this.y-1]);
    }
  }
}
function setup() {
  createCanvas(400,400);
  console.log('A*');

  w = width / cols;
  h = height / rows; 

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Stop(i,j);
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
  console.log(grid)
  start = grid[0][0];
  end = grid[cols-1][rows-1]

  openSet.push(start);
}

function draw(){

  if(openSet.length > 0){
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
     if(openSet[i].f < openSet[lowestIndex].f) 
     {
       lowestIndex = i;
     }     
    }

    var current = openSet[lowestIndex];

    if(current === end)
    {
      noLoop();
      console.log("DONE!")
    }

    removeFromArray(openSet,current)
    closedSet.push(current);
  
    let neighbors = current.neighbors;

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if(!closedSet.includes(neighbor)){
        let tempG = current.g + 1;
      
        if(openSet.includes(neighbor)){
          if(tempG < neighbor.g)
            neighbor.g = tempG;
        }else{
          neighbor.g = tempG;
          openSet.push(neighbor);
        } 
        neighbor.h = heuristic(neighbor,end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      }
    }
  }
  else{
    console.log('no solution');
    noLoop();
    return;
  }
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255,0,0));    
  }

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0,255,0)); 
  }

  path = [];
  var temp = current;
  path.push(temp)
  while(temp.previous){
    path.push(temp.previous);
    temp = temp.previous;
  }

  for (let i = 0; i < path.length; i++) {
    path[i].show(color(0,0,255));    
  }
}
