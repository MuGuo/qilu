var express = require('express');
var router = express.Router();
var users = require('./users');
var home = require('./home');

router.use(users);
router.use(home);

/* GET total page. */
router.get('/total', function(req, res, next) {
  res.render('total', { title: 'Express' });
});

router.get('/look', function(req, res, next) {
  res.render('look', { title: 'Express' });
});

module.exports = router;
