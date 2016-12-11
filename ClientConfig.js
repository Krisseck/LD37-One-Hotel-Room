var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		'./gameClasses/bedComponent.js',
    './gameClasses/tableComponent.js',
    './gameClasses/bathroomComponent.js',
    './gameClasses/windowComponent.js',
    './gameClasses/customer.js',
		/* Standard game scripts */
		'./client.js',
		'./index.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }