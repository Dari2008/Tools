class ElementConfig{

    constructor(countOfOpenConnections, countOfClosedConnections = 0){
        this.countOfOpenConnections = countOfOpenConnections;
        this.countOfClosedConnections = countOfClosedConnections;
        this.conns = [];

        if(this.countOfOpenConnections <= 0){
            this.isFulls = true;
        }else{
            this.isFulls = false;
        }

    }

    isFull(){
        return this.isFulls;
    }

    getOpenConnections(){
        return countOfOpenConnections;
    }

    connect(otherElement){
        if(this.conns.length >= this.countOfOpenConnections){
            return;
        }

        this.conns.push(otherElement);

        if(this.conns.length >= this.countOfOpenConnections){
            this.isFulls = true;
            return;
        }
    }

    disconnect(c){
        for(let i = 0; i < this.conns.length; i++){
            if(this.conns[i].getE1() === c || this.conns[i].getE2() === c){
                this.conns.splice(i, 1);
            }
        }
        
        if(this.conns.length >= this.countOfOpenConnections){
            this.isFulls = true;
        }else{
            this.isFulls = false;
        }
    }

    getClosedConnectionCount(){
        return this.countOfClosedConnections;
    }

    getStillOpenConnections(){
        return this.countOfOpenConnections - this.conns.length;
    }

    getConnections(){
        return this.conns;
    }

}

ElementConfig.EMPTY_CONFIG = new ElementConfig(0, 0);