const Receipt = require('../model/Receipt.js');

module.exports = function(app, catalog, cart) {
    
    app.get('/cart', (req, res) => { 
        res.send(cart.getItems()); 
    });
    
    app.get('/cart/reset', (req, res) => { 
        cart.clear();
        res.send(cart.getItems()); 
    });
    
    app.post('/cart/add', (req, res) => {
        var item = req.body.item;
                
        if(catalog.hasItem(item)){ cart.add(item); }
            
        res.send(JSON.stringify(cart.getQuantity(item))); 
    });
    
    app.post('/cart/del', (req, res) => { 
        var item = req.body.item;
        
        if(catalog.hasItem(item)){ cart.delete(item) }
        
        res.send(JSON.stringify(cart.getQuantity(item)));
    });
    
    app.get('/cart/checkout', (req, res) => {     
        res.send(new Receipt().update(catalog, cart));
    });

};