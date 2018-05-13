var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/document', {promiseLibrary: require('bluebird')})
  .then(()=> console.log('Соединенис БД установленно'))
  .catch((err)=> console.log(err));

var document = require('./routes/document');
var auth = require('./routes/auth');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/documents', express.static(path.join(__dirname, 'dist')));
app.use('/document', document);
app.use('/api/auth', auth);

app.use(function (req, res, next) {
    var err = new Error('Не найдено');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    console.log(err);

  if (req.app.get('env') !== 'development') {
    delete err.stack;
  }

  res.status(err.statusCode || 500).json(err);
});

module.exports = app;

