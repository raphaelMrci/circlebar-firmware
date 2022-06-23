const Gpio = require('onoff').Gpio;

const Pumps = [
		new Gpio(17, 'out'),
		new Gpio(27, 'out'),
		new Gpio(22, 'out'),
		new Gpio(23, 'out'),
		new Gpio(24, 'out'),
		new Gpio(25, 'out'),
		new Gpio(26, 'out')
	]

module.exports = Pumps;
