class Galaxy{
    constructor(name){
        this.name = name;
        this.celestialbs = [];
    }

    offset(v){
        for (const celestialbody of this.celestialbs) {
            celestialbody.p.addto(v);
        }
    }

    centerofmass(){
        let result = new Vector(0,0);
        for (const celestialbody of this.celestialbs) {
            result.addto(celestialbody.p);
        }
        result.devide(this.celestialbs.length);
        return result;
    }
}