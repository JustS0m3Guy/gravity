class Celestialb{
    constructor(nev, tomeg, p, v, belszin, kulszin){
        this.nev = nev;
        this.tomeg = tomeg;
        this.belszin = belszin;
        this.kulszin = kulszin;
        this.p = p;
        this.v = v;
    }

    move(){
        this.p+=this.v;
    }
}


let napocska = new Celestialb("Nap", 10, new Vector(3, 4), new Vector(5, 7), "red", "black");