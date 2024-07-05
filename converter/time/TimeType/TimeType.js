class TimeType {
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

        const nanoseconds = from.toNanoseconds(value);
        return to.fromNanoseconds(nanoseconds);
    }

    toNanoseconds(value) {
        switch (this) {
            case TimeType.NANOSEKUNDEN:
                return value;
            case TimeType.MIKROSEKUNDEN:
                return value * 1000;
            case TimeType.MILLISEKUNDEN:
                return value * 1000000;
            case TimeType.HUNDERTSTELSEKUNDEN:
                return value * 10000000;
            case TimeType.ZEHNTELSEKUNDEN:
                return value * 100000000;
            case TimeType.SEKUNDEN:
                return value * 1000000000;
            case TimeType.MINUTEN:
                return value * 60 * 1000000000;
            case TimeType.STUNDEN:
                return value * 60 * 60 * 1000000000;
            case TimeType.TAGE:
                return value * 24 * 60 * 60 * 1000000000;
            case TimeType.WOCHEN:
                return value * 7 * 24 * 60 * 60 * 1000000000;
            case TimeType.MONATE:
                return value * 30 * 24 * 60 * 60 * 1000000000;
            case TimeType.JAHRE:
                return value * 365 * 24 * 60 * 60 * 1000000000;
            default:
                return value;
        }
    }

    fromNanoseconds(value) {
        switch (this) {
            case TimeType.NANOSEKUNDEN:
                return value;
            case TimeType.MIKROSEKUNDEN:
                return value / 1000;
            case TimeType.MILLISEKUNDEN:
                return value / 1000000;
            case TimeType.HUNDERTSTELSEKUNDEN:
                return value / 10000000;
            case TimeType.ZEHNTELSEKUNDEN:
                return value / 100000000;
            case TimeType.SEKUNDEN:
                return value / 1000000000;
            case TimeType.MINUTEN:
                return value / (60 * 1000000000);
            case TimeType.STUNDEN:
                return value / (60 * 60 * 1000000000);
            case TimeType.TAGE:
                return value / (24 * 60 * 60 * 1000000000);
            case TimeType.WOCHEN:
                return value / (7 * 24 * 60 * 60 * 1000000000);
            case TimeType.MONATE:
                return value / (30 * 24 * 60 * 60 * 1000000000);
            case TimeType.JAHRE:
                return value / (365 * 24 * 60 * 60 * 1000000000);
            default:
                return value;
        }
    }

    static values(){
        return Object.values(TimeType);
    }

}

TimeType.NANOSEKUNDEN = new TimeType("Nanosekunden");
TimeType.MIKROSEKUNDEN = new TimeType("Mikrosekunden");
TimeType.MILLISEKUNDEN = new TimeType("Millisekunden");
TimeType.HUNDERTSTELSEKUNDEN = new TimeType("Hundertstelsekunden");
TimeType.ZEHNTELSEKUNDEN = new TimeType("Zehntelsekunden");
TimeType.SEKUNDEN = new TimeType("Sekunden");
TimeType.MINUTEN = new TimeType("Minuten");
TimeType.STUNDEN = new TimeType("Stunden");
TimeType.TAGE = new TimeType("Tage");
TimeType.WOCHEN = new TimeType("Wochen");
TimeType.MONATE = new TimeType("Monate");
TimeType.JAHRE = new TimeType("Jahre");
