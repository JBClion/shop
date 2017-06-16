module.exports = function(app, catalog) {
        
    app.get('/catalog', (req, res) => {
        res.send(catalog.getItems());
    });
    
};