class CanvasRenderer {
    constructor() {
        if(CanvasRenderer.INSTANCE === undefined)CanvasRenderer.INSTANCE = this;
        this.elements = [];
    }

    static addElement(e, x, y, rotation=0, uid=0, mapToVals=true) {
        if(mapToVals){
            x = x - CanvasRenderer.OFFSETX;
            y = y - CanvasRenderer.OFFSETY;
        }
        let el = e.createPositionalElement(
            mapToVals?Math.floor(x/CanvasRenderer.X_MULTIPLYER):x, 
            mapToVals?Math.floor(y/CanvasRenderer.Y_MULTIPLYER):y,
            rotation,
            uid
        );

        CanvasRenderer.INSTANCE.elements.push(el);
    }

    static renderConnections(canvas, oX, oY){
        let all = CanvasRenderer.INSTANCE.elements;
        let g = canvas.getContext("2d");
        let connsDrawen = [];
        let usedIndices = {};
        let allreadyAdded = [];
        for(let a of all){
            let connections = a.getConfig().getConnections();
            for(let conn of connections){

                if(allreadyAdded.includes(conn.getE1().getUID() + ":" + conn.getE2().getUID())){
                    for(let i = 0; i < allreadyAdded.length; i++){
                        if(allreadyAdded[i] == conn.getE1().getUID() + ":" + conn.getE2().getUID()){
                            allreadyAdded.splice(i, 1);
                        }
                    }
                    continue;
                }

                allreadyAdded.push(conn.getE1().getUID() + ":" + conn.getE2().getUID());

                let other = null;
                if(conn.getE1() === a){
                    other = conn.getE2();
                }else{
                    other = conn.getE1();
                }

                if(!all.includes(other)){
                    a.disconnect(other);
                    return;
                }

                if(a === null || a === undefined || other === null || other === undefined)continue;

                let x1 = a.getX(),y1 = a.getY();
                let x2 = other.getX(), y2 = other.getY();
                if(usedIndices[a.getUID()] === undefined || usedIndices[a.getUID()] === null){
                    usedIndices[a.getUID()] = [];
                }
                
                if(usedIndices[other.getUID()] === undefined || usedIndices[other.getUID()] === null){
                    usedIndices[other.getUID()] = [];
                }
                let aIndice = null;
                let otherIndice = null;

                let sortedAIndices = [];
                let sortedOtherIndices =  [];


                x1 = x1 * CanvasRenderer.X_MULTIPLYER;
                x2 = x2 * CanvasRenderer.X_MULTIPLYER;
                y1 = y1 * CanvasRenderer.Y_MULTIPLYER;
                y2 = y2 * CanvasRenderer.Y_MULTIPLYER;

                for(let indice of a.getConnectionPoints()){
                    if(usedIndices[a.getUID()].includes(indice)){
                        continue;
                    }
                    sortedAIndices.push({
                        "x": x1 + CanvasRenderer.XVARS[CanvasRenderer.ROTATIONVALS[a.getRotation()][indice]],
                        "y": y1 + CanvasRenderer.YVARS[CanvasRenderer.ROTATIONVALS[a.getRotation()][indice]],
                        "indice": indice
                    });
                }

                for(let indice of other.getConnectionPoints()){
                    if(usedIndices[other.getUID()].includes(indice)){
                        continue;
                    }
                    sortedOtherIndices.push({
                        "x": x2 + CanvasRenderer.XVARS[CanvasRenderer.ROTATIONVALS[other.getRotation()][indice]],
                        "y": y2 + CanvasRenderer.YVARS[CanvasRenderer.ROTATIONVALS[other.getRotation()][indice]],
                        "indice": indice
                    });
                }


                let shortest = this.findShortestLine(sortedAIndices, sortedOtherIndices);


                if(shortest === null){
                    continue;
                }


                for(let s of shortest){
                    let indiceA = s.p1.indice;
                    let indiceOthers = s.p2.indice;


                    aIndice = indiceA;
                    usedIndices[a.getUID()].push(indiceA);
                    
                    otherIndice = indiceOthers;
                    usedIndices[other.getUID()].push(indiceOthers);
                    break;
                }

                
                // if(indice in usedIndices[a.getUID()]){
                //     continue;
                // }
                // if(indice in usedIndices[other.getUID()]){
                //     continue;
                // }
                // aIndice = indice;
                // usedIndices[a.getUID()].push(indice);
                
                // otherIndice = indice;
                // usedIndices[other.getUID()].push(indice);


                x1 += CanvasRenderer.XVARS[CanvasRenderer.ROTATIONVALS[a.getRotation()][aIndice]];
                y1 += CanvasRenderer.YVARS[CanvasRenderer.ROTATIONVALS[a.getRotation()][aIndice]];
                
                x2 += CanvasRenderer.XVARS[CanvasRenderer.ROTATIONVALS[other.getRotation()][otherIndice]];
                y2 += CanvasRenderer.YVARS[CanvasRenderer.ROTATIONVALS[other.getRotation()][otherIndice]];

                g.fillStyle = "rgb(130, 130, 130)";
                g.strokeStyle = "rgb(130, 130, 130)";
                g.lineWidth = CanvasRenderer.CONNECTION_POINT_DIAMETER * 0.7;
                g.beginPath();
                g.moveTo(oX + x1, oY + y1);
                g.lineTo(oX + x2, oY + y2);
                g.stroke();


            }
            connsDrawen.push(a.getUID());
        }
    }

    static findShortestLine(points1, points2) {
        if (points1.length === 0 || points2.length === 0) {
            return [];
        }
    
        let distances = [];
    
        for (let i = 0; i < points1.length; i++) {
            for (let j = 0; j < points2.length; j++) {
                const distance = this.calculateDistance(points1[i], points2[j]);
    
                distances.push({
                    "p1": points1[i],
                    "p2": points2[j],
                    "distance": distance
                });
            }
        }
    
        distances.sort((a, b) => a.distance - b.distance);
    
        let shortestLines = [];
        let usedPoints1 = new Set();
        let usedPoints2 = new Set();
    
        for (const distance of distances) {
            if (!usedPoints1.has(distance.p1) && !usedPoints2.has(distance.p2)) {
                shortestLines.push(distance);
                usedPoints1.add(distance.p1);
                usedPoints2.add(distance.p2);
            }
        }
    
        return shortestLines;
    }
    

    static calculateDistance(point1, point2) {
        const deltaX = point1.x - point2.x;
        const deltaY = point1.y - point2.y;
    
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    static renderElementsForFoto(canvas, offsetX = CanvasRenderer.OFFSETX, offsetY = CanvasRenderer.OFFSETY, color){
        let all = CanvasRenderer.INSTANCE.elements;
        var g = canvas.getContext("2d");
        g.fillStyle = color;
        g.fillRect(0, 0, canvas.width, canvas.height);
        for(let a of all){
            a.render(canvas, g, offsetX, offsetY);
        }
        CanvasRenderer.renderConnections(canvas, offsetX, offsetY);
    }

    static renderElements(idOfCanvas, offsetX = CanvasRenderer.OFFSETX, offsetY = CanvasRenderer.OFFSETY){
        let all = CanvasRenderer.INSTANCE.elements;
        var canvas = document.getElementById(idOfCanvas);
        var g = canvas.getContext("2d");
        g.clearRect(0, 0, canvas.width, canvas.height);
        for(let a of all){
            a.render(canvas, g, offsetX, offsetY);
        }
        CanvasRenderer.renderConnections(canvas, offsetX, offsetY);
    }

    static remove(x, y){
        let all = CanvasRenderer.INSTANCE.elements;
        for(let i = 0; i < all.length; i++){
            if(x == all[i].getX() && y == all[i].getY()){
                for(let c of all[i].getConfig().getConnections()){
                    let other = null;
                    if(c.getE1() == all[i]){
                        other = c.getE2();
                    }else{
                        other = c.getE1();
                    }
                    other.disconnect(all[i]);
                }
                CanvasRenderer.INSTANCE.elements.splice(i, 1);
            }
        }
    }

    static contains(x, y){
        let all = CanvasRenderer.INSTANCE.elements;
        for(let a of all){
           if(x == a.getX() && y == a.getY())return true;
        }
        return false;
    }

    static get(x, y){
        let all = CanvasRenderer.INSTANCE.elements;
        for(let a of all){
           if(x == a.getX() && y == a.getY())return a;
        }
        return null;
    }

    static move(element, x, y){
        if(element === undefined || element === null)return;
        if(this.get(x, y) === undefined || this.get(x, y) === null){
            element.setX(x);
            element.setY(y);
        }
    }

    static toString(){
        var result = {"offsetX": CanvasRenderer.OFFSETX, "offsetY": CanvasRenderer.OFFSETY};

        let all = CanvasRenderer.INSTANCE.elements;
        result["elements"] = [];
        for(let a of all){
            result["elements"].push({"uid":a.getUID(), "x": a.getX(), "y": a.getY(), "element":a.getElement().getOrderNumber(), "rotation": a.getRotation()});
        }

        var conns = [];

        let allreadyAdded = [];

        for(let a of all){
            for(let conn of a.getConfig().getConnections()){
                if(allreadyAdded.includes(conn.getE1().getUID() + ":" + conn.getE2().getUID())){
                    for(let i = 0; i < allreadyAdded.length; i++){
                        if(allreadyAdded[i] == conn.getE1().getUID() + ":" + conn.getE2().getUID()){
                            allreadyAdded.splice(i, 1);
                        }
                    }
                    continue;
                }
                conns.push({"e1": conn.getE1().getUID(), "e2": conn.getE2().getUID()});
                allreadyAdded.push(conn.getE1().getUID() + ":" + conn.getE2().getUID());
            }
        }

        result["connections"] = conns;

        return JSON.stringify(result);
    }

    static loadFromString(string){
        var json = JSON.parse(string);
        CanvasRenderer.OFFSETX = parseInt(json["offsetX"]);
        CanvasRenderer.OFFSETY = parseInt(json["offsetY"]);
        var elements = json["elements"];
        var conns = json["connections"];
        CanvasRenderer.INSTANCE.elements = [];
        for(let e of elements){
            this.addElement(Elements.getElementByOrdernumber(e["element"]), parseInt(e["x"]), parseInt(e["y"]), parseInt(e["rotation"]), parseInt(e["uid"]), false);
        }



        for(let conn of conns){
            let e1 = CanvasRenderer.getOfUID(parseInt(conn["e1"]));
            let e2 = CanvasRenderer.getOfUID(parseInt(conn["e2"]));

            if(e1 === undefined || e1 === null || e2 === undefined || e2 === null)continue;
            e1.connect(new Connection(e1, e2));
            e2.connect(new Connection(e1, e2));
        }
        CanvasRenderer.renderElements("content");
    }

    static getOfUID(uid){
        let all = CanvasRenderer.INSTANCE.elements;
        for(let a of all){
            if(a.getUID() === uid){
                return a;
            }
        }
        return null;
    }

    static moveMap(offsetX, offsetY){
        CanvasRenderer.OFFSETX += offsetX;
        CanvasRenderer.OFFSETY += offsetY;
    }

}

new CanvasRenderer();

CanvasRenderer.ISIPADMODE = "ontouchmove" in document;

CanvasRenderer.OFFSETX = 0;
CanvasRenderer.OFFSETY = 0;

CanvasRenderer.WIDTH = 60;
CanvasRenderer.HEIGHT = 60;
CanvasRenderer.SPACE_X = 40;
CanvasRenderer.SPACE_Y = 40;

CanvasRenderer.X_MULTIPLYER = CanvasRenderer.WIDTH + CanvasRenderer.SPACE_X;
CanvasRenderer.Y_MULTIPLYER = CanvasRenderer.HEIGHT + CanvasRenderer.SPACE_Y;

CanvasRenderer.CONNECTION_POINT_DIAMETER = 3;
CanvasRenderer.CONNECTION_POINT_SPACE = Math.floor((((CanvasRenderer.WIDTH + CanvasRenderer.HEIGHT)/2) - (CanvasRenderer.CONNECTION_POINT_DIAMETER/2))/2);


CanvasRenderer.XVARS = [];
CanvasRenderer.YVARS = [];
// Oben
CanvasRenderer.XVARS[0] = CanvasRenderer.CONNECTION_POINT_SPACE;
CanvasRenderer.YVARS[0] = 0;

// Rechts
CanvasRenderer.XVARS[1] = CanvasRenderer.WIDTH;
CanvasRenderer.YVARS[1] = CanvasRenderer.CONNECTION_POINT_SPACE;

// Unten
CanvasRenderer.XVARS[2] = CanvasRenderer.CONNECTION_POINT_SPACE;
CanvasRenderer.YVARS[2] = CanvasRenderer.HEIGHT;

// Links
CanvasRenderer.XVARS[3] = 0;
CanvasRenderer.YVARS[3] = CanvasRenderer.CONNECTION_POINT_SPACE;

CanvasRenderer.ROTATIONVALS = {0: [0,1,2,3], 1: [1,2,3,0], 2: [2,3,0,1], 3: [3,0,1,2]};