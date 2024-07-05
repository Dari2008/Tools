class PositionalElement{
    constructor(element, x, y, w = CanvasRenderer.WIDTH, h = CanvasRenderer.HEIGHT, rotation = 0, uid=0){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.e = element;
        this.config = new ElementConfig(element.getOpenConnections(), element.getClosedConnections());
        this.rotation = rotation;
        this.uid = uid;
        if(uid == null)uid = 0;
        if(uid == undefined)uid = 0;
        while(this.uid in PositionalElement.UIDS){
            this.uid = Math.floor(Math.random()*10000);
        }

        PositionalElement.UIDS.push(this.uid);

    }

    getElement(){
        return this.e;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
    
    getRotation(){
        return this.rotation;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }

    setWidth(w){
        this.w = w;
    }

    setHeight(h){
        this.h = h;
    }

    setRotation(r){
        this.rotation = r;
    }

    getConfig(){
        return this.config;
    }

    getUID(){
        return this.uid;
    }
    
    connect(connection){
        this.config.connect(connection);
    }

    disconnect(e){
        this.config.disconnect(e);
    }

    render(c, g, offsetX = CanvasRenderer.OFFSETX, offsetY = CanvasRenderer.OFFSETY, xMultiplyer = CanvasRenderer.X_MULTIPLYER, yMultiplyer = CanvasRenderer.Y_MULTIPLYER){
        var result = this.e.render(c, g, this.x*xMultiplyer, this.y*yMultiplyer, this.w, this.h, false, this.config, this.rotation, offsetX, offsetY);
        if(result !== undefined && result != null){
            this.connectionPoints = result;
        }
    }

    getConnectionPoints(){
        return this.connectionPoints;
    }

}

PositionalElement.UIDS = [0];