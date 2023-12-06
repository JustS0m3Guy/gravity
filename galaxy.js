class Galaxy{
    constructor(name){
        this.name = name;
        this.celestialbs = [];
        this.inactiveCelestialbs = [];
    }

    reset(){
        var to_delete = [];
        for (const celestialbody of this.celestialbs) {
            if (!celestialbody.originality){
                to_delete.push(celestialbody);
            }
            else{
                celestialbody.setPoz();
                celestialbody.svgArrowUpdate();
            }
        }
        for (const celestialbody of to_delete) {
            celestialbody.delete();   
        }
        for (const celestialbody of this.inactiveCelestialbs) {
            if (celestialbody.originality){
                celestialbody.setPoz();
                celestialbody.svgArrowUpdate();
                celestialbody.draw();
                this.celestialbs.push(celestialbody);
            }            
        }
        this.inactiveCelestialbs = [];
    }

    gravitationalInteraction(){
        for (let i = 0; i < this.celestialbs.length; i++) {
            for (let j = i + 1; j < this.celestialbs.length; j++) {
                const[u, v] = Celestialb.gravitationalInteractionOnPairs(this.celestialbs[i], this.celestialbs[j]);
                this.celestialbs[i].v.addTo(u);
                this.celestialbs[j].v.addTo(v);
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
            celestialbody.p.addTo(v);
        }
    }
    
    colideInteraction(){
        for (let i = 0; i < this.celestialbs.length; i++) {
            for (let j = i + 1; j < this.celestialbs.length; j++) {
                if (this.celestialbs[i].colides(this.celestialbs[j])) {
                    this.celestialbs[i].merge(this.celestialbs[j], i, j);
                }
            }
        }
    }

    centerOfGravityReset(){
        let result = new Vector(0,0);
        for (const celestialbody of this.celestialbs) {
            result.addTo(celestialbody.p);
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
        for (const celestialbody of this.inactiveCelestialbs) {
            celestialbody.svgarrow.classList.toggle('invisible');
        }
    }
}