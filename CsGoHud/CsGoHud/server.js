var http = require('http');
var fs = require('fs');
var port = process.env.port || 1337;

http.createServer(function (req, res) {
	var bombPlanted = false;
	if (req.method === 'POST') {
		console.log("handling post request...");
		res.writeHead(200, { 'Content-Type' : 'text/html' });
		
		var body = '';
		req.on('data', function (data) {
			body += data;
		});
		
		req.on('end', function () {
			var test = JSON.parse(body);
			if (test.hasOwnProperty('round') && test.round.hasOwnProperty('bomb')) { 
				bombPlanted = true;
			} else {
				bombPlanted = false;
			}
			console.log("Bomb planted: " + bombPlanted)

			res.end('<html><body>' + body + '</body></html>');
		});
	} else {
		console.log("other type of req method");
		res.writeHead(200, { 'Content-Type' : 'text/html' });
		var html = '<html><body>Other type data</body></html>';
		res.end(html);
	}
	res.end('Hello World\n');
}).listen(port);
console.log("Listening port: " + port);