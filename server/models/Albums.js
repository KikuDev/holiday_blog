const mongoose = require('mongoose');

var AlbumsSchema = new mongoose.Schema({
    id: Number,
	name: String,
	date: String,
	couverture: String,
	album: [String]
});

const Albums = {
	model: mongoose.model('albums', AlbumsSchema ),
	getAll: (req, res) => {
		Albums.model.find({}, function (err, ResAlbums) {
			if (err) return handleError(err);
			res.status(200).send(ResAlbums);
		});
	}
}

module.exports = Albums;