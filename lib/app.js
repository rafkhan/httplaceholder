(function() {
	var htp = require('./httplaceholder');
	var port = process.argv[2];
	
	var fg = process.argv[3];
	var bg = process.argv[4];

	if(!htp.match_rgb(fg) && !htp.match_hex(fg)) {
		console.log('WARNING: Bad foreground paramater. Using #000.');
		fg = '#000';
	}
	
	if(!htp.match_rgb(bg) && !htp.match_hex(bg)) {
		console.log('WARNING: Bad background paramater. Using #DDD.');
		bg = '#DDD';
	}

	port = parseInt(port);
	if(!(isNaN(port) || port <= 0)) {
		htp.start_server(port, fg, bg);
	} else {
		console.log('ERROR: Bad port parameter');
	}
}).call(this);
