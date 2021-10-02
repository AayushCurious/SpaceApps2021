var sun;

const mass = 1.989*10**30;
const sunRadius = 696340;

var canvas, ctx;

var radius, radiusScaled, particles=[];

const slider      = document.querySelector('#radius_config');
const density     = document.querySelector('#density');
const surfaceArea = document.querySelector('#surfaceArea');
const volume      = document.querySelector('#volume');
const g           = document.querySelector('#g');

const sunImage = document.createElement('img');
sunImage.src   = 'sun.jpg';


function init() {
    const canvasWrapper = document.querySelector('.canvasWrapper');
    canvas = document.createElement('canvas');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    ctx = canvas.getContext('2d');
    
    radius = Math.min(window.innerHeight, window.innerWidth)*.60 / 2;
    
    canvasWrapper.innerHTML = '';
    canvasWrapper.appendChild(canvas);
    
    sunImage.width = `${radius*2}px`;
    radiusChanged()
}

function animate () {
    ctx.fillStyle = 'black';
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
    return 6.67408*10**-11*mass / radiusScaled**2;
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
    radius = Math.min(window.innerHeight, window.innerWidth)*.60 / 2;
});
