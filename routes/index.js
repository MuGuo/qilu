var express = require('express');
var router = express.Router();
var users = require('./users');

router.use(users);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET user page. */


// /user
// /user/save
// /user/upload



module.exports = router;
