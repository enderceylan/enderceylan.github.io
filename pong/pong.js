var width = $(window).width();
var height = $(window).height();
var player = {x: width/20, 
              y: height/2,
              h: height/10,
              w: 20,
              score: 0};
var cpu = {x: width - (width/20), 
           y: height/2,
           h: height/10,
           w: 20,
           speed: 4,
           score: 0};
var ball = {x: width/2,
            y: height/2,
            h: 20,
            w: 20,
            speed: 5,
            dir: 5};
var paused = false;
var muted = false;
var sound = new Audio("sound.mp3");

function movePaddle(event)
{
    var y = event.clientY;
    console.log(y);
    if (y > (player.h/2)) {player.y = (y-(player.h/2));}
    if (player.y+player.h > height) {player.y = height-player.h;}
}

function pauseGame()
{
    if (paused == false) {paused = true;}
    else {paused = false;}
}

function mute()
{
    if (muted == false) {muted = true; document.getElementById("volume").innerHTML = '<i class="fa fa-volume-off"></i>';}
    else {muted = false; document.getElementById("volume").innerHTML = '<i class="fa fa-volume-up"></i>';}
}

function moveBall()
{
    //top boundaries
    if (ball.y <= 0 && ball.dir == 1) {ball.dir = 3; ball.speed = 5; if (muted == false) {sound.play();}}
    if (ball.y <= 0 && ball.dir == 7) {ball.dir = 5; ball.speed = 4; if (muted == false) {sound.play();}}
    if (ball.y >= height-(ball.h) && ball.dir == 3) {ball.dir = 1; ball.speed = 4; if (muted == false) {sound.play();}}
    if (ball.y >= height-(ball.h) && ball.dir == 5) {ball.dir = 7; ball.speed = 5; if (muted == false) {sound.play();}}
    
    //hit player
    if (ball.x >= player.x && ball.x <= player.x+player.w && ball.y >= player.y && ball.y <= player.y+player.h)
    {
        if (ball.y > player.y+(player.h/2)) {ball.dir = 1; ball.speed = 7;}
        if (ball.y == player.y+(player.h/2)) {ball.dir = 2;}
        if (ball.y < player.y+(player.h/2)) {ball.dir = 3; ball.speed = 4;}
        if (muted == false) {sound.play();}
    }
    if (ball.x >= cpu.x-ball.w && ball.x <= cpu.x+cpu.w && ball.y >= cpu.y && ball.y <= cpu.y+cpu.h)
    {
        if (ball.y > cpu.y+(cpu.h/2)) {ball.dir = 7; ball.speed = 4;}
        if (ball.y == cpu.y+(cpu.h/2)) {ball.dir = 6;}
        if (ball.y < cpu.y+(cpu.h/2)) {ball.dir = 5; ball.speed = 5;}
        if (muted == false) {sound.play();}
    }
    
    //goal scored
    if (ball.x <= 0) {ball.x = width/2; ball.y = height/2; ball.dir = 5; cpu.score += 1;}
    if (ball.x >= width) {ball.x = width/2; ball.y = height/2; ball.dir = 5; player.score += 1;}
    
    //continue direction
    if (ball.dir == 0) {ball.y -= ball.speed;}
    if (ball.dir == 1) {ball.x += ball.speed; ball.y -= ball.speed;}
    if (ball.dir == 2) {ball.x += ball.speed;}
    if (ball.dir == 3) {ball.x += ball.speed; ball.y += ball.speed;}
    if (ball.dir == 4) {ball.y += ball.speed;}
    if (ball.dir == 5) {ball.x -= ball.speed; ball.y += ball.speed;}
    if (ball.dir == 6) {ball.x -= ball.speed;}
    if (ball.dir == 7) {ball.x -= ball.speed; ball.y -= ball.speed;}
}

function moveCPU()
{
    if (cpu.y < 0) {cpu.y = 0;}
    if (cpu.y > height-cpu.h) {cpu.y = height-cpu.h;}
    if (cpu.y < ball.y && cpu.y >= 0) {cpu.y += cpu.speed};
    if (cpu.y > ball.y && cpu.y <= height) {cpu.y -= cpu.speed};
}

function drawScreen()
{
      document.getElementById("player").style.left = player.x+"px";
      document.getElementById("player").style.top = player.y+"px";
      document.getElementById("cpu").style.left = cpu.x+"px";
      document.getElementById("cpu").style.top = cpu.y+"px";
      document.getElementById("ball").style.left = ball.x+"px";
      document.getElementById("ball").style.top = ball.y+"px";
      document.getElementById("playerScore").innerHTML = player.score;
      document.getElementById("cpuScore").innerHTML = cpu.score;
}

function update()
{
    if (paused == false)
    {
        moveBall();
        moveCPU();
        drawScreen();
    }
    setTimeout(update, 15);
}

$(document).ready(function(){
    
    $(".mode").mouseover(function(){
        $(this).css("color", "black");
        $(this).css("background-color", "#0EE82B"); 
    });
    $(".mode").mouseleave(function(){
        $(this).css("color", "#0EE82B");
        $(this).css("background-color", "black");  
    });
    
  $(".mode").click(function(){
      if($(this).attr("id") == "easy") {cpu.speed = 2;}
      if($(this).attr("id") == "hard") {cpu.speed = 4;}
      $("#startScreen").hide();
      document.getElementById("player").style.height = player.h+"px";
      document.getElementById("cpu").style.height = cpu.h+"px";
      document.getElementById("player").style.display = "inherit";
      document.getElementById("cpu").style.display = "inherit";
      document.getElementById("ball").style.display = "inherit";
      document.getElementById("playerScore").style.display = "inherit";
      document.getElementById("cpuScore").style.display = "inherit";
      document.getElementById("pause").style.display = "inherit";
      document.getElementById("volume").style.display = "inherit";
      document.getElementById("divider").style.display = "inherit";
      drawScreen();
      update();
    });
    
});