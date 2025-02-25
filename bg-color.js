addons.register('messageReciever', function(data) {
	if (data.msg.match(/\$\[([^\]]+)\](.*?)(?=\$\[|$)/g)) {
		data.msg = data.msg.replace(/\$\[([^\]]+)\](.*?)(?=\$\[|$)/g, function (match, bgcolor, txt) {
			return `<span style="background-color: ${bgcolor.split(';')[0]}">${txt}</span>`;
		});
		data.msg = data.msg.replace(/\$\(([^\)]+)\)(.*?)(?=\$\(|$)/g, function (match, fgcolor, txt) {
			return `<span style="color: ${fgcolor.split(';')[0]}">${txt}</span>`;
		});
	}
});
