'use strict';

const router = require('express').Router();
const serv = require('serve-static');
const path = require('path');

module.exports = function() {
	router.use(serv(__dirname,{'index':['index.html']}));
	return router;
}