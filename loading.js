
var loadingLabel = document.getElementById("lbl");
var value = document.getElementById("value");
var loadingScreen = document.getElementById("loadingScreen");
var body = document.body;
var display = true;
var text = "Loading";

var elements = [];
var states = [];
var loaded = function(){
    display = false;
    loadingLabel = document.getElementById("lbl");
    value = document.getElementById("value");
    loadingScreen = document.getElementById("loadingScreen");
    if(!value)return;
    if(!loadingLabel)return;
    if(!loadingScreen)return;
    loadingLabel.textContent = text;
    value.removeAttribute("pending");
    loadingLabel.removeAttribute("pending");
    loadingScreen.style.display = "none";
};

var unloaded = function(texts=text){
    loadingLabel = document.getElementById("lbl");
    value = document.getElementById("value");
    loadingScreen = document.getElementById("loadingScreen");
    if(!value)return;
    if(!loadingLabel)return;
    if(!loadingScreen)return;
    loadingLabel.textContent = texts;
    value.setAttribute("pending", "");
    loadingLabel.setAttribute("pending", "");
    loadingScreen.style.display = null;
};

document.addEventListener("DOMContentLoaded", function(){
    if(!display){
        loaded();
    }else{
    }
});