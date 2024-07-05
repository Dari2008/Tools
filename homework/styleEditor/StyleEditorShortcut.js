class StyleEditorShortcut{

    constructor(id, pasteValue, dispalyValue){
        this.id = id;
        this.pasteValue = pasteValue;
        this.dispalyValue = dispalyValue;
        this.init();
    }

    init(){
        this.component = document.createElement("button");
        this.component.id = this.id;
        this.component.classList.add("shortCutEditorStyleButton");
        this.component.onclick = function(){
            this.pasteAtCursorPos();
        }.bind(this);
        this.component.textContent = this.dispalyValue;

        document.getElementById("inputFieldPossibilities").appendChild(this.component);
    }

    pasteAtCursorPos(){
        let posToPaste = this.getCaretPosition();
        let text = document.getElementById("inputTextFiel").innerText; // Verwende innerHTML
        let split1 = text.substring(0, posToPaste);
        let split2 = text.substring(posToPaste, text.length);
        text = split1 + this.pasteValue + split2;
        document.getElementById("inputTextFiel").innerHTML = convertWords(text.replace(/\n/g, "").replace(/\\u00a0/g, " ").replace(/\u00a0/g, " "), displayWords, words); // Verwende innerHTML
        if (document.getElementById("inputTextFiel").changeText) document.getElementById("inputTextFiel").changeText(text.replace(/\n/g, "").replace(/\\u00a0/g, " ").replace(/\u00a0/g, " "));
        
    }

    getCaretPosition() {
        let editableDiv = document.getElementById("inputTextFiel");
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
    

    getComponent(){
        return this.component;
    }

}