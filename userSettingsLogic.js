function displayPasswordSettings(){
    disableAll();
    let ots = document.getElementById("passwordSettings");
    let otsbtn = document.getElementById("editPassword");
    if(ots)ots.style.display = "block";
    if(otsbtn)otsbtn.setAttribute("selected", "");
}

function displayPermissionSettings(){
    disableAll();
    let ots = document.getElementById("permissionSettings");
    let otsbtn = document.getElementById("editPermission");
    if(ots)ots.style.display = "block";
    if(otsbtn)otsbtn.setAttribute("selected", "");
}

function displayOtherSettings(){
    disableAll();
    let ots = document.getElementById("otherSettings");
    let otsbtn = document.getElementById("editOther");
    if(ots)ots.style.display = "block";
    if(otsbtn)otsbtn.setAttribute("selected", "");
}

function disableAll(){
    let pws = document.getElementById("passwordSettings");
    let pes = document.getElementById("permissionSettings");
    let ots = document.getElementById("otherSettings");

    if(pws)pws.style.display = "none";
    if(pes)pes.style.display = "none";
    if(ots)ots.style.display = "none";

    let pwsbtn = document.getElementById("editPassword");
    let pesbtn = document.getElementById("editPermission");
    let otsbtn = document.getElementById("editOther");

    console.log(msBtn);

    if(pwsbtn)pwsbtn.removeAttribute("selected");
    if(pesbtn)pesbtn.removeAttribute("selected");
    if(otsbtn)otsbtn.removeAttribute("selected");
}