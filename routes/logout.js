var express = require('express');
var router = express.Router();
const Users = require('../models/Users');
var mongoStore = require('../mongoSess');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//logout

router.post('/', function(req, res, next) {
    console.log("               ");
    console.log("=======================");
    console.log(req.body);
    console.log("========================");
    console.log("               ");
    if(!req.session.userId) {
        console.log("               ");
        console.log("=======================");
        res.json({status: 'ERROR'});
        console.log("========================");
        console.log("               ");
        return console.log(err);
    }
    res.clearCookie('tictactoe');
    console.log("               ");
    console.log("=======================");
    res.json({status: 'OK'});
    console.log("========================");
    console.log("               ");
});
module.exports = router;