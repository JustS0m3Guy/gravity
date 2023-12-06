class PolarVector{
    constructor(phi,r){
        this.phi = phi;
        this.r = r;
    }

    toCartesian(){
        let radphi = toRadian(this.phi);
        return new Vector(this.r*Math.cos(radphi), this.r*Math.sin(radphi));
    }

    spun(f){
        return new PolarVector(this.phi+f, this.r);
    }
}

function toDegree(radian){
    return radian*180/Math.PI;
}

function toRadian(degree){
    return degree*Math.PI/180;
}

class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    static add(u,v){
        return new Vector(u.x+v.x, u.y+v.y);
    }

    addTo(that){
        this.x+=that.x;
        this.y+=that.y;
        return this;
    }

    static subtract(u,v){
        return new Vector(u.x-v.x, u.y-v.y); 
    }

    static reverse(u){
        return new Vector(-u.x, -u.y);
    }

    static rotate90Left(u){
        return new Vector(-u.y, u.x);
    }

    static rotate90Right(u){
        return new Vector(u.y, -u.x);
    }

    static multiplyNum(u, a){
        return new Vector(u.x*a, u.y*a);
    }

    static devideNum(u, a){
        return new Vector(u.x/a, u.y/a)
    }

    toPolar(){
        return new PolarVector(toDegree(Math.atan2(this.y,this.x)), this.len());
    }

    len(){
        return Math.sqrt(this.lenSqr());
    }

    lenSqr(){
        return this.x**2+this.y**2;
    }

    static rotate(u, fok){
        return u.polar().rotate(fok).toCartesian();   
    }
    
    unitVector(){
        return new Vector(this.x/this.len(), this.y/this.len());
    }

    clone(){
        return new Vector(this.x, this.y);
    }

    devide(a){
        this.x/=a;
        this.y/=a;
    }
}