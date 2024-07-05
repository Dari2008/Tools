class ValueItem{
    constructor(val){
        this.val = val;
    }

    getVal(){
        return this.val;
    }

    static switch(v){
        switch (v) {
            case ValueItem.NUMBER:
                return ValueItem.NAME;
            case ValueItem.NAME:
                return ValueItem.NUMBER;
            default:
                return ValueItem.NAME;
        }
    }

    static switchFields(){
        if(this.currentValueItem === undefined)this.currentValueItem = ValueItem.NUMBER;
        this.currentValueItem = this.switch(this.currentValueItem);
        let outputLabel = document.getElementById("outputLabel");
        let inputLabel = document.getElementById("inputLabel");
        let input = document.getElementById('inputValueArea');
        let output = document.getElementById('outputValueArea');

        let name = "Name:";
        let number = "Zahl:";

        switch (this.currentValueItem) {
            case ValueItem.NAME:
                outputLabel.innerHTML = name;
                inputLabel.innerHTML = number;

                input.value = "";
                output.innerText = "";

                break;
            case ValueItem.NUMBER:
                inputLabel.innerHTML = name;
                outputLabel.innerHTML = number;

                input.value = "";
                output.innerText = "";
                
                break;
            default:
                break;
        }
    }

    static onChnage(){
        if(this.currentValueItem === undefined)this.currentValueItem = ValueItem.NUMBER;

        let input = document.getElementById('inputValueArea').value;
        let output = document.getElementById('outputValueArea');


        if(this.currentValueItem == ValueItem.NAME)input = input.replace(/\D/g, '');
        else input = input.replace(/[0-9]/g, '');

        document.getElementById('inputValueArea').value = input;

        let oo = "";
        let inputName = "inputValueArea";

        switch (this.currentValueItem) {
            case ValueItem.NAME:
                oo = NumberNames.toName(input, this.showDelimeter, this.delimeter);
                output.innerText = oo;
                break;
            case ValueItem.NUMBER:
                oo = NumberNames.toNumber(input, this.showDelimeter, this.delimeter);
                output.innerText = oo;
                break;
            default:
                break;
        }

        if(oo === "Number to large"){
            document.getElementById(inputName).style.borderColor = "rgb(255, 0, 0)";
            document.getElementById(inputName).style.appearance = "none";
        }else{
            document.getElementById(inputName).style.borderColor = "rgb(160, 160, 160)";
            document.getElementById(inputName).style.appearance = "none";
        }

    }

    static showDelimeterChange(){
        let c = document.getElementById('showDelimeter');
        this.showDelimeter = c.checked;
    }

    static delimeterChange(){
        let d = document.getElementById('delimeter');
        this.delimeter = d.value;
    }

}

ValueItem.NUMBER = new ValueItem(0);
ValueItem.NAME = new ValueItem(1);
