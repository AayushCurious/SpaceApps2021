var sun;

const mass = 1.989*10**30;
const sunRadius = 696340;

var canvas, ctx;
var animationInterval;

var radius, radiusScaled, particles=[];
var velocity;

const slider      = document.querySelector('#radius_config');
const density     = document.querySelector('#density');
const surfaceArea = document.querySelector('#surfaceArea');
const volume      = document.querySelector('#volume');
const g           = document.querySelector('#g');

const sunImage = document.createElement('img');
const vel = document.querySelector('#velocity_config');

sunImage.src   = 'sun.jpg';

deltaTime = 1/30; // 30 fps


function init() {
    if (!canvas){
        const canvasWrapper = document.querySelector('.canvasWrapper');
        canvas = document.createElement('canvas');
        canvasWrapper.appendChild(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    let min = slider.min
    let max = slider.max
    let val = slider.value

    if (val<=1) document.querySelector('#Swarzschild').style.transform = 'translateY(0)';

    radiusScaled = getRadius(val);
    slider.setAttribute('data-before', `${radiusScaled.toFixed(2)}km`);
    slider.style.backgroundSize = `${(val - min) * 100 / (max - min)}% 100%`
    
    min = vel.min
    max = vel.max
    val = vel.value
    vel.setAttribute('velocity', `${val}km/s`);
    vel.style.backgroundSize = `${(val - min) * 100 / (max - min)}% 100%`;
    velocity = +val;

    ctx = canvas.getContext('2d');
    
    radius = Math.min(window.innerHeight, window.innerWidth)*.30 / 2;
    
    
    sunImage.width = `${radius*2}px`;

    particles = [];
    let rangeMax = canvas.height/2-radius
    for (let i=10; i<rangeMax; i+=rangeMax/20) {
        particles.push( new particle(i) );
    }
    
    if(animationInterval) clearInterval(animationInterval);

    animationInterval = window.setInterval(()=>requestAnimationFrame(animate), deltaTime*1000);
}

function animate () {
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    
    drawSun();

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const colorFactor = getColor();
    for (let i = 0; i < imgData.data.length; i += 4) {
        const r = imgData.data[i]
            , g = imgData.data[i+1]
            , b = imgData.data[i+2]
            , avg = Math.max(r,g,b)/255
        imgData.data[i]   = colorFactor[0]*avg;
        imgData.data[i+1] = colorFactor[1]*avg;
        imgData.data[i+2] = colorFactor[2]*avg;
    }
    ctx.putImageData(imgData, 0, 0);
    
    density.innerHTML     = getDensity().toExponential(2) + ' kg/km<sup>3</sup>';
    surfaceArea.innerHTML = getSurfaceArea().toExponential(2) + ' km<sup>2</sup>';
    volume.innerHTML      = getVolume().toExponential(2) + ' km<sup>3</sup>';
    g.innerHTML           = getAccG().toExponential(2)   + ' km/s<sup>2</sup>';


    for (let i=0; i<particles.length; i++) {
        if (!particles[i].update()) particles.splice(i--,1);
        particles[i].show();
    }
}

init();









function radiusChanged() {
    init();
}


function drawSun() {
    let x = canvas.width/2-radius;
    let y = canvas.height/2 - radius;
    
    ctx.drawImage(sunImage, x, y, radius*2, radius*2);
}

function map(val, min1,max1, min2, max2) {
    return (val-min1)/(max1-min1) * (max2-min2) + min2;
}

function getRadius(input) {
    let sradius = SchwarzschildRadius();
    return map(input, 1,101, sradius, 2*sunRadius+sradius);
}

function getVolume() {
    return 4/3*Math.PI*radiusScaled**3;
}
function getSurfaceArea() {
    return 4*Math.PI*radiusScaled**2;
}
function getDensity() {
    return mass / getVolume();
}
function getAccG() {
    return 6.67408*10**-11*mass / (radiusScaled*1000)**2 / 1000;
}

function getColor() {
    function clip(val, min, max) {
        return Math.max(Math.min(max, parseInt(val)), min);
    }
    let red   = clip(253*radiusScaled/sunRadius, 0, 255).toString(16);
    let green = clip(184*radiusScaled/sunRadius, 0, 255).toString(16);
    let blue  = clip(19*radiusScaled/sunRadius, 0, 255).toString(16);

    if (red.length  ==1) red  = '0'+red;
    if (green.length==1) green= '0'+green;
    if (blue.length ==1) blue = '0'+blue;

    return [parseInt(red, 16),parseInt(green, 16),parseInt(blue, 16)];
}

function SchwarzschildRadius() {
    return 2*6.67408*10**-11*mass / 299792458**2 / 1000; // in km
}

window.addEventListener('resize', ()=>{
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    radius = Math.min(window.innerHeight, window.innerWidth)*.30 / 2;
    if (animationInterval) clearInterval(animationInterval);
    init();
});

document.addEventListener('mousedown', function (e) {
    var container = document.querySelector('#Swarzschild');

    if (!container.contains(e.target)) {
        container.style.transform = 'translateY(-100%)';
    }
}.bind(this));