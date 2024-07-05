
var IS_LIVE_UPDATE = true;
var IS_EXTERNAL_FRAME = false;
var updateStyles = null;
var add = null;
var updateUpdateLocalElementsBtn = null;
var updateImageButton = null;
document.addEventListener("DOMContentLoaded", function(){

    let customStyleEements = [];


    const iframes = document.getElementsByTagName("iframe");
    let all = [...iframes];
    all.forEach(eachFrame => {
        if(!eachFrame)return;
        eachFrame.addEventListener("load", function(){
            let element = document.createElement("style");
            element.classList.add("customStyleEement");
            customStyleEements.push(element);
            eachFrame.contentWindow.document.body.appendChild(element);
        });
    });

    let element = document.createElement("style");
    element.classList.add("customStyleEement");
    customStyleEements.push(element);
    document.body.appendChild(element);


    var liveUpdate = document.getElementById("liveView");
    var upload = document.getElementById("upload");
    var updateLocalElements = document.getElementById("updateLocalElements");

    if(!liveUpdate)return;

    liveUpdate.checked = IS_LIVE_UPDATE;

    if(IS_LIVE_UPDATE){
        updateLocalElements.disabled = true;
    }else{
        updateLocalElements.disabled = false;
    }

    add = function(e){
        let element = document.createElement("style");
        element.classList.add("customStyleEement");
        customStyleEements.push(element);
        e.body.appendChild(element);
    }.bind(this);

    updateUpdateLocalElementsBtn = function(){
        if(IS_LIVE_UPDATE){
            updateLocalElements.disabled = true;
        }else{
            updateLocalElements.disabled = false;
        }
    }

    liveUpdate.onclick = function(){
        IS_LIVE_UPDATE = liveUpdate.checked;
        if(IS_LIVE_UPDATE){
            updateLocalElements.disabled = true;
        }else{
            updateLocalElements.disabled = false;
        }
    };

    upload.onclick = function(){
        Users.upload().catch(e=>console.log(e)).then(e=>alert("Successfully Uploaded!", AlertType.SUCCESS, 2500, 250));
    };

    updateLocalElements.onclick = function(){
        if(!editor)return;
        updateStyles(editor.getSession().getValue());
    };

    updateStyles = function(text){
        for(let styleElement of customStyleEements){
            if(styleElement){
                styleElement.innerText = text;
            }
        }
    }.bind(this);

    document.getElementById("windowedOrNot").onclick = function(){
        extraStyleInOtherFrameAndBack();
        document.getElementById("customStyle").style.display = "none";
    }

});
