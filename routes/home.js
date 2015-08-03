/**
 * Created by Amy on 2015/8/3.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('home', { title: 'Express' });
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