'use strict';

var express = require("express");

var db = require('./models/models');
var app = express();

app.set('port', process.env.PORT || 8888);
app.use(express.bodyParser());
app.use(express.methodOverride());
// app.use(app.router);
app.use(express.logger());

app.use('/', express.static(__dirname + '/public'));

app.post('/started', function (req, res) {
	var query = db.myInfo.findOne();
	if (!query) {
		var info = db.myInfo({
		  beginnerStartCount:  0,
		  normalStartCount: 0,
		  hellishStartCount: 0,
		  beginnerWinCount:  0,
		  normalWinCount: 0,
		  hellishWinCount: 0,
		  hellishWinnerNames: []
		});

		info.save();
	}
	
	query.exec(function (err, doc) {
		var difficulty = req.body.difficulty;
		if (difficulty == 1) {
			doc.beginnerStartCount++;	
		} else if (difficulty == 2 ) {
			doc.normalStartCount++;
		} else if (difficulty == 3) {
			doc.hellishStartCount++;
		}
		doc.save();	
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
