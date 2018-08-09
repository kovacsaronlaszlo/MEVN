const express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Chat = require('../models/Chat.js');

// get összes chat
router.get('/', (req,res,next) => {
  Chat.find((err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

// get egy chat ID alapján
router.get('/:id', (req, res, next) => {
  Chat.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// chat mentése
router.post('/', (req, res, next) => {
  Chat.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// chat frissítése
router.put('/:id', (req, res, next) => {
  Chat.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if(err) return next(err);
    res.json(post);
  });
});

// chat törlése
router.delete('/:id', (req, res, next) => {
  Chat.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if(err) return next(err);
    res.json(post);
  })
});


// home page
router.get('/', (req, res, next) => {
  res.send('Express RESful API Chat');
});

module.exports = router;
