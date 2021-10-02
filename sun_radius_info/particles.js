class particle {
    constructor (y) {
        this.x = canvas.width/2;
        this.y = y;
        this.starty = y;
        this.velocity = [velocity, 0];
        this.trails = [];
    }
    
    update() {
        this.trails.push([this.x, this.y]);
        let dx = this.x-canvas.width/2;
        let dy = this.y-canvas.height/2;
        let dist = (dx**2 + dy**2)**.5;

        if (dist <= radius) {
            return false;
        }
        
        dist *= radiusScaled/radius;
        let vel = 6.67*10**-11*mass / dist**2 * deltaTime; // v = acc*dt
        vel *= radius/radiusScaled;

        let distbyvel = dist/vel;
        let velX = -dx / distbyvel;
        let velY = -dy / distbyvel;
        
        this.velocity[0] += velX;
        this.velocity[1] += velY;
        
        
        this.x += this.velocity[0]*deltaTime;
        this.y += this.velocity[1]*deltaTime;
        
        if (this.trails.length>100) this.trails.splice(0, 1);
        return true;
    }

    show() {
        ctx.strokeStyle = "#fff";
        ctx.fillStyle   = '#fff';
        ctx.moveTo(this.x, this.y);
        ctx.beginPath();
        for (let i of this.trails) {
            ctx.lineTo(i[0], i[1]);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

    }
}