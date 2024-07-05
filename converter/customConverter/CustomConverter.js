class CustomConverter{

    constructor(displayName){
        this.displayName = displayName;
        this.elements = [];
    }

    getDisplayName() {
        return this.displayName;
    }

    convert(value, from, to){
        let min = 0;
        for(let element of this.elements){
            if(element.getName() == from){
                min = element.toSmallestElement(value);
                break;
            }
        }

        for(let element of this.elements){
            if(element.getName() == to){
                min = element.fromSmallestElement(min);
                break;
            }
        }
        
        return min;
    }

    valueNames(){
        let names = [];
        for(let e of this.elements){
            names.push(e.getName());
        }
        return names;
    }

    addElement(e){
        this.elements.push(e);
    }

}