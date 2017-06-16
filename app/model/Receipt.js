class Receipt {
    
    constructor() {    
        this.items = [];
        this.subtotal = 0.00;
        this.vat = 0.00;
        this.total = 0.00;
    }
    
   update(catalog, cart) {
        var items = cart.items;
       
        for (var item in cart.items) {
            if( items.hasOwnProperty(item) ) {
                this.generateLines(item, catalog.getPrice(item), items[item]);
            }
        }
            
        this.generateTotals();
            
        return this;
    }
    
    generateLines(item, price, quantity){
        this.generateItem(item, price, quantity);
        this.generateSales(item, price, quantity);
    }

    generateTotals(){
        this.vat = this.subtotal * 0.076;
        this.total = this.subtotal + this.vat;
    }
    
    generateItem(item, price, quantity) {
        if(quantity > 0){
            var value = price*quantity;
            this.subtotal += value; 
            this.items.push({ 'quantity': quantity, 'item': item, 'price': price, 'total': value});
        }
    }
    
    generateSales(item, price, quantity) {
        var sale = this.getSales(item, quantity);
        
        if(sale < 0){
            var value = price*sale;
            this.subtotal += value;
            this.items.push({ 'quantity': sale, 'item': item + " sales(3 for 2)", 'price': price, 'total': value});
        }
    }
     
    getSales(item, quantity) {
        var toReturn = 0;
                
        switch(item) {
            case 'papaya' : toReturn = -(Math.floor(quantity/3));break;    
        }
                
        return toReturn;
    }
    
}

module.exports = Receipt;