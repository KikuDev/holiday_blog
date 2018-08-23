const Albums = require('../models/Albums');

module.exports = (app) => {
	app.get('/getAlbums', Albums.getAll);
	app.post('/sendAlbum', Albums.sendOne);
}