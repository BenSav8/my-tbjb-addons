let hasPinged = false

addons.register('messageReciever', function(data) {
	if (data.msg.includes('@' + pseudo)) {
		hasPinged = true
		data.msg = data.msg.replaceAll('@' + pseudo, '@$(' + color + ')' + pseudo + '$(white)')
		if(document.hasFocus()==false) {
			setInterval (function () {
				if (noFocusMsg == 0) {
					document.title = 'trollbox'
					hasPinged = false
				} else if (hasPinged == true) {
					document.title = 'trollbox (' + noFocusMsg + ') (!)'
				} else if (hasPinged == false) {
					document.title = 'trollbox (' + noFocusMsg + ')'
				}
			}, 100)
		} else {
			document.title = 'trollbox'
			hasPinged = false
		}
		const ping = new Audio('https://file.garden/ZeybJgZmvAenbkoN/discord_ping_sound_effect.mp3')
		ping.play()
	}
})