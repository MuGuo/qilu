/**
 * Created by Amy on 2015/8/3.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('home', { title: 'Express' });
});

router.post('/land', function(req, res) {
    console.log(req.body.name);
    console.log(req.body.password);
    if (req.body.name == 'amy') {
        res.json({
            message: 'success'
        });
    } else {
        res.json({
            message: 'failure'
        })
    }
});

router.post('/register', function(req, res) {
    console.log(req.body.email);
    console.log(req.body.password);
    if (req.body.email != 'amy') {
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