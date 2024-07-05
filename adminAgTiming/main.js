function displayAlreadyPayed(){
    disableAll();
    let element = document.getElementById("alreadyPayedBtn");
    if(element == undefined || element == null)return;
    element.setAttribute("selected", "");

    Works.DISPLAY_NOT_PAYED = false;
    Works.updateList();
}

function displayNotPayed(){
    disableAll();
    let element = document.getElementById("notPayedBtn");
    if(element == undefined || element == null)return;
    element.setAttribute("selected", "");

    Works.DISPLAY_NOT_PAYED = true;
    Works.updateList();
}

function disableAll(){
    let elements = document.getElementsByClassName("navItem");
    for(let element of elements){
        if(element == undefined || element == null)continue;
        element.removeAttribute("selected");
    }
}