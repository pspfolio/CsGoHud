var http = require('http');
var fs = require('fs');
var port = process.env.port || 1337;

var CsGoHudInfo = {
	'bombPlanted' : false
};

http.createServer(function (req, res) {
	var bombPlanted;
	if (req.method === 'POST') {
		var body = '';
		req.on('data', function (data) {
			body = data;
		});
		
		req.on('end', function () {
			var data = JSON.parse(body);
			// If round have property bomb -> bomb is planted
			CsGoHudInfo.bombPlanted = (data.hasOwnProperty('round') && data.round.hasOwnProperty('bomb')) ? true : false;
			res.writeHead(200, { 'Content-Type' : 'text/html' });
			res.end('');
		});
	} else if (req.method === 'GET') {
		res.writeHead(200, { 'Content-Type' : 'application/json' });
		res.end(JSON.stringify(CsGoHudInfo));
	} 

}).listen(port);
console.log("Listening port: " + port);