let list = $store.get('.config/trollbox/presetnicknames.json') || [];

addons.register('messageSender', function(data) {
    if (data.msg == '/addnick') {
		data.msg = ''
		printMsg({
            date: Date.now(),
            color: 'white',
            nick: '~',
            home: 'local',
            msg: 'Added the nickname preset <span style="color: ' + color + '">' + pseudo + '</span>!'
        });
		list.push([pseudo, color])
		$store.set('.config/trollbox/presetnicknames.json', list)
	}
	if (data.msg == '/nicks') {
		data.msg = ''
		finalmsg = ''
		list.forEach((name, index) => {
			finalmsg = '<span id="' + Date.now() + '">' + finalmsg + '<span style="color: ' + name[1] + '">' + name[0] + '</span> <button onclick="let span = document.getElementById(\"' + Date.now() + '\"); setPseudo(\" '+ name[0] +'\")";$store.set(\".config/trollbox/color\", ' + name[1] + ');span.innerHTML = \"Set your nickname to the selected nickname.\"">Set</button> <button onclick="let span = document.getElementById(\"' + Date.now() + '\");list = list.splice(' + index + ', 1);$store.set(\".config/trollbox/presetnicknames.json\", list);span.innerHTML = \"Removed the selected nickname.\"">Remove</button></span>\n'
		});
		if (finalmsg == '') {
			printMsg({
				date: Date.now(),
				color: 'white',
				nick: '~',
				home: 'local',
				msg: 'You have no saved nicknames, change your nickname to the one you want to save and do /addnick.'
			});
			return
		}
		printMsg({
            date: Date.now(),
            color: 'white',
            nick: '~',
            home: 'local',
            msg: finalmsg
        });
	}
});