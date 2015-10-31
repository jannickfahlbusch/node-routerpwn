var csv = require('./lib/csv.js');

//Object to hold all the data
var vendors = {};


var init = function(callback) {
	csv.each('./macVendor/vendors.csv').on('data', function(data) {
		vendors[data[1]] = {
			'manufacturer': data[2],
			'manufacturerAdress': data[3]
		};
	}).on('end', function() {
		console.log('Finished');
		if(callback) {
			callback(vendors);
		}
	});
};

init(function(vendorList) {
	console.log(vendorList);
});
