class Celestialb{
    constructor(name, mass, p, v, incolor, outlcolor, galaxy){
        this.name = name;
        this.mass = mass;
        this.incolor = incolor;
        this.outlcolor = outlcolor;
        this.p = p;
        this.v = v;
        this.starting_positions = [p.clone(), v.clone()];
        this.svgobject = this.in_svg();
        galaxy.celestialbs.push(this);
    }

    move(){
        this.p.addto(this.v);
        this.refresh();
    }

    resetPoz(){
        for (let i = 0; i < milkyway.celestialbs.length; i++) {
            this.svgobject.setAttribute('cx', this.starting_positions[0].x);
            this.svgobject.setAttribute('cy', this.starting_positions[0].y);
            this.p.x = this.starting_positions[0].x;
            this.p.y = this.starting_positions[0].y;
            this.v.x = this.starting_positions[1].x;
            this.v.y = this.starting_positions[1].y;
        }
    }
    
    refresh(){
        this.svgobject.setAttribute('cx', this.p.x);
        this.svgobject.setAttribute('cy', this.p.y);
    }

    /**
     * @param {Celestialb[]} celestialbs
     */
    static gravitationalEffect(celestialbs){
        for (let i = 0; i < celestialbs.length; i++) {
            for (let j = i + 1; j < celestialbs.length; j++) {
                const[u, v] = this.gravitationalForceOnPairs(celestialbs[i], celestialbs[j]);
                celestialbs[i].v.addto(u);
                celestialbs[j].v.addto(v);
            }
        }
    }

    static gamma = 1;
    /**
    * @param {Celestialb} e *
    * @param {Celestialb} f *
    * @returns {[Vector, Vector]} *
    */
    static gravitationalForceOnPairs(e, f){
        const from_f_to_e_vector = Vector.subtract(e.p, f.p);
        const r_sqr = from_f_to_e_vector.lensqr();
        const r = Math.sqrt(r_sqr);
        const unitvector_f = Vector.devidenum(from_f_to_e_vector, r);
        const unitvector_e = Vector.reverse(unitvector_f);
        const stuff = Celestialb.gamma/r_sqr;
        const movement_e = Vector.multiplynum(unitvector_e, stuff*f.mass);
        const movement_f = Vector.multiplynum(unitvector_f, stuff*e.mass);
        return [movement_e, movement_f];
    }

    in_svg(){
        let svgo = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        svgo.setAttribute('cx', this.p.x);
        svgo.setAttribute('cy', this.p.y);
        svgo.setAttribute('r', Math.sqrt(this.mass));
        svgo.setAttribute('stroke', this.outlcolor);
        svgo.setAttribute('stroke-width', '2');
        svgo.setAttribute('fill', this.incolor);
        return svgo;
    }
}