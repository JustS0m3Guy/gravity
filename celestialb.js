class Celestialb{
    constructor(name, mass, p, v, incolor, outlcolor, galaxy, orriginal = true){
        this.name = name;
        this.mass = mass;
        this.incolor = incolor;
        this.outlcolor = outlcolor;
        this.starting_positions = [p, v];
        this.svgobject = this.svgPlanet(p);
        this.svgarrow = this.makeSvgArrow();
        this.setPoz();
        this.svgArrowUpdate();
        this.galaxy = galaxy;
        galaxy.celestialbs.push(this);
        this.svgobject.addEventListener('contextmenu', e => {e.preventDefault(); e.stopPropagation(); this.delete()});
        this.originality = orriginal;
    }

    delete(){
        this.svgarrow.remove();
        this.svgobject.remove();
        this.galaxy.celestialbs.splice(this.galaxy.celestialbs.indexOf(this), 1);
        delete this;
    }

    reset() {
        this.setPoz();
        this.svgArrowUpdate();
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
     * @param {Celestialb} cBody 
     */
    colides(cBody){
        const distancesqr = Vector.subtract(this.p, cBody.p).lensqr();
        const diamaterSumsqr = this.mass + cBody.mass;
        return diamaterSumsqr > distancesqr;
    }

    colormix(color1, color2, ratio) {
        ratio = Math.max(0, Math.min(1, ratio)); // Ensure ratio is between 0 and 1
    
        // Convert hex to HSL
        const hexToHsl = (hex) => {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
    
            const normalizedR = r / 255;
            const normalizedG = g / 255;
            const normalizedB = b / 255;
    
            const max = Math.max(normalizedR, normalizedG, normalizedB);
            const min = Math.min(normalizedR, normalizedG, normalizedB);
    
            let h, s, l = (max + min) / 2;
    
            if (max === min) {
                h = s = 0; // achromatic
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case normalizedR:
                        h = (normalizedG - normalizedB) / d + (normalizedG < normalizedB ? 6 : 0);
                        break;
                    case normalizedG:
                        h = (normalizedB - normalizedR) / d + 2;
                        break;
                    case normalizedB:
                        h = (normalizedR - normalizedG) / d + 4;
                        break;
                }
                h /= 6;
            }
    
            return { h, s, l };
        };
    
        // Interpolate in HSL
        const hsl1 = hexToHsl(color1);
        const hsl2 = hexToHsl(color2);
    
        const hueDiff = hsl2.h - hsl1.h;
    
        if (Math.abs(hueDiff) > 0.5) {
            // Ensure that interpolation goes the shortest way around the color wheel
            hsl2.h -= Math.sign(hueDiff);
        }
    
        const blendedHsl = {
            h: hsl1.h + hueDiff * ratio,
            s: hsl1.s + (hsl2.s - hsl1.s) * ratio,
            l: hsl1.l + (hsl2.l - hsl1.l) * ratio
        };
    
        // Convert back to hex
        const hslToHex = (hsl) => {
            const hueToRgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
    
            const { h, s, l } = hsl;
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            const r = hueToRgb(p, q, h + 1 / 3);
            const g = hueToRgb(p, q, h);
            const b = hueToRgb(p, q, h - 1 / 3);
    
            const componentToHex = (c) => {
                const hex = Math.round(c * 255).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            };
    
            return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
        };
    
        return hslToHex(blendedHsl);
    }
    /**
     * @param {Celestialb} cBody 
     */
    merge(cBody, i, j){
        const new_name = this.name + cBody.name;
        const new_mass = this.mass + cBody.mass;
        const new_p = Vector.devidenum(Vector.add(Vector.multiplynum(this.p, this.mass), Vector.multiplynum(cBody.p, cBody.mass)), new_mass);
        const new_v = Vector.devidenum(Vector.add(Vector.multiplynum(this.v, this.mass), Vector.multiplynum(cBody.v, cBody.mass)), new_mass);
        const new_incolor = this.colormix(this.incolor, cBody.outlcolor, cBody.mass/new_mass);
        const new_outcolor = this.colormix(this.outlcolor, cBody.outlcolor, cBody.mass/new_mass);
        this.galaxy.inactiveCelestialbs.push(this);
        cBody.galaxy.inactiveCelestialbs.push(cBody);
        this.galaxy.celestialbs.splice(this.galaxy.celestialbs.indexOf(this), 1);
        cBody.galaxy.celestialbs.splice(cBody.galaxy.celestialbs.indexOf(cBody), 1);
        this.svgarrow.remove();
        this.svgobject.remove();
        cBody.svgarrow.remove();
        cBody.svgobject.remove();
        let tiny_planet = new Celestialb(new_name, new_mass, new_p, new_v, new_incolor, new_outcolor, milkyway, false);
        canvas.appendChild(tiny_planet.svgobject);
        canvas.appendChild(tiny_planet.svgarrow);
        tiny_planet.svgarrow.classList.toggle('invisible');
    }
    reconstruct(){
        // this.svgobject = this.svgPlanet(this.starting_positions[0]);
        // this.svgarrow = this.makeSvgArrow();
        console.log(this.svgobject);
        console.log(this.svgarrow);
        canvas.appendChild(this.svgobject);
        canvas.appendChild(this.svgarrow);
        this.svgarrow.classList.toggle('invisible');
        this.setPoz();
        this.svgArrowUpdate();
        console.log('asd');
    }

    static gamma = 1;
    /**
    * @param {Celestialb} e *
    * @param {Celestialb} f *
    * @returns {[Vector, Vector]} *
    */
    static gravitationalInteractionOnPairs(e, f){
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