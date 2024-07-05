class ValueType{

    constructor(name, values){
        this.name = name;
        this.values = values;
    }

    getValues(){
        return this.values;
    }

    getName(){
        return this.name;
    }

    createFittingComponent(){
        if(this.name == "color"){
            let e = document.createElement("input");
            e.type = "color";
            return e;
        }else if(this.name == "number"){
            let e = document.createElement("input");
            e.type = "number";
            return e;
        }else if(this.name == "values"){
            return document.createElement("select");
        }else if(this.name == "text"){
            let e = document.createElement("input");
            e.type = "text";
            return e;
        }else if(this.name == "checkbox"){
            let e = document.createElement("input");
            e.type = "checkbox";
            return e;
        }else if(this.name == "button"){
            return document.createElement("button");
        }
    }

    getDefaultValue(){
        if(this.name == "color"){
            return "rgb(0, 0, 0)";
        }else if(this.name == "number"){
            return 0;
        }else if(this.name == "values"){
            return "";
        }else if(this.name == "text"){
            return "";
        }else if(this.name == "checkbox"){
            return true;
        }else if(this.name == "button"){
            return false;
        }
    }

}

ValueType.COLOR = new ValueType("color", []);
ValueType.NUMBER = new ValueType("number", []);
ValueType.TEXT = new ValueType("text", []);
ValueType.VALUES = new ValueType("values", []);
ValueType.CHECKBOX = new ValueType("checkbox", []);
ValueType.BUTTON = new ValueType("button", []);