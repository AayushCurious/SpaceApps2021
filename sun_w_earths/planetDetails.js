planetInfo =
{
    Mercury: {
        radius: 2439.7,
    },
    Venus: {
        radius: 6051.8,
    },
    Earth: {
        radius: 6371,
    },
    Mars: {
        radius: 3389.5,
    },
    Jupiter: {
        radius: 69911,
    },
    Saturn: {
        radius:58232,
    },
    Uranus: {
        radius: 25362,
    },
    Neptune: {
        radius: 24622,
    },
    Sun: {
        radius: 696340,
    }
}

function InitPlanetData(sunsize) {
    for (let i of Object.keys(planetInfo)) {
        let img = getImage(i);
        planetInfo[i].radius *= sunsize/planetInfo['Sun'].radius;
        planetInfo[i].img = img;
    }
}

function getImage(src) {
    let img = new Image();
    img.src = `images/${src}.png`;
    return img;
}