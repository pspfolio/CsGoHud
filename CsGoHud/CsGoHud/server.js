var http = require('http');
var fs = require('fs');
var port = process.env.port || 1337;

var CsGoHudInfo = {
	bombPlanted : false,
	roundLive : false
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
			console.log(data);
			// If round have property bomb -> bomb is planted
			if (data.hasOwnProperty('round')) {
				CsGoHudInfo.bombPlanted = data.round.hasOwnProperty('bomb') && data.round.bomb === 'planted' ? true : false;
				CsGoHudInfo.roundLive = data.round.phase === 'live' ? true : false;
			}
			res.writeHead(200);
			res.end('');
		});
	} else if (req.method === 'GET') {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Request-Method', '*');
		res.setHeader('Access-Control-Allow-Headers', '*');
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
		res.writeHead(200, { 'Content-Type' : 'application/json' });
		res.end(JSON.stringify(CsGoHudInfo));
	} 

}).listen(port);
console.log("Listening port: " + port);