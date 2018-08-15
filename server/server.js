const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 8081;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;


app.use(cors());

app.use(morgan('combined'));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended:false});


// DATABASE
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/familiz';
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var Schema = mongoose.Schema;

var AlbumsSchema = new Schema({
    id: Number,
	name: String,
	date: String,
	couverture: String,
	album: [String]
});



var Albums = mongoose.model('Albums', AlbumsSchema );

app.get('/getAlbums', (req, res) => {
	Albums.find({}, function (err, albums) {
		if (err) return handleError(err);
		res.status(200).send(albums);
	});
});

var UsersSchema = new Schema({
	username: String,
    password: String
});

var Users = mongoose.model('Users', UsersSchema );

function getUsers(username, password) {
	Users.find(function (err, user) {
		console.log(user);
	});
}

app.post('/login', urlencodedParser, (req, res) => {
	console.log(req.body.username);
	MongoClient.connect(mongoDB, { useNewUrlParser: true }, function(err){
        if(err) throw err;
        db.collection('user').findOne({
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
             
        })
    });
});

if (!process.env.PORT) {
  app.use(express.static(`${__dirname}/dist/holiday-blog`));
}

http.listen(port, () => {
	console.log(`listening on: ${port}`);
});

