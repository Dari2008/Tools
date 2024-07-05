class Weekday{

    constructor(name, shortName, id){
        this.name = name;
        this.shortName = shortName;
        this.id = id;
    }

    getName(){
        return this.name;
    }

    getShortName(){
        return this.shortName;
    }

    getID(){
        return this.id;
    }

}

Weekday.MOTAG = new Weekday("Montag", "Mo", 1);
Weekday.DIENSTAG = new Weekday("Dienstag", "Di", 2);
Weekday.MITTWOCH = new Weekday("Mittwoch", "Mi", 3);
Weekday.DONNERSTAG = new Weekday("Donnerstag", "Do", 4);
Weekday.FREITAG = new Weekday("Freitag", "Fr", 5);
Weekday.SAMSTAG = new Weekday("Samstag", "Sa", 6);
Weekday.SONNTAG = new Weekday("Sonntag", "So", 0);