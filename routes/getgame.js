var express = require('express');
var router = express.Router();
var wnr = undefined;
var mongoStore = require('../mongoSess');
const Users = require('../models/Users');

router.get('/', function (req, res, next) {
    res.sendfile('public/tttname.html');
});
router.post('/', function (req, res, next) {
    let usID = req.session.userID;
    let gameID = req.body.id;
    Users.findById(usID, function (err, user) {
        if (err) {
            res.json({status: 'ERROR'});
            return console.log(err);
        } else {
            console.log(user.games[gameID].winner);
            res.json({status:'OK', grid: user.games[gameID].grid, winner: user.games[gameID].winner});
        }
    });
});
module.exports = router;