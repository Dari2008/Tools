class ElementType{

    constructor(name, color){
        this.name = name;
        this.color = color;
    }

    getName(){
        return this.name;
    }

    getColor(){
        return this.color;
    }

}

ElementType.ALKALIMETALLE = new ElementType("Alkalimetalle", "rgb(136, 177, 187)");
ElementType.HALBMETALL = new ElementType("Halbmetall", "rgb(182, 162, 127)");
ElementType.ACTINOIDE = new ElementType("Actinoide", "rgb(197, 159, 140)");
ElementType.ERDALKALIMETALLE = new ElementType("Erdalkalimetalle", "rgb(198, 146, 157)");
ElementType.REAKTIVE_NICHTMETALLE = new ElementType("Reaktive Nichtmetalle", "rgb(142, 165, 201)");
ElementType.UNBEKANNTE_EIGENSCHAFFTEN = new ElementType("Unbekannte Eigenschafften", "rgb(170, 171, 176)");
ElementType.UEBERGANGSMETALLE = new ElementType("Übergangsmetalle", "rgb(167, 160, 201)");
ElementType.EDELGASE = new ElementType("Edelgase", "rgb(198, 156, 166)");
ElementType.POST_UEBERGANGSMETALLE = new ElementType("Post-Übergangsmetalle", "rgb(147, 177, 171)");
ElementType.LANTHANOIDE = new ElementType("Lanthanoide", "rgb(0, 174, 219)");