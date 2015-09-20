var express = require('express');
var router = express.Router();

router.get('/users', function(req, res, next) {
  console.log(req.cookies)
  var logged = false;
  var name = "";
  console.log(req.cookies);
  if (req.cookies.name && req.cookies.name != "") {
    logged = true;
    name = req.cookies.name;
  }
  res.render('users', {
    title: 'user',
    introduction: '爱PPT爱吐槽，就来有弹幕·PPT资源共享平台~',logged: logged, name: name
  });
});

router.post('/users/info', function(req, res) {
  // req.body

  console.log(req.body);
  console.log(typeof req.body);
  console.log(req.body.name);
  if (req.body.name == 'seal') {
    res.json({
      message: 'success'
    });
  } else {
    res.json({
      message: 'failure'
    })
  }

});
module.exports = router;
