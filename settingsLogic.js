

function getCaretPosition(editableDiv) {
    let caretPos = 0;
    let sel, range;

    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            let preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(editableDiv);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretPos = preCaretRange.toString().length;
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        let tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        let tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
    }

    return caretPos;
}

function setCaretPosition(el, position) {
    const range = document.createRange();
    const sel = window.getSelection();
    let charIndex = 0;
    let nodeStack = [el];
    let node;
    let foundStart = false;
    let stop = false;

    range.setStart(el, 0);
    range.collapse(true);

    while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType == 3) {
            const nextCharIndex = charIndex + node.length;
            if (!foundStart && position >= charIndex && position <= nextCharIndex) {
                range.setStart(node, position - charIndex);
                range.collapse(true);
                stop = true;
            }
            charIndex = nextCharIndex;
        } else {
            let i = node.childNodes.length;
            while (i--) {
                nodeStack.push(node.childNodes[i]);
            }
        }
    }

    sel.removeAllRanges();
    sel.addRange(range);
}

var words = [
    "%REMAINING_WEEKS%",
    "%REMAINING_DAYS%",
    "%REMAINING_HOURS%",
    "%REMAINING_MINUTES%",
    "%REMAINING_SECONDS%",
    "%FORMATTED_TIME%",

    "%SHORT_NAME_FACH%",
    "%FACH%",
    "%AUFGABE%",
    "%BIS_WANN%"
];
var displayWords = {
    "%REMAINING_WEEKS%":"%REMAINING_WEEKS%",
    "%REMAINING_DAYS%":"%REMAINING_DAYS%",
    "%REMAINING_HOURS%":"%REMAINING_HOURS%",
    "%REMAINING_MINUTES%":"%REMAINING_MINUTES%",
    "%REMAINING_SECONDS%":"%REMAINING_SECONDS%",
    "%FORMATTED_TIME%":"%FORMATTED_TIME%",

    "%SHORT_NAME_FACH%":"%SHORT_NAME_FACH%",
    "%FACH%":"%FACH%",
    "%AUFGABE%":"%AUFGABE%",
    "%BIS_WANN%":"%BIS_WANN%"
};
var buttonValues = {
    "%REMAINING_WEEKS%":"Übrige Wochen",
    "%REMAINING_DAYS%":"Übrige Tage",
    "%REMAINING_HOURS%":"Übrige Stunden",
    "%REMAINING_MINUTES%":"Übrige Minuten",
    "%REMAINING_SECONDS%":"Übrige Sekunden",
    "%FORMATTED_TIME%":"Formatierte Übrige Zeit",

    "%SHORT_NAME_FACH%":"Kurzer Fach Name",
    "%FACH%":"Fach name",
    "%AUFGABE%":"Aufgabe",
    "%BIS_WANN%":"Bis Wann"
}


function convertWords(text, displayWords, words){
    let span1 = "<span class='wordStyle' word='";
    let span2 = "'>";
    let span3 = "</span>";
    for(let e of words){
        text = text.replaceAll(e, span1 + e + span2 + displayWords[e] + span3);
    }
    return text;
}

for(let key of words){
    let displayText = buttonValues[key];
    let pasteVal = key;
    let id = key;
    new StyleEditorShortcut(id, pasteVal, displayText);
}

// Homework Settings Code

document.getElementById('currentTitleFormat').addEventListener("input", function(e) {
    let el = e.target;

    let cursorPosition = getCaretPosition(el);

    el.innerHTML = convertWords(el.innerText, displayWords, words);
    HomeworkSettings.setTitleFormat(el.textContent);

    setCaretPosition(el, cursorPosition);
});


document.getElementById('currentMessageFormat').addEventListener("input", function(e) {
    let el = e.target;

    let cursorPosition = getCaretPosition(el);

    el.innerHTML = convertWords(el.innerText.replace(/\n/g, "").replace(/\\u00a0/g, " ").replace(/\u00a0/g, " "), displayWords, words);
    HomeworkSettings.setMessageFormat(el.textContent.replace(/\n/g, "").replace(/\\u00a0/g, " ").replace(/\u00a0/g, " "));

    setCaretPosition(el, cursorPosition);
});

document.getElementById('inputTextFiel').addEventListener("input", function(e) {
    let el = e.target;

    let cursorPosition = getCaretPosition(el);

    el.innerHTML = convertWords(el.innerText.replace(/\n/g, "").replace(/\\u00a0/g, " ").replace(/\u00a0/g, " "), displayWords, words);

    setCaretPosition(el, cursorPosition);

    if(el.changeText)el.changeText(el.textContent.replace(/\n/g, "").replace(/\\u00a0/g, " ").replace(/\u00a0/g, " "));
});

document.getElementById("timeToAlarmDaysInput").onchange = function(e){
    HomeworkSettings.setTimeToNotify(document.getElementById("timeToAlarmDaysInput").value);
}

HomeworkSettings.getTitleFormat(f=>{document.getElementById('currentTitleFormat').innerHTML = convertWords(f, displayWords, words); document.getElementById('currentTitleFormat').setAttribute("text", f);});
HomeworkSettings.getMessageFormat(f=>{document.getElementById('currentMessageFormat').innerHTML = convertWords(f, displayWords, words); document.getElementById('currentMessageFormat').setAttribute("text", f);});
HomeworkSettings.getTimeToNotify(f=>{document.getElementById("timeToAlarmDaysInput").value = f;});



var styleEditor = document.getElementById("styleEditor");
var editorSpan = document.getElementById("inputTextFiel");

document.getElementById('editTitleFormat').onclick = function(e){
    editorSpan.innerHTML = convertWords(document.getElementById("currentTitleFormat").textContent.replace(/\n/g, "").replace(/\\u00a0/g, " ").replace(/\u00a0/g, " "), displayWords, words);
    styleEditor.style.display = styleEditor.style.display=="grid"?"none":"grid";
    editorSpan.changeText = function(text){
        HomeworkSettings.setTitleFormat(text);
        document.getElementById("currentTitleFormat").innerHTML = convertWords(text.replace(/\n/g, "").replace(/\\u00a0/g, " ").replace(/\u00a0/g, " "), displayWords, words);
    };
};

document.getElementById('editMessageFormat').onclick = function(e){
    editorSpan.innerHTML = convertWords(document.getElementById("currentMessageFormat").textContent.replace(/\n/g, "").replace(/\\u00a0/g, " ").replace(/\u00a0/g, " "), displayWords, words);
    styleEditor.style.display = styleEditor.style.display=="grid"?"none":"grid";
    editorSpan.changeText = function(text){
        HomeworkSettings.setMessageFormat(text);
        document.getElementById("currentMessageFormat").innerHTML = convertWords(text.replace(/\n/g, "").replace(/\\u00a0/g, " ").replace(/\u00a0/g, " "), displayWords, words);
    };
};


// Exam Settings Code

document.getElementById('currentTitleFormat2').addEventListener("input", function(e) {
    let el = e.target;

    let cursorPosition = getCaretPosition(el);

    el.innerHTML = convertWords(el.innerText, displayWords, words);
    ExamSettings.setTitleFormat(el.textContent);

    setCaretPosition(el, cursorPosition);
});


document.getElementById('currentMessageFormat2').addEventListener("input", function(e) {
    let el = e.target;

    let cursorPosition = getCaretPosition(el);

    el.innerHTML = convertWords(el.innerText, displayWords, words);
    ExamSettings.setMessageFormat(el.textContent);

    setCaretPosition(el, cursorPosition);
});

document.getElementById("timeToAlarmDaysInput2").onchange = function(e){
    ExamSettings.setTimeToNotify(document.getElementById("timeToAlarmDaysInput2").value);
}

ExamSettings.getTitleFormat(f=>{document.getElementById('currentTitleFormat2').innerHTML = convertWords(f, displayWords, words); document.getElementById('currentTitleFormat2').setAttribute("text", f);});
ExamSettings.getMessageFormat(f=>{document.getElementById('currentMessageFormat2').innerHTML = convertWords(f, displayWords, words); document.getElementById('currentMessageFormat2').setAttribute("text", f);});
ExamSettings.getTimeToNotify(f=>{document.getElementById("timeToAlarmDaysInput2").value = f;});

document.getElementById('editTitleFormat2').onclick = function(e){
    editorSpan.innerHTML = convertWords(document.getElementById("currentTitleFormat2").textContent, displayWords, words);
    styleEditor.style.display = styleEditor.style.display=="grid"?"none":"grid";
    editorSpan.changeText = function(text){
        ExamSettings.setTitleFormat(text);
        document.getElementById("currentTitleFormat2").innerHTML = convertWords(text, displayWords, words);
    };
};

document.getElementById('editMessageFormat2').onclick = function(e){
    editorSpan.innerHTML = convertWords(document.getElementById("currentMessageFormat2").textContent, displayWords, words);
    styleEditor.style.display = styleEditor.style.display=="grid"?"none":"grid";
    editorSpan.changeText = function(text){
        ExamSettings.setMessageFormat(text);
        document.getElementById("currentMessageFormat2").innerHTML = convertWords(text, displayWords, words);
    };
};


// Permission Code


document.addEventListener("DOMContentLoaded", () => {

    if(Notification.permission == "granted"){
        document.getElementById("allowMessages").disabled = true;
    }

});
