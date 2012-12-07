(function() {
	var htp = require('./httplaceholder');
	var port = process.argv[2];

	port = parseInt(port);
	if(!(isNaN(port) || port <= 0)) {
		htp.start_server(port);
	} else {
		console.log('ERROR: Bad port parameter');
	}
}).call(this);
