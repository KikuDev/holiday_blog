const Users = require('../models/Users');

module.exports = (app) => {
	app.post('/login', Users.findOne);
};