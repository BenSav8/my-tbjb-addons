let favicon = document.querySelector('link[rel="shortcut icon"]');
favicon.href = '/c/sys/skins/w93/apps/chat.gif';
setInterval(function () {
    if (noFocusMsg == 0) {
        favicon.href = '/c/sys/skins/w93/apps/chat.gif'; 
    } else {
		favicon.href = 'https://bensav8.github.io/my-tbjb-addons/files/pingchat.png';
    }
}, 100);