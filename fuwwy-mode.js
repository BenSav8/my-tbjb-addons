addons.register('messageReciever', function(data) {
	data.msg = data.msg.toLowerCase().replaceAll('r', 'w').replaceAll('l', 'w').replaceAll(' g', ' g-g').replaceAll(' b', ' b-b').replaceAll('qu', 'qw') + " /kao"
})
