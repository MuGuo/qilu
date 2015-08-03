var express = require('express');
var router = express.Router();

router.get('/users', function(req, res, next) {
  res.render('users', {
    title: 'user',
    introduction: '爱PPT爱吐槽，就来有弹幕·PPT资源共享平台~爱PPT爱吐槽，就来有弹幕·PPT资源共享平台~爱PPT爱吐槽，就来有弹幕·PPT资源共享平台~'
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
