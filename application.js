'use strict';

const settings = require('./settings.json');

(function main() {
	initDatabase();
})();

function initDatabase() {
	console.log('Initialize database');
	const MongoClient = require('mongodb').MongoClient;
	MongoClient.connect(settings.mongodb.url,initServer);
}

function initServer(err,databasePool) {
	if (err) {
		return console.error(err);
	}

	console.log('Initialize server');

	const application = require('express')();
	
	//Database Injection
	application.use((req,res,next)=>{
		req.db = databasePool;
		return next();
	});

	application.use('/',require('./webapplication')());

	if (settings.http.enabled) {
		const http = require('http');
		const port = settings.http.port || 8080;
		http.createServer(application).listen(port)
		console.log('Listening HTTP @',port);
	}
}
