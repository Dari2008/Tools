class Grades{

    constructor(){
        this.grades = [];
        this.calculatedGrades = {};
    }

    static addGrade(fach, part, group, grade, id=undefined){
        Grades.INSTANCE.grades.push(new Grade(fach, part, grade, group, id));
        
    }

    static loadGrades(){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"getGrades", password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined || s["success"]==false)return;
                for(let g of s){
                    Grades.INSTANCE.grades.push(Grade.fromJson(g));
                }
            }
        });
    }

    static updateGradesWithGroup(group, fach, part){
        for(let e of Grades.INSTANCE.grades){
            if(e.getGroup() == group && e.getFach() == fach){
                e.setPart(part);
                Grades.saveGrade(e);
            }
        }
    }

    static getPartOfGroup(group, fach){
        for(let e of Grades.INSTANCE.grades){
            if(e.getGroup() == group && e.getFach() == fach)return e.getPart();
        }
        return 50;
    }

    static saveGrade(grade){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"setGrade", password: getCookie("password"), username:getCookie("username"), id: ((grade.getId()==null||grade.getId()==undefined)?(undefined):(grade.getId())), data: JSON.stringify(grade.toJson())},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined || s["success"]==false)return;
                if(s["id"] != undefined && s["id"] != null){
                    grade.setId(s["id"]);
                }
            },
            error: e=>console.log(e)
        });
    }

    static remove(grade){
        grade.remove();
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"removeGrade", password: getCookie("password"), username:getCookie("username"), id: grade.getId()},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined || s["success"]==false)return;
                if(s["success"] == true){
                    for(let i = 0; i < Grades.INSTANCE.grades.length; i++){
                        if(grade == Grades.INSTANCE.grades[i]){
                            Grades.INSTANCE.grades.splice(i, 1);
                        }
                    }
                }
            }
        });
    }

    static displayFaecher(){
        Grades.INSTANCE.calculatedGrades = this.calculateFaecher();
        document.getElementById("notenList").innerHTML = "";
        document.getElementById("feacherBtns").innerHTML = "";
        if(Grades.INSTANCE.calculatedGrades.length <= 0)return;
        for(let fach of Object.keys(Grades.INSTANCE.calculatedGrades)){
            let gle = new GradeCalculatedElement(fach, Grades.INSTANCE.calculatedGrades[fach].grades, Grades.INSTANCE.calculatedGrades[fach].totalGrade, Grades.INSTANCE.calculatedGrades[fach].overall);
            document.getElementById("feacherBtns").appendChild(gle.getButton());
        }
    }

    static calculateFaecher(){
        let result = {};
        let groups = {};
        let partsOfGroup = {};

        let grades = Grades.INSTANCE.grades;
        for(let grade of grades){
            if(groups[grade.getGroup() + grade.getFach()] == undefined || groups[grade.getGroup() + grade.getFach()] == null)groups[grade.getGroup() + grade.getFach()] = [];
            if(partsOfGroup[grade.getGroup() + grade.getFach()] == undefined || partsOfGroup[grade.getGroup() + grade.getFach()] == null)partsOfGroup[grade.getGroup() + grade.getFach()] = 0;
            groups[grade.getGroup() + grade.getFach()].push(grade.toComputableJson());
            partsOfGroup[grade.getGroup() + grade.getFach()] = grade.getPart();
        }

        let groupPoints = [];

        for(let group of Object.keys(groups)){
            let overallPoints = 0;
            let elements = 0;
            for(let grade of groups[group]){
                overallPoints += this.calculatePoints(grade.grade, grade.sign);
                elements++;
            }
            for(let g of groups[group]){
                
            }
            groupPoints.push({
                "points":overallPoints / elements, 
                "part":groups[group][0].part, 
                "fach": groups[group][0].fach, 
                "grades": groups[group], 
                "group":groups[group][0].group
            });
        }

        let allreadyLoopedFeacher = [];

        for(let grade of grades){
            if(allreadyLoopedFeacher.includes(grade.getFach()))continue;
            let points = 0;
            let overallPoints = 0;
            let gradesAll = [];
            for(let groupElement of groupPoints){
                if(groupElement.fach == grade.getFach()){
                    overallPoints += parseInt(groupElement.part);
                }
            }

            for(let groupElement of groupPoints){
                if(groupElement.fach == grade.getFach()){
                    points += (parseInt(groupElement.points) * (groupElement.part / overallPoints));
                    for(let tmp of groupElement.grades)gradesAll.push(tmp);
                }
            }

            result[grade.getFach()] = {
                "grades": gradesAll, 
                "totalGrade": this.calculateGradeWithSign(points, Grades.MODE), 
                "overall": overallPoints
            };

            allreadyLoopedFeacher.push(grade.getFach());
        }

        return result;
    }

    static calculatePoints(grade, sign) {
        let total = 0;
    
        switch (grade) {
            case 1:
                total = 14;
                break;
            case 2:
                total = 11;
                break;
            case 3:
                total = 8;
                break;
            case 4:
                total = 5;
                break;
            case 5:
                total = 2;
                break;
            case 6:
                total = 0;
                break;
        }
    
        switch (sign) {
            case "-":
                total--;
                break;
            case "+":
                total++;
                break;
        }
    
        return total;
    }

    static calculateGradeWithSign(points, mode=3) {
        let grade = 0;
        let sign = "";
        points = mode==0?Math.floor(points):mode==1?Math.ceil(points):Math.round(points);
    
        switch(points){
            case 15:
                sign = "+";
                grade = 1;
                break;
            case 14:
                grade = 1;
                break;
            case 13:
                sign = "-";
                grade = 1;
                break;
            case 12:
                sign = "+";
                grade = 2;
                break;
            case 11:
                grade = 2;
                break;
            case 10:
                sign = "-";
                grade = 2;
                break;
            case 9:
                sign = "+";
                grade = 3;
                break;
            case 8:
                grade = 3;
                break;
            case 7:
                sign = "-";
                grade = 3;
                break;
            case 6:
                sign = "+";
                grade = 4;
                break;
            case 5:
                grade = 4;
                break;
            case 4:
                sign = "-";
                grade = 4;
                break;
            case 3:
                sign = "+";
                grade = 5;
                break;
            case 2:
                grade = 5;
                break;
            case 1:
                sign = "-";
                grade = 5;
                break;
            case 0:
                grade = 6;
                break;
        }
    
        return { grade: grade, sign: sign };
    }
    

}

Grades.INSTANCE = new Grades();
Grades.MODE = 3;