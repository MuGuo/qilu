var express = require('express');
var router = express.Router();
var users = require('./users');
var home = require('./home');

router.use(users);
router.use(home);

/* GET total page. */
router.get('/total', function(req, res, next) {

  console.log(req.query);
  res.render('total', { title: 'Express' });
});

router.get('/look:num', function(req, res, next) {
  res.render('look', { title: 'Express',ppt_num: req.params.num});
});


module.exports = router;
