var sun;

const mass = 1.989*10**30;
const sunRadius = 696340;

var canvas, ctx;

var radius, radiusScaled;

const slider = document.querySelector('#radius_config');




function init() {
    const canvasWrapper = document.querySelector('.canvasWrapper');
    canvas = document.createElement('canvas');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    ctx = canvas.getContext('2d');
    
    radius = Math.min(window.innerHeight, window.innerWidth)*.60 / 2;
    
    canvasWrapper.innerHTML = '';
    canvasWrapper.appendChild(canvas);
    
    
    radiusChanged()
}
function animate () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    
    drawSun();
    requestAnimationFrame(animate);
}

init();
animate();

















function radiusChanged() {
    const min = slider.min
    const max = slider.max
    const val = slider.value

    radiusScaled = getRadius(val);

    slider.setAttribute('data-before', `${radiusScaled.toFixed(2)}km`);
    
    slider.style.backgroundSize = `${(val - min) * 100 / (max - min)}% 100%`

    
}


function drawSun() {
   
    ctx.fillStyle = getColor();
    ctx.strokeStyle = '#ff8800';
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, radius, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function map(val, min1,max1, min2, max2) {
    return (val-min1)/(max1-min1) * (max2-min2) + min2;
}


/*
sun's radius = 696340
mass = 1.989*10**30 kg

swarzschild radius = 2*G*m/c^2 = 1.4851831*10^-27 * m -> radius in meters
    = 1.4851831*10**-27
    = 2.9541777 km


1            -       100
2.9541777    -       1390997.04582

(input - 1)/100  * 1390997.04582  + 2.9541777
*/

function getRadius(input) {
    let sradius = SchwarzschildRadius();
    return map(input, 1,101, sradius, 2*sunRadius+sradius);
}

function getDensity() {
    let volume = 4/3*Math.PI*radiusScaled**3;
    return mass / volume;
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

    let color = '#'+red+green+blue;
    return color
}

function SchwarzschildRadius() {
    return 2*6.67408*10**-11*mass / 299792458**2 / 1000; // in km
}

window.addEventListener('resize', ()=>{
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    radius = Math.min(window.innerHeight, window.innerWidth)*.60 / 2;
})











