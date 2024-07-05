class HomeworkSettings{

    static setMessageFormat(f){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"setHomeworkSetting", setting:"notificationMessageFormat", value:f, password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined || s["success"]==false){
                    alert("Es gab einen Fehler beim speichern der Hasuaufgaben einstellungen! (Fehlercode: 0x000000)", AlertType.ERROR, 2500, 250);
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
            data: { method:"setHomeworkSetting", setting:"notificationTitleFormat", value:f, password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined || s["success"]==false){
                    alert("Es gab einen Fehler beim speichern der Hasuaufgaben einstellungen! (Fehlercode: 0x000001)", AlertType.ERROR, 2500, 250);
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
            data: { method:"setHomeworkSetting", setting:"timeToAlarmDays", value: parseInt(f), password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined || s["success"]==false){
                    alert("Es gab einen Fehler beim speichern der Hasuaufgaben einstellungen! (Fehlercode: 0x000002)", AlertType.ERROR, 2500, 250);
                    return;
                }
            }
        });
    }

    static getMessageFormat(set){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"getHomeworkSetting", setting:"notificationMessageFormat", password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined || s["success"]==false){
                    alert("Es gab einen Fehler beim laden der Hasuaufgaben einstellungen! (Fehlercode: 0x000003)", AlertType.ERROR, 2500, 250);
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
            data: { method:"getHomeworkSetting", setting:"notificationTitleFormat", password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined || s["success"]==false){
                    alert("Es gab einen Fehler beim laden der Hasuaufgaben einstellungen! (Fehlercode: 0x000004)", AlertType.ERROR, 2500, 250);
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
            data: { method:"getHomeworkSetting", setting:"timeToAlarmDays", password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s==null || s==undefined || s["success"]==false){
                    alert("Es gab einen Fehler beim laden der Hasuaufgaben einstellungen! (Fehlercode: 0x000005)", AlertType.ERROR, 2500, 250);
                    return;
                }
                set(s);
            }
        });
    }

}