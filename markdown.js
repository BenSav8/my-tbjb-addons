addons.register('messageReciever', function(data) {
	console.log(data.msg)
	data.msg = data.msg.replace(/\*\*\*(.*?)\*\*\*/g, '<b><i>$1</i></b>') // bold + italic
	data.msg = data.msg.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // bold
	data.msg = data.msg.replace(/\*(.*?)\*/g, '<i>$1</i>') // italic
	data.msg = data.msg.replace(/~~~(.*?)~~~/g, '<del><sub>$1</sub></del>') // strikethrough + subscript
	data.msg = data.msg.replace(/~~(.*?)~~/g, '<sub>$1</sub>') // subscript
	data.msg = data.msg.replace(/\^\^(.*?)\^\^/g, '<sup>$1</sup>') // superscript
	data.msg = data.msg.replace(/==(.*?)==/g, '<mark>$1</mark>') // highlight
	data.msg = data.msg.replace(/\[(.*?)\]\((.*?)\)/g, function(match, txt, url) {
		return '<a href="' + encodeURIComponent(url) + '">' + txt + '</a>';
	}) // hyperlink
	let looped = ''
	let lines = data.msg.split("&#10;")
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i]
		line = line.replace(/^######\s+(.*)$/, '<span style="font-size: 1em; line-height: 1.5;">$1</span>') // heading 6
		line = line.replace(/^#####\s+(.*)$/, '⁢<span style="font-size: 1.25em;; line-height: 1.5;">$1</span>') // heading 5
		line = line.replace(/^####\s+(.*)$/, '⁢<span style="font-size: 1.5em; line-height: 1.5;">$1</span>') // heading 4
		line = line.replace(/^###\s+(.*)$/, '⁢<span style="font-size: 2em; line-height: 1.5;">$1</span>') // heading 3
		line = line.replace(/^##\s+(.*)$/, '⁢<span style="font-size: 2.5em; line-height: 1.5;">$1</span>') // heading 2
		line = line.replace(/^#\s+(.*)$/, '⁢<span style="font-size: 3em; line-height: 1.5;">$1</span>') // heading 1
		line = line.replace(/^-{3,}$/, '<hr>') // horizontal rule
		looped = looped + line + '&#10;'
	}
	looped = looped.slice(0, -5)
	data.msg = looped
})
