var express = require('express');
var router = express.Router();
var users = require('./users');
var home = require('./home');
var formidable = require('formidable');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'public/ppt' });
var AVATAR_UPLOAD_FOLDER = '/ppt/';
var num = 0;    //文件id
var check = 1;


router.use(function(req, res, next){
  if (req.cookies.name) {
    res.locals.logged = true;
    res.locals.name = req.cookies.name;
  } else {
    res.locals.logged = false;
  }
  next();
});

router.use(users);
router.use(home);

/* GET total page. */
router.get('/total', function(req, res, next) {
  console.log(req.cookies)
  var logged = false;
  var name = "";
  console.log(req.cookies);
  if (req.cookies.name && req.cookies.name != "") {
    logged = true;
    name = req.cookies.name;
  }
  res.render('total', { title: 'Express',logged: logged, name: name });
  //res.render('total', { title: 'Express'});
});

router.get('/look:num', function(req, res, next) {
  res.render('look', { title: 'Express',ppt_num: req.params.num});
});

router.post('/upload', function(req, res, next) {
  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 100 * 1024 * 1024;   //文件大小
  form.parse(req, function(err, fields, files) {

    if (err) {
      res.locals.error = err;
      res.status(500).end();
      return;
    }

    var extName = '';  //后缀名
    console.log(files.file.type);
    switch (files.file.type) {
      case 'application/vnd.ms-powerpoint':
        extName = 'ppt';
        break;
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        extName= 'pptx';
        break;
    }
    if(extName.length == 0){
      res.locals.error = '只支持ppt或pptx格式文件';
      res.json({
        message: 'failure'
      });
    }
    else{
     res.json({
        message:'success'
      });
    }

    if(check > 0) {
      fs.readFile('./public/id/id.txt','utf-8', function (err, data) {
        if (err) {
          console.log(err);
        }
        else {
          num = parseInt(data);
          console.log('num:'+ num);
          var avatarName = num + '.' + extName;
          var newPath = form.uploadDir + avatarName;

          console.log(newPath);
          fs.rename(files.file.path, newPath, function(err){
            if(err){
              console.log(err);
              return;
            }
          });  //重命名
          if(num >= 10000){
            num = 0;
          }
          fs.writeFile('./public/id/id.txt', num+1,'utf-8', function(err){
            if(err){
              console.log(err);
              return;
            }
          });
        }
      });
      check = 0;

    }
    else{
      num = num + 1;
      var avatarName = num + '.' + extName;
      var newPath = form.uploadDir + avatarName;

      console.log(newPath);
      fs.rename(files.file.path, newPath, function(err){
        if(err){
          console.log(err);
          return;
        }
      });  //重命名

      if(num >= 10000){
        num = 0;
      }
      fs.writeFile('./public/id/id.txt', num+1,'utf-8', function(err){
        if(err){
          console.log(err);
          return;
        }
      });
    }
  });

});


module.exports = router;
