class Einer{
      
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

    static getNumberForEiner(EinerValue) {
        switch (EinerValue) {
          case this.ACHT:
            return 8;
          case this.DREI:
            return 3;
          case this.EIN:
            return 1;
          case this.FUENF:
            return 5;
          case this.NEUN:
            return 9;
          case this.SECHS:
            return 6;
          case this.SIEBEN:
            return 7;
          case this.VIER:
            return 4;
          case this.ZWEI:
            return 2;
          default:
            return -1;
        }
      }
      static getEinerForNumber(i) {
        switch (i) {
          case 1:
            return this.EIN;
          case 2:
            return this.ZWEI;
          case 3:
            return this.DREI;
          case 4:
            return this.VIER;
          case 5:
            return this.FUENF;
          case 6:
            return this.SECHS;
          case 7:
            return this.SIEBEN;
          case 8:
            return this.ACHT;
          case 9:
            return this.NEUN;
          default:
            return null;
        }
      }
}

Einer.EIN = new Einer("ein", 1);
Einer.ZWEI = new Einer("zwei", 2);
Einer.DREI = new Einer("drei", 3);
Einer.VIER = new Einer("vier", 4);
Einer.FUENF = new Einer("fuenf", 5);
Einer.SECHS = new Einer("sechs", 6);
Einer.SIEBEN = new Einer("sieben", 7);
Einer.ACHT = new Einer("acht", 8);
Einer.NEUN = new Einer("neun", 9);