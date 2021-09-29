var planetChoose;
var inputBox;

function UIinit() {

    planetChoose = document.querySelector('.sim .settings');
    inputBox = document.querySelector('.settings input');

    for(let i=0; i<planetNames.length; i++) {
        document.querySelector(`.settings p:nth-child(${i+1})`).addEventListener('mousedown', (e)=>{
            currentPlanet = planetNames[i];
            document.querySelector('.planetNumbers img').src = planetInfo[currentPlanet].img.src; // for indicator
        });
    }

    inputBox.value=makeFactor;
    inputBox.oninput=changeN;

    document.querySelector('.planetNumbers img').src = planetInfo[currentPlanet].img.src; // for indicator
    
}

function changeN() {
    makeFactor = parseInt(Math.max(
        1,
        Math.min(
            inputBox.value,
            500
        )
    ));
    inputBox.value = makeFactor;
}

function updatePlanetNumbers(planetNumber) {
    let total=0;
    for (let i=0; i<planetNames.length; i++) {
        document.querySelector(`.planetNumbers div:nth-child(${i+2}) span`).innerHTML = planetNumber[planetNames[i]] || 0;
        total += planetNumber[planetNames[i]] || 0;
    }
    document.querySelector(`.planetNumbers div:nth-last-child(1) span`).innerHTML = total;
}
