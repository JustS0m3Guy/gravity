class Celestialb{
    constructor(name, mass, p, v, incolor, outlcolor, galaxy){
        this.name = name;
        this.mass = mass;
        this.incolor = incolor;
        this.outlcolor = outlcolor;
        this.starting_positions = [p, v];
        this.svgobject = this.svgPlanet(p);
        this.svgarrow = this.makeSvgArrow();
        this.setPoz();
        this.svgArrowUpdate();
        this.galaxy = milkyway;
        galaxy.celestialbs.push(this);
        this.svgobject.addEventListener('contextmenu', e => {e.preventDefault(); e.stopPropagation(); this.delete});
    }

    delete(){
        this.svgarrow.remove();
        this.svgobject.remove();
        this.milkyway.celestialbs.splice(this.milkyway.celestialbs.indexOf(this), 1);
        delete this;
    }

    move(){
        this.p.addto(this.v);
        this.refresh();
    }

    setPoz(){
        this.svgobject.setAttribute('cx', this.starting_positions[0].x);
        this.svgobject.setAttribute('cy', this.starting_positions[0].y);
        this.p = this.starting_positions[0].clone();
        this.v = this.starting_positions[1].clone();
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

    svgPlanet(p){
        let svgo = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        svgo.setAttribute('cx', p.x);
        svgo.setAttribute('cy', p.y);
        svgo.setAttribute('r', Math.sqrt(this.mass));
        svgo.setAttribute('stroke', this.outlcolor);
        svgo.setAttribute('stroke-width', '2');
        svgo.setAttribute('fill', this.incolor);
        return svgo;
    }

    makeSvgArrow(){
        let svgarrow = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        // <circle/>
        svgarrow.setAttribute('marker-end', 'url(#head)');
        svgarrow.setAttribute('stroke-width', 2);
        svgarrow.setAttribute('fill', 'none');
        svgarrow.setAttribute('stroke', 'gray');
        svgarrow.setAttribute('stroke-width', '2');
        return svgarrow;
    }
    svgArrowUpdate(){
        this.svgarrow.setAttribute('d', `M${this.p.x},${this.p.y} ${this.p.x+this.v.x*100},${this.p.y+this.v.y*100}`);
    }
}