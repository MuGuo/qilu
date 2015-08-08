var express = require('express');
var router = express.Router();
var users = require('./users');
var home = require('./home');
var formidable = require('formidable');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'public/ppt' });
var AVATAR_UPLOAD_FOLDER = '/ppt/';
var num = 0;    //�ļ�id
var check = 1;

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

router.post('/upload', function(req, res, next) {
  var form = new formidable.IncomingForm();   //�����ϴ���
  form.encoding = 'utf-8';        //���ñ༭
  form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //�����ϴ�Ŀ¼
  form.keepExtensions = true;     //������׺
  form.maxFieldsSize = 100 * 1024 * 1024;   //�ļ���С
  form.parse(req, function(err, fields, files) {

    if (err) {
      res.locals.error = err;
      res.status(500).end();
      return;
    }

    var extName = '';  //��׺��
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
      res.locals.error = 'ֻ֧��ppt��pptx��ʽ�ļ�';
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
          });  //������
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
      });  //������

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
