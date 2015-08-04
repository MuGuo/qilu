/**
 * Created by Amy on 2015/8/3.
 */

var express = require('express');
var router = express.Router();


var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '123456',
    database : 'qilu'
});

connection.connect();


router.get('/', function(req, res, next) {
    res.render('home', { title: 'Express' });
});

router.post('/land', function(req, res) {
    console.log(req.body.name);
    console.log(req.body.password);

    connection.query('SELECT * from `user` where email = ?', [req.body.name], function(err, rows) {
        // connected! (unless `err` is set)
        console.log(err);
        if (rows.length > 0 && rows[0].password == req.body.password) {
            res.json({
                message: 'success'
            });
        } else {
            res.json({
                message: 'failure'
            })
        }
    });
});

router.post('/register', function(req, res) {
    console.log(req.body.email);
    console.log(req.body.password);
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
            res.json({
                message: 'success'
            });
        }
    });
});
module.exports = router;