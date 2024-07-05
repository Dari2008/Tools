class HomeworkRow{

    constructor(fach, aufgabe, bisWann, erledigt, id, archived=false){
        this.fach = fach;
        this.aufgabe = aufgabe;
        this.bisWann = bisWann;
        this.erledigt = erledigt===undefined?false:erledigt;
        this.id = id;
        this.archived = archived;

        this.component = document.createElement("tr");
        

        this.fachE = document.createElement("input");
        this.fachE.addEventListener("focusout", function(e){
            this.setFach(this.fachE.value);
        }.bind(this));
        HomeworkRow.initFachField(this.fachE, this.fach);
        
        this.aufgabeE = document.createElement("input");
        HomeworkRow.initAufgabenField(this.aufgabeE, this.aufgabe);
        this.aufgabeE.onchange = function(e){
            this.setAufgabe(this.aufgabeE.value);
        }.bind(this);
        
        this.bisWannE = document.createElement("button");
        HomeworkRow.initBisWannField(this.bisWannE, this.bisWann);
        this.bisWannE.title = this.getRemainingTime() + " Tage bis zur Abgabe";

        this.bisWannE.onclick = function(e){
            HomeworkRow.openMenu(e, this);
        }.bind(this);

        this.deleteE = document.createElement("button");
        HomeworkRow.initDeleteButton(this.deleteE);

        this.deleteE.onclick = function(){
            HomeworkRows.delete(this);
        }.bind(this);
        
        let result = HomeworkRow.initErledigtFieldCreate(this.erledigt);
        this.erledigtE = result[0];
        this.erledigtI = result[1];

        if(!this.archived){
            this.archivBtn = document.createElement("button");
            HomeworkRow.initArchivButtonField(this.archivBtn);
            this.archivBtn.onclick = function(e){
                if(this.archived)return;
                HomeworkRows.archive(this);
                this.archived = true;
                this.component.style.display = "none";
            }.bind(this);
        }

        this.component.appendChild(this.createCell(this.fachE, "fachRow"));
        this.component.appendChild(this.createCell(this.aufgabeE, "aufgabeRow"));
        this.component.appendChild(this.createCell(this.bisWannE, "bisWannRow"));
        this.component.appendChild(this.erledigtRow = this.createCell(this.erledigtE, "erledigtRow"));
        this.component.appendChild(this.archiveRow = this.createCell(this.archivBtn, "archiveRow"));
        this.component.appendChild(this.deleteRow = this.createCell(this.deleteE, "deleteRow"));

        this.deleteRow.style.display = "none";

        this.component.classList.add("homeworkRow");
        this.component.id = id;

        this.erledigtI.onchange = function(e){
            this.setFinished(this.erledigtI.checked);
            this.component.style.display = "none";
        }.bind(this);

    }

    display(){
        this.component.style.display = null;
    }

    hide(){
        this.component.style.display = "none";
    }

    getRemainingTime(){
        return this.getRemainingTimeUntilEnd(this.bisWann);
    }

    setSaveFunction(e){
        this.save = e;
    }

    setFinished(is){
        this.erledigtE.checked = is;
        this.erledigt = is;
        if(this.save !== null && this.save !== undefined)this.save(this.id);
    }

    setBisWann(w){
        this.bisWannE.textContent = w;
        this.bisWannE.value = w;
        this.bisWann = w;
        if(this.save !== null && this.save !== undefined)this.save(this.id);
    }

    setAufgabe(a){
        this.aufgabeE.value = a;
        this.aufgabe = a;
        if(this.save !== null && this.save !== undefined)this.save(this.id);
    }

    setFach(f){
        this.fachE.value = f;
        this.fach = f
        if(this.save !== null && this.save !== undefined)this.save(this.id);
    }

    getId(){
        return this.id;
    }

    getFach(){
        return this.fach;
    }

    isFinished(){
        return this.erledigt;
    }

    getBisWann(){
        return this.bisWann;
    }

    getAufgabe(){
        return this.aufgabe;
    }

    isArchived(){
        return this.archived;
    }

    hideArcvhiveButton(){
        this.archivBtn.style.display = "none";
    }

    createCell(content, className){
        let c = document.createElement("th");
        c.classList.add(className);
        c.appendChild(content);
        return c;
    }

    getComponent(){
        return this.component;
    }

    getBisWannElement(){
        return this.bisWannE;
    }

    setAddFunction(f){
        this.add = f;
    }

    disable(allowEnable){
        if(!allowEnable)this.erledigtI.disabled = true;
        if(!allowEnable)this.erledigtE.disabled = true;
        this.aufgabeE.disabled = true;
        this.bisWannE.disabled = true;
        this.fachE.disabled = true;
        this.component.disabled = true;
    }

    enable(){
        this.erledigtI.disabled = false;
        this.erledigtE.disabled = false;
        this.aufgabeE.disabled = false;
        this.bisWannE.disabled = false;
        this.fachE.disabled = false;
        this.component.disabled = false;
    }

    displayDeleteButton(){
        this.deleteE.style.display = null;
        this.erledigtI.style.display = "none";
        this.erledigtE.style.display = "none";
        if(this.erledigtRow != null && this.erledigtRow != undefined){
            this.erledigtRow.style.display = "none";
        }
        if(this.archiveRow != null && this.archiveRow != undefined){
            this.archiveRow.style.display = "none";
        }
        if(this.deleteRow != null && this.deleteRow != undefined){
            this.deleteRow.style.display = null;
        }
    }

    static initFachField(element, selected, add=true){
        element.type = "text";
        if(add)element.classList.add("fachSelect");
        element.value = selected;
    }

    static initAufgabenField(element, aufgabe){
        element.classList.add("aufgabenField");
        element.value = aufgabe;
    }

    static initBisWannField(element, bisWann){
        element.classList.add("bisWannField");
        element.textContent = bisWann;
        element.setAttribute("value", bisWann);
    }

    static initErledigtFieldCreate(erledigt){
        let e = document.createElement("label");
        let input = document.createElement("input");
        let span = document.createElement("span");
        span.classList.add("checkmark");
        input.type = "checkbox";
        input.checked = erledigt;
        e.classList.add("erledigtField");

        e.appendChild(input);
        e.appendChild(span);
        return [e, input];
    }

    static initArchivButtonField(btn){
        btn.value = "Archivieren";
        btn.classList.add("archiveButton");
        let img = document.createElement("img");
        img.src = "./icons/archivieren.png";
        img.style.width = "100%";
        img.style.height = "100%"
        btn.appendChild(img);
    }

    static initDeleteButton(btn){
        btn.innerHTML = "&times;";
        btn.classList.add("loeschenButton");
    }

    static openMenu(e, homework){
        let element = document.getElementById("homeworkDateEditor");
        let offsets = HomeworkRow.getOffsets(homework.getBisWannElement());
        element.style.top = offsets.y + "px";
        element.style.left = (offsets.x - 205) + "px";

        switch (homework.getBisWann().toLowerCase()) {
            case "montag":
            case "mo":
            case "dienstag":
            case "di":
            case "mittwoch":
            case "mi":
            case "donnerstag":
            case "do":
            case "freitag":
            case "fr":
            case "samstag":
            case "sa":
            case "sonntag":
            case "so":
                document.getElementById("dayInput").value = homework.getBisWann();
                document.getElementById("day").click();
                document.getElementById("dateInput").value = (new Date()).toLocaleDateString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit' });
                break;
            default:
                document.getElementById("dayInput").value = "Mo";
                document.getElementById("dateInput").value = homework.getBisWann();
                document.getElementById("date").click();
                break;
        }

        if(element.style.display == "block"){
            element.style.display = "none";
        }else{
            element.style.display = "block";
        }

        document.getElementById("dateInput").onchange = function(e){
            if(timePicker.dates.lastPicked === "")return;
            homework.setBisWann(timePicker.dates.lastPicked.toLocaleDateString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit' }));
        }

        document.getElementById("dayInput").onchange = function(e){
            document.getElementById("homeworkDateEditor").style.display = "none";
            homework.setBisWann(document.getElementById("dayInput").value);
        }
    }

    getRemainingTimeUntilEnd(data) {
        const currentDate = new Date();
        let endTime = null;
    
        switch (data.toLowerCase()) {
            case "montag":
            case "mo":
                endTime = this.getNextDayOfWeek(currentDate, 1); // Montag entspricht 1 in JavaScript
                break;
            case "dienstag":
            case "di":
                endTime = this.getNextDayOfWeek(currentDate, 2); // Dienstag entspricht 2 in JavaScript
                break;
            case "mittwoch":
            case "mi":
                endTime = this.getNextDayOfWeek(currentDate, 3); // Mittwoch entspricht 3 in JavaScript
                break;
            case "donnerstag":
            case "do":
                endTime = this.getNextDayOfWeek(currentDate, 4); // Donnerstag entspricht 4 in JavaScript
                break;
            case "freitag":
            case "fr":
                endTime = this.getNextDayOfWeek(currentDate, 5); // Freitag entspricht 5 in JavaScript
                break;
            case "samstag":
            case "sa":
                endTime = this.getNextDayOfWeek(currentDate, 6); // Samstag entspricht 6 in JavaScript
                break;
            case "sonntag":
            case "so":
                endTime = this.getNextDayOfWeek(currentDate, 0); // Sonntag entspricht 0 in JavaScript
                break;
            default:
                endTime = new Date(data);
                break;
        }
    
        if (endTime !== null) {
            const timeRemaining = Math.ceil((endTime - currentDate) / (1000 * 60 * 60 * 24)); // Differenz in Tagen berechnen
            return timeRemaining; // Nur die Anzahl der Tage zurückgeben
        }
    
        return null;
    }
    
    getNextDayOfWeek(currentDate, dayOfWeek) {
        const daysToAdd = (dayOfWeek - currentDate.getDay() + 7) % 7;
        return new Date(currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    }
    
    

    static getOffsets(referenceElement) {
        const offset = {
            left: referenceElement.offsetLeft,
            top: referenceElement.offsetTop
        };
        
        let reference = referenceElement.offsetParent;
        
        while(reference){
            offset.left += reference.offsetLeft;
            offset.top += reference.offsetTop;
            reference = reference.offsetParent;
        }
        
        return { 
            x: offset.left,
            y: offset.top,
        }; 
      
      }

}