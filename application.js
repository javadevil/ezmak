'use strict';

const settings = require('./settings.json');

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

	application.all('/',demo);
	application.use('/auth',require('./commons')());

	if (settings.http.enabled) {
		const http = require('http');
		const port = settings.http.port || 8080;
		http.createServer(application).listen(port)
		console.log('Listening HTTP @',port);
	}
}

function demo(req,res){
	return res.send('Ezmak 1.0.1');
}

initDatabase();
