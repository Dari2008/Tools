class Zehner{

          
    constructor(name, val){
        this.name = name;
        this.val = val;
    }
  
    getValue(){
        return this.val;
    }
  
    getName(){
        return this.name;
    }

    static getZehnerForNumber(i) {
        switch (i) {
        case 1:
            return this.ZEHN;
        case 2:
            return this.ZWANZIG;
        case 3:
            return this.DREISSIG;
        case 4:
            return this.VIERZIG;
        case 5:
            return this.FUENFZIG;
        case 6:
            return this.SECHZIG;
        case 7:
            return this.SIEBZIG;
        case 8:
            return this.ACHZIG;
        case 9:
            return this.NEUNZIG;
        default:
            return null;
        }
    }
    
    static number(ZehnerValue) {
        switch (ZehnerValue) {
        case this.ACHZIG:
            return 8;
        case this.DREISSIG:
            return 3;
        case this.FUENFZIG:
            return 5;
        case this.NEUNZIG:
            return 9;
        case this.SECHZIG:
            return 6;
        case this.SIEBZIG:
            return 7;
        case this.VIERZIG:
            return 4;
        case this.ZEHN:
            return 1;
        case this.ZWANZIG:
            return 2;
        default:
            return 0;
        }
    }
}


Zehner.ZEHN = new Zehner("zehn", 1);
Zehner.ZWANZIG = new Zehner("zwanzig", 2);
Zehner.DREISSIG = new Zehner("dreissig", 3);
Zehner.VIERZIG = new Zehner("vierzig", 4);
Zehner.FUENFZIG = new Zehner("fuenfzig", 5);
Zehner.SECHZIG = new Zehner("sechzig", 6);
Zehner.SIEBZIG = new Zehner("siebzig", 7);
Zehner.ACHZIG = new Zehner("achzig", 8);
Zehner.NEUNZIG = new Zehner("neunzig", 9);