function displayDoneHome() {
    let t = document.getElementById("menu");

    t.style.display = "none";
    
    let btnDoneHome = document.getElementById("btnDoneHome");
    let btnCurrentHome = document.getElementById("btnCurrentHome");
    let btnarchivierteHome = document.getElementById("btnarchivierteHome");

    btnDoneHome.removeAttribute("selected");
    btnCurrentHome.removeAttribute("selected");
    btnarchivierteHome.removeAttribute("selected");
    btnDoneHome.setAttribute("selected", "");

    HomeworkRows.showArchivedAndLoadIfNotLoaded(false);
    HomeworkRows.showErledigt(true);
}

function displayCurrentHome() {
    let t = document.getElementById("menu");

    t.style.display = null;
    
    let btnDoneHome = document.getElementById("btnDoneHome");
    let btnCurrentHome = document.getElementById("btnCurrentHome");
    let btnarchivierteHome = document.getElementById("btnarchivierteHome");

    btnDoneHome.removeAttribute("selected");
    btnCurrentHome.removeAttribute("selected");
    btnarchivierteHome.removeAttribute("selected");
    btnCurrentHome.setAttribute("selected", "");

    HomeworkRows.showArchivedAndLoadIfNotLoaded(false);
    HomeworkRows.showErledigt(false);

}

function displayArchivedHome(){
    let t = document.getElementById("menu");

    t.style.display = "none";
    
    let btnDoneHome = document.getElementById("btnDoneHome");
    let btnCurrentHome = document.getElementById("btnCurrentHome");
    let btnarchivierteHome = document.getElementById("btnarchivierteHome");

    btnDoneHome.removeAttribute("selected");
    btnCurrentHome.removeAttribute("selected");
    btnCurrentHome.removeAttribute("selected");
    btnarchivierteHome.setAttribute("selected", "");

    HomeworkRows.showErledigt(false);
    HomeworkRows.showArchivedAndLoadIfNotLoaded(true);
}
