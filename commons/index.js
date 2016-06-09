'use strict';
let router = require('express').Router();
module.exports = function index() {
	
	router.all("/",demo);

	return router;
}

function demo(req,res) {
	let users = req.db.collection('users');
	users.find({}).limit(1).next((err,doc)=>{
		if (err) {
			console.error(err);
		}
		return res.send('Hello, ' + doc.name);
	})
	//return res.send('ok');	
}