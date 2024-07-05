function displayAllreadyWrittenExams(){
    disableAll();
    document.getElementById("allreadyWrittenExams").setAttribute("selected", "");
    Exams.showCurrentExams(false);
    document.getElementById("menu").style.display = "none";
}

function displayCurrentExams(){
    disableAll();
    document.getElementById("currentExams").setAttribute("selected", "");
    Exams.showCurrentExams(true);
    document.getElementById("menu").style.display = null;
}

function disableAll(){
    document.getElementById("currentExams").removeAttribute("selected");
    document.getElementById("allreadyWrittenExams").removeAttribute("selected");
}