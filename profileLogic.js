function displayNotificationDevices(){
    disableAlls();

    document.getElementById("notificationDevicesBtn").setAttribute("selected", "");
    document.getElementById("notificationDevices").style.display = "block";
}

function displayPwChange(){
    disableAlls();

    document.getElementById("changePasswordBtn").setAttribute("selected", "");
    document.getElementById("changePassword").style.display = "block";
}


function displayMenuSettings(){
    disableAlls();
    let ots = document.getElementById("menuStyle");
    let otsbtn = document.getElementById("menuStyleBtn");
    if(ots)ots.style.display = "block";
    if(otsbtn)otsbtn.setAttribute("selected", "");

}

function disableAlls(){
    let changePasswordBtn = document.getElementById("changePasswordBtn");
    let notificationDevicesBtn = document.getElementById("notificationDevicesBtn");
    let menuStyleBtn = document.getElementById("menuStyleBtn");
    let notificationDevices = document.getElementById("notificationDevices");
    let changePassword = document.getElementById("changePassword");
    let menuStyle = document.getElementById("menuStyle");

    if (changePasswordBtn) changePasswordBtn.removeAttribute("selected");
    if (notificationDevicesBtn) notificationDevicesBtn.removeAttribute("selected");
    if (menuStyleBtn) menuStyleBtn.removeAttribute("selected");
    
    if (notificationDevices) notificationDevices.style.display = "none";
    if (changePassword) changePassword.style.display = "none";
    if (menuStyle) menuStyle.style.display = "none";
}

function setSecurityLevel(lvl){
    let lvl1 = document.getElementById("s1");
    let lvl2 = document.getElementById("s2");
    let lvl3 = document.getElementById("s3");
    let lvl4 = document.getElementById("s4");
    let lvl5 = document.getElementById("s5");
    let text = document.getElementById("securityText");
    let classVal = "none";
    let classValNone = "none";
    switch(lvl){
        case -1:
            text.textContent = "K. Eingabe";
            remAll(lvl1, lvl2, lvl3, lvl4, lvl5);
            lvl1.classList.add(classValNone);
            lvl2.classList.add(classValNone);
            lvl3.classList.add(classValNone);
            lvl4.classList.add(classValNone);
            lvl5.classList.add(classValNone);
            break;
        case 0:
            classVal = "nachlaessig";
            text.textContent = "Nachlässig";
            remAll(lvl1, lvl2, lvl3, lvl4, lvl5);
            lvl1.classList.add(classVal);
            lvl2.classList.add(classValNone);
            lvl3.classList.add(classValNone);
            lvl4.classList.add(classValNone);
            lvl5.classList.add(classValNone);
            break;
        case 1:
            classVal = "niedrig";
            text.textContent = "Niedrig";
            remAll(lvl1, lvl2, lvl3, lvl4, lvl5);
            lvl1.classList.add(classVal);
            lvl2.classList.add(classVal);
            lvl3.classList.add(classValNone);
            lvl4.classList.add(classValNone);
            lvl5.classList.add(classValNone);
            break;
        case 2:
            classVal = "mittel";
            text.textContent = "Mittel";
            remAll(lvl1, lvl2, lvl3, lvl4, lvl5);
            lvl1.classList.add(classVal);
            lvl2.classList.add(classVal);
            lvl3.classList.add(classVal);
            lvl4.classList.add(classValNone);
            lvl5.classList.add(classValNone);
            break;
        case 3:
            classVal = "hoch";
            text.textContent = "Hoch";
            remAll(lvl1, lvl2, lvl3, lvl4, lvl5);
            lvl1.classList.add(classVal);
            lvl2.classList.add(classVal);
            lvl3.classList.add(classVal);
            lvl4.classList.add(classVal);
            lvl5.classList.add(classValNone);
            break;
        default:
            classVal = "sehrHoch";
            text.textContent = "Sehr Hoch";
            remAll(lvl1, lvl2, lvl3, lvl4, lvl5);
            lvl1.classList.add(classVal);
            lvl2.classList.add(classVal);
            lvl3.classList.add(classVal);
            lvl4.classList.add(classVal);
            lvl5.classList.add(classVal);
            break;
    }

    function remAll(...all){
        for(let a of all){
            a.classList.remove("nachlaessig");
            a.classList.remove("niedrig");
            a.classList.remove("mittel");
            a.classList.remove("hoch");
            a.classList.remove("sehrHoch");
        }
    }
}

function initPwField(){
    setSecurityLevel(-1);
    document.getElementById("newPassword").addEventListener("input", ()=>{
        let val = document.getElementById("newPassword").value;
        let ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        let extracharacters = ['!', '"', '§', '$', '%', '&', '/', '(', ')', '=', '?', '*', '+', '#', "'", ',', ';', ':', '.', '-', '_', '<', '>', '|', '@', '[', ']', '{', '}', '\\', '^', '°'];
        let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let length = val.length;
        let amountOfGood = -1;
        if(val == null || val == undefined || val.length == 0 || val.trim().length == 0){
            setSecurityLevel(-1);
            return;
        }

        let includesALPHABETIC = false;
        let includesalphabetic = false;
        let includesextra = false;
        let includesnumbers = false;
        let includeslength = length>= 8?true:false;

        for(let i = 0; i < val.length; i++) {
            let c = val.charAt(i);
            let isUppercase = c === c.toUpperCase();
            
        
            if (!includesALPHABETIC && isUppercase) {
                includesALPHABETIC = ALPHABET.includes(c);
                continue;
            }
        
            if (!includesalphabetic && !isUppercase) {
                includesalphabetic = alphabet.includes(c);
            }
        
            if (!includesextra) {
                includesextra = extracharacters.includes(c);
            }
        
            if (!includesnumbers) {
                includesnumbers = numbers.includes(c);
            }
        }

        if(includesALPHABETIC)amountOfGood++;
        if(includesalphabetic)amountOfGood++;
        if(includesextra)amountOfGood++;
        if(includesnumbers)amountOfGood++;
        if(includeslength)amountOfGood++;

        setSecurityLevel(amountOfGood);
    });
}

function getAllDevicesAndAdd(){
    let list = document.getElementById("deviceListBody");
    $.ajax({
        url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
        type: "POST",
        data: { method:"getAuths", password: getCookie("password"), username: getCookie("username")},
        dataType: 'json',
        success: s=>{
            if(s==null || s==undefined || s["success"]==false)return;
            if(s["success"]){
                let data = s["data"];
                list.innerHTML = "";
                for(let auth of data){
                    let info = auth["info"];
                    let sub = auth["sub"];
                    let id = auth["id"];
                    createElement(list, info, sub, id);
                }
            }else{
                alert("Es gab einen fehler beim laden der Devices!");
            }
        },
        error: e=>alert("Es gab einen fehler beim laden der Devices!")
    });
}

function createElement(list, info, sub, id){
    if(sub == undefined || sub == null)return;
    if(info == undefined || info == null)return;
    if(list == undefined || list == null)return;

    let tr = document.createElement("tr");
    let infoTh = document.createElement("th");
    infoTh.classList.add("deviceListeElement");
    infoTh.innerHTML = "<span class='deviceListeElementSpan'>" + info + "</span>";

    let btnDelTh = document.createElement("th");
    btnDelTh.classList.add("deviceListRemoveTh")
    let btnDel = document.createElement("button");
    btnDel.classList.add("deviceListRemove");
    btnDel.textContent = "Entfernen";
    btnDel.onclick = function(){
        deleteAuth(this.getAttribute("id"));
    };
    btnDel.setAttribute("id", id);

    btnDelTh.appendChild(btnDel);

    tr.appendChild(infoTh);
    tr.appendChild(btnDelTh);
    list.appendChild(tr);
}

function deleteAuth(id){
    $.ajax({
        url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
        type: "POST",
        data: { method:"removeAuthData", password: getCookie("password"), username: getCookie("username"), id:id},
        dataType: 'json',
        success: s=>{
            if(s==null || s==undefined || s["success"]==false)return;
            if(s["success"]){
                alert("Successfully deleted!", AlertType.SUCCESS, 2500, 250);
                getAllDevicesAndAdd();
            }else{
                alert("Es gab einen fehler beim entfernen eines Devices!", AlertType.ERROR, 2500, 250);
            }
        },
        error: e=>alert("Es gab einen fehler beim entfernen eines Devices!", AlertType.ERROR, 2500, 250)
    });
}