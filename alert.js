AlertType = {"WARNING":"WARNING", "INFO":"INFO", "ERROR":"ERROR", "SUCCESS":"SUCCESS"};
var wasClosed = true;
alert = function(text, type, displayTime=2000,  animationTime=120){
    if(document.getElementById("alertMainDiv"))document.getElementById("alertMainDiv").setAttribute("type", type);
    if(document.getElementById("alertTextField"))document.getElementById("alertTextField").textContent = text;
    if(document.getElementById("alertMainDiv"))document.getElementById("alertMainDiv").style.display = null;
    if(document.getElementById("alertMainDiv"))document.getElementById("alertMainDiv").setAttribute("openAlert", "");
    if(document.getElementById("alertMainDiv"))document.getElementById("alertMainDiv").style.setProperty("--time", animationTime + "ms");
    wasClosed = false;
    setTimeout(()=>{
        if(document.getElementById("alertMainDiv").hasAttribute("closeAlert"))return;
        if(wasClosed)return;
        if(document.getElementById("alertMainDiv"))document.getElementById("alertMainDiv").setAttribute("closeAlert", "");
    }, displayTime);

};

document.addEventListener("DOMContentLoaded", ()=>{
    let body = document.body;
    let styleSheet = document.createElement("link");
    styleSheet.rel = "stylesheet";
    styleSheet.type = "text/css";
    styleSheet.media = "screen";
    if(location.origin.includes("frobeen"))styleSheet.href = location.origin + "/tools/alertStyle.css";
    else styleSheet.href = location.origin + "/alertStyle.css";
    document.head.appendChild(styleSheet);

    createAlertDiv(body);

    if(document.getElementById("alertMainDiv"))document.getElementById("alertMainDiv").addEventListener("animationend", function(e){
        if(e.animationName == "closeAlert"){
            wasClosed = true;
            document.getElementById("alertMainDiv").style.display = "none";
        }else if(e.animationName == "openAlert"){
            document.getElementById("alertMainDiv").style.display = null;
        }
        document.getElementById("alertMainDiv").removeAttribute("openAlert");
        document.getElementById("alertMainDiv").removeAttribute("closeAlert");
    });
});

function createAlertDiv(body){
    let alertMainDiv = document.createElement("div");
    let closeMessage = document.createElement("button");
    let alertTextField = document.createElement("p");

    alertMainDiv.id = "alertMainDiv";
    closeMessage.id = "closeMessage";
    alertTextField.id = "alertTextField";

    closeMessage.textContent = "✛";
    closeMessage.onclick = ()=>alertMainDiv.setAttribute('closeAlert', '');

    alertMainDiv.appendChild(closeMessage);
    alertMainDiv.appendChild(alertTextField);

    alertMainDiv.style.display = "none";

    body.appendChild(alertMainDiv);
}