'use strict';

// based on https://github.com/pallets/jinja/blob/master/jinja2/filters.py#L371

module.exports = function filesizeformatfilter(input, binary) {
	var kwargs = getKwargs(arguments);
	binary = (kwargs.binary !== undefined) ? kwargs.binary : binary;

	var base = binary ? 1024 : 1000;
	var bytes = parseFloat(input);
	var units = [
		'Bytes',
		(binary ? 'KiB' : 'kB'),
		(binary ? 'MiB' : 'MB'),
		(binary ? 'GiB' : 'GB'),
		(binary ? 'TiB' : 'TB'),
		(binary ? 'PiB' : 'PB'),
		(binary ? 'EiB' : 'EB'),
		(binary ? 'ZiB' : 'ZB'),
		(binary ? 'YiB' : 'YB')
	];

	if (bytes === 1) {
		return '1 Byte';
	} else if (bytes < base) {
		return bytes + ' Bytes';
	} else {
		return units.reduce(function (match, unit, index) {
			var size = Math.pow(base, index);
			if (bytes >= size) {
				return (bytes/size).toFixed(1) + ' ' + unit;
			}
			return match;
		});
	}
};

function getKwargs(args) {
	var kwargs = [].pop.call(args);
	return (typeof kwargs === 'object' && kwargs.__keywords) ? kwargs : {};
}
