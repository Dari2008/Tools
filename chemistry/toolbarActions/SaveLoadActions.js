class SaveLoadActions{

    static init(){
        document.getElementById("insertNameForSaveInCookiesInput").addEventListener("focusin", function(){
            document.getElementById("insertNameForSaveInCookiesInput").setAttribute("focused", "");
        });

        document.getElementById("insertNameForSaveInCookiesInput").addEventListener("focusout", function(){
            document.getElementById("insertNameForSaveInCookiesInput").removeAttribute("focused");
        });

        document.onkeydown = function(e){
            if(document.getElementById("insertNameForSaveInCookiesInput").hasAttribute("focused")){
                return;
            }
            if(e.key == 'L' && e.ctrlKey && e.shiftKey){
                SaveLoadActions.loadFromCookies();
                e.preventDefault();
            }else if(e.key == 'S' && e.ctrlKey && e.shiftKey){
                SaveLoadActions.saveToCookies();
                e.preventDefault();
            }else if(e.key == 'm' && e.ctrlKey){
                SaveLoadActions.manageCookies();
                e.preventDefault();
            }else if(e.key == 'l' && e.ctrlKey){
                SaveLoadActions.load();
                e.preventDefault();
            }else if(e.key == 'c' && e.ctrlKey){
                CopyActions.copy();
                e.preventDefault();
            }else if(e.key == 's' && e.ctrlKey){
                SaveLoadActions.save();
                e.preventDefault();
            }
        }
    }

    static manageCookies(){

        while(document.getElementById("allCookies").childElementCount > 0){
            document.getElementById("allCookies").remove(0);
        }

        let cookies = SaveLoadActions.getCookies();
        for(let c of cookies){
            let o = document.createElement("option");
            o.value = c.name;
            o.text = c.name;
            document.getElementById("allCookies").appendChild(o);
        }

        document.getElementById("managerCookiesDiv").style.display = null;
        document.getElementById("deleteCookie").onclick = function(e){
            let v = document.getElementById("allCookies").value;
            if(v !== undefined || v === null || v === ""){
                SaveLoadActions.removeCookie(v);

                while(document.getElementById("allCookies").childElementCount > 0){
                    document.getElementById("allCookies").remove(0);
                }

                let cookies = SaveLoadActions.getCookies();
                for(let c of cookies){
                    let o = document.createElement("option");
                    o.value = c.name;
                    o.text = c.name;
                    document.getElementById("allCookies").appendChild(o);
                }
                document.getElementById("message").innerHTML = "Erfolgreich gel&ouml;scht!";
                document.getElementById("messageDiv").setAttribute("type", "success");
                document.getElementById("messageDiv").setAttribute("show", "");
            }else{
                document.getElementById("message").innerHTML = "Es gab einen Fehler beim l&ouml;schen der Datei!";
                document.getElementById("messageDiv").setAttribute("type", "error");
                document.getElementById("messageDiv").setAttribute("show", "");
            }
        }
    }

    static loadFromCookies(){

        while(document.getElementById("selectNameToLoad").childElementCount > 0){
            document.getElementById("selectNameToLoad").remove(0);
        }

        let cookies = SaveLoadActions.getCookies();
        for(let c of cookies){
            let o = document.createElement("option");
            o.value = c.name;
            o.text = c.name;
            document.getElementById("selectNameToLoad").appendChild(o);
        }


        document.getElementById("selectNameToLoadDiv").style.display = null;
        document.getElementById("selectNameToLoadOkBtn").onclick = function(){
            let name = document.getElementById("selectNameToLoad").value;
            let cookie = SaveLoadActions.getCookie(name);
            if(cookie === ""){
                document.getElementById("message").innerHTML = "Es gab einen Fehler beim laden der Datei!";
                document.getElementById("messageDiv").setAttribute("type", "error");
                document.getElementById("messageDiv").setAttribute("show", "");
                return;
            }
            SaveLoadActions.CURRENTLY_OPEND_FILE_NAME = name;
            CanvasRenderer.loadFromString(cookie);
            document.getElementById("content").focus();
            document.getElementById("selectNameToLoadDiv").style.display = "none";
        }

    }

    static removeCookie( name ) {
        if(name.trim() == "username" || name.trim() == "password")return;
        if( SaveLoadActions.getCookie( name ) ) {
            document.cookie = name + "=" +
              ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }
    }

    static setCookie(cname, cvalue, exdays) {
        if(cname.trim() == "username" || cname.trim() == "password")return;
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + "SameSite=None; Secure";
    }

    static getCookie(cname) {
        let vals = document.cookie.split(";");

        for(let i = 0; i < vals.length; i++){
            if(vals[i].includes("SameSite=None; Secure")){
                vals.splice(i, 1);
            }
        }

        for(let v of vals){
            let result = {};
            if(v.split("=")[0] === cname)return v.split("=")[1];
        }
        return "";
    }

    static getCookies(){
        let vals = document.cookie.split(";");

        for(let i = 0; i < vals.length; i++){
            if(vals[i].includes("SameSite=None; Secure")){
                vals.splice(i, 1);
            }
        }

        let valsResult = [];

        for(let v of vals){
            let result = {};
            result["name"] = v.split("=")[0]
            result["value"] = v.split("=")[1]
            if(result["name"].trim() == "password" || result["name"].trim() == "username")continue;
            valsResult.push(result);
        }
        return valsResult;
    }

    static saveToCookies(){
        if(SaveLoadActions.CURRENTLY_OPEND_FILE_NAME !== undefined && SaveLoadActions.CURRENTLY_OPEND_FILE_NAME !== null){
            this.setCookie(SaveLoadActions.CURRENTLY_OPEND_FILE_NAME, CanvasRenderer.toString());
            document.getElementById("message").innerHTML = "Die Datei wurde erfolgreich als \"" + SaveLoadActions.CURRENTLY_OPEND_FILE_NAME + "\" gespeichert!";
            document.getElementById("messageDiv").setAttribute("type", "success");
            document.getElementById("messageDiv").setAttribute("show", "");
        }else{
            document.getElementById("insertNameForSaveInCookiesDiv").style.display = null;
            document.getElementById("insertNameForSaveInCookiesOkBtn").onclick = function(e){
                let input = document.getElementById("insertNameForSaveInCookiesInput").value;
                if(input === undefined || input === null || input === "")return;
                SaveLoadActions.setCookie(input, CanvasRenderer.toString());
                document.getElementById("message").innerHTML = "Die Datei wurde erfolgreich als \"" + input + "\" gespeichert!";
                document.getElementById("messageDiv").setAttribute("type", "success");
                document.getElementById("messageDiv").setAttribute("show", "");
                document.getElementById("insertNameForSaveInCookiesDiv").style.display = "none";
                document.getElementById("insertNameForSaveInCookiesInput").value = "";
            }
        }
        document.getElementById("content").focus();
    }

    static save(){
        if(SaveLoadActions.CURRENTLY_OPEND_FILE_NAME !== undefined && SaveLoadActions.CURRENTLY_OPEND_FILE_NAME !== null){
            if(CanvasRenderer.INSTANCE.elements.length == 0){
                alert("Warum würde man so etwas speichern wollen?");
                document.location.reload(true);
                return;
            }
            SaveLoadActions.saveTxtToFile(SaveLoadActions.CURRENTLY_OPEND_FILE_NAME + ".lwsFF", CanvasRenderer.toString());
        }else{
            if(CanvasRenderer.INSTANCE.elements.length == 0){
                alert("Warum würde man so etwas speichern wollen?");
                document.location.reload(true);
                return;
            }
            SaveLoadActions.saveTxtToFile("aktuelle.lwsFF", CanvasRenderer.toString());
        }
        document.getElementById("content").focus();
    }

    static load(){
        document.getElementById("openFile").click();
        document.getElementById("openFile").onchange = this.onUpload;
    }

    static async onUpload(e){
        const file = e.target.files.item(0)
        const text = await file.text();
        SaveLoadActions.CURRENTLY_OPEND_FILE_NAME = file.name.replace(".lwsFF", "");
        CanvasRenderer.loadFromString(text);
        document.getElementById("content").focus();
    }


    static saveTxtToFile(fileName, textData) {
        const blobData = new Blob([textData], { type: 'text/plain' });
        const urlToBlob = window.URL.createObjectURL(blobData);
        const a = document.createElement('a');
        a.style.setProperty('display', 'none');
        document.body.appendChild(a);
        a.href = urlToBlob;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(urlToBlob);
        a.remove();
    }
    

}