class PolarVector{
    constructor(phi ,r){
        this.phi = phi;
        this.r = r;
    }
    
    to_cartesian(){
        let radphi = to_radian(this.phi);
        return new Vector(this.r*Math.cos(radphi), this.r*Math.sin(radphi));
    }

    rotate(phi){
        return new PolarVector(this.phi+phi, this.r);
    }
}

function to_degree(radian){
    return radian*180/Math.PI;
}

function to_radian(degree){
    return degree*Math.PI;
}

class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    to_polar(){
        return new PolarVector(to_degree(Math.atan2(u.y, u.x)), this.len);
    }

    static add(u, v){
        return new Vector(u.x+v.x, u.y+v.y);
    }

    addto(that){
        this.x+=that.x;
        this.y+=that.y;
        return this;
    }

    static subtraction(u, v){
        return new Vector(u.x-v.x, u.y-v.y);
    }

    static reverse(){
        return new Vector(-this.x, -this.y);
    }

    static rotateleft90(){
        return new Vector(-this.y, this.x);
    }

    static rotateright90(){
        return new Vector(this.y, -this.x);
    }

    static nummultiply(u, a){
        return new Vector(u.x*a, u.y*a);
    }

    len(u){
        return Math.sqrt(this.lensquare());
    }

    lensquare(u){
        return u.x**2+u.y**2;
    }
    
    static rotate(u, degree){
        return u.to_polar().rotate(degree).to_cartesian();
    }

    unitvector(){
        return new Vector(this.x/this.len(), this.y/this.len());
    }
}