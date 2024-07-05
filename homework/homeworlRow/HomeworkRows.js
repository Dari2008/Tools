class HomeworkRows{

    constructor(){
        this.homeworks = [];
        this.wasArchiveLoaded = false;
    }

    static showErledigt(is){
        HomeworkRows.ONLYSHOWERLEDIGTE = is;
        HomeworkRows.update();
    }

    static update(){
       HomeworkRows.INSTANCE.update();
    }

    async update(){
        try{
            if(navigator.setAppBadge != undefined){
                navigator.setAppBadge(this.homeworks.length);
            }
        }catch(ex){
        }

        if(HomeworkRows.ONLYSHOWERLEDIGTE && !HomeworkRows.ONLYSHOWARCHIVED){
            document.getElementById("archivieren").style.display = null;
            let elms = document.getElementsByClassName("archiveButton");
            for(let e of elms){
                e.style.display = null;
            }
        }else{
            document.getElementById("archivieren").style.display = "none";
            let elms = document.getElementsByClassName("archiveButton");
            for(let e of elms){
                e.style.display = "none";
            }
        }
        
        if(HomeworkRows.ONLYSHOWARCHIVED && !this.wasArchiveLoaded){
            await new Promise((r, rej)=>{
                HomeworkRows.getArchiveData(function(data){

                    this.archivedHomework = [];
    
                    for(let a of data){
                        let aufgabe = a["aufgabe"];
                        let abgabe = a["bisWann"];
                        let fach = a["fach"];
                        let erledigt = a["erledigt"];
                        let id = a["id"];
        
                        this.archivedHomework.push(new HomeworkRow(fach, aufgabe, abgabe, erledigt, id));
                    }
                    r();
                }.bind(this));
            });
            this.wasArchiveLoaded = true;
        }

        if(HomeworkRows.ONLYSHOWARCHIVED){
            this.archivedHomework.sort((a, b)=>{
                if(HomeworkRows.ISSORTINGAFTERAUFGABE){
                    let aufgabe1 = a.getAufgabe();
                    let aufgabe2 = b.getAufgabe();
                    return aufgabe1.localeCompare(aufgabe2);
                }else if(HomeworkRows.ISSORTINGAFTERBISWANN){
                    let d1 = a.getRemainingTime();
                    let d2 = b.getRemainingTime();
                    return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
                }else if(HomeworkRows.ISSORTINGAFTERERLEDIGT){
                    let d1 = a.isFinished();
                    let d2 = b.isFinished();
                    return d1 == d2 ? 0 : d1 == true ? 1 : -1;
                }else if(HomeworkRows.ISSORTINGAFTERFACH){
                    let fach1 = a.getFach().getName();
                    let fach2 = b.getFach().getName();
                    return fach1.localeCompare(fach2);
                }else{
                    return 0;
                }
            });
        }else{
            this.homeworks.sort((a, b)=>{
                if(HomeworkRows.ISSORTINGAFTERAUFGABE){
                    let aufgabe1 = a.getAufgabe();
                    let aufgabe2 = b.getAufgabe();
                    return aufgabe1.localeCompare(aufgabe2);
                }else if(HomeworkRows.ISSORTINGAFTERBISWANN){
                    let d1 = a.getRemainingTime();
                    let d2 = b.getRemainingTime();
                    return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
                }else if(HomeworkRows.ISSORTINGAFTERERLEDIGT){
                    let d1 = a.isFinished();
                    let d2 = b.isFinished();
                    return d1 == d2 ? 0 : d1 == true ? 1 : -1;
                }else if(HomeworkRows.ISSORTINGAFTERFACH){
                    let fach1 = a.getFach().getName();
                    let fach2 = b.getFach().getName();
                    return fach1.localeCompare(fach2);
                }else{
                    return 0;
                }
            });
        }

        let el = document.getElementById("homeworkListTHead");
        el.innerHTML = "";

        if(HomeworkRows.ONLYSHOWARCHIVED){
            document.getElementById("erledigt").textContent = "Löschen";
            for(let h of this.archivedHomework){
                h.display();
                h.hideArcvhiveButton();
                h.disable(false);
                h.displayDeleteButton();
                el.appendChild(h.getComponent());
            }
        }else{
            document.getElementById("erledigt").textContent = "Erledigt";
            for(let h of this.homeworks){
                if(h.isArchived())continue;

                if(h.isFinished()){
                    h.disable(true);
                }else{
                    h.enable();
                }

                if(h.isFinished() == HomeworkRows.ONLYSHOWERLEDIGTE){
                    h.display();
                }else{
                    h.hide();
                }
                el.appendChild(h.getComponent());
            }
        }


    }

    loadHomeworks(){
        HomeworkRows.getData(function(data){
            for(let a of data){
                let aufgabe = a["aufgabe"];
                let abgabe = a["bisWann"];
                let fach = a["fach"];
                let erledigt = a["erledigt"];
                let id = a["id"];

                HomeworkRows.addHomework(new HomeworkRow(fach, aufgabe, abgabe, erledigt, id));
            }
            HomeworkRows.update();
            try{
                if(navigator.setAppBadge != undefined && data != undefined && data != null && data.length != undefined){
                    navigator.setAppBadge(data.length);
                }
            }catch(ex){
            }
        });

    }

    static showArchivedAndLoadIfNotLoaded(b){
        HomeworkRows.ONLYSHOWARCHIVED = b;
        HomeworkRows.update();
    }

    static getData(ev){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"getExercises", password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: function(s){
                ev(s);
            }
        });
    }

    static getArchiveData(ev){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"getArchived", password: getCookie("password"), username:getCookie("username")},
            dataType: 'json',
            success: function(s){
                ev(s);
            }
        });
    }

    // static setData(data){
    //     $.ajax({
    //         url: ServiceWorkerManager.MAIN_PHP,
    //         type: "POST",
    //         data: { method:"updateExercises", data: JSON.stringify(data), id: data.id, password: getCookie("password"), username:getCookie("username")},
    //         dataType: 'json'
    //     });
    // }

    static updateData(data, id){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"updateExercises", id: id, data: JSON.stringify(data), password: getCookie("password"), username:getCookie("username")},
            dataType: 'json'
        });
    }

    // static addData(d){
    //     $.ajax({
    //         url: ServiceWorkerManager.MAIN_PHP,
    //         type: "POST",
    //         data: { method:"addExercises", data: JSON.stringify(d), password: getCookie("password"), username:getCookie("username")},
    //         dataType: 'json'
    //     });
    // }

    static archiveData(h){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"archiveExercise", id: h.getId(), password: getCookie("password"), username:getCookie("username")},
            dataType: 'json'
        });
    }

    static deleteData(h){
        $.ajax({
            url: ServiceWorkerManager.MAIN_PHP,
            type: "POST",
            data: { method:"deleteExercises", id: h.getId(), password: getCookie("password"), username:getCookie("username")},
            dataType: 'json'
        });
    }

    static delete(h){
        this.deleteData(h);
        let all = HomeworkRows.INSTANCE.archivedHomework;
        for(let i = 0; i < all.length; i++){
            if(all[i] == h){
                HomeworkRows.INSTANCE.archivedHomework.splice(i, 1);
                break;
            }
        }
        this.update();
    }

    saveHomeworks(){
        
        let all = [];
        for(let h of HomeworkRows.INSTANCE.homeworks){
            let aufgabe = h.getAufgabe();
            let abgabe = h.getBisWann();
            let fach = h.getFach();
            let erledigt = h.isFinished();
            let id = h.getId();

            let e = {"aufgabe": aufgabe, "bisWann": abgabe, "fach": fach, "erledigt": erledigt, "id": id};
            all.push(e);
            HomeworkRows.updateData(e, e.id);
        }
    }

    static sortAfterErledigt(){
        HomeworkRows.ISSORTINGAFTERERLEDIGT = !HomeworkRows.ISSORTINGAFTERERLEDIGT;
        
        HomeworkRows.ISSORTINGAFTERBISWANN = !HomeworkRows.ISSORTINGAFTERERLEDIGT;
        HomeworkRows.ISSORTINGAFTERAUFGABE = !HomeworkRows.ISSORTINGAFTERERLEDIGT;
        HomeworkRows.ISSORTINGAFTERFACH = !HomeworkRows.ISSORTINGAFTERERLEDIGT;
        HomeworkRows.update();
    }

    static sortAfterBisWann(){
        HomeworkRows.ISSORTINGAFTERBISWANN = !HomeworkRows.ISSORTINGAFTERBISWANN;

        HomeworkRows.ISSORTINGAFTERERLEDIGT = !HomeworkRows.ISSORTINGAFTERBISWANN;
        HomeworkRows.ISSORTINGAFTERAUFGABE = !HomeworkRows.ISSORTINGAFTERBISWANN;
        HomeworkRows.ISSORTINGAFTERFACH = !HomeworkRows.ISSORTINGAFTERBISWANN;
        HomeworkRows.update();
    }

    static sortAfterAufgabe(){
        HomeworkRows.ISSORTINGAFTERAUFGABE = !HomeworkRows.ISSORTINGAFTERAUFGABE;

        HomeworkRows.ISSORTINGAFTERERLEDIGT = !HomeworkRows.ISSORTINGAFTERAUFGABE;
        HomeworkRows.ISSORTINGAFTERBISWANN = !HomeworkRows.ISSORTINGAFTERAUFGABE;
        HomeworkRows.ISSORTINGAFTERFACH = !HomeworkRows.ISSORTINGAFTERAUFGABE;
        HomeworkRows.update();
    }

    static sortAfterFach(){
        HomeworkRows.ISSORTINGAFTERFACH = !HomeworkRows.ISSORTINGAFTERFACH;

        HomeworkRows.ISSORTINGAFTERAUFGABE = !HomeworkRows.ISSORTINGAFTERFACH;
        HomeworkRows.ISSORTINGAFTERBISWANN = !HomeworkRows.ISSORTINGAFTERFACH;
        HomeworkRows.ISSORTINGAFTERAUFGABE = !HomeworkRows.ISSORTINGAFTERFACH;
        HomeworkRows.update();
    }

    addHomework(homework, showArchive=true){
        if(homework in this.homeworks)return;
        if(showArchive)homework.hideArcvhiveButton();
        document.getElementById("homeworkListTHead").appendChild(homework.getComponent());
        this.homeworks.push(homework);
        homework.setSaveFunction(this.saveHomework);
    }

    saveHomework(id){
        for(let h of HomeworkRows.INSTANCE.homeworks){
            if(h.getId() == id){
                let aufgabe = h.getAufgabe();
                let abgabe = h.getBisWann();
                let fach = h.getFach();
                let erledigt = h.isFinished();
                let ids = h.getId();
    
                let e = {"aufgabe": aufgabe, "bisWann": abgabe, "fach": fach, "erledigt": erledigt, "id": ids};
                HomeworkRows.updateData(e, id);
                break;
            }
        }
    }

    static homeworkToJson(h){
        let aufgabe = h.getAufgabe();
        let abgabe = h.getBisWann();
        let fach = h.getFach();
        let erledigt = h.isFinished();
        let ids = h.getId();

        let e = {"aufgabe": aufgabe, "bisWann": abgabe, "fach": fach, "erledigt": erledigt, "id": ids};
        return e;
    }

    static getRandomId(gotId){
        let allreadUsedIds = HomeworkRows.INSTANCE.homeworks.map((e)=>e.getId());
        for(let i = 0; i < 10000000; i++){
            if(!allreadUsedIds.includes(i)){
                gotId(i);
                return;
            }

        }
    }

    static save(){
        HomeworkRows.INSTANCE.saveHomeworks();
    }

    static load(){
        HomeworkRows.INSTANCE.loadHomeworks();
    }

    static addHomework(h){
        HomeworkRows.INSTANCE.addHomework(h);
    }

    static archive(h){
        HomeworkRows.archiveData(h);
        let homeworks = HomeworkRows.INSTANCE.homeworks;
        for(let i = 0; i < homeworks.length; i++){
            if(homeworks[i] === h){
                if(HomeworkRows.INSTANCE.archivedHomework == null || HomeworkRows.INSTANCE.archivedHomework == undefined)HomeworkRows.INSTANCE.archivedHomework = [];
                
                let a = HomeworkRows.INSTANCE.homeworks.splice(i, 1);

                for(let s of a){
                    HomeworkRows.INSTANCE.archivedHomework.push(s);
                }
                
                break;
            }
        }
    }

}

HomeworkRows.INSTANCE = new HomeworkRows();
HomeworkRows.ISSORTINGAFTERERLEDIGT = false;
HomeworkRows.ISSORTINGAFTERBISWANN = false;
HomeworkRows.ISSORTINGAFTERAUFGABE = false;
HomeworkRows.ISSORTINGAFTERFACH = false;

HomeworkRows.ONLYSHOWERLEDIGTE = false;
HomeworkRows.ONLYSHOWARCHIVED = false;