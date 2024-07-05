class ShortcutManager{

    static init(){
        document.addEventListener("keydown", function(e){
            if(ShortcutManager.keyDown === undefined || ShortcutManager.keyDown === null)ShortcutManager.keyDown = [];
            if(e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)return;
            ShortcutManager.keyDown[e.key] = true;
            for(let li of ShortcutManager.LIS){
                li();
            }
        });
        
        document.addEventListener("keyup", function(e){
            if(ShortcutManager.keyDown === undefined || ShortcutManager.keyDown === null)ShortcutManager.keyDown = [];
            ShortcutManager.keyDown[e.key] = false;
            for(let li of ShortcutManager.LIS){
                li();
            }
        });
    }

    static addEventListener(li){
        ShortcutManager.LIS.push(li);
    }

    static isKeyDown(key){
        if(ShortcutManager.keyDown === undefined || ShortcutManager.keyDown === null){
            ShortcutManager.keyDown = [];
            return false;
        }
        if(ShortcutManager.keyDown[key] === undefined || ShortcutManager.keyDown[key] === null)return false;
        return ShortcutManager.keyDown[key]
    }

    static isKeyUp(key){
        return !this.isKeyDown(key);
    }

}

ShortcutManager.LIS = [];