class LayerElement{

    constructor(value){
        this.value = value;
    }
    
    getValue(){
        return this.value;
    }

    getTitle(){
        return this.title;
    }

    getHoverString(){
        return this.value + ". Schale";
    }
    
    render(c, g, x, y, w, h){
        g.strokeStyle = "rgb(255, 255, 255)";
        g.fillStyle = "rgb(255, 255, 255)";
        g.strokeRect(x, y, w, h);
    
        const centered = (text, size) => {
            g.font = size + 'px monospace';
            let s = g.measureText(text).width;
            g.fillText(text, x + (w / 2) - s / 2, y + (h / 2) + size / 4);
          }
    
          centered(this.value + ".", "13");
    }
}

LayerElement.LAYER1 = new LayerElement(1);
LayerElement.LAYER2 = new LayerElement(2);
LayerElement.LAYER3 = new LayerElement(3);
LayerElement.LAYER4 = new LayerElement(4);
LayerElement.LAYER5 = new LayerElement(5);
LayerElement.LAYER6 = new LayerElement(6);
LayerElement.LAYER7 = new LayerElement(7);