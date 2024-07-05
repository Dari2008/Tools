class PrintManager{



    static printCanvas(e) {
        var c = document.getElementById("content");
        var tmp = document.createElement("canvas");
        tmp.width = c.height;
        tmp.height = c.width;

        var tmpCtx = tmp.getContext("2d");
        tmpCtx.save();
        tmpCtx.translate(tmp.width / 2, tmp.height / 2);
        tmpCtx.rotate(Math.PI / 2);
        tmpCtx.drawImage(c, -c.width / 2, -c.height / 2);
        tmpCtx.restore();

        var base64URL = tmp.toDataURL('image/png');
    
        var win = window.open("_blank", "_blank");
        
        if (win) {
            e.preventDefault();
            win.document.open();
            win.document.write('<html><head><title>Print Image</title></head><body>');
            win.document.write('<img src="' + base64URL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen="true" />');
            win.document.write('</body></html>');            
            win.document.close();
            win.print();
        } else {
            console.error('Failed to open print window. Make sure pop-ups are allowed.');
        }
    }
    
    
}


window.onbeforeprint = PrintManager.printCanvas;