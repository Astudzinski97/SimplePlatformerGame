var canv = document.getElementById('game');
var ctrl = canv.getContext('2d');
var platformImage = new Image();
platformImage.src = 'platform.png';
var pointImage = new Image();
pointImage.src = 'point.png';
var spikesImage = new Image();
spikesImage.src = 'spikes.png';
var heartImage = new Image();
heartImage.src = 'heart.png';
var heroImage = new Image();
heroImage.src = 'hero.png';

var heroX = 10;
var heroY = canv.height-80;
var heroWidth = 20;
var heroHeight = 20;
var hearts = 3;
var jumpHeight = 50;
var currJump = 0;

class platformComponent {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class pointComponent {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isPickupable = true;
        this.width = 25;
        this.height = 25;
    }
}

class spikesComponent{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 30;
    }
}

var platforms = [];
platforms[0] = new platformComponent(0, canv.height-30, canv.width, 30);
platforms[1] = new platformComponent(100, canv.height-130, 150, 30);
platforms[2] = new platformComponent(300, canv.height-210, 150, 30);
platforms[3] = new platformComponent(575, canv.height-160, 80, 15);
platforms[4] = new platformComponent(750, canv.height-205, 95, 24);

var points = [];
points[0] = new pointComponent(165, canv.height-170);
points[1] = new pointComponent(410, canv.height-240);
points[2] = new pointComponent(800, canv.height-235);

var spikes = [];
spikes[0] = new spikesComponent(350, canv.height-240);

function drawPlatforms()
{
    for(var i = 0; i < platforms.length; i++)
    {
        ctrl.drawImage(platformImage, platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}

function drawPoints()
{
    for( var i =0; i < points.length; i++)
    {
        if(points[i].isPickupable === true)
        {
            ctrl.drawImage(pointImage, points[i].x, points[i].y, points[i].width, points[i].height);
        }
    }
}

function drawSpikes()
{
    for( var i = 0; i < spikes.length; i++)
    {
        ctrl.drawImage(spikesImage, spikes[i].x, spikes[i].y, spikes[i].width, spikes[i].height);
    }
}

var fallSpeed = 0;

function gravity()
{
    if ( fallSpeed >= 0)
    {
        fallSpeed = 2;
        for (var i = 0; i < platforms.length; i++) {
            if (heroY + heroHeight > platforms[i].y
                && heroX + heroWidth/2 > platforms[i].x
                && heroX + heroWidth/2 < platforms[i].x + platforms[i].width)
                fallSpeed = 0;
        }
    }
    else
    {
        currJump += 2;
        if (currJump >= jumpHeight)
        {
            fallSpeed = 0;
            currJump = 0;
        }
    }
    heroY = heroY + fallSpeed;
}

document.addEventListener('keydown', moveController, false);

moveSpeed = 0;

function moveController(e)
{
    if(e.keyCode == 37)
        moveSpeed = -5;
    else if(e.keyCode == 39)
        moveSpeed = 5;
    else if((e.keyCode == 32 || e.keyCode == 38) && fallSpeed == 0)
        fallSpeed = -5;
}

document.addEventListener('keyup', stopController, false);

function stopController(e)
{
    if(e.keyCode == 37)
        moveSpeed = 0;
    else if(e.keyCode == 39)
        moveSpeed = 0;
}

function pickupPoints()
{
    for( var i = 0; i < points.length; i++)
    {
        if ( heroY < (points[i].y + points[i].height)/2
            && heroY + heroHeight > (points[i].y + points[i].height)/2
            && heroX < (points[x].x + points[i].width)/2
            && heroX + heroWidth > (points[i].x + points[i].width)/2)
            {
                points[i].isPickupable = false;
            }
    }
}

function spikesCollision()
{
    for( var i = 0; i < spikes.length; i++)
    {
        if ( heroY < (spikes[i].y + spikes[i].height)/2
            && heroY + heroHeight > (spikes[i].y + spikes[i].height)/2
            && heroX < (spikes[x].x + spikes[i].width)/2
            && heroX + heroWidth > (spikes[i].x + spikes[i].width)/2)
            {
                life -= 1;
                heroX = 10;
                heroY = canv.height-80;
            }
    }
}

function drawGame()
{
    ctrl.clearRect(0,0,canv.width,canv.height);
    drawPlatforms();
    drawPoints();
    drawSpikes();
    ctrl.drawImage(heroImage, heroX, heroY, heroWidth, heroHeight);
    gravity();
    heroX = heroX + moveSpeed;
    pickupPoints();
    spikesCollision();
}

setInterval(drawGame, 10);