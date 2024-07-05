class ElementCanvas {
    constructor(element, w, h, set, id, c = null) {
        this.element = element;
        this.set = set;
        if(c === null){
            c = document.createElement("canvas");
            c.draggable = true;
            c.style.cursor = "move";
            c.classList.add("item");
            c.width = w;
            c.height = h;
            c.id = id;
            c.title = element.getHoverString();
            var g = c.getContext("2d");
            element.render(c, g, 0, 0, w, h);
            c.ondragstart = this.dragstart.bind(this);
            if(CanvasRenderer.ISIPADMODE){
                c.ontouchstart = this.dragstart.bind(this);
                c.ontouchmove = function(e){

                    // if(e.wasSend !== undefined && e.wasSend !== null && e.wasSend)return;


                    // var newEvent = new Event('touchmove', {isTrusted: true});
                
                    // // Füge alle wichtigen Daten von e zum neuen Event hinzu
                    // for (var key in e) {
                    //     if(key === "isTrusted")continue;
                    //     if (e.hasOwnProperty(key)) {
                    //         newEvent[key] = e[key];
                    //     }
                    // }
    
                    // // Setze wasSend auf true im neuen Event
                    // newEvent.wasSend = true;

                    // c.dispatchEvent(newEvent);
                    // e.preventDefault();

                    if(ElementsSearchBarhandler.currentDragged !== null && ElementsSearchBarhandler.currentDragged !== undefined){
                        
                        if(e.changedTouches.length >= 1){
                            if(e.changedTouches[0].pageX > parseInt($("#elementMenu").width())){
                                document.getElementById("draggedElement").style.top = e.changedTouches[0].pageY + "px";
                                document.getElementById("draggedElement").style.left = e.changedTouches[0].pageX + "px";

                                if(!ElementsSearchBarhandler.WASSET){
                                    ElementsSearchBarhandler.WASSET = true;
                                    document.getElementById("draggedElementImg").src = (document.getElementById(ElementsSearchBarhandler.currentDragged.getName()).toDataURL("image/png"));
                                }

                                document.getElementById("draggedElement").style.display = "block";
                            }
                        }
                    }
                }
                c.ontouchend = function(e){
                    document.getElementById("draggedElement").style.display = "none";                
                    if(ElementsSearchBarhandler.currentDragged !== null && ElementsSearchBarhandler.currentDragged !== undefined){
                        if(e.changedTouches.length >= 1){
                            var result = ElementsSearchBarhandler.getRelativeCoordinates({"pageX":e.changedTouches[0].pageX, "pageY":e.changedTouches[0].pageY}, document.getElementById("content"));
                            console.log(result);
                            CanvasRenderer.addElement(ElementsSearchBarhandler.currentDragged, result.x, result.y);
                            CanvasRenderer.renderElements("content");
                            ElementsSearchBarhandler.currentDragged = null;
                        }
                        return;
                    }
                }
            }
        }
        this.c = c;
    }

    setOnDragStartListener(li){
        this.li = li;
    }

    dragstart() {
        if(this.li !== undefined && this.li !== null){
            this.li();
        }
        this.set(this.element);
    }

    getElement() {
        return this.element;
    }

    getComponent() {
        return this.c;
    }
}
