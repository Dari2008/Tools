class Action{

    constructor(parentId, displayText, parameterName, valueType, defaultValue, values){
        this.displayText = displayText;
        this.valueType = valueType;
        this.parameterName = parameterName;
        this.value = valueType.getDefaultValue();
        this.values = values;

        this.component = document.createElement("div");
        this.input = valueType.createFittingComponent();
        this.input.classList.add("secondsElement");

        if(valueType.getName() == "values"){
            for(let v of values){
                let vv = document.createElement("option");
                vv.value = v;
                vv.text = v;
                this.input.appendChild(vv);
            }
        }

        this.label = document.createElement("span");
        this.label.textContent = displayText;

        this.component.classList.add("changableElement");

        if(valueType.getName() == "button"){
            this.input.textContent = values;
            this.input.onclick = function(e){
                this.target.setAttribute(parameterName, "clicked");
            }.bind(this);
        }else{
            this.input.oninput = function(e){
                if(valueType.getName() == "checkbox"){
                    this.target.setAttribute(parameterName, this.input.checked);
                }else{
                    this.target.setAttribute(parameterName, this.input.value);
                }
            }.bind(this);
        }

        this.component.appendChild(this.label);
        this.component.appendChild(this.input);

        this.target = document.getElementById("content");

        this.value = this.target.getAttribute(parameterName)==null?this.value:this.target.getAttribute(parameterName);
        if(valueType.getName() == "checkbox"){
            this.input.checked = this.value;
        }else if(valueType.getName() == "button"){
            
        }else{
            this.input.value = defaultValue;
            this.value = defaultValue;
        }


        this.targetPlacement = document.getElementById(parentId);
        this.targetPlacement.appendChild(this.component);
        Action.ACTIONS.push(this);

        this.target.setAttribute(parameterName, this.value);

        // if(defaultValue != null && defaultValue != undefined){
        //     this.input.value = defaultValue;
        // }
    }

    updateValue(){
        this.value = this.target.getAttribute(this.parameterName)==null?this.value:this.target.getAttribute(this.parameterName);
        if(this.valueType.getName() == "checkbox"){
            this.input.checked = this.value;
        }else if(this.valueType.getName() == "button"){
            
        }else{
            this.input.value = this.value;
        }
    }

    getDisplayText(){
        return this.displayText;
    }

    getParameterName(){
        return this.parameterName;
    }

    getValueType(){
        return this.valueType;
    }

    getComponent(){
        return this.component;
    }

    static updateAll(){
        for(let e of Action.ACTIONS)e.updateValue();
    }

}

Action.ACTIONS = [];