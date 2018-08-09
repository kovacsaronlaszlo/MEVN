const express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

const room = require('./routes/room'),
  chat = require('./routes/chat');

var app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/mevn-chat', { useNewUrlParser: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/rooms', express.static(path.join(__dirname, 'dist')));
app.use('/api/room', room);
app.use('/api/chat', chat);

// 404 elkapása, majd továbbküldése a hibakezelőnek
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// hibakezelő
app.use((err, req, res, next) => {
  // localok beállítása, csak hiba megtörténte után a fejlesztésben
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // hiba oldal rendererése
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
