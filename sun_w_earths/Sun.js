class SUN {
    constructor() {
        this.radius = planetInfo['Sun'].radius;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.length = 4;
        this.height = 2;
    }

    make() {
        let segments = [];
        for (let ang=0; ang<2*Math.PI; ang+=Math.PI/180) {
            let ncenter = [this.radius*Math.sin(ang), -this.radius*Math.cos(ang)]
            let segment = Bodies.rectangle(
                ncenter[0]+this.x, ncenter[1]+this.y,
                this.length, this.height,
                {
                    angle: ang,
                    isStatic: true,
                }
            );
            segments.push(segment);
        }
        return segments;
    }

    show() {
        let r = this.radius*1.09;
        context.drawImage(
            planetInfo['Sun'].img,
            (canvas.width/2-r), (canvas.height/2-r)*0.94,
            r*2.03, r*2.01,
        );
    }
}