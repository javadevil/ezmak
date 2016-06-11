'use strict';
module.exports = function() {
	const router = require('express').Router();
	const serv = require('serve-static');
	const path = require('path');

	router.use(serv(path.join(__dirname,'views'),{index:['index.html']}));
	router.all('/test',demo);
	return router;
}

function demo(req,res) {
	return res.send('it work!!');
}