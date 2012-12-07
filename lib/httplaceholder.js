var http = require("http");
var url = require("url");
var Canvas = require("canvas");

exports.start_server = function(port) {

	/*
	 * Checks for NaN or 0 values
	 */
	var good_params = function(w, h) {
		if((isNaN(w) || w <= 0) || (isNaN(h) || h <= 0)) {
			return false;
		} else {
			return true;
		}
	}

	/*
	 * Renders PNG of arbitrary size to a Buffer object
	 */
	var render_image = function (w, h) {
		// Create canvas, context, and set 
		// relevant parameters
		var canvas = new Canvas(w, h);
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = "rgb(255,0,0)"; // RED BOX ONLY, FIXME
		ctx.fillRect(0, 0, w, h);

		// Renders canvas to base64, converts to binary Buffer
		var b64d = canvas.toDataURL();
		b64d = b64d.replace(/^data:image\/png;base64,/,"");
		var buf = new Buffer(b64d, 'base64');

		return buf;
	}

	http.createServer(function(req, res) {

		/*
		* Direct requests will result in this server recieving 2
		* HTTP requests, one for the image, and one for the
		* favicon. This disables that.
		*/
		if(req.url != '/favicon.ico') {
			
			// Parse URL and get relevant params
			var qry = url.parse(req.url, true).query
			var w = parseInt(qry.w), h = parseInt(qry.h);

			// Check for valid params
			if(good_params(w, h)) { 
				// Write as PNG
				res.writeHead(200, {'Content-Type': 'image/png'});
				// So I found out you can just send a Buffer object...
				res.write(render_image(w, h), 'bianry');
			} else {
				// Write param error
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write("ERROR: Paramters are NaN or 0");
			}
		}

		// Close response
		res.end();
	}).listen(port);
}

