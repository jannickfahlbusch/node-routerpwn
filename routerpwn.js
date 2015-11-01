var csv = require('./lib/csv.js');

//Object to hold all the data
var vendors = {};


var init = function(callback) {
	csv.each(__dirname + '/macVendor/vendors.csv').on('data', function(data) {
		vendors[data[1]] = {
			'prefix': data[1],
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

var getVendorForMac = function(macAddress) {
	for(var macPrefix in vendors) {
		if(macAddress.startsWith(macPrefix)) {
			return vendors[macPrefix];
		}
	}
};

var pwn = function(macAddress) {
	var vendor = getVendorForMac(macAddress);

	switch (vendor.manufacturer) {
		case 'Arcadyan Technology Corporation':
			return require(__dirname + '/exploits/easybox.js')(macAddress);
			break;
	}
}

module.exports = {
	init: init,
	getVendorForMac: getVendorForMac,
	pwn: pwn
};
