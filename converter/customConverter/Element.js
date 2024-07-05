class Element{

    constructor(name, multiplyer, divider){
        this.name = name;
        this.multiplyer = multiplyer;
        this.divider = divider;
    }

    toSmallestElement(value){
        return value * this.multiplyer;
    }

    fromSmallestElement(value){
        return value / this.divider;
    }

    getName(){
        return this.name;
    }

}