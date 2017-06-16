class Catalog {
    
    constructor() {
        this.items = new Object();
        
        this.items['apple']  = 0.25;
        this.items['orange'] = 0.30;
        this.items['banana'] = 0.15;
        this.items['papaya'] = 0.50;
    }
    
    hasItem(item) {    
        return item in this.items;
    }
    
    getPrice(item) {
        return this.items[item];
    }
    
    getItems(){
        return this.items;
    }
}

module.exports = Catalog;