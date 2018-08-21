const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 8081;
const mongoose = require('mongoose');

app.use(cors({origin: '*'}));
app.use(morgan('combined'));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true, parameterLimit: 100000}));


// DATABASE
require('./routes/login')(app);
require('./routes/albums')(app);

var MembersSchema = new mongoose.Schema({
	name: String,
	photo: String
});

var Members = mongoose.model('Members', MembersSchema );

app.get('/getMembers', (req, res) => {
	Members.find({}, function (err, members) {
		if (err) return handleError(err);
		res.status(200).send(members);
	});
});

if (!process.env.PORT) {
  app.use(express.static(`${__dirname}/dist/holiday-blog`));
}

http.listen(port, () => {
	console.log(`listening on: ${port}`);
});

