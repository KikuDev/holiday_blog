const Albums = require('../models/Albums');

module.exports = (app) => {
	app.get('/getAlbums', Albums.getAll);
}