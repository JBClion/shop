$( document ).ready( function() { loadCatalog(); } );


/* ------ Manage Cart/Catalog ------- */

function loadCatalog(callback){
	$.ajax({
		url: '/catalog',
		success: function(data) { buildCatalog(data); },
		dataType: 'json'
	}).then(loadCart).then($("#cart").fadeIn("slow")); 
}


function buildCatalog(items){
	for (var item in items) { 
		addCatalogRow(item, items[item]); 
	};
}


/* ------ Manage Cart/Catalog ------- */

function loadCart(){
	$.ajax({
		url: '/cart',
		success: function(data) { buildCart(data); },
		dataType: 'json'
	});
}

function buildCart(items){    
	for (var item in items) { 
		$('#' + item + '_quantity').html(items[item]);
	};
}

function addCatalogRow(item, price){
    
	var row = '<tr>';
	row += '<td>' + item +'</td>';
	row += '<td>' + price.toFixed(2) +'$</td>';
	row += '<td class="quantity" id="' + item + '_quantity">' + 0 +'</td>';
	row += '<td><button onclick="del(\'' + item + '\')" class="btn btn-default">-</button> ';
	row += '<button onclick="add(\'' + item + '\')" class="btn btn-default">+</button></td>';
	row += '</tr>',

	$('#catalog > tbody:last-child').append(row);  

}

/* ------ Manage Cart Actions ------- */

function add(item){
	actionRequest("cart/add", item);
}

function del(item){
	actionRequest("cart/del", item);
}

function actionRequest(service, item){
	$.ajax({
		type: 'post',
		url: '/' + service,
		success: function(result) { $('#' + item + '_quantity').html(result) },
		data: {'item': item},
		dataType: 'json'
	});    
}

function resetCart(){    
	$.ajax({
		url: '/cart/reset',
		success: function(result) { $(".quantity").html("0"); },
		dataType: 'json'
	});
}

/* ------ Manage Checkout ------- */

function checkout(){
	$.ajax({
		url: '/cart/checkout',
		success: function(result) { buildReceipt(result); },
		dataType: 'json'
	});    
}

function back(){
	resetCart();
	$("#bill").slideUp("normal", function(){$("#cart").slideDown("normal", function(){ $('#receipt > tbody').html('') })});
}

function buildReceipt(receipt){
	var items = receipt['items'];

	for (var item in items) { addReceiptRow(items[item]); };

	$("#subtotal").html(receipt.subtotal.toFixed(2) + "$");
	$("#vat").html(receipt.vat.toFixed(2) + "$");
	$("#total").html(receipt.total.toFixed(2) + "$");

	$("#cart").slideUp("normal", function(){$("#bill").slideDown("normal")});
}

function addReceiptRow(item){
	var row = '<tr>';
	row += '<td>' + item.quantity +'</td>';
	row += '<td>' + item.item +'</td>';
    row += '<td>' + item.price.toFixed(2) +'$</td>';
	row += '<td>' + item.total.toFixed(2) +'$</td>';
	row += '</tr>',

	$('#receipt > tbody:last-child').append(row);  

}