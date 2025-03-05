const canvas = document.getElementById("cobracanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let snake = [{x:10,y:10}];
let direction = "right";
let food = {};
let ComidaConsumida = 0;
let speed = 150;

function drawsnake(){
ctx.fillStyle = "green";
snake.forEach(segment => {
    ctx.fillRect(segment.x*box,segment.y*box,box,box);
    ctx.strokeStyle = "#f2f2f2";
    ctx.strokeRect(segment.x*box,segment.y*box,box,box);
   
}  )   
}

function gameloop(){
    drawboard();
    movesnake();
    drawsnake();
    drawFood();
    drawscore();
}
food = generateFoodPosition();
let game = setInterval(gameloop,150);

document.addEventListener("keydown",e => {
    switch(e.key){
        case "w":
            if(direction!=="down") direction = "up";
            break;
        case "s":
            if(direction!=="up") direction = "down";
            break;    
        case "a":
            if(direction!=="right") direction = "left";
            break;    
        case "d":
            if(direction!=="left") direction = "right";
            break;    
    }
})

function movesnake(){
    const head = {x:snake[0].x,y:snake[0].y};
    switch(direction){
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;   
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;   
    }
    if(head.x<0 || head.x>=canvas.width/box||head.y<0 || head.xy>=canvas.height/box){
        clearInterval(game);
        alert("barbeiro você bateu na borda pobre cobrinha :( ");
        return;   
    }
    if(snake.some(segment=>segment.x === head.x && segment.y === head.y )){
        clearInterval(game);
        alert("quer se auto comer é? pobre cobrinha seu canibal :( ");
        return;   
    }
    if (head.x === food.x && head.y === food.y){
        food = generateFoodPosition();
        ComidaConsumida ++;
        if(ComidaConsumida%5 === 0)
            speed*=0.8;
            clearInterval(game);
            game = setInterval(gameloop,speed);
    }
    else{
        snake.pop();    
    }
    snake.unshift(head);
    
}

function drawboard(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < canvas.width/box;i++){
        for(let j = 0; j < canvas.height/box;j++){
            ctx.fillStyle = (i + j)%2 === 0 ? "#ffffff":"#dcdcdc";
            ctx.fillRect(i*box,j*box,box,box);
        }
    }

}

function drawFood(){
    ctx.fillStyle = "red";
    ctx.fillRect(food.x*box,food.y*box,box,box);
}

function generateFoodPosition(){
    let newfoodX,newfoodY;
    do{
        newfoodX = Math.floor(Math.random()*(canvas.width/box));
        newfoodY = Math.floor(Math.random()*(canvas.height/box));
    } while (snake.some(segment => segment.x===newfoodX && segment.y===newfoodY ));
    return{x:newfoodX,y:newfoodY};
}

function drawscore(){
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("pontos:"+ ComidaConsumida,10,30);


}
