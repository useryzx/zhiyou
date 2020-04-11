var express = require('express');
var User = require('../model/User');
var router = express.Router();

/* GET home page. */
router.get('/api/regist', function (req, res) {
  User.findOne(req.query).exec(function (err, data) {
    if (!err) {
      if (data) {
        res.json({
          err: 1,
        })
      }
      else {
        new User(req.query).save(function (err) {
          if (!err) {
            res.json({
              err: 0,
            })
          }
        })
      }
    }
  })
});
router.get('/api/login', function (req, res) {
  User.findOne(req.query).exec(function (err, data) {
    if (!err) {
      if (data) {
        res.json({
          err: 0,
          msg: data
        })
      }
      else {
        res.json({
          err: 1
        })
      }
    }
  })
});

module.exports = router;