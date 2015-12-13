var csv = require('./lib/csv.js');

//Object to hold all the data
var vendors = {};

/**
 * Initializes the vendor-ibject
 * @param  {Function} callback Resolves with the structure, after it is build
 */
var init = function(callback) {
	csv.each(__dirname + '/macVendor/vendors.csv').on('data', function(data) {
		vendors[data[1]] = {
			'prefix': data[1],
			'manufacturer': data[2],
			'manufacturerAdress': data[3]
		};
	}).on('end', function() {
		if(callback) {
			callback(vendors);
		}
	});
};

/**
 * Gets the vendor to a specified MAC-address
 * @param  {string} macAddress MAC-address
 * @return {vendorObject}            Detailed informations to the vendor
 */
var getVendorForMac = function(macAddress) {
	for(var macPrefix in vendors) {
		if(macAddress.startsWith(macPrefix)) {
			return vendors[macPrefix];
		}
	}

	return {
		'prefix': null,
		'manufactuer': null,
		'manufactuerAddress: null
	};
};

/**
 * PWN the MAC-address
 * @param  {string} macAddress MAC-address
 * @return {pwnObject}         Details of the pwn
 */
var pwn = function(macAddress) {
	var vendor = getVendorForMac(macAddress.replace(/:/g, '').replace(/-/g, ''));

	switch (vendor.manufacturer) {
		case 'Arcadyan Technology Corporation':
			return require(__dirname + '/exploits/easybox.js')(macAddress);
			break;
		default:
			return {
				'ssid': 'Unknown',
				'passphrase': ''
			};
	}
}

module.exports = {
	init: init,
	getVendorForMac: getVendorForMac,
	pwn: pwn
};
