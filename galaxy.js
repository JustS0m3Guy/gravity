class Galaxy{
    constructor(name){
        this.name = name;
        this.celestialbs = [];
        this.inactiveCelestialbs = [];
    }

    reset(){
        for (const celestialbody of this.celestialbs) {
            celestialbody.setPoz();
            celestialbody.svgArrowUpdate();
        }
    }

    deleteAllPlanets(){
        for (const celestialbody of this.celestialbs) {
            console.log(celestialbody);
            celestialbody.delete();
        }
        for (const celestialbody of this.inactiveCelestialbs) {
            celestialbody.delete();
        }
    }

    gravitationalInteraction(){
        for (let i = 0; i < this.celestialbs.length; i++) {
            for (let j = i + 1; j < this.celestialbs.length; j++) {
                const[u, v] = Celestialb.gravitationalInteractionOnPairs(this.celestialbs[i], this.celestialbs[j]);
                this.celestialbs[i].v.addto(u);
                this.celestialbs[j].v.addto(v);
            }
        }
    }

    move(){
        for (const celestialbody of this.celestialbs) {
            celestialbody.move();
        }
    }

    offset(v){
        for (const celestialbody of this.celestialbs) {
            celestialbody.p.addto(v);
        }
    }
    
    colideInteraction(){
        for (let i = 0; i < this.celestialbs.length; i++) {
            for (let j = i + 1; j < this.celestialbs.length; j++) {
                if (this.celestialbs[i].colides(this.celestialbs[j])) {
                    this.celestialbs[i].merge(this.celestialbs[j]);
                }
            }
        }
    }

    centerOfGravityReset(){
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
    }
}