addons.register('messageReciever', function(data) {
	if (data.msg.match(/\$\[([^\]]+)\](.*?)(?=\$\[|$)/g)) {
		// Replace $[...] with background color span
		data.msg = data.msg.replace(/\$\[([^\]]+)\](.*?)(?=\$\[|$)/g, function (match, bgcolor, txt) {
			return `<span style="background-color: ${bgcolor.split(';')[0]}">${txt}</span>`;
		});

		// Replace $(...) with text color span
		data.msg = data.msg.replace(/\$\(([^\)]+)\)(.*?)(?=\$\(|$)/g, function (match, fgcolor, txt) {
			return `<span style="color: ${fgcolor.split(';')[0]}">${txt}</span>`;
		});
	}
});
