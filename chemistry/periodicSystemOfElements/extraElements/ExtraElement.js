class ExtraElement{

    constructor(text, leftTopText, leftBottomText, color){
        this.text = text;
        this.color = color;
        this.leftTopText = leftTopText;
        this.leftBottomText = leftBottomText;
    }


    getText(){
        return this.text;
    }
    
    getLeftBottomText(){
        return this.leftBottomText;
    }
    
    getLeftTopText(){
        return this.leftTopText;
    }

    getColor(){
        return this.color;
    }

    getHoverString(){
        return this.text + " (" + this.leftBottomText + "" + this.leftTopText + ")";
    }

    render(c, g, x, y, w, h){
        g.strokeStyle = this.color;
        g.fillStyle = this.color;
        g.strokeRect(x, y, w, h);

        const centered = (text, size) => {
            g.font = size + 'px monospace';
            let s = g.measureText(text).width;
            g.fillText(text, x + w / 2 - s / 2, y + h / 2 + size / 4);
          }

        centered(this.text, "13");

        g.font = '13px monospace';

        g.fillText(this.leftTopText, x+ 3, y+ 13);

        g.fillText(this.leftBottomText, x+ 3, y+ h - 3);
    }

}

ExtraElement.LANTHENODES = new ExtraElement("Lanthanoide", "57 - 71", "", ElementType.LANTHANOIDE.getColor());
ExtraElement.ACTINOIDE = new ExtraElement("Actinoide", "89 - 103", "", ElementType.ACTINOIDE.getColor());