class TimeManager{

    constructor(){
        this.selected = null;
        this.elements = [];
    }


    init(){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"getTimes", password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined || s["success"]==false)return;
                this.createElements(s);
            },
            error: s=>console.log(s)
        });

        document.getElementById("times").onkeyup = function(e){
            if(e.key == "Delete"){
                TimeManager.remove();
            }else if(e.key == "+"){
                TimeManager.add();
            }else if(e.key == "Enter"){
                TimeManager.edit();
            }
        }
    }

    createElements(elements){
        this.elements = [];
        document.getElementById("times").innerHTML = "";
        for(let e of elements){
            document.getElementById("times").appendChild(this.createRow(e));
        }
    }

    setSelected(timeO){
        if(timeO == null || timeO == undefined)return;
        if(TimeManager.INSTANCE.selected != undefined && TimeManager.INSTANCE.selected != null){
            TimeManager.INSTANCE.selected.deselect();
        }
        TimeManager.INSTANCE.selected = timeO;
        timeO.select();
        document.getElementById("editButton").disabled = false;
        document.getElementById("minus").disabled = false;
    }

    createRow(r){
        let t = new Time(r, this.setSelected);
        this.elements.push(t);
        return t.getComponent();
    }

    static edit(){
        if(TimeManager.INSTANCE.selected != null && TimeManager.INSTANCE.selected != undefined){
            tp.show({target: TimeManager.INSTANCE.selected.getButton(), after: timePicked=>{TimeManager.INSTANCE.selected.setTime(timePicked);this.save();}, "24":true});
        }
    }

    static remove(){
        if(TimeManager.INSTANCE.selected != null && TimeManager.INSTANCE.selected != undefined){
            if(TimeManager.INSTANCE.elements == null || TimeManager.INSTANCE.elements == undefined)return;
            for(let i = 0; i < TimeManager.INSTANCE.elements.length; i++){
                if(TimeManager.INSTANCE.elements[i] == TimeManager.INSTANCE.selected){
                    document.getElementById("editButton").disabled = true;
                    document.getElementById("minus").disabled = true;
                    document.getElementById("times").removeChild(TimeManager.INSTANCE.elements[i].getComponent());
                    TimeManager.INSTANCE.elements.splice(i, 1);
                    break;
                }
            }
        }
        this.save();
    }

    static add(){
        document.getElementById("times").appendChild(TimeManager.INSTANCE.createRow("00:00"));
    }

    static save(){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"setTimes", times: JSON.stringify(this.getTimes()), password: getCookie("password"), username:getCookie("username")},
            dataType: 'json'
        });
    }

    static getTimes(){
        let a = [];
        for(let e of TimeManager.INSTANCE.elements){
            a.push(e.getTime());
        }
        return a;
    }

}

TimeManager.INSTANCE = new TimeManager();