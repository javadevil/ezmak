'use strict';

var settings = require('./settings.json');

function initServer(databasePool) {
	let application = require('express')();

	application.all('/',demo);

	if (settings.http.enabled) {
		let http = require('http');
		let port = settings.http.port || 8080;
		http.createServer(application).listen(port)
	}
}

function demo(req,res){
	return res.send('Ezmak 1.0.0');
}

initServer(null);