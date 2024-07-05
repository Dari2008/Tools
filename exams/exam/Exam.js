class Exam {
    constructor(fach, date, written, id) {
        this.fach = fach;
        this.date = date;
        this.id = id;
        this.written = written;

        this.component = document.createElement("tr");

        this.fachEditor = this.initFachEditor(fach);
        this.dateEditor = this.initDateEditor(date);
        this.removeButton = this.initRemoveButton();

        this.component.appendChild(this.createCell(this.fachEditor, "fachEditorCol"));
        this.component.appendChild(this.createCell(this.dateEditor, "dateEditorCol"));
        this.component.appendChild(this.createCell(this.removeButton, "removeBtnCol"));

        this.chooser = new tempusDominus.TempusDominus(this.dateEditor, OPTIONS);
    }

    initDateEditor(date) {
        let inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.classList.add("dateInputField");
        // if (!(date instanceof Date)) {
        //     date = new Date(date); // Wenn es kein Date-Objekt ist, versuche es zu einem zu konvertieren
        // }
        inputElement.value = date.toString();

        inputElement.onchange = () => {
            this.date = moment(inputElement.value, "DD.MM.YYYY, hh:mm A").toDate();
            if (this.save) this.save(this);
        };

        inputElement.readOnly = true;
        return inputElement;
    }

    initRemoveButton() {
        let removeButton = document.createElement("button");
        removeButton.classList.add("removeBtn");
        removeButton.innerHTML = "&times;";
        removeButton.onclick = () => Exams.remove(this);
        return removeButton;
    }

    initFachEditor(fach) {
        
        let selectElement = document.createElement("input");
        selectElement.type = "text";
        selectElement.value = fach;
        selectElement.classList.add("inputFach");

        selectElement.addEventListener("focusout", () => {
            this.fach = selectElement.value;
            if (this.save) this.save(this);
        });

        return selectElement;

    }
    
    setSaveFunction(f) {
        this.save = f;
    }

    setWritten(written) {
        this.written = written;
    }
    
    createCell(content, className) {
        let cell = document.createElement("th");
        cell.classList.add(className);
        cell.appendChild(content);
        return cell;
    }
    
    wasWritten() {
        return this.written;
    }
    
    getId() {
        return this.id;
    }
    
    getComponent() {
        return this.component;
    }
    
    getFach() {
        return this.fach;
    }
    
    getDate() {
        return this.date;
    }
    
    toJson() {
        return {
            "date": this.date,
            "fach": this.fach,
            "id": this.id,
            "written": this.written
        };
    }
    
    static fromJson(json) {
        Exams.INSTANCE.addExam(json["fach"], json["date"], json["written"], parseInt(json["id"]));
    }
    
    getTimeRemaining() {
        const timeRemaining = Math.ceil((this.date - new Date()) / (1000 * 60 * 60 * 24));
        return timeRemaining;
    }
}