var http = require("http");
var url = require("url");
var Canvas = require("canvas");

exports.match_rgb = function(c) {
	var rgb = /^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/;
	var rgba = /^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(0((\.[0-9]+)?)|1)\)$/;
	return (rgb.test(c) || rgba.test(c));
};

/*
	* Matches 3 or 6 char long hexadecimal values
	* (case insensitive)
	*/
exports.match_hex = function(c) {
	var hex = /^(#?)(([abcdef0-9]{6})|([abcdef0-9]{3}))$/i;
	return hex.test(c);
}

/*
 * Port = port #
 * d(fg/bg) = default foreground/background
 */
exports.start_server = function(port, dfg, dbg) {

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
	 * Matches:
	 * 	rgb(xxx,xxx,xxx)
	 * 	rgba(xxx,xxx,xxx,x.xx)
	 * to see if input is valid RGB(A) color value
	 */

	/*
	 * Renders PNG of arbitrary size to a Buffer object
	 */
	var render_image = function (w, h, fg, bg) {
		// Create canvas, context, and set 
		// relevant parameters
		var canvas = new Canvas(w, h);
		var ctx = canvas.getContext('2d');

		// fill in background
		ctx.fillStyle = bg;
		ctx.fillRect(0, 0, w, h);

		ctx.fillStyle = fg;
		ctx.font = '12px serif';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.fillText(w + " x " + h, 0, 0);

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

			// Get color data
			var fg = qry.fg;
			var bg = qry.bg;

			if(!exports.match_rgb(fg)) {
				if(!exports.match_hex(fg)) {
					fg = dfg;
				} else if(fg.charAt(0) != '#') {
					fg = '#' + fg;
				}
			}
			
			if(!exports.match_rgb(bg)) {
				if(!exports.match_hex(bg)) {
					bg = dbg;
				} else if(bg.charAt(0) != '#') {
					bg = '#' + bg;
				}
			}

			// Check for valid params
			if(good_params(w, h)) { 
				// Write as PNG
				res.writeHead(200, {'Content-Type': 'image/png'});
				// So I found out you can just send a Buffer object...
				res.write(render_image(w, h, fg, bg));
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

