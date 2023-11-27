class PolarVector{
    constructor(phi,r){
        this.phi = phi;
        this.r = r;
    }

    to_cartesian(){
        let radphi = to_radian(this.phi);
        return new Vector(this.r*Math.cos(radphi), this.r*Math.sin(radphi));
    }

    forgatott(f){
        return new PolarVector(this.phi+f, this.r);
    }
}

function to_degree(radian){
    return radian*180/Math.PI;
}

function to_radian(degree){
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

    addto(that){
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

    static rotate90left(u){
        return new Vector(-u.y, u.x);
    }

    static rotate90right(u){
        return new Vector(u.y, -u.x);
    }

    static multiplynum(u, a){
        return new Vector(u.x*a, u.y*a);
    }

    static devidenum(u, a){
        return new Vector(u.x/a, u.y/a)
    }

    to_polar(){
        return new PolarVector(to_degree(Math.atan2(this.y,this.x)), this.len());
    }

    len(){
        return Math.sqrt(this.hossznegyzet());
    }

    lensqr(){
        return this.x**2+this.y**2;
    }

    static rotate(u, fok){
        return u.polar().rotate(fok).to_cartesian();   
    }
    
    unitvector(){
        return new Vector(this.x/this.len(), this.y/this.len());
    }
}