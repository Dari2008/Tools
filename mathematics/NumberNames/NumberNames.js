class NumberNames {

  // ***************************** STATIC *************************************

  constructor(name, val) {
    this.name = name;
    this.val = val;
  }

  getIndex() {
    return this.val;
  }

  getName() {
    return this.name;
  }

  static getNumberName(i) {
    for (let n of Object.values(NumberNames)) {
      if (n.getIndex() === i) {
        return n;
      }
    }
    return null;
  }

  //******************************** WORD -> NUMBER ***************************************

  static toNumber(name, displayPoints = true, delimeter=".") {
    let isMinus = name.startsWith("minus");
    name = name.replace("minus", "");
    name = name.replaceAll(delimeter, "");

    for (let n of Object.values(NumberNames)) {
      if (n === NumberNames.HUNDERT) continue;
      let n1 = (n.getName() + "en").toLowerCase();
      let n2 = (n.getName() + "n").toLowerCase();
      let n3 = (n.getName() + "e").toLowerCase();
      let n4 = (n.getName() + "").toLowerCase();
      if (name.includes(n1)) {
        name = name.replace(n1, "?" + n.getName() + "|");
      } else if (name.includes(n2)) {
        name = name.replace(n2, "?" + n.getName() + "|");
      } else if (name.includes(n3)) {
        name = name.replace(n3, "?" + n.getName() + "|");
      } else {
        name = name.replace(n4, "?" + n.getName() + "|");
      }
    }

    let result = "";
    let names = [];
    let vals = new Map();

    for (let s of name.split("|")) {
      if(s === undefined || s === "")continue;
      let obj = this.getNumberOfShortName(s);
      let n = obj[1] === null ? NumberNames.TAUSEND : obj[1];
      let val = obj[0];
      names.push(n);
      vals.set(n, val);
    }

    names.sort((o1, o2) => o2.getIndex() - o1.getIndex());

    let max = Math.max(...names.map(e => e.getIndex()));
    for (let i = Object.values(NumberNames).length - 1; i >= 0; i--) {
      let n = Object.values(NumberNames)[i];
      let s = vals.get(n);
      if (s === undefined) {
        if (n.getIndex() <= max) {
          result += "000" + (displayPoints ? delimeter : "");
        }
      } else {
        result += vals.get(n) + (displayPoints ? delimeter : "");
      }
    }


    let sub = -1;

    for (let i = 0; i < result.length; i++) {
      let c = result.charAt(i);
      sub = i;
      if (c !== '0') break;
    }

    if (sub !== -1) {
      result = result.substring(sub, displayPoints ? result.length - 1 : result.length);
    }

    return isMinus ? "-" + result : result;
  }

  static getNumberOfShortName(s) {
    let e = 0;
    let z = 0;
    let h = 0;
    let tmp = s.split("?");
    s = tmp[0];
    let name = NumberNames.HUNDERT;
    if (tmp.length === 2) {
      name = NumberNames[tmp[1].toUpperCase()];
    }

    let hundert = "";
    let rest = s;
    if (s.includes("hundert")) {
      hundert = s.split("hundert")[0];
      rest = s.replace(hundert, "").replace("hundert", "");
      h = Einer.getNumberForEiner(Einer[hundert.toUpperCase()]);
    }

    if (rest.includes("zwoelf")) {
      z = 1;
      e = 2;
    } else if (rest.includes("elf")) {
      z = 1;
      e = 1;
    } else if (rest.includes("eins")) {
      z = 0;
      e = 1;
    } else {
      for (let zz in Zehner) {
        if (rest.includes(Zehner[zz].getName())) {
          z = Zehner[zz.toUpperCase()].getValue();
          rest = rest.replace(Zehner[zz].getName(), "");
        }
      }
      for (let zz in Einer) {
        if (rest.includes(Einer[zz].getName())) {
          e = Einer[zz.toUpperCase()].getValue();
          rest = rest.replace(Einer[zz].getName(), "");
        }
      }
    }

    return [h + "" + z + "" + e, name];
  }

  static contains(s) {
    for (const n of Object.values(NumberNames)) {
      if (n === s) return true;
    }
    return false;
  }

  //************************************ NUMBER -> WORDS **************************************************
  static toName(number, showDelimeter=false, delimeter=".") {
    number = number.replaceAll(delimeter, "");
    if (number.length > Object.values(NumberNames).length * 3 + 3) return "Number to large";

    let result = "";

    number = number.trim();

    if (number === "0") return "null";

    if (number.startsWith("-")) {
      result += "minus ";
      number = number.replace("-", "");
    }

    let length = number.length;
    let parts = Math.ceil(length / 3);
    let numbers = [];

    let startIndex = 0;
    let endIndex = length % 3 || 3;

    for (let i = 0; i < parts; i++) {
      numbers.push(number.substring(startIndex, endIndex));
      startIndex = endIndex;
      endIndex = Math.min(endIndex + 3, length);
    }

    let index = numbers.length - 1;
    for (let num of numbers) {
      result += this.getNameForIndex(num, index) + (showDelimeter ? delimeter : "");
      index--;
    }
    return result.substring(0, showDelimeter ? result.length - 1 : result.length);
  }

  static getNameForIndex(num, index) {
    let val = parseInt(num);
    let h = Math.floor(val / 100);
    let z = Math.floor((val / 10) % 10);
    let e = val % 10;
    let result = "";
    if (index == 0 && h === 0 && z === 0 && e === 1) return "eins";
    if (index !== 0 && h === 0 && z === 0 && e === 1) {
      result += "eine";
    } else {
      if (h !== 0) {
        let he = Einer.getEinerForNumber(h).getName();
        result += he + "hundert";
      }

      if (z !== 0 && z !== 1) {
        if (e !== 0) {
          let ee = Einer.getEinerForNumber(e).getName();
          result += ee + "und";
        }
        let he = Zehner.getZehnerForNumber(z).getName();
        result += he;
      } else if (z === 1) {
        if (e === 1) {
          result += "elf";
        } else if (e === 2) {
          result += "zwoelf";
        } else if (e !== 0) {
          let ee = ZehnerEiner.getEinerForNumber(e).getName();
          result += ee + "zehn";
        } else if (e === 0) {
          result += "zehn";
        }
      } else if (z === 0) {
        if (e !== 0) {
          let ee = Einer.getEinerForNumber(e).getName();
          result += ee === "ein" ? "eins" : ee;
        }
      }
    }
    if (index === 0) return result;

    if (e === 1 && h === 0 && z === 0) {
      let n = this.getNumberName(index).getName();
      result += n;
    } else if (!(e === 0 && z === 0 && h === 0)) {
      let n = this.getNumberName(index).getName();
      if (n === "tausend") {
        result += n;
      } else {
        let s = n;
        if (s.endsWith("e")) {
          result += s + "n";
        } else {
          result += s + "en";
        }
      }
    }

    return result;
  }
}

NumberNames.HUNDERT = new NumberNames("hundert", 0);
NumberNames.TAUSEND = new NumberNames("tausend", 1);
NumberNames.MILLION = new NumberNames("million", 2);
NumberNames.MILLIARDE = new NumberNames("milliarde", 3);
NumberNames.BILLION = new NumberNames("billion", 4);
NumberNames.BILLIARDE = new NumberNames("billiarde", 5);
NumberNames.TRILLION = new NumberNames("trillion", 6);
NumberNames.TRILLIARDE = new NumberNames("trilliarde", 7);
NumberNames.QUADRILLION = new NumberNames("quadrillion", 8);
NumberNames.QUADRILLIARDE = new NumberNames("quadrilliarde", 9);
NumberNames.QUINTILLION = new NumberNames("quintillion", 10);
NumberNames.QUINTILLIARDE = new NumberNames("quintilliarde", 11);
NumberNames.SEXTILLION = new NumberNames("sextillion", 12);
NumberNames.SEXTILLIARDE = new NumberNames("sextilliarde", 13);
NumberNames.SEPTILLION = new NumberNames("septillion", 14);
NumberNames.SEPTILLIARDE = new NumberNames("septilliarde", 15);
NumberNames.OKTILLION = new NumberNames("oktillion", 16);
NumberNames.OKTILLIARDE = new NumberNames("oktilliarde", 17);
NumberNames.NONILLION = new NumberNames("nonillion", 18);
NumberNames.NONILLIARDE = new NumberNames("nonilliarde", 19);
NumberNames.DEZILLION = new NumberNames("dezillion", 20);
NumberNames.DEZILLIARDE = new NumberNames("dezilliarde", 21);
NumberNames.UNDEZILLION = new NumberNames("undezillion", 22);
NumberNames.UNDEZILLIARDE = new NumberNames("undezilliarde", 23);
NumberNames.DUODEZILLION = new NumberNames("duodezillion", 24);
NumberNames.DUODEZILLIARDE = new NumberNames("duodezilliarde", 25);
NumberNames.TREDEZILLION = new NumberNames("tredezillion", 26);
NumberNames.TREDEZILLIARDE = new NumberNames("tredezilliarde", 27);
NumberNames.QUATTUORDEZILLION = new NumberNames("quattuordezillion", 28);
NumberNames.QUATTUORDEZILLIARDE = new NumberNames("quattuordezilliarde", 29);
NumberNames.QUINDEZILLION = new NumberNames("quindezillion", 30);
NumberNames.QUINDEZILLIARDE = new NumberNames("quindezilliarde", 31);
NumberNames.SEDEZILLION = new NumberNames("sedezillion", 32);
NumberNames.SEDEZILLIARDE = new NumberNames("sedezilliarde", 33);
NumberNames.SEPTENDEZILLION = new NumberNames("septendezillion", 34);
NumberNames.SEPTENDEZILLIARDE = new NumberNames("septendezilliarde", 35);
NumberNames.OKTODEZILLION = new NumberNames("oktodezillion", 36);
NumberNames.OKTODEZILLIARDE = new NumberNames("oktodezilliarde", 37);
NumberNames.NOVEMDEZILLION = new NumberNames("novemdezillion", 38);
NumberNames.NOVEMDEZILLIARDE = new NumberNames("novemdezilliarde", 39);
NumberNames.VIGINTILLION = new NumberNames("vigintillion", 40);
NumberNames.VIGINTILLIARDE = new NumberNames("vigintilliarde", 41);
NumberNames.UNVIGINTILLION = new NumberNames("unvigintillion", 42);
NumberNames.UNVIGINTILLIARDE = new NumberNames("unvigintilliarde", 43);
NumberNames.DUOVIGINTILLION = new NumberNames("duovigintillion", 44);
NumberNames.DUOVIGINTILLIARDE = new NumberNames("duovigintilliarde", 45);
NumberNames.TRESVIGINTILLION = new NumberNames("tresvigintillion", 46);
NumberNames.TRESVIGINTILLIARDE = new NumberNames("tresvigintilliarde", 47);
NumberNames.QUATTUORVIGINTILLION = new NumberNames("quattuorvigintillion", 48);
NumberNames.QUATTUORVIGINTILLIARDE = new NumberNames("quattuorvigintilliarde", 49);
NumberNames.QUINVIGINTILLION = new NumberNames("quinvigintillion", 50);
NumberNames.QUINVIGINTILLIARDE = new NumberNames("quinvigintilliarde", 51);
NumberNames.SEVIGINTILLION = new NumberNames("sevigintillion", 52);
NumberNames.SEVIGINTILLIARDE = new NumberNames("sevigintilliarde", 53);
NumberNames.SEPTENVIGINTILLION = new NumberNames("septenvigintillion", 54);
NumberNames.SEPTENVIGINTILLIARDE = new NumberNames("septenvigintilliarde", 55);
NumberNames.DODETRIGINTILLION = new NumberNames("dodetrigintillion", 56);
NumberNames.DODETRIGINTILLARDE = new NumberNames("dodetrigintillarde", 57);
NumberNames.UNDETRIGINTILLION = new NumberNames("undetrigintillion", 58);
NumberNames.UNDETRIGINTILLIARDE = new NumberNames("undetrigintilliarde", 59);
NumberNames.TRIGINTILLION = new NumberNames("trigintillion", 60);
NumberNames.TRIGINTILLIARDE = new NumberNames("trigintilliarde", 61);
NumberNames.UNTRIGINTILLION = new NumberNames("untrigintillion", 62);
NumberNames.UNTRIGINTILLIARDE = new NumberNames("untrigintilliarde", 63);
NumberNames.DOTRIGINTILLION = new NumberNames("dotrigintillion", 64);
NumberNames.DOTRIGINTILLIARDE = new NumberNames("dotrigintilliarde", 65);
NumberNames.TRETRIGINTILLION = new NumberNames("tretrigintillion", 66);
NumberNames.TRETRIGINTILLIARDE = new NumberNames("tretrigintilliarde", 67);
NumberNames.QUATTUORTRIGINTILLION = new NumberNames("quattuortrigintillion", 68);
NumberNames.QUATTUORTRIGINTILLIARDE = new NumberNames("quattuortrigintilliarde", 69);
NumberNames.QUINTRIGINTILLION = new NumberNames("quintrigintillion", 70);
NumberNames.QUINTRIGINTILLIARDE = new NumberNames("quintrigintilliarde", 71);
NumberNames.SETRIGINTILLION = new NumberNames("setrigintillion", 72);
NumberNames.SETRIGINTILLIARDE = new NumberNames("setrigintilliarde", 73);
NumberNames.SEPTENTRIGINTILLION = new NumberNames("septentrigintillion", 74);
NumberNames.SEPTENTRIGINTILLIARDE = new NumberNames("septentrigintilliarde", 75);
NumberNames.OKTOTRIGINTILLION = new NumberNames("oktotrigintillion", 76);
NumberNames.OKTOTRIGINTILLIARDE = new NumberNames("oktotrigintilliarde", 77);
NumberNames.NOVEMTRIGINTILLION = new NumberNames("novemtrigintillion", 78);
NumberNames.NOVEMTRIGINTILLIARDE = new NumberNames("novemtrigintilliarde", 79);
NumberNames.QUADRAGINTILLION = new NumberNames("quadragintillion", 80);
NumberNames.QUADRAGINTILLIARDE = new NumberNames("quadragintilliarde", 81);
NumberNames.UNQUADRAGINTILLION = new NumberNames("unquadragintillion", 82);
NumberNames.UNQUADRAGINTILLIARDE = new NumberNames("unquadragintilliarde", 83);
NumberNames.DOQUADRAGINTILLION = new NumberNames("doquadragintillion", 84);
NumberNames.DOQUADRAGINTILLIARDE = new NumberNames("doquadragintilliarde", 85);
NumberNames.TREQUADRAGINTILLION = new NumberNames("trequadragintillion", 86);
NumberNames.TREQUADRAGINTILLIARDE = new NumberNames("trequadragintilliarde", 87);
NumberNames.QUATTUORQUADRAGINTILLION = new NumberNames("quattuorquadragintillion", 88);
NumberNames.QUATTUORQUADRAGINTILLIARDE = new NumberNames("quattuorquadragintilliarde", 89);
NumberNames.QUINQUADRAGINTILLION = new NumberNames("quinquadragintillion", 90);
NumberNames.QUINQUADRAGINTILLIARDE = new NumberNames("quinquadragintilliarde", 91);
NumberNames.SEQUADRAGINTILLION = new NumberNames("sequadragintillion", 92);
NumberNames.SEQUADRAGINTILLIARDE = new NumberNames("sequadragintilliarde", 93);
NumberNames.SEPTENQUADRAGINTILLION = new NumberNames("septenquadragintillion", 94);
NumberNames.SEPTENQUADRAGINTILLIARDE = new NumberNames("septenquadragintilliarde", 95);
NumberNames.OKTOQUADRAGINTILLION = new NumberNames("oktoquadragintillion", 96);
NumberNames.OKTOQUADRAGINTILLIARDE = new NumberNames("oktoquadragintilliarde", 97);
NumberNames.NOVEMQUADRAGINTILLION = new NumberNames("novemquadragintillion", 98);
NumberNames.NOVEMQUADRAGINTILLIARDE = new NumberNames("novemquadragintilliarde", 99);
NumberNames.QUINQUAGINTILLION = new NumberNames("quinquagintillion", 100);
NumberNames.QUINQUAGINTILLIARDE = new NumberNames("quinquagintilliarde", 101);
NumberNames.ZENTILLION = new NumberNames("zentillion", 102);
NumberNames.ZENTILLIARDE = new NumberNames("zentilliarde", 103);
NumberNames.QUINQUAGINTAZENTILLION = new NumberNames("quinquagintazentillion", 104);
NumberNames.QUINQUAGINTAZENTILLIARDE = new NumberNames("quinquagintazentilliarde", 105);
NumberNames.DUZENTILLION = new NumberNames("duzentillion", 106);
NumberNames.DUZENTILLIARDE = new NumberNames("duzentilliarde", 107);