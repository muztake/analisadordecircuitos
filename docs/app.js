
var _linha = new linha();
var linhas = [];
var drawingLine = false;
var gridSize = 40;
var grid = []


function setup(){
    createCanvas(innerWidth, innerHeight);
    for(let row = 0; row < height / gridSize*2; row++){
        for(let col = 0; col < (width-280) / gridSize; col++){
            let x = row*gridSize, y = col*gridSize;
            rect(x-1, y-1, 3, 3);
            grid[`${x},${y}`] = (new node(x,y));
        }        
    }

}

function draw(){
    background(255);
    stroke(240);
    translate(280,0);
    // Grid
    for(let col = 0; col < (width-280)/gridSize; col++){
        line(col*gridSize, 0, col*gridSize, height);
    }
    for(let row = 0; row < height/gridSize; row++){
        line(0,row*gridSize,width, row*gridSize);
    }
    stroke(220);
    for (var node in grid) {    
        node = grid[node];
        rect(node.x - 1, node.y - 1, 3, 3);
    }
    stroke(33);
    translate(-280, 0);
    linhas.forEach(linha => linha.draw());

    textSize(24);
    if(drawingLine){
        let point = getClosestNode(mouseX, mouseY);
        line(_linha.startX, _linha.startY, point.x, point.y);
    }
}

function keyPressed(){
    console.log(keyCode);
    if(keyCode == 90){
        linhas.pop();
        console.log("Linhas", linhas);
    }
}

function mousePressed(){
    let point = getClosestNode(mouseX, mouseY);
    _linha.startX = point.x;
    _linha.startY = point.y;
    drawingLine = true;
}

function mouseReleased(){
    let point = getClosestNode(mouseX, mouseY);
    _linha.endX = point.x;
    _linha.endY = point.y;
    linhas.push(_linha);
    _linha = new linha();
    drawingLine = false;    
}