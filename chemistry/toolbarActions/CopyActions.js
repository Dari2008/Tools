class CopyActions{
    static copy() {
        document.getElementById("lblForColorPicker").click();
        document.getElementById("colorSelected").oninput = ()=>{
            let all = CanvasRenderer.INSTANCE.elements;
        
            let minX = Number.MAX_SAFE_INTEGER;
            let minY = Number.MAX_SAFE_INTEGER;
            let maxX = Number.MIN_SAFE_INTEGER;
            let maxY = Number.MIN_SAFE_INTEGER;
    
            let BORDER_SIZE = 20;
        
            for (let a of all) {
                if (a.getX() < minX) minX = a.getX();
                if (a.getY() < minY) minY = a.getY();
                if (a.getX()+1 > maxX) maxX = a.getX()+1;
                if (a.getY()+1 > maxY) maxY = a.getY()+1;
            }
        
            if (minX === Number.MAX_SAFE_INTEGER) minX = 0;
            if (minY === Number.MAX_SAFE_INTEGER) minY = 0;
            if (maxX === Number.MIN_SAFE_INTEGER) maxX = 0;
            if (maxY === Number.MIN_SAFE_INTEGER) maxY = 0;
        
    
            maxX = (maxX-1) * CanvasRenderer.X_MULTIPLYER + CanvasRenderer.WIDTH;
            maxY = (maxY-1) * CanvasRenderer.Y_MULTIPLYER + CanvasRenderer.HEIGHT;
            minX = minX * CanvasRenderer.X_MULTIPLYER;
            minY = minY * CanvasRenderer.Y_MULTIPLYER;
        
            let tmpC = document.createElement("canvas");
            tmpC.width = maxX - minX + BORDER_SIZE*2;
            tmpC.height = maxY - minY + BORDER_SIZE*2;
            tmpC.style.display = "none";
    
            CanvasRenderer.renderElementsForFoto(tmpC, minX>0?(-minX + BORDER_SIZE):(+minX + BORDER_SIZE), minY>0?(-minY + BORDER_SIZE):(+minY + BORDER_SIZE), document.getElementById("colorSelected").value);
    
            document.getElementById("result").style.display = null;
            document.getElementById("copiedImage").src = encodeURI(tmpC.toDataURL("image/png"));
        }
    }

    static reject(e){
        document.getElementById("message").innerHTML = "Es gab einen fehler:<br>" + 
        "&nbsp;&nbsp;&nbsp;" + e + 
        "<br>&nbsp;&nbsp;&nbsp;Hier aber ein link tum Foto:" + 
        "<br>&nbsp;&nbsp;<button style='background-color: rgba(0, 0, 0, 0); text-decoration: underline; color: blue; cursor: pointer;' onclick='window.open(\"" + document.getElementById('tmpC').toDataURL('image/png') + "\");'>Foto</button>";
        document.getElementById("messageDiv").setAttribute("type", "error");
        document.getElementById("messageDiv").removeAttribute("show");
        document.getElementById("messageDiv").setAttribute("show", "");
    }
    
}