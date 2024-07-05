var selected = null;
var first = true;

function displayChemistry(){
    disableAllMainTabs();
    let i = document.getElementById("chemistry");
    let btn = document.getElementById("btnChemistry");
    if(i)i.style.display = null;
    if(btn)btn.setAttribute("selected", "");
    if(btn)setPositionOfLastElement(btn, selected);
    selected = btn;
    saveCurrentSelected();
}

function displayMathematics(){
    disableAllMainTabs();
    let i = document.getElementById("mathematics");
    let btn = document.getElementById("btnMathematics");
    if(i)i.style.display = null;
    if(btn)btn.setAttribute("selected", "");
    if(btn)setPositionOfLastElement(btn, selected);
    selected = btn;
    saveCurrentSelected();
}

function displayConverter(){
    disableAllMainTabs();
    let i = document.getElementById("converter");
    let btn = document.getElementById("btnConverter");
    if(i)i.style.display = null;
    if(btn)btn.setAttribute("selected", "");
    if(btn)setPositionOfLastElement(btn, selected);
    selected = btn;
    saveCurrentSelected();
}

function displayHomework(){
    disableAllMainTabs();
    let ho = document.getElementById("homework");
    let btnHomework = document.getElementById("btnHomework");
    if(ho)ho.style.display = null;
    if(btnHomework)btnHomework.setAttribute("selected", "");
    if(btnHomework)setPositionOfLastElement(btnHomework, selected);
    selected = btnHomework;
    saveCurrentSelected();
}

function displayFormCreator(){
    disableAllMainTabs();
    let ho = document.getElementById("formCreator");
    let btnHomework = document.getElementById("btnFormCreator");
    if(ho)ho.style.display = null;
    if(btnHomework)btnHomework.setAttribute("selected", "");
    if(btnHomework)setPositionOfLastElement(btnHomework, selected);
    selected = btnHomework;
    saveCurrentSelected();
}

function displayExams(){
    disableAllMainTabs();
    let ho = document.getElementById("exams");
    let btnHomework = document.getElementById("btnExams");
    if(ho)ho.style.display = null;
    if(btnHomework)btnHomework.setAttribute("selected", "");
    if(btnHomework)setPositionOfLastElement(btnHomework, selected);
    selected = btnHomework;
    saveCurrentSelected();
}

function displayGradeCalculator(){
    disableAllMainTabs();
    let ho = document.getElementById("gradeCalculator");
    let btnHomework = document.getElementById("gradeCalculatorBtn");
    if(ho)ho.style.display = null;
    if(btnHomework)btnHomework.setAttribute("selected", "");
    if(btnHomework)setPositionOfLastElement(btnHomework, selected);
    selected = btnHomework;
    saveCurrentSelected();
}

function displayAdminAg(){
    disableAllMainTabs();
    let ho = document.getElementById("adminAg");
    let btnHomework = document.getElementById("btnAdminAg");
    if(ho)ho.style.display = null;
    if(btnHomework)btnHomework.setAttribute("selected", "");
    if(btnHomework)setPositionOfLastElement(btnHomework, selected);
    selected = btnHomework;
    saveCurrentSelected();
}

function saveCurrentSelected(){
    if(first){
        first = false;
        return;
    }
    if(selected == null)return;
    let id = selected.id;
    if(id == null || id == "" || id == undefined)return;
    setCookie("selected", id, 365);
}

var moveElement;
var toggleMenu = ()=>{};
var showMenu = ()=>{};
var hideMenu = ()=>{};
var clickCookieBtn = ()=>{};

document.addEventListener("DOMContentLoaded", function(){
    moveElement = document.getElementById("moveElement");
    moveElement.style.display = "none";
    var icon1 = document.getElementById("a");
    var icon2 = document.getElementById("b");
    var icon3 = document.getElementById("c");

    var navBar = document.getElementById("navigationBar");
    var menubtn = document.getElementById("btnMenu");

    navBar.addEventListener("animationend", function(e){
        if(e.animationName == "slideIn"){
            navBar.removeAttribute("slideIn");
            navBar.setAttribute("show", "");
        }else if(e.animationName == "slideOut"){

            navBar.removeAttribute("slideOut");
            navBar.removeAttribute("show");
        }
    });

    clickCookieBtn = function(){
        let sel = getCookie("selected");
        if(sel == null || sel == "" || sel == undefined)return;
        document.getElementById(sel).click();
    };

    toggleMenu = function(){
        if(icon1.classList.contains('a')){
            hideMenu();
        }else{
            showMenu();
        }
    }

    showMenu = function(){
        icon1.classList.add('a');
        icon2.classList.add('c');
        icon3.classList.add('b');

        navBar.setAttribute("show", "");
        navBar.setAttribute("slideIn", "");
        menubtn.setAttribute("show", "");

    }

    hideMenu = function(){
        icon1.classList.remove('a');
        icon2.classList.remove('c');
        icon3.classList.remove('b');

        navBar.setAttribute("show", "");
        navBar.setAttribute("slideOut", "");
        menubtn.removeAttribute("show");
    }
});




function setPositionOfLastElement(newElement, lastElement){
    if(lastElement == null || newElement == null){
        if(lastElement == null){
            lastElement = document.getElementById("btnMathematics");
        }else{
            return;
        }
    }
    var pos = $(lastElement).position();
    var pos2 = $(newElement).position();

    moveElement.style.setProperty("--pos-x", pos.left + "px");
    moveElement.style.setProperty("--pos-y", pos.top + "px");
    moveElement.style.setProperty("--own-pos-x", pos2.left + "px");
    moveElement.style.setProperty("--own-pos-y", pos2.top + "px");

    moveElement.style.display = null;
    moveElement.setAttribute("moveAnimation", "");

    moveElement.addEventListener("animationend", function(e){
        if(e.animationName != "moveAnimation")return;
        moveElement.removeAttribute("moveAnimation");
        moveElement.style.display = "none";
    });
}

function disableAllMainTabs(){
    var m = document.getElementById("mathematics");
    var c = document.getElementById("chemistry");
    var co = document.getElementById("converter");
    var ho = document.getElementById("homework");
    var fc = document.getElementById("formCreator");
    var ex = document.getElementById("exams");
    var gc = document.getElementById("gradeCalculator");
    var ag = document.getElementById("adminAg");

    if(co)co.style.display = "none";
    if(m)m.style.display = "none";
    if(c)c.style.display = "none";
    if(ho)ho.style.display = "none";
    if(fc)fc.style.display = "none";
    if(ex)ex.style.display = "none";
    if(gc)gc.style.display = "none";
    if(ag)ag.style.display = "none";
    
    var btnMathematics = document.getElementById("btnMathematics");
    var btnChemistry = document.getElementById("btnChemistry");
    var btnConverter = document.getElementById("btnConverter");
    var btnHomework = document.getElementById("btnHomework");
    var btnFormCreator = document.getElementById("btnFormCreator");
    var btnExams = document.getElementById("btnExams");
    var gradeCalculatorBtn = document.getElementById("gradeCalculatorBtn");
    var btnAdminAg = document.getElementById("btnAdminAg");

    if(btnMathematics)btnMathematics.removeAttribute("selected");
    if(btnChemistry)btnChemistry.removeAttribute("selected");
    if(btnConverter)btnConverter.removeAttribute("selected");
    if(btnConverter)btnConverter.removeAttribute("selected");
    if(btnHomework)btnHomework.removeAttribute("selected");
    if(btnFormCreator)btnFormCreator.removeAttribute("selected");
    if(btnExams)btnExams.removeAttribute("selected");
    if(gradeCalculatorBtn)gradeCalculatorBtn.removeAttribute("selected");
    if(btnAdminAg)btnAdminAg.removeAttribute("selected");

}