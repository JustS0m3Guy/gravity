class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    static addition(u, v){
        return new Vector(u.x+v.x, u.y+v.y);
    }

    addonto(that){
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

    static turnleft90(){
        return new Vector(-this.y, this.x);
    }

    static turnright90(){
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

    unitvector(){
        return new Vector(this.x/this.len(), this.y/this.len());
    }

}


u = new Vector(5, 4);
v = new Vector(2, 1);