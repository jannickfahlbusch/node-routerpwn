# node-routerpwn

> DO NOT USE THIS FOR ANY MALICIOUS ACTIVITIES

Routerpwn lets you auto-pwn a device in the network.

Give it a MAC-address and it will choose a exploit, matching the vendor of the MAC.

## Functions
* `init(function callback(object vendorList))`

 You should call `init()` in every case before you use any other method of this program. `ìnit()` will build the vendor lookup table and calls the callback-function with the table when it has been build successfully.

* `getVendorForMac(string macAddress)`

  Call this, if you want to get the vendor to the given MAC.

* `pwn(string macAddress)`

  PWNs the device behind the MAC-address. It returns the result of the exploit. Usually, you get an passphrase for the WiFi.

## Usage

```javascript
//Require routerpwn
var routerpwn = require('routerpwn');

//Initialize the vendor-Object
routerpwn.init(function(vendorObj) {

	//Pwn the router
	var pwn = routerpwn.pwn('12:34:56:78:9A:BC');
});
```

## Contributing

Every contribution is welcome!

Especially, i look forward for exploits for existing or new devices/vendors.
