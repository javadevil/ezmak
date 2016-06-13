"use strict";

const router = require('express').Router();
const path = require('path');
const serv = require('serve-static');

module.exports = function index() {
	router.use(serv(path.join(__dirname,'build'),{index:['index.html']}));
	return router;
}