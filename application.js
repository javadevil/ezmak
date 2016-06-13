'use strict';

const settings = require('./settings.json');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

(function main() {
	initServer();
})();

function initServer() {
	console.log('Initialize server');

	const application = require('express')();

	const store = MongoDBStore({
		uri : settings.mongodb.uri,
		collection : 'session'
	});

	application.use(session({
		secret : settings.session.secret,
		cookie : {
        	maxAge : 1000 * 60 * 60 * 24 //one day
      	},
      	store : store,
      	reSave : true,
      	saveUninitialized : false

	}));
	application.use('/',require('./webapplication')());
	application.all('/test',(req,res)=>{
		if(req.session.count){
			req.session.count += 1;
		} else {
			req.session.count = 1;
		}
		return res.send('Session:'+JSON.stringify(req.session));
	})
	if (settings.http.enabled) {
		const http = require('http');
		const port = settings.http.port || 8080;
		http.createServer(application).listen(port)
		console.log('Listening HTTP @',port);
	}
}
