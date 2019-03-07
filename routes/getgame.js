var express = require('express');
var router = express.Router();
var wnr = undefined;
var mongoStore = require('../mongoSess');
const Users = require('../models/Users');

router.get('/', function (req, res, next) {
    res.sendfile('public/tttname.html');
});
router.post('/', function (req, res, next) {
    console.log("               ");
    console.log("=======================");
    console.log(req.body);
    console.log("========================");
    console.log("               ");
    let usID = req.session.userID;
    let gameID = req.body.id;
    Users.findById(usID, function (err, user) {
        if (err) {
            console.log("               ");
            console.log("=======================");
            res.json({status: 'ERROR'});
            console.log("========================");
            console.log("               ");
            return console.log(err);
        } else {
            console.log(user.games[gameID].winner);
            console.log("               ");
            console.log("=======================");
            res.json({status:'OK', grid: user.games[gameID].grid, winner: user.games[gameID].winner});
            console.log("========================");
            console.log("               ");

        }
    });
});
module.exports = router;