class ExamSettings{

    static setMessageFormat(f){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"setExamSetting", setting:"notificationMessageFormat", value:f, password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined){
                    alert("Es gab einen Fehler beim speichern der Arbeiten einstellungen! (Fehlercode: 0x000006)", AlertType.ERROR, 2500, 250);
                    return;
                }
                this.createElements(s);
            }
        });
    }

    static setTitleFormat(f){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"setExamSetting", setting:"notificationTitleFormat", value:f, password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined){
                    alert("Es gab einen Fehler beim speichern der Arbeiten einstellungen! (Fehlercode: 0x000007)", AlertType.ERROR, 2500, 250);
                    return;
                }
                this.createElements(s);
            }
        });
    }

    static setTimeToNotify(f){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"setExamSetting", setting:"timeToAlarmDays", value: parseInt(f), password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined){
                    alert("Es gab einen Fehler beim speichern der Arbeiten einstellungen! (Fehlercode: 0x000008)", AlertType.ERROR, 2500, 250);
                    return;
                }
            }
        });
    }

    static getMessageFormat(set){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"getExamSetting", setting:"notificationMessageFormat", password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined){
                    alert("Es gab einen Fehler beim laden der Arbeiten einstellungen! (Fehlercode: 0x000009)", AlertType.ERROR, 2500, 250);
                    return;
                }
                set(s);
            }
        });
    }

    static getTitleFormat(set){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"getExamSetting", setting:"notificationTitleFormat", password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined){
                    alert("Es gab einen Fehler beim laden der Arbeiten einstellungen! (Fehlercode: 0x000010)", AlertType.ERROR, 2500, 250);
                    return;
                }
                set(s);
            }
        });
    }

    static getTimeToNotify(set){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"getExamSetting", setting:"timeToAlarmDays", password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined){
                    alert("Es gab einen Fehler beim laden der Arbeiten einstellungen! (Fehlercode: 0x000011)", AlertType.ERROR, 2500, 250);
                    return;
                }
                set(s);
            }
        });
    }

}