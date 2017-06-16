const catalogRoutes = require('./catalog_routes');
const cartRoutes = require('./cart_routes');
const Catalog = require('../model/Catalog.js');
const Cart = require('../model/Cart.js');

module.exports = function(app, db) {

	var catalog    = new Catalog();
	var cart       = new Cart(); 

	catalogRoutes(app, catalog);
	cartRoutes(app, catalog, cart);
	
};