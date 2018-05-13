var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Document = require('../models/Document')
var passport = require('passport')
require('../config/passport')(passport)

router.get('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    Document.find(function (err, documents) {
      if (err) return next(err)
      res.json(documents)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Не авторизован'})
  }
})
router.get('/:id', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    Document.findById(req.params.id, function (err, document) {
      if (err) return next(err)
      res.json(document)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Не авторизован'})
  }
})

router.post('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    Document.create(req.body, function (err, document) {
      if (err) return next(err)
      res.json(document)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Не авторизован'})
  }
})

router.post('/:id', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    Document.findByIdAndUpdate(req.params.id, req.body, function (err, document) {
      if (err) return next(err)
      res.json(document)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Не авторизован'})
  }
})

router.delete('/:id', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    Document.Book.findByIdAndRemove(req.params.id, function () {
      res.json('Deleted')
    })
  } else {
    return res.status(403).send({success: false, msg: 'Не авторизован'})
  }
})

module.exports = router
