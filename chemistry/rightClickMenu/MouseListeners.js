class MouseListeners{

    constructor(){
        
    }

    static init(name, m, ipadMenuName){
        MouseListeners.INSTANCE.init(name, m, ipadMenuName);
    }

    init(name, m, ipadMenuName){
        MouseListeners.INSTANCE.mainContent = document.getElementById(name);
        MouseListeners.INSTANCE.menu = document.getElementById(m);
        MouseListeners.INSTANCE.iPadMenu = document.getElementById(ipadMenuName);
        MouseListeners.INSTANCE.menu.style.display = "none";
        MouseListeners.INSTANCE.iPadMenu.style.display = "none";
        MouseListeners.INSTANCE.mainContent.addEventListener("contextmenu", function(e){
            e.preventDefault();
            if(CanvasRenderer.ISIPADMODE){
                MouseListeners.INSTANCE.click(e);
            }else{
                MouseListeners.INSTANCE.menu.style.display = "block";
                MouseListeners.INSTANCE.menu.style.left = e.x + "px";
                MouseListeners.INSTANCE.menu.style.top = e.y + "px";
                var r = ElementsSearchBarhandler.getRelativeCoordinates(e, MouseListeners.INSTANCE.mainContent);
                r.x = r.x - CanvasRenderer.OFFSETX;
                r.y = r.y - CanvasRenderer.OFFSETY;
                ButtonManager.INSTANCE.update(
                    Math.floor(r.x/CanvasRenderer.X_MULTIPLYER), 
                    Math.floor(r.y/CanvasRenderer.Y_MULTIPLYER)
                );
            }

        });
        // console.log(CanvasRenderer.ISIPADMODE);
        
        if(CanvasRenderer.ISIPADMODE){
            MouseListeners.INSTANCE.mainContent.addEventListener("click", MouseListeners.INSTANCE.click);
            document.getElementById("ipadOverlay").addEventListener("actiondone", function(e){
                ButtonManager.INSTANCE.clearCurrentDrag();
            });
        }

        MouseListeners.INSTANCE.mainContent.addEventListener("mouseup", function(e){
            if(e.button == 0){
                ButtonManager.INSTANCE.closeMenu();
            }
        });
    }

    click(e){
        var r = ElementsSearchBarhandler.getRelativeCoordinates(e, MouseListeners.INSTANCE.mainContent);
        r.x = r.x - CanvasRenderer.OFFSETX;
        r.y = r.y - CanvasRenderer.OFFSETY;
        let elementThere = CanvasRenderer.get(Math.floor(r.x/CanvasRenderer.X_MULTIPLYER), Math.floor(r.y/CanvasRenderer.Y_MULTIPLYER));

        let offsetXOfPanel = -(130-CanvasRenderer.WIDTH)/2;
        let offsetYOfPanel = -(130-CanvasRenderer.HEIGHT)/2;

        if(elementThere !== null && elementThere !== undefined){
            let offsets = ElementsSearchBarhandler.getOffsets(MouseListeners.INSTANCE.mainContent);

            MouseListeners.INSTANCE.iPadMenu.style.left = ((offsetXOfPanel + offsets.x + 13 + elementThere.getX()*CanvasRenderer.X_MULTIPLYER) + CanvasRenderer.OFFSETX) + "px";
            MouseListeners.INSTANCE.iPadMenu.style.top = ((offsetYOfPanel + offsets.y + 13 + elementThere.getY()*CanvasRenderer.Y_MULTIPLYER) + CanvasRenderer.OFFSETY ) + "px";
            ButtonManager.INSTANCE.update(
                Math.floor(r.x/CanvasRenderer.X_MULTIPLYER), 
                Math.floor(r.y/CanvasRenderer.Y_MULTIPLYER)
            );
            MouseListeners.INSTANCE.iPadMenu.style.display = "block";
            ButtonManager.INSTANCE.connect();
        }else{
            ButtonManager.INSTANCE.clearCurrentDrag();
        }
    }

}

MouseListeners.INSTANCE = new MouseListeners();