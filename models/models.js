'use strict';

var mongoose  = require('mongoose')
  , LOCAL_DB  = 'mongodb://localhost/canyon-racer'
  , REMOTE_DB = process.env.MONGOHQ_URL;

mongoose.connect(REMOTE_DB || LOCAL_DB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.on('open', function() {
  console.log('MongoDB is connected to ' + db.name + '.');
});

var infoSchema = mongoose.Schema({
  beginnerStartCount:  Number,
  normalStartCount: Number,
  hellishStartCount: Number,
  beginnerWinCount:  Number,
  normalWinCount: Number,
  hellishWinCount: Number,
  hellishWinnerNames: Array
});

var Info = mongoose.model('Info', infoSchema, 'info');

exports.myInfo = Info;