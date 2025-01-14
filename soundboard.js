let muted = $store.get('.config/trollbox/muted') || [];

addons.register('messageReciever', function(data) {
	let temp = data.msg
    if (temp.startsWith('/play ')) {
    for (let i = 0; i < blocked.length; i++) { if (data.home==blocked[i]) {return} };
		const audio = data.msg.slice(6).trim();
		const sound = new Audio(audio)
		sound.addEventListener('loadedmetadata', () => {
			if (sound.duration > 15) {
				return
			}
			if (muted.includes(data.home)) {
				printMsg({ date: Date.now(), nick: "~", color: "white", style: "opacity: 0.7;", home: 'local', msg: '🔇 <span style="color: ' + data.color + ';">' + he.decode(data.nick) + '</span> played sound: <b>' + audio.split('/').pop().split('.').shift() + '</b>' });
				return
			} 
			printMsg({ date: Date.now(), nick: "~", color: "white", style: "opacity: 0.7;", home: 'local', msg: '🔈 <span style="color: ' + data.color + ';">' + he.decode(data.nick) + '</span> played sound: <b>' + audio.split('/').pop().split('.').shift() + '</b>' });
			sound.play()
		});
	};
});

addons.register('messageSender', function(data) {
	if (data.msg.startsWith('/play ')) {
		const audio = data.msg.slice(6).trim();
		const sound = new Audio(audio)
		sound.addEventListener('loadedmetadata', function() {
			if (sound.duration > 15) {
				data.msg = ''
				printMsg({ date: Date.now(), nick: "~", color: "white", style: "opacity: 0.7;", home: 'local', msg: "Sound too long. (Max 15 seconds)" });
			}
		});
		sound.addEventListener('error', function() {
			data.msg = ''
			printMsg({ date: Date.now(), nick: "~", color: "white", style: "opacity: 0.7;", home: 'local', msg: "Sound failed to play. Make sure it's a valid sound file and URL." });
		});
	}
	let msg = data.msg
	if (msg.startsWith('/mute ')) {
		var user = msg.slice(6).trim();
		muted.push(user);
		muted = uniq(muted);
		$store.set('.config/trollbox/muted', muted);
		userMsg = 'User is now muted.';
		dada = {
			date: Date.now(),
			nick: "~",
			color: "white",
			style: "opacity: 0.7;",
			home: 'local',
			msg: userMsg
		}
		printMsg(dada);
		data.msg = ''
		console.log(muted)
		return;
	}
	if (msg.startsWith('/unmute ')) {
		var user = msg.slice(8).trim();
		muted.splice(muted.indexOf(user), 1);
		muted = uniq(muted);
		$store.set('.config/trollbox/muted', muted);
		userMsg = 'User is now unmuted.';
		dada = {
			date: Date.now(),
			nick: "~",
			color: "white",
			style: "opacity: 0.7;",
			home: 'local',
			msg: userMsg
		};
		printMsg(dada);
		data.msg = ''
		return;
	}
});