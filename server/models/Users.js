const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const db = require('../config/database');
const database = mongoose.connection;

mongoose.connect(db.dbUrl, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

const Users = {
	findOne: (req, res) => {
		database.collection('user').findOne({
			username : req.body.username, password : req.body.password
		}, function(err, user){
			if(err) throw err;
			if(user && user.length !== 0){  
				return res.status(200).json({
					status: 'success',
					user: user.username,
					photo: user.photo,
					token: jwt.sign({
						data: user
						}, 'secret', { expiresIn: '2h'})
				})
			} else {
				return res.status(200).json({
					status: 'fail',
					message: `L'un des champs est erroné :)`
				})
			}
				
		});
	}
}

module.exports = Users;