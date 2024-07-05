class EditorMoveManager{

    constructor(){
        EditorMoveManager.INSTANCE = this;
        this.isOverNonPlacable = false;
    }

    static init(name){
        EditorMoveManager.INSTANCE.init(name);
    }

    init(name){
        this.mainContent = document.getElementById(name);
        this.mainContent.draggable = true;
        this.mainContent.ondragstart = function(e){
            let pos = ElementsSearchBarhandler.getRelativeCoordinates(e, EditorMoveManager.INSTANCE.mainContent);
            EditorMoveManager.lastX = pos.x;
            EditorMoveManager.lastY = pos.y;
            pos.x = pos.x - CanvasRenderer.OFFSETX;
            pos.y = pos.y - CanvasRenderer.OFFSETY;
            EditorMoveManager.INSTANCE.dragstart(e, pos.x, pos.y);
        };
        
        ElementsSearchBarhandler.ONDROP = function(e){
            if(!EditorMoveManager.INSTANCE.dragStarted && EditorMoveManager.INSTANCE.draggedElement !== undefined && EditorMoveManager.INSTANCE.draggedElement !== null)return;
            
            let pos = ElementsSearchBarhandler.getRelativeCoordinates(e, EditorMoveManager.INSTANCE.mainContent);
            pos.x = pos.x - CanvasRenderer.OFFSETX;
            pos.y = pos.y - CanvasRenderer.OFFSETY;
            EditorMoveManager.INSTANCE.drop(pos.x, pos.y);
        };

        ElementsSearchBarhandler.ONDRAGOVER = function(e){
            let pos = ElementsSearchBarhandler.getRelativeCoordinates(e, EditorMoveManager.INSTANCE.mainContent);
            if((EditorMoveManager.INSTANCE.draggedElement === undefined || EditorMoveManager.INSTANCE.draggedElement === null)){
                if(EditorMoveManager.lastX === pos.x && EditorMoveManager.lastY === pos.y)return;
                CanvasRenderer.moveMap(pos.x - EditorMoveManager.lastX, pos.y - EditorMoveManager.lastY);
                EditorMoveManager.lastX = pos.x;
                EditorMoveManager.lastY = pos.y;
                CanvasRenderer.renderElements("content");
                return;
            }
        };


        ElementsSearchBarhandler.ONTOUCHSTART = function(e){
            if(e.changedTouches.length == 1){
                let pos = ElementsSearchBarhandler.getRelativeCoordinates({"pageX":e.changedTouches[0].pageX, "pageY":e.changedTouches[0].pageY}, EditorMoveManager.INSTANCE.mainContent);
                pos.x -= CanvasRenderer.OFFSETX;
                pos.y -= CanvasRenderer.OFFSETY;
                let was = EditorMoveManager.INSTANCE.dragstart(e, pos.x, pos.y);
                if(!was){
                    EditorMoveManager.INSTANCE.dragOnlyMap(e);
                }
            }else{
                EditorMoveManager.INSTANCE.dragOnlyMap(e);
            }
        }

        ElementsSearchBarhandler.ONTOUCHMOVE = function(e){
            if(e.changedTouches.length == 1){
                if(EditorMoveManager.INSTANCE.draggedElement !== null &&
                    EditorMoveManager.INSTANCE.draggedElement !== undefined &&
                    EditorMoveManager.INSTANCE.dragStarted){
                        var result = ElementsSearchBarhandler.getRelativeCoordinates({"pageX":e.changedTouches[0].pageX, "pageY":e.changedTouches[0].pageY}, EditorMoveManager.INSTANCE.mainContent);
                        result.x -= CanvasRenderer.OFFSETX;
                        result.y -= CanvasRenderer.OFFSETY;
                        if(!CanvasRenderer.contains(Math.floor((result.x - CanvasRenderer.OFFSETX)/CanvasRenderer.X_MULTIPLYER), 
                                Math.floor((result.y - CanvasRenderer.OFFSETY)/CanvasRenderer.Y_MULTIPLYER))){
                            CanvasRenderer.move(
                                EditorMoveManager.INSTANCE.draggedElement, 
                                Math.floor(result.x/CanvasRenderer.X_MULTIPLYER), 
                                Math.floor(result.y/CanvasRenderer.Y_MULTIPLYER)
                            );
                            CanvasRenderer.renderElements("content");
                        }
                    }else{
                        EditorMoveManager.INSTANCE.dragOnlyMap(e);
                    }
            }else{
                EditorMoveManager.INSTANCE.dragOnlyMap(e);
            }
        }

        ElementsSearchBarhandler.ONTOUCHEND = function(e){
            EditorMoveManager.INSTANCE.lastX = null;
            EditorMoveManager.INSTANCE.lastY = null;
            EditorMoveManager.INSTANCE.draggedElement = null;
            EditorMoveManager.INSTANCE.dragStarted = false;
        }

        ElementsSearchBarhandler.ONTOUCHCANCEL = function(e){
            EditorMoveManager.INSTANCE.draggedElement = null;
            EditorMoveManager.INSTANCE.dragStarted = false;
            EditorMoveManager.INSTANCE.lastX = null;
            EditorMoveManager.INSTANCE.lastY = null;
        }

    }

    dragOnlyMap(e){
        let x = 0;
        let y = 0;
        let count = 0;

        for(let touch of e.changedTouches){
            let pos = ElementsSearchBarhandler.getRelativeCoordinates({"pageX":touch.pageX, "pageY":touch.pageY}, EditorMoveManager.INSTANCE.mainContent);
            x += pos.x;
            y += pos.y;
            count++;
        }

        if(count <= 0)count = 1;

        x = x / count;
        y = y / count;


        if(EditorMoveManager.INSTANCE.lastX !== undefined && EditorMoveManager.INSTANCE.lastX !== null &&
            EditorMoveManager.INSTANCE.lastY !== undefined && EditorMoveManager.INSTANCE.lastY !== null){
            CanvasRenderer.moveMap(x - EditorMoveManager.INSTANCE.lastX, y - EditorMoveManager.INSTANCE.lastY);
            CanvasRenderer.renderElements("content");
        }

        EditorMoveManager.INSTANCE.lastX = x;
        EditorMoveManager.INSTANCE.lastY = y;
    }

    drop(x, y){
        if(CanvasRenderer.contains(Math.floor(x/CanvasRenderer.X_MULTIPLYER), Math.floor(y/CanvasRenderer.Y_MULTIPLYER)))return;
        CanvasRenderer.move(
            EditorMoveManager.INSTANCE.draggedElement, 
            Math.floor(x/CanvasRenderer.X_MULTIPLYER), 
            Math.floor(y/CanvasRenderer.Y_MULTIPLYER)
        );
        CanvasRenderer.renderElements("content");
        EditorMoveManager.INSTANCE.draggedElement = null;
        EditorMoveManager.INSTANCE.dragStarted = false;
    }


    dragstart(e, x, y){
        let element = CanvasRenderer.get(
            Math.floor(x/CanvasRenderer.X_MULTIPLYER), 
            Math.floor(y/CanvasRenderer.Y_MULTIPLYER)
        );

        if(element === undefined || element === null){
            if(e !== null && e !== undefined && e.dataTransfer !== undefined && e.dataTransfer !== null){
                e.dataTransfer.setDragImage(document.createElement("img"), 0, 0);
            }
            return false;
        }

        EditorMoveManager.INSTANCE.draggedElement = element;
        if(e !== null && e !== undefined && e.dataTransfer !== undefined && e.dataTransfer !== null){
            e.dataTransfer.setDragImage(
                document.getElementById(element.getElement().getName()), 
                document.getElementById(element.getElement().getName()).width/2, 
                document.getElementById(element.getElement().getName()).height/2
            );
        }
        EditorMoveManager.INSTANCE.dragStarted = true;
    }

}

new EditorMoveManager();