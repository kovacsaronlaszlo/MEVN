const express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Room = require('../models/Room.js');

// get az összes szobát
router.get('/', (req, res, next) => {
  Room.find((err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

// get egy szobát ID alpján
router.get('/:id', (req, res, next) => {
  Room.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// szoba mentése
router.post('/', (req, res, next) => {
  Room.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// szoba frissítése
router.put('/:id', (req, res, next) => {
  Room.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// szoba törlése
router.delete('/:id', (req, res, next) => {
  Room.findByIdAndremove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  })
});

module.exports = router;
