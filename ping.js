let hasPinged = false;
let ping = new Audio($store.get('.config/trollbox/pingsound') || 'https://file.garden/ZeybJgZmvAenbkoN/discord_ping_sound_effect.mp3');
let everyone = $store.get('.config/trollbox/pingeveryone') || true;
let focusInterval;

addons.register('messageReciever', function(data) {
    if (data.msg.includes('@' + pseudo)) {
        hasPinged = true;
        data.msg = data.msg.replaceAll('@' + pseudo, '@$(' + color + ')' + pseudo + '$(white)');
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
    if (data.msg.includes('@everyone') && everyone) {
        hasPinged = true;
        data.msg = data.msg.replaceAll('@everyone', '@$(#c3ff00)everyone$(white)');
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
});

addons.register('messageSender', function(data) {
    if (data.msg == "/ping") {
        data.msg = '';
        let url = prompt('Please input a sound URL. (blank for default (discord), i recommend filegarden)');
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
            $store.set('.config/trollbox/pingeveryone', true);
            everyone = true;
        }
        if (msg == "/everyone off") {
            printMsg({ date: Date.now(), nick: "~", color: "white", style: "opacity: 0.7;", home: 'local', msg: "@every\u2062one turned off." });
            $store.set('.config/trollbox/pingeveryone', false);
            everyone = false;
        }
    }
});