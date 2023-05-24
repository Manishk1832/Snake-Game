const canvas =  document.getElementById("canvas");
const pen = canvas.getContext("2d");
pen.fillStyle = "red"

//cs-> cell size

const cs = 67;
const width = 1200;
const height = 600;
let count = 0;

let food = randomFood();




class Snake{
    constructor(){
        this.init_len = 5;
        this.direction  = "right";
        this.cells = [];
        
    }

    createSnake(){
        for(let i = 0 ; i<this.init_len; i++){
            this.cells.push({
                x:i,
                y:0
            })
            
        }

    }

    drawSnake(){
    
        for(let i = 0 ; i<this.cells.length; i++){
            const cell = this.cells[i];
            if(i===this.cells.length-1){
                pen.fillStyle="yellow"
            }
            else{
                pen.fillStyle="red"
            }

            pen.fillRect(cell.x*cs,cell.y*cs,cs-2,cs-2);
        }


    }

    updateSnake(){

        const headX = this.cells[this.cells.length-1].x;
        const headY = this.cells[this.cells.length-1].y;


        let nextX = headX + 1;
        let nextY = headY;



        if(food.x === headX && food.y === headY){
            food = randomFood();
            count++;

        }
        else{
            this.cells.shift()
        }
        

        if(this.direction === "left"){
            nextX = headX-1;
            nextY = headY;
            if(nextX*cs<0){
                gameOver();
            }
        }
        
        else if (this.direction === "right"){
            nextX = headX + 1;
            nextY = headY;
            if(nextX*cs>width){
                gameOver();
            }
            

        }
        else if (this.direction  === "up"){
            nextX = headX;
            nextY = headY-1;
            if(nextY*cs<0){
                gameOver();
            }
            
        }
        else if ( this.direction ==="down"){
            nextX = headX;;
            nextY = headY+1;
            if(nextY*cs>height){
                gameOver();
            }
        }

        this.cells.push({
            x:nextX,
            y:nextY
        })

       

        
          


    }
    changeDirection(direction){
        this.direction = direction;
    }
}

const snake  = new Snake();




//This will intialise the game

function init(){
       snake.createSnake()
       snake.drawSnake();


 function keypressed(e){
    if(e.key==="ArrowLeft"){
        snake.changeDirection("left")
    }
    else if(e.key==="ArrowRight"){
        snake.changeDirection("Right")
    }
    else if(e.key==="ArrowDown"){
        snake.changeDirection("down")
    }
    else if(e.key==="ArrowUp"){
        snake.changeDirection("up")
    }
    
       
  console.log(e.key)
      
 }

       document.addEventListener("keydown",keypressed)

}



//this will draw the updated game

function draw(){
      pen.clearRect(0,0,width,height)

      pen.fillStyle = "red"
      pen.font = "40px sans-serif"
      pen.fillText (`Score : ${count}`,30,30)
      pen.fillRect(food.x*cs,food.y*cs,cs,cs)
      pen.fillStyle = "yellow"
     
      snake.drawSnake();
    // pen.clearRect(0,0,1000,500)

    // pen.fillRect(init_x,init_y,20,20)

 

}

//This will update the values of the snake


function update(){
    // init_x = init_x + 20;
    snake.updateSnake()


}

//game loop
function gameloop(){
 update();
 draw();


}

function randomFood(){
    const foodX = Math.floor(Math.random()*(width-cs)/cs)
    const foodY = Math.floor(Math.random()*(height-cs)/cs)

    const food = {
        x:foodX,
        y:foodY
    }

    return food;

}


init();
const id = setInterval(gameloop,300)
function gameOver(){
    clearInterval(id)
}

