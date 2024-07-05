class ZehnerEiner{
      
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
            return this.SIEB;
          case 8:
            return this.ACHT;
          case 9:
            return this.NEUN;
          default:
            return null;
        }
    }
}


ZehnerEiner.EIN = new ZehnerEiner("ein", 1);
ZehnerEiner.ZWEI = new ZehnerEiner("zwei", 2);
ZehnerEiner.DREI = new ZehnerEiner("drei", 3);
ZehnerEiner.VIER = new ZehnerEiner("vier", 4);
ZehnerEiner.FUENF = new ZehnerEiner("fuenf", 5);
ZehnerEiner.SECHS = new ZehnerEiner("sechs", 6);
ZehnerEiner.SIEB = new ZehnerEiner("sieb", 7);
ZehnerEiner.ACHT = new ZehnerEiner("acht", 8);
ZehnerEiner.NEUN = new ZehnerEiner("neun", 9);