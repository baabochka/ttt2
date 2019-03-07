var express = require('express');
var router = express.Router();
const Users = require('../models/Users');
var mongoStore = require('../mongoSess');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//logout

router.post('/', function (req, res, next) {
    console.log("session.userid " + req.session);
    if (!req.session.userID) {
        console.log("               ");
        console.log("=======================");
        console.log("========================");
        console.log("               ");
        res.json({status: 'ERROR'});
    } else {
        res.clearCookie('tictactoe');
        console.log("               ");
        console.log("=======================");
        res.json({status: 'OK'});
        console.log("========================");
        console.log("               ");
    }
});
module.exports = router;
