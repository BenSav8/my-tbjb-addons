addons.register('messageReciever', function (data) {
	if (data.msg.split("&#10;").length > 8 || data.msg.length > 2000) {
		data.msg = '<span style="display: block; width: 100%; max-height: 12.8em; overflow-y: auto; border: 1px solid #ccc; padding: 2px;">' + data.msg + '</span>'
	}
});