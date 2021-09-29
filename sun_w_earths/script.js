
// module aliases
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;

const planetNames = ['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'];

var canvas, context, engine;
var sun, planets;
var currentPlanet = 'Earth';
var makeFactor = 10;

function init() {
   
    // canvas setup
    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.querySelector('.game').innerHTML='';
    document.querySelector('.game').append(canvas);
    
    // initialize && normalize planets data
    InitPlanetData(Math.min(canvas.height, canvas.width)*0.75/2),
    
    // initialize sun and planets
    sun    = new SUN();
    planets = [];
    
    // create engine
    engine = Engine.create();
    engine.world.gravity.y = 0.1;
    
    
    canvas.addEventListener('mousemove', (e)=>{
        if (e.buttons)
        makePlanets(e.offsetX, e.offsetY);
    });
    canvas.addEventListener('mousedown', (e)=>{
        makePlanets(e.offsetX, e.offsetY);
    })
    
    Composite.add(engine.world,  sun.make());
    UIinit();
    animate();
}


function animate() {
    
    setTimeout(()=> requestAnimationFrame(animate), 1/30);
    let planetNumbers = {};
    let EarthsInSun = 0;
    
    context.fillStyle = '#000';
    context.fillRect(0, 0, 2*canvas.width, canvas.height); // cls

    context.strokeStyle = '#f9d71c';
    context.fillStyle = "#f9d71c";
    
    sun.show();
    
    // earths
    context.strokeStyle = "#50a";
    context.fillStyle = "#277EFB";
    context.lineWidth = 1;
    
    for (let i=0; i<planets.length; i++) {

        planets[i].show(context);
        if (planets[i].inSun(sun)) {
            EarthsInSun ++;
            if (planets[i].planet in planetNumbers) planetNumbers[planets[i].planet]++;
            else planetNumbers[planets[i].planet] = 1;


            if (planets[i].body.collisionFilter.mask != 1) {
                for (let j=0; j<makeFactor-1; j++)
                    planets.push(
                        new Planet(
                            planets[i].body.position.x,
                            planets[i].body.position.y, 
                            planets[i].planet, 1,
                        )
                    )
            }

            if (planets[i].body.speed < 0.5)
                planets[i].body['staticTime']++;
            else
                planets[i].body['staticTime'] = 0;
        
            planets[i].body.collisionFilter.mask = 1;
            if (planets[i].body['staticTime'] > 100) {
                planets[i].body.isStatic = true;
            }
        }
        else
            planets[i].body['staticTime'] = 0;
        
        if (planets[i].body.position.y > canvas.height) {
            planets.splice(i--, 1);
        }
    }
    // context.font = "30px Arial";
    // context.fillText(`count: ${EarthsInSun}`, 300, 50);
    updatePlanetNumbers(planetNumbers);

    Engine.update(engine);
}

function makePlanets(x,y) {
    planets.push(new Planet(x, y, currentPlanet))
}

// startup
init();
// event handlers
window.addEventListener('resize', init);

