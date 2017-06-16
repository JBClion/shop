class Cart {

	constructor() {
		this.items = new Object();
	}
    
	add(item, price) {    
		if(item in this.items){ 
			this.items[item] += 1; 
		}else{
			this.items[item] = 1;
		}
	}
    
	delete(item) {
		if(item in this.items && this.items[item] > 0){  
			this.items[item] -= 1; 
		}
	}
    
	clear(){
		this.items = new Object(); 
	}

	getQuantity(item){
		return this.items[item];
	}
    
	getItems(){
		return this.items;
	}
}

module.exports = Cart;