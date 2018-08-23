const mongoose = require('mongoose');

var AlbumsSchema = new mongoose.Schema({
	persons: String,
	city: String,
	fromDate: String,
	toDate: String,
	couvUrl: String,
	albumName: String,
	photoListURLS: [String]
});

const Albums = {
	model: mongoose.model('albums', AlbumsSchema ),
	getAll: (req, res) => {
		Albums.model.find({}, function (err, ResAlbums) {
			if (err) return handleError(err);
			res.status(200).send(ResAlbums);
		});
	},
	sendOne: (req, res) => {
		Albums.model.create({
			persons: req.body.persons,
			city: req.body.city,
			fromDate: req.body.fromDate,
			toDate: req.body.toDate,
			couvUrl: req.body.couvUrl,
			albumName: req.body.albumName,
			photoListURLS: req.body.photoListURLS,
		}, () => {
			res.sendStatus(200);
		});
	}
}

module.exports = Albums;