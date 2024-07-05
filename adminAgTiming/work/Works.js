class Works{

    constructor(){
        this.works = [];

        this.currentState = document.getElementById("currentStateOfAction");
        if(getCookie("workHourStartTime") != ""){
            this.currentState.src = "./icons/stop.svg";
        }else{
            this.currentState.src = "./icons/start.svg";
        }
    }

    static updateList(){
        let tbBody = document.getElementById("worksBody");
        tbBody.innerHTML = "";
        Works.INSTANCE.works.forEach((work) => {
            if(work == null || work == undefined)return;
            if(Works.DISPLAY_NOT_PAYED){
                if(!work.isPayed()){
                    tbBody.appendChild(work.getComponent());
                }
            }else{
                if(work.isPayed()){
                    tbBody.appendChild(work.getComponent());
                }
            }
        });
    }

    static loadWorks(){
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data:{method: "getWorkHours", password: getCookie("password"), username: getCookie("username")},
            dataType: "json",
            success: (data) => {
                console.log(data)
                if(!data){
                    alert("Fehler beim laden der Arbeitsstunden!", AlertType.ERROR);
                }else{
                    Works.INSTANCE.works = [];
                    data.forEach((work) => {
                        Works.addWork(Work.fromJson(work));
                    });
                    Works.updateList();
                }
            }
        });
    }

    static addWork(work){
        Works.INSTANCE.works.push(work)
        Works.updateList();
    }

    static update(work){
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data:{method: "addWorkHour", id: work.getId(), data: JSON.stringify(work.toJson()), password: getCookie("password"), username: getCookie("username")},
            dataType: "json",
            success: (data) => {
                if(!data["success"]){
                    alert("Fehler beim Speichern der Arbeitsstunden!", AlertType.ERROR);
                }
            }
        });
        Works.updateList();
    }

    static deleteWork(work){
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data:{method: "addWorkHour", id: work.getId(), data: JSON.stringify(null), password: getCookie("password"), username: getCookie("username")},
            dataType: "json",
            success: (data) => {
                if(!data["success"]){
                    alert("Fehler beim Löschen der Arbeitsstunde!", AlertType.ERROR);
                }
            }
        });
        Works.INSTANCE.works.splice(Works.INSTANCE.works.indexOf(work), 1);
        Works.updateList();
    }

    static updateActionButton(){
        if(getCookie("workHourStartTime") != ""){
            Works.INSTANCE.currentState.src = "./icons/stop.svg";
        }else{
            Works.INSTANCE.currentState.src = "./icons/start.svg";
        }
    }

    static getFreeId(){
        let ids = Works.INSTANCE.works.map(work=>work.getId());
        let id = 0;
        while(id in ids){
            id++;
        }
        return id;
    }

    static toggleWorkHour(){
        if(getCookie("workHourStartTime") != ""){
            this.stopWorkHour();
            this.updateActionButton();
        }else{
            this.startWorkHour();
            this.updateActionButton();
        }
    }

    static startWorkHour(){
        setCookie("workHourStartTime", moment(new Date()).format("DD.MM.YYYY;HH:mm"), 1);
    }

    static stopWorkHour(){
        let startTime = getCookie("workHourStartTime");

        if(startTime == "")return;

        startTime = moment(startTime, "DD.MM.YYYY;HH:mm").toDate();
        let endTime = new Date();

        let work = new Work(new Date(), startTime, endTime, false, this.getFreeId());
        this.addWork(work);
        deleteCookie("workHourStartTime");
    }

}

Works.INSTANCE = new Works();
Works.DISPLAY_NOT_PAYED = true;