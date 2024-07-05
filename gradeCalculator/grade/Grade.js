class Grade{

    constructor(fach, part, grade, group, id){
        this.fach = fach;
        this.part = part;
        this.group = group;
        let r = this.parseGrade(grade);
        if(r == null)r = {"grade":1, "sign":""};
        this.sign = r.sign;
        this.grade = r.grade;
        this.id = id;

        this.component = document.createElement("tr");
        this.initFachComponent(fach);
        this.initGroupComponent(group);
        this.initPartComponent(part);
        this.initGradeComponent(grade);
        this.initRemoveComponent();

        document.getElementById("gradeTableBody").appendChild(this.component);

    }

    updatePart(){
        this.partComp.value = this.part;
    }

    initGroupComponent(group){
        let th = document.createElement("th");
        this.groupComp = document.createElement("input");
        this.groupComp.type = "text";
        this.groupComp.classList.add("groupInput");
        this.groupComp.value = group;
        this.groupComp.oninput = function(){
            let value = this.groupComp.value;

            let partVal = Grades.getPartOfGroup(value, this.fach);
            this.partComp.value = partVal;
            this.group = value;
        }.bind(this);
        this.groupComp.addEventListener("focusout", function(){
            this.group = this.groupComp.value;
            Grades.saveGrade(this);
        }.bind(this));
        th.appendChild(this.groupComp);
        this.component.appendChild(th);
    }

    initPartComponent(part){
        let th = document.createElement("th");
        this.partComp = document.createElement("input");
        this.partComp.type = "text";
        this.partComp.classList.add("partInput");
        this.partComp.value = part;
        this.partComp.inputMode = "numeric";
        this.partComp.oninput = function(){
            let value = this.partComp.value;
            value = value.replace(/\D/g, '');
            this.partComp.value = value;
            Grades.updateGradesWithGroup(this.group, this.fach, value);
        }.bind(this);
        this.partComp.addEventListener("focusout", function(){
            this.part = this.partComp.value;
            Grades.saveGrade(this);
        }.bind(this));
        th.appendChild(this.partComp);
        this.component.appendChild(th);
    }

    initRemoveComponent(){
        let th = document.createElement("th");
        this.removeBtn = document.createElement("button");
        this.removeBtn.type = "text";
        this.removeBtn.classList.add("removeBtn");
        this.removeBtn.innerHTML = "&times;";
        this.removeBtn.onclick = function(){
            Grades.remove(this);
        }.bind(this);
        th.appendChild(this.removeBtn);
        this.component.appendChild(th);
    }

    initFachComponent(fach){
        let th = document.createElement("th");
        this.fachComp = document.createElement("input");
        this.fachComp.type = "text";
        this.fachComp.classList.add("fachInput");
        this.fachComp.value = fach;
        this.fachComp.addEventListener("focusout", function(){
            this.fach = this.fachComp.value;
            Grades.saveGrade(this);
        }.bind(this));
        th.appendChild(this.fachComp);
        this.component.appendChild(th);
    }

    initGradeComponent(grade){
        let th = document.createElement("th");
        this.gradeComp = document.createElement("input");
        this.gradeComp.type = "text";
        this.gradeComp.classList.add("gradeInput");
        this.gradeComp.value = grade;
        this.gradeComp.oninput = function(){
            let value = this.gradeComp.value;
            let gr = this.parseGrade(value);
            if(gr == null){
                let num = -1;
                let sign = "";
                for(let i = 0; i < value.length; i++){
                    let char = value.charAt(i);
                    if(char == "1" || 
                    char == "2" || 
                    char == "3" || 
                    char == "4" || 
                    char == "5" || 
                    char == "6"){
                        num = parseInt(char + "");
                    }else if(char == "+"){
                        sign = "+";
                    }else if(char == "-"){
                        sign = "-";
                    }
                }
                if(num == 6)sign = "";
                this.sign = sign;
                this.grade = num==-1?"":num;
                this.gradeComp.value = this.getGradeAsString();
            }
        }.bind(this);
        this.gradeComp.addEventListener("focusout", function(){
            let g = this.parseGrade(this.gradeComp.value);
            if(g != null){
                this.grade = g.grade;
                this.sign = g.sign;
                Grades.saveGrade(this);
            }
        }.bind(this));
        th.appendChild(this.gradeComp);
        this.component.appendChild(th);
    }

    parseGrade(val){
        switch(val){
            case "1+":
                return {grade:1, sign:"+"};
            case "1":
                return {grade:1, sign:""};
            case "1-":
                return {grade:1, sign:"-"};
            case "2+":
                return {grade:2, sign:"+"};
            case "2":
                return {grade:2, sign:""};
            case "2-":
                return {grade:2, sign:"-"};
            case "3+":
                return {grade:3, sign:"+"};
            case "3":
                return {grade:3, sign:""};
            case "3-":
                return {grade:3, sign:"-"};
            case "4+":
                return {grade:4, sign:"+"};
            case "4":
                return {grade:4, sign:""};
            case "4-":
                return {grade:4, sign:"-"};
            case "5+":
                return {grade:5, sign:"+"};
            case "5":
                return {grade:5, sign:""};
            case "5-":
                return {grade:5, sign:"-"};
            case "6":
                return {grade:6, sign:""};
            default:
                return null;
        }
    }

    getGrade(){
        return {grade: this.grade, sign: this.sign};
    }

    getSign(){
        return this.sign;
    }

    getGradeNum(){
        return this.grade;
    }

    getGradeAsString(){
        return this.grade + this.sign;
    }

    getGroup(){
        return this.group
    }

    setPart(part){
        this.part = part;
        this.updatePart();
    }

    getFach(){
        return this.fach;
    }

    getId(){
        return this.id;
    }

    getPart(){
        return parseInt(this.part);
    }

    setId(id){
        this.id = id;
    }

    remove(){
        document.getElementById("gradeTableBody").removeChild(this.component);
    }

    toComputableJson(){
        return {"fach": this.fach, "grade": this.grade, "sign": this.sign, "part": this.part, "group": this.group, "id": this.id};
    }

    toJson(){
        return {"fach": this.fach, "grade": this.getGradeAsString(), "part": this.part, "group": this.group, "id": this.id};
    }

    static fromJson(json){
        return new Grade((json.fach==null||json.fach==undefined)?"--Bitte Fach eingeben--":json.fach, (json.part==null||json.part==undefined)?"60":json.part, (json.grade==null||json.grade==undefined)?"1":json.grade, (json.group==null||json.group==undefined)?"--Bitte Gruppe Eingeben (Mündlich/Schriftlich/Test/...)--":json.group, json.id);
    }

}