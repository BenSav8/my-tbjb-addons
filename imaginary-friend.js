async function getword() {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word');
        const data = await response.json();
        return data[0];
    } catch (error) {
        return 'placeholder';
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

addons.register('messageSender', async function(data) {
    if (data.msg === "/spawn") {
        data.msg = '';
        const nameword = await getword();
        const itsname = capitalize(nameword) + Math.floor(Math.random() * 9999);
        const itscolor = Math.floor(Math.random() * 360);
        
        printMsg({
            date: Date.now(),
            color: '#0f0',
            nick: '→',
            home: '███████',
            msg: '<span class="trollbox_nick" style="color: hsl(' + itscolor + ', 45%, 45%)">' + itsname + '</span> <em>has entered teh trollbox?</em>'
        });
        setInterval(async () => {
            const word1 = await getword();
            const word2 = await getword();
			const word3 = await getword();
            printMsg({
                date: Date.now(),
                color: 'hsl(' + itscolor + ', 45%, 45%)',
                nick: itsname,
                home: '███████',
                msg: capitalize(word1) + ' ' + word2 + ' ' + word3 + '!'
            });
			if (noFocusMsg >= 0) {
				noFocusMsg = noFocusMsg + 1
			}
        }, 10000);
    }
});
