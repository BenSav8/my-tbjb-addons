const colors = [
	"mediumvioletred",
	"deeppink",
	"palevioletred",
	"hotpink",
	"lightpink",
	"pink",
	"darkred",
	"red",
	"firebrick",
	"crimson",
	"indianred",
	"lightcoral",
	"salmon",
	"darksalmon",
	"lightsalmon",
	"orangered",
	"tomato",
	"darkorange",
	"coral",
	"orange",
	"darkkhaki",
	"gold",
	"khaki",
	"peachpuff",
	"yellow",
	"palegoldenrod",
	"moccasin",
	"papayawhip",
	"lightgoldenrodyellow",
	"lemonchiffon",
	"lightyellow",
	"maroon",
	"brown",
	"saddlebrown",
	"sienna",
	"chocolate",
	"darkgoldenrod",
	"peru",
	"rosybrown",
	"goldenrod",
	"sandybrown",
	"tan",
	"burlywood",
	"wheat",
	"navajowhite",
	"bisque",
	"blanchedalmond",
	"cornsilk",
	"indigo",
	"purple",
	"darkmagenta",
	"darkviolet",
	"darkslateblue",
	"blueviolet",
	"darkorchid",
	"fuchsia",
	"magenta",
	"slateblue",
	"mediumslateblue",
	"mediumorchid",
	"mediumpurple",
	"orchid",
	"violet",
	"plum",
	"thistle",
	"lavender",
	"midnightblue",
	"navy",
	"darkblue",
	"mediumblue",
	"blue",
	"royalblue",
	"steelblue",
	"dodgerblue",
	"deepskyblue",
	"cornflowerblue",
	"skyblue",
	"lightskyblue",
	"lightsteelblue",
	"lightblue",
	"powderblue",
	"teal",
	"darkcyan",
	"lightseagreen",
	"cadetblue",
	"darkturquoise",
	"mediumturquoise",
	"turquoise",
	"aqua",
	"cyan",
	"aquamarine",
	"paleturquoise",
	"lightcyan",
	"darkgreen",
	"green",
	"darkolivegreen",
	"forestgreen",
	"seagreen",
	"olive",
	"olivedrab",
	"mediumseagreen",
	"limegreen",
	"lime",
	"springgreen",
	"mediumspringgreen",
	"darkseagreen",
	"mediumaquamarine",
	"yellowgreen",
	"lawngreen",
	"chartreuse",
	"lightgreen",
	"greenyellow",
	"palegreen",
	"mistyrose",
	"antiquewhite",
	"linen",
	"beige",
	"whitesmoke",
	"lavenderblush",
	"oldlace",
	"aliceblue",
	"seashell",
	"ghostwhite",
	"honeydew",
	"floralwhite",
	"azure",
	"mintcream",
	"snow",
	"ivory",
	"white",
	"black",
	"darkslategray",
	"dimgray",
	"slategray",
	"gray",
	"lightslategray",
	"darkgray",
	"silver",
	"lightgray",
	"gainsboro"
]
let transcolor = false

addons.register('messageSender', function(data) {
	if (transcolor) {
		let temp = data.msg
		data.msg = ''
		socket.emit('user joined', pseudo, colors[parseInt(Math.random()*colors.length)], '', '')
		if (temp == "/transcolor on") {
			data.msg = ''
			printMsg({ date: Date.now(), nick: "~", color: "white", style: "opacity: 0.7;", home: 'local', msg: "Turned transcolor on." });
			transcolor = true
		} else if (temp == "/transcolor off") {
			data.msg = ''
			printMsg({ date: Date.now(), nick: "~", color: "white", style: "opacity: 0.7;", home: 'local', msg: "Turned transcolor off." });
			transcolor = false
		} else {
			socket.send(temp)
		}
	}
	if (data.msg == "/transcolor on") {
		data.msg = ''
		printMsg({ date: Date.now(), nick: "~", color: "white", style: "opacity: 0.7;", home: 'local', msg: "Turned transcolor on." });
		transcolor = true
	}
	if (data.msg == "/transcolor off") {
		data.msg = ''
		printMsg({ date: Date.now(), nick: "~", color: "white", style: "opacity: 0.7;", home: 'local', msg: "Turned transcolor off." });
		transcolor = false
	}
});