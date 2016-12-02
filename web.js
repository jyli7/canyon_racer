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

app.get('/user_data', function (req, res) {
	//var query = db.myInfo.findOne();
	//query.exec(function (err, doc) {
	//	res.json(doc);
	//});
});

app.post('/started', function (req, res) {
	//var query = db.myInfo.findOne();
	//if (!query) {
	//	var info = db.myInfo({
	//	  beginnerStartCount:  0,
	//	  normalStartCount: 0,
	//	  hellishStartCount: 0,
	//	  beginnerWinCount:  0,
	//	  normalWinCount: 0,
	//	  hellishWinCount: 0,
	//	  hellishWinnerNames: []
	//	});
  //
	//	info.save();
	//}
	//
	//query.exec(function (err, doc) {
	//	var difficulty = req.body.difficulty;
	//	if (difficulty == 1 && doc) {
	//		doc.beginnerStartCount++;
	//	} else if (difficulty == 2 && doc) {
	//		doc.normalStartCount++;
	//	} else if (difficulty == 3 && doc) {
	//		doc.hellishStartCount++;
	//	}
	//	doc.save();
	//});
});

app.post('/won', function (req, res) {
	//var query = db.myInfo.findOne();
	//query.exec(function (err, doc) {
	//	var difficulty = req.body.difficulty;
	//	if (difficulty == 1) {
	//		doc.beginnerWinCount++;
	//	} else if (difficulty == 2 ) {
	//		doc.normalWinCount++;
	//	} else if (difficulty == 3) {
	//		doc.hellishWinCount++;
	//	}
  //
	//	// Add user name to winners array if completed hellish
	//	if (req.body.userName) {
	//		db.myInfo.findOneAndUpdate(
	//		   { _id: doc._id },
	//		   { $push: { hellishWinnerNames: req.body.userName } },
	//		   function(err, doc) { if (err) { console.log('An error occurred: ' + err); }}
	//		)
	//	}
  //
	//	doc.save();
	//});
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
