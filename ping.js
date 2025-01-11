let hasPinged = false;
let ping = new Audio($store.get('.config/trollbox/pingsound') || 'https://file.garden/ZeybJgZmvAenbkoN/discord_ping_sound_effect.mp3');
let everyone = $store.get('.config/trollbox/pingeveryone') || "true";
let focusInterval;
let pingusers = {}

socket.on('update users', function(data) {
	pingusers = data
});

addons.register('messageReciever', function(data) {
    if (data.msg.includes('@everyone') && everyone == "true") {
        hasPinged = true;
        data.msg = '<span style="background-color: #ffff0020;">' + data.msg.replaceAll('@everyone', '@<span style="color: #c3ff00;">everyone</span>') + '</span>';
        if (!document.hasFocus()) {
            if (!focusInterval) {
                focusInterval = setInterval(function () {
                    if (noFocusMsg == 0) {
                        document.title = 'trollbox';
                        hasPinged = false;
                    } else if (hasPinged) {
                        document.title = 'trollbox (' + noFocusMsg + ') (!)';
                    } else {
                        document.title = 'trollbox (' + noFocusMsg + ')';
                    }
                }, 100);
            }
        } else {
            document.title = 'trollbox';
            hasPinged = false;
            clearInterval(focusInterval);
            focusInterval = null;
        }
        ping.play();
    }
    if (data.msg.includes('@here')) {
        hasPinged = true;
		if (document.hasFocus()) {
			data.msg = '<span style="background-color: #ffff0020;">' + data.msg.replaceAll('@here', '@<span style="color: #c3ff00;">here</span>') + '</span>';
			ping.play();
        } else {
			data.msg = data.msg.replaceAll('@here', '@<span style="color: #c3ff00;">here</span>');
		}
    }
    if (he.decode(data.msg).includes('@' + pseudo)) {
        hasPinged = true;
        data.msg = '<span style="background-color: #ffff0020;">' + he.decode(data.msg).replaceAll('@' + pseudo, '@<span style="color: ' + color + ';">' + pseudo + '</span>') + '</span>';
        if (!document.hasFocus()) {
            if (!focusInterval) {
                focusInterval = setInterval(function () {
                    if (noFocusMsg == 0) {
                        document.title = 'trollbox';
                        hasPinged = false;
                    } else if (hasPinged) {
                        document.title = 'trollbox (' + noFocusMsg + ') (!)';
                    } else {
                        document.title = 'trollbox (' + noFocusMsg + ')';
                    }
                }, 100);
            }
        } else {
            document.title = 'trollbox';
            hasPinged = false;
            clearInterval(focusInterval);
            focusInterval = null;
        }
        ping.play();
    }
	for (const key in pingusers) {
		if (pingusers.hasOwnProperty(key)) {
			if (pingusers[key].nick != pseudo && he.decode(data.msg).includes('@' + he.decode(pingusers[key].nick))) {
				data.msg = he.decode(data.msg).replaceAll('@' + he.decode(pingusers[key].nick), '@<span style="color: ' + pingusers[key].color + ';">' + he.decode(pingusers[key].nick) + '</span>')
			}
		}
	}

});

addons.register('messageSender', function(data) {
    if (data.msg == "/ping") {
        data.msg = '';
        let url = prompt('Please input a sound URL. (blank for default (discord), i recommend filegarden or catbox)');
        if (url == '') {
            url = "https://file.garden/ZeybJgZmvAenbkoN/discord_ping_sound_effect.mp3";
        }
        ping = new Audio(url);
        $store.set('.config/trollbox/pingsound', url);
    }
    if (data.msg == "/everyone on" || data.msg == "/everyone off") {
        let msg = data.msg;
        data.msg = '';
        if (msg == "/everyone on") {
            printMsg({ date: Date.now(), nick: "~", color: "white", style: "opacity: 0.7;", home: 'local', msg: "@every\u2062one turned on." });
            $store.set('.config/trollbox/pingeveryone', "true");
            everyone = "true";
        }
        if (msg == "/everyone off") {
            printMsg({ date: Date.now(), nick: "~", color: "white", style: "opacity: 0.7;", home: 'local', msg: "@every\u2062one turned off." });
            $store.set('.config/trollbox/pingeveryone', "false");
            everyone = "false";
        }
    }
});
