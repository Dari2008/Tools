class ButtonManager{

    constructor(){
        // this.hasCopyed = false;
        // this.copys = null;
    }

    update(x, y){
        if(CanvasRenderer.contains(x, y)){
            this.x = x;
            this.y = y;
            this.enableButton(this.btnRotateLeft);
            this.enableButton(this.btnRotateRight);
            this.enableButton(this.btnRemove);
            this.enableButton(this.btnRotateRightIpad);
            this.enableButton(this.btnRemoveIpad);
            if(CanvasRenderer.get(x, y).getConfig().isFull()){
                this.disableButton(this.btnConnect);
            }else{
                this.enableButton(this.btnConnect);
            }
            // this.enableButton(this.btnCopy)
            // this.disableButton(this.btnPaste)
        }else{
            this.x = x;
            this.y = y;
            this.disableButton(this.btnRotateLeft);
            this.disableButton(this.btnRotateRight);
            this.disableButton(this.btnRemove);
            this.disableButton(this.btnConnect);
            this.disableButton(this.btnRotateRightIpad);
            this.disableButton(this.btnRemoveIpad);
            // this.disableButton(this.btnCopy)
            // if(this.copys != undefined && this.copys != null && this.hasCopyed)this.enableButton(this.btnPaste)
        }
    }

    initRotateLeft(name){
        this.btnRotateLeft = document.getElementById(name);
    }

    initRotateRight(name, ipadName){
        this.btnRotateRight = document.getElementById(name);
        this.btnRotateRightIpad = document.getElementById(ipadName);
    }

    initRemove(name, ipadName){
        this.btnRemove = document.getElementById(name);
        this.btnRemoveIpad = document.getElementById(ipadName);
    }

    initConnect(name){
        this.btnConnect = document.getElementById(name);
    }

    // initCopy(name){
    //     this.btnCopy = document.getElementById(name);
    // }

    // initPaste(name){
    //     this.btnPaste = document.getElementById(name);
    //     this.disableButton(this.btnPaste);
    // }

    rotateLeft(x = this.x, y = this.y){
        var result = CanvasRenderer.get(x, y);
        if(result === undefined || result === null)return;
        result.setRotation(result.getRotation()-1<0?3:result.getRotation()-1);
        CanvasRenderer.renderElements("content");
        if(!CanvasRenderer.ISIPADMODE)this.closeMenu();
    }

    rotateRight(x = this.x, y = this.y){
        var result = CanvasRenderer.get(x, y);
        if(result === undefined || result === null)return;
        result.setRotation(result.getRotation()+1>3?0:result.getRotation()+1);
        CanvasRenderer.renderElements("content");
        if(!CanvasRenderer.ISIPADMODE)this.closeMenu();
    }

    remove(x = this.x, y = this.y){
        CanvasRenderer.remove(x, y);
        CanvasRenderer.renderElements("content");
        this.closeMenu();
    }

    connect(x = this.x, y = this.y){
        var result = CanvasRenderer.get(x, y);
        if(result === undefined || result === null)return;
        if(this.currentConnecting === undefined || this.currentConnecting === null){
            this.currentConnecting = result;
        }else{
            if(this.currentConnecting === result)return;
            var c = new Connection(this.currentConnecting, result);
            result.connect(c);
            this.currentConnecting.connect(c);
            this.currentConnecting = null;
        }

        CanvasRenderer.renderElements("content");
        if(!CanvasRenderer.ISIPADMODE)this.closeMenu();
    }


    clearCurrentDrag(){
        this.currentConnecting = null;
    }

    // copy(){
    //     CanvasRenderer.renderElements("content");
    //     this.closeMenu();
    // }

    // paste(){
    //     if(this.copys !== undefined && this.copys !== null){
    //         CanvasRenderer.renderElements("content");
    //     }
    //     this.closeMenu();
    // }

    closeMenu(){
        MouseListeners.INSTANCE.menu.style.display = "none";
        MouseListeners.INSTANCE.iPadMenu.style.display = "none";
    }

    enableButton(btn){
        btn.removeAttribute("disabled");
    }

    disableButton(btn){
        btn.setAttribute("disabled", "");
    }

    enableButtonFromName(name){
        var btn = document.getElementById(name);
        btn.removeAttribute("disabled");
    }

    disableButtonFromName(name){
        var btn = document.getElementById(name);
        btn.setAttribute("disabled", "");
    }

}

ButtonManager.INSTANCE = new ButtonManager();