var mongoose = require('mongoose')
var passport = require('passport')
var settings = require('../config/settings')
require('../config/passport')(passport)
var express = require('express')
var jwt = require('jsonwebtoken')
var router = express.Router()
var User = require('../models/Users')

router.post('/register', function (req, res) {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Все поля необходимо заполнить'})
  } else {
    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    newUser.save(function (err) {
      if (err) {
        return res.json({success: false, msg: 'Таколь бользователь уже зарегистрирован'})
      }
      res.json({success: true, msg: 'Новый пользователь создан'})
    })
  }
})
router.post('/login', function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err

    if (!user) {
      res.status(401).send({success: false, msg: 'Аутентификация, не удалась. Такого пользователя нет'})
    } else {
      User.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user.toJSON(), settings.secret)
          res.json({success: true, token: 'JWT ' + token})
        } else {
          res.status(401).send({success: false, msg: 'Аутентификация, не удалась. Не верный пароль'})
        }
      })
    }
  })
})

module.exports = router
