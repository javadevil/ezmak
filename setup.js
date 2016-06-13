const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');
const read = require('read');
const crypto = require('crypto');
const user = {};

(function main() {
	console.log('Admin use only!')
	setup();
})();

function setup() {
	read({prompt:'Username:',default:'admin'},addUsername);
}

function addUsername(err, result,isDefault) {
	if (err) {
		console.error(err);
		return process.exit(1);
	}
	user.name = result;
	read({prompt:'Password:',silent:true},addPassword);
}


function addPassword(err,result,isDefault) {
	if (err) {
		console.error(err);
		return process.exit(1);
	}

	user.password = result;
	read({prompt:'Confirm:',silent:true},confirm);
}

function confirm(err,result,isDefault) {
	if (err) {
		console.error(err);
		return process.exit(1);
	}
	if (user.password.length < 4) {
		console.error('Password too short');
		return process.exit(1);
	}
	if (user.password === result) {
		return hashPassword();
	} else {
		console.error('Password mismatch!');
		return process.exit(1);

	}
}
function hashPassword() {
	crypto.randomBytes(settings.auth.saltlength,(err,buff)=>{
		user.salt = buff.toString('hex');

		crypto.pbkdf2(user.password,user.salt,settings.auth.iteration,settings.auth.keylength,settings.auth.digest,(err,key)=>{
			user.password = key.toString('hex');

			console.dir(user);
			return store();
		});
	});
}
function store() {
	MongoClient.connect(settings.mongodb.url,(err,db)=>{
		db.collection('users').insert(user,(err,result)=>{
			if (err) {
				console.error(err);
				return process.exit(1);
			}

			console.log('Setup successful.');
			return process.exit(0);
		});
	});
}
