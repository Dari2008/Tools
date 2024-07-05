class Exams{

    constructor(){

    }

    update(){
        let elements = this.EXAMS;
        document.getElementById("examTabelBody").innerHTML = "";
        for(let e of elements){
            if(e == undefined || e == null)continue;
            if(e.wasWritten() != Exams.SHOW_CURRENT_EXAMS){
                document.getElementById("examTabelBody").appendChild(e.getComponent());
            }
        }
    }

    init(){
        this.EXAMS = [];
        Exams.load();
    }

    addExam(fach, date, written, id){
        if(id == undefined || id == null){
            Exams.getFreeId((id)=>{
                let e = new Exam(fach, date, written, id);
                e.setSaveFunction(Exams.save);
                this.EXAMS.push(e);
                document.getElementById("examTabelBody").appendChild(e.getComponent());
                Exams.INSTANCE.update();
                Exams.save(e);
            });
        }else{
            let e = new Exam(fach, date, written, id);
            e.setSaveFunction(Exams.save);
            this.EXAMS.push(e);
            document.getElementById("examTabelBody").appendChild(e.getComponent());
            Exams.INSTANCE.update();
        }
    }

    static showCurrentExams(is){
        Exams.SHOW_CURRENT_EXAMS = is;
        Exams.INSTANCE.update();
    }

    static updateIFWasWritten(){
        for(let e of Exams.INSTANCE.EXAMS){
            if(e == undefined || e == null)continue;
            if(e.wasWritten())continue;
            let date = new Date(e.getDate());
            let now = new Date();
            if(date.getTime() < now.getTime()){
                e.setWritten(true);
                Exams.save(e);
            }
        }
    }

    static save(e){
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"setExam", id: e.getId(), data: JSON.stringify(e.toJson()), password: getCookie("password"), username:getCookie("username")},
            dataType: 'json'
        });
    }

    static remove(e){
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"removeExam", id: e.getId(), password: getCookie("password"), username:getCookie("username")},
            dataType: 'json'
        });
        document.getElementById("examTabelBody").removeChild(e.getComponent());
        for(let i = 0; i < Exams.INSTANCE.EXAMS.length; i++){
            if(Exams.INSTANCE.EXAMS[i] == e){
                Exams.INSTANCE.EXAMS.splice(i, 1);
            }
        }
    }

    static load(){
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"getExams", password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: d=>{
                
                if(d==null || d==undefined || d["success"]==false)return;
                Exams.INSTANCE.EXAMS = [];
                for(let e of d){
                    Exams.INSTANCE.EXAMS.push(Exam.fromJson(e));
                }
                Exams.updateIFWasWritten();
                Exams.INSTANCE.update();

            }
        });
    }

    static getFreeId(got){
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"getFreeExamId", password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: id=>{
                got(id["id"]);
            }
        });
    }

}

Exams.INSTANCE = new Exams();
Exams.SHOW_CURRENT_EXAMS = true;