class Work{

    constructor(date, startTime, stopTime, payed=false, id=Works.getFreeId()){
        this.date = date;
        this.startTime = startTime;
        this.stopTime = stopTime;
        this.id = id;
        this.payed = payed;

        this.calculateTime(startTime, stopTime)
        this.workHours = this.calculateWorkHours(60);

        this.component = document.createElement("tr");

        this.timeCellElement = this.createTimeCell();
        this.dateCellElement = this.createDateCell();
        this.startCellElement = this.createStartTimeCell();
        this.stopCellElement = this.createStopTimeCell();
        this.workHoursCellElement = this.createWorkHours();
        this.payedCellElement = this.createPayedCell();
        
        let payedLabelElement = this.payedCellElement[0];
        this.payedCellElement = this.payedCellElement[1];

        this.deleteCellElement = this.createDeleteCell();

        this.addCol(this.timeCellElement, "timeCell");
        this.addCol(this.dateCellElement, "dateCell");
        this.addCol(this.startCellElement, "startCell");
        this.addCol(this.stopCellElement, "stopCell");
        this.addCol(this.workHoursCellElement, "workHoursCell");
        this.addCol(payedLabelElement, "payedCell");
        this.addCol(this.deleteCellElement, "deleteCell");

        
        this.chooser = new tempusDominus.TempusDominus(this.dateCellElement, OPTIONS_FOR_DATE);

        this.chooserStartTime = new tempusDominus.TempusDominus(this.startCellElement, OPTIONS_FOR_TIME);
        this.chooserStopTime = new tempusDominus.TempusDominus(this.stopCellElement, OPTIONS_FOR_TIME);

        this.chooser.dates.formatInput = date => moment(date).format("DD.MM.YYYY");

        this.chooserStartTime.dates.formatInput = date => moment(date).format("HH:mm") + " Uhr";
        this.chooserStopTime.dates.formatInput = date => moment(date).format("HH:mm") + " Uhr";

        this.chooserStopTime.value = this.stopTime;
        this.chooserStartTime.value = this.startTime;
        this.chooser.value = this.date;

        this.dateCellElement.value = moment(this.date).format("DD.MM.YYYY");
        this.startCellElement.value = moment(this.startTime).format("HH:mm") + " Uhr";
        this.stopCellElement.value = moment(this.stopTime).format("HH:mm") + " Uhr";

        this.chooser.subscribe(tempusDominus.Namespace.events.change, (e)=>{
            if(e.isValid && !e.isClear && e.oldDate != null){
                this.date = e.date;
                this.update();
            }
        });

        
        this.chooserStartTime.subscribe(tempusDominus.Namespace.events.change, (e)=>{
            if(e.isValid && !e.isClear && e.oldDate != null){
                this.startTime = e.date;
                this.update();
            }
        });

        
        this.chooserStopTime.subscribe(tempusDominus.Namespace.events.change, (e)=>{
            if(e.isValid && !e.isClear && e.oldDate != null){
                this.stopTime = e.date;
                this.update();
            }
        });

    }

    isPayed(){
        return this.payed;
    }

    update(){
        this.calculateTime(this.startTime, this.stopTime)
        this.workHours = this.calculateWorkHours(60);
        this.workHoursCellElement.innerHTML = this.workHours;
        Works.update(this);
    }

    getComponent(){
        return this.component;
    }

    addCol(element, className){
        let th = document.createElement("th");
        th.classList.add(className);
        th.appendChild(element);
        this.component.appendChild(th);
    }

    createDeleteCell(){
        let button = document.createElement("button");
        button.classList.add("deleteBtn");
        button.innerHTML = "&times;";
        button.addEventListener("click", ()=>{
            Works.deleteWork(this);
        });
        return button;
    }

    createPayedCell(){
        let e = document.createElement("label");
        this.payedInput = document.createElement("input");
        let span = document.createElement("span");
        span.classList.add("checkmark");
        this.payedInput.type = "checkbox";
        this.payedInput.checked = this.payed;
        e.classList.add("payedCheckbox");

        this.payedInput.addEventListener("change", ()=>{
            this.payed = this.payedInput.checked;
            Works.update(this);
        });

        e.appendChild(this.payedInput);
        e.appendChild(span);
        return [e, this.payedInput];
    }

    createTimeCell(){
        this.timeSpan = document.createElement("span");
        this.timeSpan.setAttribute("left", "");
        this.timeSpan.innerHTML = "" + this.time + "";
        this.timeSpan.classList.add("timeSpan");

        let span2 = document.createElement("span");
        span2.setAttribute("right", "");
        span2.innerHTML = "Minuten";
        span2.classList.add("timeSpan");

        let div = document.createElement("div");
        div.classList.add("spacerDiv");
        div.appendChild(this.timeSpan);
        div.appendChild(span2);

        return div;
    }

    createDateCell(){
        let input = document.createElement("input");
        input.type = "button";
        input.readOnly = true;
        input.classList.add("dateText");
        return input;
    }

    createStartTimeCell(){
        let button = document.createElement("input");
        button.type = "button";
        button.classList.add("startBtn");
        return button;
    }

    createStopTimeCell(){
        let button = document.createElement("input");
        button.type = "button";
        button.classList.add("stopBtn");
        return button;
    }

    createWorkHours(){
        let span = document.createElement("span");
        span.innerHTML = this.workHours;
        span.classList.add("workHoursSpan");
        return span;
    }

    calculateTime(startTime, stopTime){

        let startHour = parseInt(moment(startTime).format("HH"));
        let stopHour = parseInt(moment(stopTime).format("HH"));
        let startMinute = parseInt(moment(startTime).format("mm"));
        let stopMinute = parseInt(moment(stopTime).format("mm"));

        let minutes = ((stopHour - startHour)*60) + stopMinute - startMinute;
        minutes = Math.abs(minutes);

        if(this.timeSpan){
            this.timeSpan.innerHTML = minutes;
        }
        this.time = minutes;
    }

    calculateWorkHours(fullWorkHour){
        return (this.map(this.time, 0, fullWorkHour, 0, 1)).toFixed(4).replace(".", ",");
    }

    map(x, in_min, in_max, out_min, out_max){
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    toJson(){
        return {"date": moment(this.date).format("DD.MM.YYYY"), "startTime": moment(this.startTime).format("HH:mm"), "stopTime": moment(this.stopTime).format("HH:mm"), "id": this.id, "payed": this.payed};
    }

    getId(){
        return this.id;
    }

    static fromJson(json){
        if(json == undefined || json == null)return null;
        if(typeof json == typeof ""){
            json = JSON.parse(json);
        }
        let date = moment(json["date"], "DD.MM.YYYY").toDate();
        let startTime = moment(json["startTime"], "HH:mm").toDate();
        let stopTime = moment(json["stopTime"], "HH:mm").toDate();
        let id = parseInt(json["id"]);
        let payed = json["payed"];
        return new Work(date, startTime, stopTime, payed, id);
    }

}