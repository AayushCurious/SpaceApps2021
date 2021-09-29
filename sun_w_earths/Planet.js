class Planet {
    constructor(x, y, planet='Earth', collMask=0) {
        this.planet = planet;
        this.radius = planetInfo[planet].radius;
        this.body = Bodies.circle(x, y, this.radius, {friction: 0});
        this.body.collisionFilter.mask = collMask;
        this.body['staticTime'] = 0;
        Composite.add(engine.world, this.body);
    }

    show(context) {
        let image = planetInfo[this.planet].img;

        if (!('width' in planetInfo[this.planet]))
            planetInfo[this.planet].width = image.width/image.height*2*planetInfo[this.planet].radius

        let w = planetInfo[this.planet].width;
        context.drawImage(
            image,
            this.body.position.x-w/2,
            this.body.position.y-this.radius,
            w, this.radius*2
        )
    }

    inSun(sun) {
        return ((this.body.position.x-sun.x)**2 + (this.body.position.y-sun.y)**2 < sun.radius**2);
    }

}