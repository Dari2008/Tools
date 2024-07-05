class ElementsSearchBarhandler{



    static drawAll(canvasname){
        var id = setInterval(function(){
            document.getElementById(canvasname).width = $("#" + canvasname).width();
            document.getElementById(canvasname).height = $("#" + canvasname).height();
            if(document.getElementById(canvasname).width != 0 && document.getElementById(canvasname).height != 0){
                clearInterval(id);
            }
        }, 100);
        var table = this.setTableRows(canvasname, "");
        this.addMouseListeners(table);
        this.initGeneralCanvas("content");
    }

    static setTableRows(canvasname, search = "", searchType="N"){
        let c = document.getElementById(canvasname);

        let all = Object.values(Elements);
        let table = document.getElementById("elementListTable");
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        table.draggable = "false";
        let currentRow = table.insertRow(0);
        let i = 0;
        let ii = 0;
        let disabled = [];
        search = search.toLowerCase();


        for(let a of all){
            switch(searchType){
                default:
                case "N":
                    if (!a.getFullName().toLowerCase().includes(search) && !a.getName().toLowerCase().includes(search)) {
                        disabled.push(a);
                        continue;
                    }
                    break;
                case "O":
                    if (!(a.getOrderNumber() + "").toLowerCase().includes(search)) {
                        disabled.push(a);
                        continue;
                    }
                    break;
                case "T":
                    let selected = null;
                    if(document.getElementById("typeSearch").value !== ""){
                        let all = Object.values(ElementType);
                        for(let a of all){
                            if(a.getName() === document.getElementById("typeSearch").value){
                                selected = a;
                                break;
                            }
                        }
                        if (!(a.getElementType().getName() + "").toLowerCase().includes(selected.getName().toLowerCase())) {
                            disabled.push(a);
                            continue;
                        }
                    }
                    break;
                case "G":
                    if (!(a.getWeight() + "").toLowerCase().includes(search)) {
                        disabled.push(a);
                        continue;
                    }
                    break;
                case "E":
                    if (!(a.getElectons() + "").toLowerCase().includes(search)) {
                        disabled.push(a);
                        continue;
                    }
                    break;
                case "P":
                    if (!(a.getProtons() + "").toLowerCase().includes(search)) {
                        disabled.push(a);
                        continue;
                    }
                    break;
                case "Ne":
                    if (!(a.getNeutrons() + "").toLowerCase().includes(search)) {
                        disabled.push(a);
                        continue;
                    }
                    break;
            }
            var cc = currentRow.insertCell(i);
            var rr = this.createCanvasForElement(a, 100, 100);
            cc.appendChild(rr);
            i++;
            if(i >= 2){
                ii++;
                currentRow = table.insertRow(ii);
                i = 0;
            }
            
        }

        for(let a of disabled){
            var cc = currentRow.insertCell(i);
            var rr = this.createCanvasForElement(a, 100, 100);
            cc.appendChild(rr);
            rr.setAttribute("disabled", "");
            i++;
            if(i >= 2){
                ii++;
                currentRow = table.insertRow(ii);
                i = 0;
            }
            
        }
        return table;
    }

    static initGeneralCanvas(name){
        var all = document.getElementById(name);

        if(CanvasRenderer.ISIPADMODE){
            all.ontouchstart = function(e){
                if(ElementsSearchBarhandler.ONTOUCHSTART !== undefined && ElementsSearchBarhandler.ONTOUCHSTART !== null){
                    ElementsSearchBarhandler.ONTOUCHSTART(e);
                }
            }

            all.ontouchmove = function(e){
                MouseListeners.INSTANCE.iPadMenu.style.display = "none";
                // console.log(e);
                if(ElementsSearchBarhandler.currentDragged !== null && ElementsSearchBarhandler.currentDragged !== undefined){
                    return;
                }
                if(ElementsSearchBarhandler.ONTOUCHMOVE !== undefined && ElementsSearchBarhandler.ONTOUCHMOVE !== null){
                    ElementsSearchBarhandler.ONTOUCHMOVE(e);
                }
            }

            all.ontouchend = function(e){
                ElementsSearchBarhandler.WASSET = false;
                if(ElementsSearchBarhandler.currentDragged !== null && ElementsSearchBarhandler.currentDragged !== undefined){
                    return;
                }
                if(ElementsSearchBarhandler.ONTOUCHEND !== undefined && ElementsSearchBarhandler.ONTOUCHEND !== null){
                    ElementsSearchBarhandler.ONTOUCHEND(e);
                }
            }

            all.ontouchcancel = function(e){
                if(ElementsSearchBarhandler.currentDragged !== null && ElementsSearchBarhandler.currentDragged !== undefined){
                    return;
                }
                if(ElementsSearchBarhandler.ONTOUCHCANCEL !== undefined && ElementsSearchBarhandler.ONTOUCHCANCEL !== null){
                    ElementsSearchBarhandler.ONTOUCHCANCEL(e);
                }
            }
        }

        all.onwheel = function(e){
            let s = -e.deltaY;
            if(e.shiftKey){
                CanvasRenderer.moveMap(s, 0);
                CanvasRenderer.renderElements("content");
            }else{
                CanvasRenderer.moveMap(0, s);
                CanvasRenderer.renderElements("content");
            }
        }

        all.ondrop = function(e) {
            if(ElementsSearchBarhandler.currentDragged === null || ElementsSearchBarhandler.currentDragged === undefined){
                if(ElementsSearchBarhandler.ONDROP !== undefined && ElementsSearchBarhandler.ONDROP !== null){
                    ElementsSearchBarhandler.ONDROP(e);
                }
                return;
            }

            var result = ElementsSearchBarhandler.getRelativeCoordinates(e, document.getElementById(name));

            CanvasRenderer.addElement(ElementsSearchBarhandler.currentDragged, result.x, result.y);
            CanvasRenderer.renderElements("content");
            ElementsSearchBarhandler.currentDragged = null;
        }

        all.ondragover = function (e) {
            if(ElementsSearchBarhandler.currentDragged === null || ElementsSearchBarhandler.currentDragged === undefined){
                if(ElementsSearchBarhandler.ONDRAGOVER !== undefined && ElementsSearchBarhandler.ONDRAGOVER !== null){
                    ElementsSearchBarhandler.ONDRAGOVER(e);
                }
                e.preventDefault();
                return;
            }
            var result = ElementsSearchBarhandler.getRelativeCoordinates(e, document.getElementById(name));

            if(!CanvasRenderer.contains(Math.floor((result.x - CanvasRenderer.OFFSETX)/CanvasRenderer.X_MULTIPLYER), 
            Math.floor((result.y - CanvasRenderer.OFFSETY)/CanvasRenderer.Y_MULTIPLYER))){
                e.preventDefault();
                EditorMoveManager.INSTANCE.isOverNonPlacable = true;
            }else{
                EditorMoveManager.INSTANCE.isOverNonPlacable = false;
            }
        }
    }

    static getRelativeCoordinates(event, referenceElement) {
      
        const position = {
            x: event.pageX,
            y: event.pageY
        };
        
        const offset = {
            left: referenceElement.offsetLeft,
            top: referenceElement.offsetTop
        };
        
        let reference = referenceElement.offsetParent;
        
        while(reference){
            offset.left += reference.offsetLeft;
            offset.top += reference.offsetTop;
            reference = reference.offsetParent;
        }
        
        return { 
            x: position.x - offset.left,
            y: position.y - offset.top,
        }; 
      
      }
      

    static getOffsets(referenceElement) {
        const offset = {
            left: referenceElement.offsetLeft,
            top: referenceElement.offsetTop
        };
        
        let reference = referenceElement.offsetParent;
        
        while(reference){
            offset.left += reference.offsetLeft;
            offset.top += reference.offsetTop;
            reference = reference.offsetParent;
        }
        
        return { 
            x: offset.left,
            y: offset.top,
        }; 
      
      }

    static addMouseListeners(table){
        table.onmove = function(e){
            ElementsSearchBarhandler.X = e.x;
            ElementsSearchBarhandler.Y = e.y;
        }
    }

    static createCanvasForElement(a, w, h){
        var c = new ElementCanvas(a, w, h, this.setCurrentDragged, a.getName());
        return c.getComponent();
    }

    static setCurrentDragged(val){
        ElementsSearchBarhandler.currentDragged = val;
    }

}