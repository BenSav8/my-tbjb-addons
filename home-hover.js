addons.register('messageReciever', function(data) {
	data.nick = '<bdi title="Home: ' + data.home + '">' + data.nick + '</bdi>'
})

addons.register('userListener', function(action, data) {
	data.nick = '<bdi title="Home: ' + data.home + '">' + data.nick + '</bdi>'
})