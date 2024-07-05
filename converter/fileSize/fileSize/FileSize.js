class FileSize {
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

        const nanogramm = from.toByte(value);
        return to.fromByte(nanogramm);
    }

    toByte(value) {
        switch (this) {
            case FileSize.BYTE:
                return BigInt(value);
            case FileSize.KILOBYTE:
                return BigInt(value) * BigInt("1000");
            case FileSize.MEGABYTE:
                return BigInt(value) * BigInt("1000000");
            case FileSize.GIGABYTE:
                return BigInt(value) * BigInt("1000000000");
            case FileSize.TERABYTE:
                return BigInt(value) * BigInt("1000000000000");
            case FileSize.PETABYTE:
                return BigInt(value) * BigInt("1000000000000000");
            case FileSize.EXABYTE:
                return BigInt(value) * BigInt("1000000000000000000");
            case FileSize.ZETTABYTE:
                return BigInt(value) * BigInt("1000000000000000000000");
            default:
                return value;
        }
    }

    fromByte(value) {
        switch (this) {
            case FileSize.BYTE:
                return BigInt(value);
            case FileSize.KILOBYTE:
                return BigInt(value) / BigInt("1000");
            case FileSize.MEGABYTE:
                return BigInt(value) / BigInt("1000000");
            case FileSize.GIGABYTE:
                return BigInt(value) / BigInt("1000000000");
            case FileSize.TERABYTE:
                return BigInt(value) / BigInt("1000000000000");
            case FileSize.PETABYTE:
                return BigInt(value) / BigInt("1000000000000000");
            case FileSize.EXABYTE:
                return BigInt(value) / BigInt("1000000000000000000");
            case FileSize.ZETTABYTE:
                return BigInt(value) / BigInt("1000000000000000000000");
            default:
                return value;
        }
    }

    static values(){
        return Object.values(FileSize);
    }

}

FileSize.BYTE = new FileSize("Byte");
FileSize.KILOBYTE = new FileSize("Kilobyte");
FileSize.MEGABYTE = new FileSize("Megabyte");
FileSize.GIGABYTE = new FileSize("Gigabyte");
FileSize.TERABYTE = new FileSize("Terabyte");
FileSize.PETABYTE = new FileSize("Petabyte");
FileSize.EXABYTE = new FileSize("Exabyte");
FileSize.ZETTABYTE = new FileSize("Zettabyte");