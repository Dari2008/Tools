class Weights {
    constructor(displayName) {
        this.displayName = displayName;
    }

    getDisplayName() {
        return this.displayName;
    }

    static convert(value, from, to) {
        if (from === to) {
            return value;
        }

        const nanogramm = from.toNanogramm(value);
        return to.fromNanogramm(nanogramm);
    }

    toNanogramm(value) {
        switch (this) {
            case Weights.NANOGRAMM:
                return BigInt(value);
            case Weights.MIKROGRAMM:
                return BigInt(value) * BigInt("1000");
            case Weights.MILLIGRAMM:
                return BigInt(value) * BigInt("1000000");
            case Weights.ZENTIGRAMM:
                return BigInt(value) * BigInt("10000000");
            case Weights.DEZIGRAMM:
                return BigInt(value) * BigInt("100000000");
            case Weights.GRAMM:
                return BigInt(value) * BigInt("1000000000");
            case Weights.KILOGRAMM:
                return BigInt(value) * BigInt("1000000000000");
            case Weights.TONNEN:
                return BigInt(value) * BigInt("1000000000000000");
            case Weights.KILOTONNEN:
                return BigInt(value) * BigInt("1000000000000000000");
            case Weights.MEGATONNEN:
                return BigInt(value) * BigInt("1000000000000000000000");
            default:
                return value;
        }
    }

    fromNanogramm(value) {
        switch (this) {
            case Weights.NANOGRAMM:
                return BigInt(value);
            case Weights.MIKROGRAMM:
                return BigInt(value) / BigInt("1000");
            case Weights.MILLIGRAMM:
                return BigInt(value) / BigInt("1000000");
            case Weights.ZENTIGRAMM:
                return BigInt(value) / BigInt("10000000");
            case Weights.DEZIGRAMM:
                return BigInt(value) / BigInt("100000000");
            case Weights.GRAMM:
                return BigInt(value) / BigInt("1000000000");
            case Weights.KILOGRAMM:
                return BigInt(value) / BigInt("1000000000000");
            case Weights.TONNEN:
                return BigInt(value) / BigInt("1000000000000000");
            case Weights.KILOTONNEN:
                return BigInt(value) / BigInt("1000000000000000000");
            case Weights.MEGATONNEN:
                return BigInt(value) / BigInt("1000000000000000000000");
            default:
                return value;
        }
    }

    static values(){
        return Object.values(Weights);
    }

}

Weights.NANOGRAMM = new Weights("Nanogramm");
Weights.MIKROGRAMM = new Weights("Mikrogramm");
Weights.MILLIGRAMM = new Weights("Milligramm");
Weights.ZENTIGRAMM = new Weights("Zentigramm");
Weights.DEZIGRAMM = new Weights("Dezigramm");
Weights.GRAMM = new Weights("Gramm");
Weights.KILOGRAMM = new Weights("Kilogramm");
Weights.TONNEN = new Weights("Tonnen");
Weights.KILOTONNEN = new Weights("Kilotonnen");
Weights.MEGATONNEN = new Weights("Megatonnen");
