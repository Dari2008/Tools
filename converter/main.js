function displayTimeConverter() {
    let t = document.getElementById("timeConverter");
    let w = document.getElementById("weightConverter");
    let s = document.getElementById("fileSizeConverter");

    t.style.display = null;
    w.style.display = "none";
    s.style.display = "none";
    
    let btnTime = document.getElementById("btnTime");
    let btnWeights = document.getElementById("btnWeights");
    let btnFileSize = document.getElementById("btnFileSize");

    btnTime.removeAttribute("selected");
    btnWeights.removeAttribute("selected");
    btnFileSize.removeAttribute("selected");
    btnTime.setAttribute("selected", "");
}

function displayWeightConverter() {
    let t = document.getElementById("timeConverter");
    let w = document.getElementById("weightConverter");
    let s = document.getElementById("fileSizeConverter");

    t.style.display = "none";
    w.style.display = null;
    s.style.display = "none";
    
    let btnTime = document.getElementById("btnTime");
    let btnWeights = document.getElementById("btnWeights");
    let btnFileSize = document.getElementById("btnFileSize");

    btnTime.removeAttribute("selected");
    btnWeights.removeAttribute("selected");
    btnFileSize.removeAttribute("selected");
    btnWeights.setAttribute("selected", "");
}

function displayFileSizeConverter(){
    let t = document.getElementById("timeConverter");
    let w = document.getElementById("weightConverter");
    let s = document.getElementById("fileSizeConverter");

    t.style.display = "none";
    w.style.display = "none";
    s.style.display = null;
    
    let btnTime = document.getElementById("btnTime");
    let btnWeights = document.getElementById("btnWeights");
    let btnFileSize = document.getElementById("btnFileSize");

    btnTime.removeAttribute("selected");
    btnWeights.removeAttribute("selected");
    btnFileSize.removeAttribute("selected");
    btnFileSize.setAttribute("selected", "");
}