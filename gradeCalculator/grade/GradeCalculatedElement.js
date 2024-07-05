class GradeCalculatedElement{

    constructor(name, grades, totalGrade, overallPart){
        this.grades = grades;
        this.totalGrade = totalGrade;
        this.overallPart = overallPart;
        this.name = name;
        this.elements = [];

        for(let grade of grades){
            this.elements.push(this.initListElement((grade.grade + grade.sign), grade.group, grade.part, overallPart));
        }

        this.btn = document.createElement("button");
        this.btn.classList.add("fachBtn");
        this.btn.innerHTML = name;
        this.btn.onclick = function(){
            this.display();
        }.bind(this);
    }

    display(){
        let li = document.getElementById("notenList");
        let gesamtNote = document.getElementById("gesamtNote");
        li.innerHTML = "";
        gesamtNote.innerHTML = this.totalGrade.grade + this.totalGrade.sign;

        let isSec = false;

        for(let e of this.elements){
            if(isSec){
                e.setAttribute("second", "");
                isSec = false;
            }else{
                e.removeAttribute("second");
                isSec = true;
            }
            li.appendChild(e);
        }

        li.style.display = null;
    }

    getButton(){
        return this.btn;
    }

    initListElement(grade, group, part, overall){
        let grElement = this.initGradeElement(grade);
        let groupElement = this.initGroupElement(group);
        let partElement = this.initPartElement(part, overall);
        let ul = document.createElement("li");
        ul.appendChild(grElement);
        ul.appendChild(groupElement);
        ul.appendChild(partElement);
        return ul;
    }

    initGradeElement(grade){
        let gradeElement = document.createElement("span");
        gradeElement.classList.add("gradeElement");
        gradeElement.innerHTML = (grade.sign != undefined && grade.sign != null)?(grade.grade + grade.sign):grade;
        return gradeElement;
    }

    initGroupElement(group){
        let groupElement = document.createElement("span");
        groupElement.classList.add("groupElement");
        groupElement.innerHTML = group;
        return groupElement;
    }

    initPartElement(part, overall){
        let partElement = document.createElement("span");
        partElement.classList.add("partElement");
        partElement.innerHTML = ((part/overall)*100).toFixed(2) + "%";
        return partElement;
    }

}
