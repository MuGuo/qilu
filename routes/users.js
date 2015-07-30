var express = require('express');
var router = express.Router();

router.get('/users', function(req, res, next) {
  res.render('users', {
    title: 'user',
    introduction: '爱PPT爱吐槽，就来有弹幕·PPT资源共享平台~爱PPT爱吐槽，就来有弹幕·PPT资源共享平台~爱PPT爱吐槽，就来有弹幕·PPT资源共享平台~'
  });
});

module.exports = router;
