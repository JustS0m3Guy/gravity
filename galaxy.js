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

    arrowsUpdate(){
        for (const celestialbody of this.celestialbs) {
            celestialbody.svgArrowUpdate();
        }
    }
    arrowVisibilityToggle(){
        for (const celestialbody of this.celestialbs) {
            celestialbody.svgarrow.classList.toggle('invisible');
        }
        console.log("hoot");
    }
}