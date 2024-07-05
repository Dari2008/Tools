class Time{

    constructor(time, selects){
        this.timeVal = time;
        this.selects = selects;

        this.component = document.createElement("li");

        
        this.time = document.createElement("button");
        this.time.classList.add("timeChooserButton");
        this.time.innerHTML = time;

        this.time.onclick = function(e){
            this.selects(this);
            // tp.show({target: this.time, after: timePicked=>this.time = timePicked, "24":true})
        }.bind(this);

        this.component.appendChild(this.time);

    }

    select(){
        this.time.classList.add("sel");
        this.component.classList.add("sel");
    }

    deselect(){
        this.time.classList.remove("sel");
        this.component.classList.remove("sel");
    }

    getTime(){
        return this.timeVal;
    }

    setTime(v){
        this.timeVal = v;
        this.time.innerHTML = v;
    }

    getButton(){
        return this.time;
    }

    getComponent(){
        return this.component;
    }


}