/**
 * Created by Amy on 2015/8/3.
 */

var express = require('express');
var router = express.Router();


var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '211.87.226.168',
    user     : 'qilu',
    password : '..xiao',
    database : 'qilu'
});

connection.connect();

router.get('/', function(req, res, next) {
    console.log(req.cookies)
    var logged = false;
    var name = "";
    console.log(req.cookies);
    if (req.cookies.name && req.cookies.name != "") {
        logged = true;
        name = req.cookies.name;
    }
    res.render('home', { title: 'Express',logged: logged, name: name });
});

router.post('/land', function(req, res) {
    console.log(req.body.name);
    console.log(req.body.password);
    var name = req.body.name;

    connection.query('SELECT * from `user` where email = ?', [req.body.name], function(err, rows) {
        // connected! (unless `err` is set)
        console.log(err);
        if (rows.length > 0 && rows[0].password == req.body.password) {
            res.setHeader('Set-Cookie', "name=" + name);
            res.redirect('/');
            //res.json({
                //message: 'failure'
            //})
        } else {
            res.json({
                message: 'failure'
            })
        }
    });
});

// 评论
var comments = [{
    user: '',
    content: '啦啦啦啦啦啦',
    time: 0, // for danmu,
    datetime: new Date()
}];
router
    .route('/comments')
    .get(function(req, res){
        res.json(comments);
    })
    .post(function(req, res){
        comments.push(req.body);
        res.end();
    });


router.post('/register', function(req, res) {
    console.log(req.body.email);
    console.log(req.body.password);
    var name = req.body.email;
    connection.query('SELECT * from `user` where email = ?', [req.body.email], function(err, rows) {
        // connected! (unless `err` is set)
        console.log(rows);
        if (rows.length > 0) {
            res.json({
                message: 'failure'
            });
        } else {
            connection.query('insert into user(`email`,`password`) values(?,?)', [req.body.email,req.body.password], function(err, rows) {
                console.log(rows);
            });
            res.setHeader('Set-Cookie', "name=" + name);
            res.redirect('/');
            //res.json({
            //    message: 'success'
            //});
        }
    });
});


module.exports = router;