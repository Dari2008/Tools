class TitleElement{

    constructor(title, text){
        this.title = title;
        this.text = text;
    }
    
    getText(){
        return this.text;
    }

    getTitle(){
        return this.title;
    }

    getHoverString(){
        return this.title + " " + this.text;
    }
    
    render(c, g, x, y, w, h){
        g.strokeStyle = "rgb(255, 255, 255)";
        g.fillStyle = "rgb(255, 255, 255)";
        g.strokeRect(x, y, w, h);
    
        const centered = (text, size, i) => {
            g.font = size + 'px monospace';
            let s = g.measureText(text).width;
            g.fillText(text, x + (w / 2) - s / 2, y + (h / 2/2 * i) + size / 4);
          }
    
          centered(this.title, "13", 1);
          centered(this.text, "13", 2);
    }
}

TitleElement.HAUPTGRUPPEN1 = new TitleElement("Hauptgruppe", "I");
TitleElement.HAUPTGRUPPEN2 = new TitleElement("Hauptgruppe", "II");
TitleElement.HAUPTGRUPPEN3 = new TitleElement("Hauptgruppe", "III");
TitleElement.HAUPTGRUPPEN4 = new TitleElement("Hauptgruppe", "IV");
TitleElement.HAUPTGRUPPEN5 = new TitleElement("Hauptgruppe", "V");
TitleElement.HAUPTGRUPPEN6 = new TitleElement("Hauptgruppe", "VI");
TitleElement.HAUPTGRUPPEN7 = new TitleElement("Hauptgruppe", "VII");
TitleElement.HAUPTGRUPPEN8 = new TitleElement("Hauptgruppe", "VIII");

TitleElement.NEBENGRUPPE1 = new TitleElement("Nebengruppe", "I");
TitleElement.NEBENGRUPPE2 = new TitleElement("Nebengruppe", "II");
TitleElement.NEBENGRUPPE3 = new TitleElement("Nebengruppe", "III");
TitleElement.NEBENGRUPPE4 = new TitleElement("Nebengruppe", "IV");
TitleElement.NEBENGRUPPE5 = new TitleElement("Nebengruppe", "V");
TitleElement.NEBENGRUPPE6 = new TitleElement("Nebengruppe", "VI");
TitleElement.NEBENGRUPPE7 = new TitleElement("Nebengruppe", "VII");
TitleElement.NEBENGRUPPE8 = new TitleElement("Nebengruppe", "VIII");