var planetChoose;
var inputBox;

function UIinit() {

    planetChoose = document.querySelector('.sim .settings');
    inputBox = document.createElement('input')    

    for(let i of Object.keys(planetInfo)) {
        if (i!='Sun') {
            let p = document.createElement('p');
            p.appendChild(getImage(i))
            p.innerHTML += ' '+i;
            p.addEventListener('mousedown', (e)=>{
                currentPlanet = i;
                document.querySelector('.planetNumbers img').src = planetInfo[i].img.src; // for indicator
            })
            planetChoose.appendChild(p);
        }
    }
    
    inputBox.id = 'makeFactor';
    inputBox.type='number';
    inputBox.value=makeFactor;
    inputBox.oninput=changeN;
    document.querySelector('.planetNumbers img').src = planetInfo[currentPlanet].img.src; // for indicator
    
    planetChoose.appendChild(inputBox);
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