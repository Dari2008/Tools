class Elements{


    constructor(fullName, name, elementType = ElementType.REAKTIVE_NICHTMETALLE, ordernumber, weight, elektronegativity, isRadioactive = false){
        this.fullName = fullName;
        this.name = name;
        this.weight = weight;
        this.ordernumber = ordernumber;
        this.elementType = elementType;
        this.isRadioactive = isRadioactive;
        this.elektronegativity = elektronegativity;
    }

    getElementType(){
        return this.elementType;
    }

    getFullName() {
        return this.fullName;
    }

    getName() {
        return this.name;
    }

    getElectons() {
        return this.ordernumber;
    }

    getProtons() {
        return this.ordernumber;
    }

    getNeutrons() {
        return this.weight - this.ordernumber;
    }

    getWeight() {
        return this.weight;
    }

    getOrderNumber() {
        return this.ordernumber;
    }

    isRadioActive(){
        return this.isRadioactive;
    }

    getID(){
        return this.id;
    }

    getElectroNegativity(){
        return this.elektronegativity;
    }

    getOpenConnections(){
        if(this.ordernumber <= 2){
            if(this.ordernumber == 2)return 0;
            return 1;
        }
        let outerNumber = this.ordernumber;
        outerNumber = outerNumber-2
        outerNumber = outerNumber%8;
        if(outerNumber == 0)outerNumber = 8;
        if(outerNumber > 4)return outerNumber%4==0?0:4-outerNumber%4;
        return outerNumber;
    }

    getClosedConnections(){
        if(this.ordernumber <= 2){
            if(this.ordernumber == 2)return 1;
            return 0;
        }
        let outerNumber = this.ordernumber;
        outerNumber = outerNumber-2
        outerNumber = outerNumber%8;
        if(outerNumber == 0)outerNumber = 8;
        if(outerNumber <= 4)return 0;
        return outerNumber-4;
    }

    render(c, g, x, y, w, h, renderForList = true, config = ElementConfig.EMPTY_CONFIG, rotation = 0, oX, oY){
        if(renderForList){
            g.strokeStyle = this.getElementType().getColor();
            g.fillStyle = this.getElementType().getColor();
            g.strokeRect(x, y, w, h);
    
            const centered = (text, size, i) => {
                g.font = size + 'px monospace';
                let s = g.measureText(text).width;
                if(i === 0){
                    g.fillText(text, x + (w / 2) - s / 2, y + h/2 - size/4);
                }else{
                    g.fillText(text, x + (w / 2) - s / 2, y + h/4*3 - size/4);
                }
            }
    
            centered(this.isRadioActive()?this.getName() + "*":this.getName(), "20", 0);
            centered(this.getFullName(), "12", 1);
    
            g.font = '13px monospace';
    
            g.fillText(this.getOrderNumber(), x + 3, y + 13);
    
            g.fillText(this.getWeight(), x + 3, y + h - 3);
            
            if(this.getElectroNegativity() > 0){
                g.fillText(this.getElectroNegativity(), x + w - (13 * (("" + this.getElectroNegativity()).replace(".", "").replace("-", "")).length), y + 13);
            }else{
                g.fillText("-", x + w - (13 * (("" + this.getElectroNegativity()).replace(".", "").replace("-", "")).length), y + 13);
            }
            
        }else{
            var fontSize = 30;
            g.strokeStyle = this.getElementType().getColor();
            g.fillStyle = this.getElementType().getColor();
            const centered = (text, size) => {
                g.font = size + 'px monospace';
                let s = g.measureText(text).width;
                g.fillText(text, oX + x + w / 2 - s / 2, oY + y + h / 2 + size / 4);
              }
    
            centered(this.isRadioActive()?this.getName() + "*":this.getName(), fontSize);

            var conns = [];

            for(let i = 0; i < config.countOfClosedConnections; i++){
                conns.push(new Connection(this, this));
            }
            let v = config.getConnections();
            for(let conn of v){
                conns.push(conn);
            }

            if(conns.length < config.countOfClosedConnections + config.countOfOpenConnections){
                while(conns.length < config.countOfClosedConnections + config.countOfOpenConnections){
                    conns.push(new Connection(this, null));
                }
            }

            if(conns.length > 4 && conns.length != 2){
                g.strokeStyle = "rgb(255, 0, 0)";
                g.fillStyle = "rgb(255, 0, 0)";
                centered("ERROR " + conns.length, 20);
                return;
            }

            var lineLength = (CanvasRenderer.WIDTH + CanvasRenderer.HEIGHT)/2*0.4, lineThickness = (CanvasRenderer.WIDTH + CanvasRenderer.HEIGHT)/2*0.05;

            var connectionPoints = [];

            for(let i = 0; i < conns.length; i++){
                if(conns[i].getE1() === conns[i].getE2()){
                    this.drawLineForConnection(
                        g, 
                        x+oX, 
                        y+oY, 
                        CanvasRenderer.XVARS[CanvasRenderer.ROTATIONVALS[rotation][i]], 
                        CanvasRenderer.YVARS[CanvasRenderer.ROTATIONVALS[rotation][i]], 
                        CanvasRenderer.ROTATIONVALS[rotation][i]%2==0, 
                        lineLength, 
                        lineThickness
                    );
                }else{
                    connectionPoints.push(i);
                    this.drawCircleForConnection(
                        g,
                        x+oX, 
                        y+oY, 
                        CanvasRenderer.XVARS[CanvasRenderer.ROTATIONVALS[rotation][i]], 
                        CanvasRenderer.YVARS[CanvasRenderer.ROTATIONVALS[rotation][i]], 
                        CanvasRenderer.CONNECTION_POINT_DIAMETER
                    );
                }
            }
            return connectionPoints;
        }

    }

    drawLineForConnection(g, xOffset, yOffset, x, y, booleanVerticaly = false, lineLength, lineThickness){
        if(booleanVerticaly){
            x = x - lineLength/2;
        }else{
            y = y - lineLength/2;
        }

        g.lineWidth = lineThickness;
        g.beginPath();
        g.moveTo(xOffset + x, yOffset + y);
        g.lineTo(xOffset + x + (booleanVerticaly?lineLength:0), yOffset + y + ((!booleanVerticaly)?lineLength:0));
        g.stroke();

    }

    drawCircleForConnection(g, xOffset, yOffset, x, y, d){
        this.drawCircle(g, xOffset + x, yOffset + y, d, 2)
    }

    drawCircle(g, x, y, radius, strokeWidth) {
        g.beginPath();
        g.arc(x, y, radius, 0, 2 * Math.PI, false);
        g.lineWidth = strokeWidth;
        g.stroke();
    }

    getHoverString(x=0, y=0){
        return this.getFullName() + ":" + 
            "\n\tOrdnungszahl: " + this.getOrderNumber() + 
            "\n\tGewicht: " + this.getWeight() + 
            "\n\tAbkürzung: " + this.getName() + 
            "\n\tElement Typ: " + this.getElementType().getName() +
            "\n\tElektronegativität: " + this.getElectroNegativity() +
            "\n\tRadioaktiv: " + (this.isRadioActive()?"Ja":"Nein")
            ;
    }

    createPositionalElement(x, y, rotation=0, uid=0){
        return new PositionalElement(this, x, y, CanvasRenderer.WIDTH, CanvasRenderer.HEIGHT, rotation, uid);
    }

    static createPositionalElement(e, x, y, rotation=0, uid=0){
        return new PositionalElement(e, x, y, CanvasRenderer.WIDTH, CanvasRenderer.HEIGHT, rotation, uid);
    }

    static getElementByOrdernumber(id){
        let all = Object.values(Elements);
        for(let a of all){
            if(a.getOrderNumber() === id)return a;
        }
        return null;
    }

}




Elements.WASSERSTOFF = new Elements("Wasserstoff", "H", ElementType.REAKTIVE_NICHTMETALLE, 1, 1, 2.2);
Elements.KOHLENSTOFF = new Elements("Kohlenstoff", "C", ElementType.REAKTIVE_NICHTMETALLE, 6, 12, 2,5);
Elements.STICKSTOFF = new Elements("Stickstoff", "N", ElementType.REAKTIVE_NICHTMETALLE, 7, 14, 3.0);
Elements.SAUERSTOFF = new Elements("Sauerstoff", "O", ElementType.REAKTIVE_NICHTMETALLE, 8, 16, 3.4);
Elements.PHOSPHOR = new Elements("Phosphor", "P", ElementType.REAKTIVE_NICHTMETALLE, 15, 31, 2.2);
Elements.SCHWEFEL = new Elements("Schwefel", "S", ElementType.REAKTIVE_NICHTMETALLE, 16, 32, 2.6);
Elements.FLUOR = new Elements("Fluor", "F", ElementType.REAKTIVE_NICHTMETALLE, 9, 19, 4.0);
Elements.CHLOR = new Elements("Chlor", "Cl", ElementType.REAKTIVE_NICHTMETALLE, 17, 35, 3.2);
Elements.BROM = new Elements("Brom", "Br", ElementType.REAKTIVE_NICHTMETALLE, 35, 80, 3.0);
Elements.IOD = new Elements("Iod", "I", ElementType.REAKTIVE_NICHTMETALLE, 53, 127, 2.7);
Elements.SELEN = new Elements("Selen", "Se", ElementType.REAKTIVE_NICHTMETALLE, 34, 79, 2.5);

Elements.HELIUM = new Elements("Helium", "He", ElementType.EDELGASE, 2, 4, -1);
Elements.NEON = new Elements("Neon", "Ne", ElementType.EDELGASE, 10, 20, -1);
Elements.ARGON = new Elements("Argon", "Ar", ElementType.EDELGASE, 18, 40, -1);
Elements.KRYPTON = new Elements("Krypton", "Kr", ElementType.EDELGASE, 36, 84, -1);
Elements.XENON = new Elements("Xenon", "Xe", ElementType.EDELGASE, 54, 131, -1);
Elements.RADON = new Elements("Radon", "Rn", ElementType.EDELGASE, 86, 222, -1, true);


Elements.MAGNESIUM = new Elements("Magnesium", "Mg", ElementType.ERDALKALIMETALLE, 12, 24, 1.3);
Elements.CALCIUM = new Elements("Calcium", "Ca", ElementType.ERDALKALIMETALLE, 20, 40, 1.0);
Elements.LITHIUM = new Elements("Lithium", "Li", ElementType.ALKALIMETALLE, 3, 7, 1.0);
Elements.NATRIUM = new Elements("Natrium", "Na", ElementType.ALKALIMETALLE, 11, 23, 0.9);
Elements.KALIUM = new Elements("Kalium", "K", ElementType.ALKALIMETALLE, 19, 39, 0.8);
Elements.RUBIDIUM = new Elements("Rubidium", "Rb", ElementType.ALKALIMETALLE, 37, 85, 0.8);
Elements.CAESIUM = new Elements("Caesium", "Cs", ElementType.ALKALIMETALLE, 55, 133, 0.8);
Elements.FRANCIUM = new Elements("Francium", "Fr", ElementType.ALKALIMETALLE, 87, 223, 0.7, true);

Elements.BERYLLIUM = new Elements("Beryllium", "Be", ElementType.ERDALKALIMETALLE, 4, 9, 1.5);
Elements.STRONTIUM = new Elements("Strontium", "Sr", ElementType.ERDALKALIMETALLE, 38, 88, 1.0);
Elements.BARIUM = new Elements("Barium", "Ba", ElementType.ERDALKALIMETALLE, 56, 137, 0.9);
Elements.RADIUM = new Elements("Radium", "Ra", ElementType.ERDALKALIMETALLE, 88, 226, 0.9, true);

Elements.BOR = new Elements("Bor", "B", ElementType.HALBMETALL, 5, 11, 2.0);
Elements.SILICIUM = new Elements("Silicium", "Si", ElementType.HALBMETALL, 14, 28, 1.9);
Elements.GERMANIUM = new Elements("Germanium", "Ge", ElementType.HALBMETALL, 32, 73, 2.0);
Elements.ARSEN = new Elements("Arsen", "As", ElementType.HALBMETALL, 33, 75, 2.2);
Elements.ANTIMON = new Elements("Antimon", "Sb", ElementType.HALBMETALL, 51, 121, 2.1);
Elements.TELLUR = new Elements("Tellur", "Te", ElementType.HALBMETALL, 52, 128, 2.1);

Elements.ALUMINUM = new Elements("Aluminum", "Al", ElementType.POST_UEBERGANGSMETALLE, 13, 27, 1.6);
Elements.GALLIUM = new Elements("Gallium", "Ga", ElementType.POST_UEBERGANGSMETALLE, 31, 70, 1.8);
Elements.INDIUM = new Elements("Indium", "In", ElementType.POST_UEBERGANGSMETALLE, 49, 115, 1.8);
Elements.ZINN = new Elements("Zinn", "Sn", ElementType.POST_UEBERGANGSMETALLE, 50, 118, 1.8);
Elements.THALLIUM = new Elements("Thallium", "Tl", ElementType.POST_UEBERGANGSMETALLE, 81, 204, 2.0);
Elements.BLEI = new Elements("Blei", "Pb", ElementType.POST_UEBERGANGSMETALLE, 82, 207, 1.9);
Elements.BISMUT = new Elements("Bismut", "Bi", ElementType.POST_UEBERGANGSMETALLE, 83, 209, 2.0);
Elements.POLONIUM = new Elements("Polonium", "Po", ElementType.POST_UEBERGANGSMETALLE, 84, 209, 2.0, true);
Elements.ASTAT = new Elements("Astat", "At", ElementType.POST_UEBERGANGSMETALLE, 85, 210, 2.2, true);

Elements.SCANDIUM = new Elements("Scandium", "Sc", ElementType.UEBERGANGSMETALLE, 21, 45, 1.4);
Elements.TITAN = new Elements("Titan", "Ti", ElementType.UEBERGANGSMETALLE, 22, 48, 1.5);
Elements.VANDIUM = new Elements("Vandium", "V", ElementType.UEBERGANGSMETALLE, 23, 51, 1.6);
Elements.CHROM = new Elements("Chrom", "Cr", ElementType.UEBERGANGSMETALLE, 24, 52, 1.7);
Elements.MANGAN = new Elements("Mangan", "Mn", ElementType.UEBERGANGSMETALLE, 25, 55, 1.6);
Elements.EISEN = new Elements("Eisen", "Fe", ElementType.UEBERGANGSMETALLE, 26, 56, 1.8);
Elements.COBALT = new Elements("Cobalt", "Co", ElementType.UEBERGANGSMETALLE, 27, 59, 1.9);
Elements.NICKEL = new Elements("Nickel", "Ni", ElementType.UEBERGANGSMETALLE, 28, 60, 1.9);
Elements.KUPFER = new Elements("Kupfer", "Cu", ElementType.UEBERGANGSMETALLE, 29, 64, 1.7);
Elements.ZINK = new Elements("Zink", "Zn", ElementType.UEBERGANGSMETALLE, 30, 65, 1.7);
Elements.YTTRIUM = new Elements("Yttrium", "Y", ElementType.UEBERGANGSMETALLE, 39, 89, 1.2);
Elements.ZIRCONIUM = new Elements("Zirconium", "Zr", ElementType.UEBERGANGSMETALLE, 40, 91, 1.3);
Elements.NIOB = new Elements("Niob", "Nb", ElementType.UEBERGANGSMETALLE, 41, 93, 1.6);
Elements.MOLYBDÄN = new Elements("Molybdän", "Mo", ElementType.UEBERGANGSMETALLE, 42, 96, 2.2);
Elements.TECHNETIUM = new Elements("Technetium", "Tc", ElementType.UEBERGANGSMETALLE, 43, 99, 1.9, true);
Elements.RUTHENIUM = new Elements("Ruthenium", "Ru", ElementType.UEBERGANGSMETALLE, 44, 101, 2.2);
Elements.RHODIUM = new Elements("Rhodium", "Rh", ElementType.UEBERGANGSMETALLE, 45, 103, 2.3);
Elements.PALLADIUM = new Elements("Palladium", "Pd", ElementType.UEBERGANGSMETALLE, 46, 106, 2.2);
Elements.SILBER = new Elements("Silber", "Ag", ElementType.UEBERGANGSMETALLE, 47, 108, 1.9);
Elements.CADMIUM = new Elements("Cadmium", "Cd", ElementType.UEBERGANGSMETALLE, 48, 112, 1.7);
Elements.HAFNIUM = new Elements("Hafnium", "Hf", ElementType.UEBERGANGSMETALLE, 72, 178, 1.3);
Elements.TANTAL = new Elements("Tantal", "Ta", ElementType.UEBERGANGSMETALLE, 73, 181, 1.5);
Elements.WOLFRAM = new Elements("Wolfram", "W", ElementType.UEBERGANGSMETALLE, 74, 184, 2.4);
Elements.RHENIUM = new Elements("Rhenium", "Re", ElementType.UEBERGANGSMETALLE, 75, 186, 1.9);
Elements.OSMIUM = new Elements("Osmium", "Os", ElementType.UEBERGANGSMETALLE, 76, 190, 2.2);
Elements.IRIDIUM = new Elements("Iridium", "Ir", ElementType.UEBERGANGSMETALLE, 77, 192, 2.2);
Elements.PLATIN = new Elements("Platin", "Pt", ElementType.UEBERGANGSMETALLE, 78, 195, 2.2);
Elements.GOLD = new Elements("Gold", "Au", ElementType.UEBERGANGSMETALLE, 79, 197, 2.5);
Elements.QUECKSILBER = new Elements("Quecksilber", "Hg", ElementType.UEBERGANGSMETALLE, 80, 201, 2.0);
Elements.RUTHERFORDIUM = new Elements("Rutherfordium", "Rf", ElementType.UEBERGANGSMETALLE, 104, 261, -1);
Elements.DUBNIUM = new Elements("Dubnium", "Db", ElementType.UEBERGANGSMETALLE, 105, 262, -1);
Elements.SEABORGIUM = new Elements("Seaborgium", "Sg", ElementType.UEBERGANGSMETALLE, 106, 266, -1);
Elements.BOHRIUM = new Elements("Bohrium", "Bh", ElementType.UEBERGANGSMETALLE, 107, 264, -1);
Elements.HASSIUM = new Elements("Hassium", "Hs", ElementType.UEBERGANGSMETALLE, 108, 269, -1);

Elements.MEITNERIUM = new Elements("Meitnerium", "Mt", ElementType.UNBEKANNTE_EIGENSCHAFFTEN, 109, 268, -1, true);
Elements.DARMSTADTIUM = new Elements("Darmstadtium", "Ds", ElementType.UNBEKANNTE_EIGENSCHAFFTEN, 110, 271, -1, true);
Elements.ROENTGENIUM = new Elements("Roentgenium", "Rg", ElementType.UNBEKANNTE_EIGENSCHAFFTEN, 111, 272, -1, true);
Elements.COPERNICIUM = new Elements("Copernicium", "Cn", ElementType.UNBEKANNTE_EIGENSCHAFFTEN, 112, 277, -1, true);
Elements.NIHONIUM = new Elements("Nihonium", "Nh", ElementType.UNBEKANNTE_EIGENSCHAFFTEN, 113, 286, -1, true);
Elements.FLEROVIUM = new Elements("Flerovium", "Fl", ElementType.UNBEKANNTE_EIGENSCHAFFTEN, 114, 289, -1, true);
Elements.MOSCOVIUM = new Elements("Moscovium", "Mc", ElementType.UNBEKANNTE_EIGENSCHAFFTEN, 115, 289, -1, true);
Elements.LIVERMONUM = new Elements("Livermonum", "Lv", ElementType.UNBEKANNTE_EIGENSCHAFFTEN, 116, 293, -1, true);
Elements.TENNESSINE = new Elements("Tennessine", "Ts", ElementType.UNBEKANNTE_EIGENSCHAFFTEN, 117, 294, -1, true);
Elements.OGANESSON = new Elements("Oganesson", "Og", ElementType.UNBEKANNTE_EIGENSCHAFFTEN, 118, 294, -1, true);


Elements.LANTHAN = new Elements("Lanthan", "La", ElementType.LANTHANOIDE, 57, 139, 1.1);
Elements.CER = new Elements("Cer", "Ce", ElementType.LANTHANOIDE, 58, 140, 1.1);
Elements.PRASEODYM = new Elements("Praseodym", "Pr", ElementType.LANTHANOIDE, 59, 141, 1.1);
Elements.NEODYM = new Elements("Neodym", "Nd", ElementType.LANTHANOIDE, 60, 144, 1.2);
Elements.PROMETHIUM = new Elements("Promethium", "Pm", ElementType.LANTHANOIDE, 61, 145, -1);
Elements.SAMARIUM = new Elements("Samarium", "Sm", ElementType.LANTHANOIDE, 62, 150, 1.2);
Elements.EUROPIUM = new Elements("Europium", "Eu", ElementType.LANTHANOIDE, 63, 152, -1);
Elements.GADOLINIUM = new Elements("Gadolinium", "Gd", ElementType.LANTHANOIDE, 64, 157, 1.1);
Elements.TERBIUM = new Elements("Terbium", "Tb", ElementType.LANTHANOIDE, 65, 159, 1.2);
Elements.DYSPROSIUM = new Elements("Dysprosium", "Dy", ElementType.LANTHANOIDE, 66, 163, 1.1);
Elements.HOLMIUM = new Elements("Holmium", "Ho", ElementType.LANTHANOIDE, 67, 165, 1.1);
Elements.ERBIUM = new Elements("Erbium", "Er", ElementType.LANTHANOIDE, 68, 167, 1.1);
Elements.THULIUM = new Elements("Thulium", "Tm", ElementType.LANTHANOIDE, 69, 169, 1.1);
Elements.YTTERBIUM = new Elements("Ytterbium", "Yb", ElementType.LANTHANOIDE, 70, 173, 1.2);
Elements.LUTETIUM = new Elements("Lutetium", "Lu", ElementType.LANTHANOIDE, 71, 175, 1.1);

Elements.ACTINIUM = new Elements("Actinium", "Ac", ElementType.ACTINOIDE, 89, 227, 1.1, true);
Elements.THORIUM = new Elements("Thorium", "Th", ElementType.ACTINOIDE, 90, 232, 1.3, true);
Elements.PROTACTINIUM = new Elements("Protactinium", "Pa", ElementType.ACTINOIDE, 91, 231, 1.5, true);
Elements.URAN = new Elements("Uran", "U", ElementType.ACTINOIDE, 92, 238, 1.7, true);
Elements.NEPTUNIUM = new Elements("Neptunium", "Np", ElementType.ACTINOIDE, 93, 237, 1.3, true);
Elements.PLUTONIUM = new Elements("Plutonium", "Pu", ElementType.ACTINOIDE, 94, 244, 1.3, true);
Elements.AMERICIUM = new Elements("Americium", "Am", ElementType.ACTINOIDE, 95, 248, 1.3, true);
Elements.CURIUM = new Elements("Curium", "Cm", ElementType.ACTINOIDE, 96, 247, -1, true);
Elements.BERKELIUM = new Elements("Berkelium", "Bk", ElementType.ACTINOIDE, 97, 247, -1, true);
Elements.CALIFORNIUM = new Elements("Californium", "Cf", ElementType.ACTINOIDE, 98, 251, -1, true);
Elements.EINSTEINIUM = new Elements("Einsteinium", "Es", ElementType.ACTINOIDE, 99, 254, -1, true);
Elements.FERMIUM = new Elements("Fermium", "Fm", ElementType.ACTINOIDE, 100, 253, -1, true);
Elements.MENDELEVIUM = new Elements("Mendelevium", "Md", ElementType.ACTINOIDE, 101, 258, -1, true);
Elements.NOBELIUM = new Elements("Nobelium", "No", ElementType.ACTINOIDE, 102, 256, -1, true);
Elements.LAWRENCIUM = new Elements("Lawrencium", "Lr", ElementType.ACTINOIDE, 103, 256, -1, true);