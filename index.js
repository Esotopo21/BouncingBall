var BOX_W;
var BOX_H;
var BALL_W;
var BALL_H;

const BASESPEED = {
    x: 1,
    y: 1
}

const INITIAL_SPEED = {
    x: 4,
    y: 4
}

const speed = {
    x: INITIAL_SPEED.x,
    y: INITIAL_SPEED.y
}

var box,ball, initialAbsSpped;

function getDimensions(){
    BOX_W = window.innerWidth * 0.99;
    BOX_H = window.innerHeight * 0.99;
    BALL_W = Math.min(BOX_W,BOX_H) * 0.05;
    BALL_H = BALL_W;
}

function init(){
    getDimensions();

    box = document.createElement('div');
    box.style.width = `${BOX_W}px`;
    box.style.height = `${BOX_H}px`;
    box.className = 'box';

    ball = document.createElement('div');
    ball.style.width = `${BALL_W}px`;
    ball.style.height = `${BALL_H}px`;
    ball.className = 'ball';
    ball.onclick = () => {speed.x += 1; speed.y += 1;}

    ballHitMark = document.createElement('div');
    ballHitMark.style.width = `${BALL_W + (BALL_W * 0.15)}px`;
    ballHitMark.style.height = `${BALL_H + BALL_H * 0.15}px`;

    document.body.appendChild(box);
    box.appendChild(ball);

    document.onclick = (event) => {
        if(isEventInElement(event, ball)){
            speed.x += 1;
            speed.y +=1;

            BASESPEED.x *= -1;
            BASESPEED.y *= -1;
        }
    }
}

function isEventInElement(event, element)   {
    var rect = element.getBoundingClientRect();
    var x = event.clientX;
    if (x < rect.left || x >= rect.right) return false;
    var y = event.clientY;
    if (y < rect.top || y >= rect.bottom) return false;
    return true;
}

function moveBall(){
    var x = Number(ball.style.marginLeft.replace('px',''));
    var y = Number(ball.style.marginTop.replace('px',''));


    var newX = x + speed.x;
    var newY = y + speed.y;

    if(newX >= BOX_W - (BALL_W / 2) - 1 || newX <= 0){
        BASESPEED.x *= -1;
    }
    
    if(newY >= BOX_H - (BALL_H / 2) - 1  || newY <= 0){
        BASESPEED.y *= -1;
    }

    newX = x + speed.x*BASESPEED.x;
    newY = y + speed.y*BASESPEED.y;

    ball.style.marginLeft = `${newX}px`;
    ball.style.marginTop = `${newY}px`;    

    getDimensions();
}

function start(){
    setInterval(moveBall, 10)
}

document.addEventListener('DOMContentLoaded', function(){ 
    init();
    start();
}, false);



