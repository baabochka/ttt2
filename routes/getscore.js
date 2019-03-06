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
    Users.findById(usID, function (err, user) {
        if (err) {
            res.json({status: 'ERROR'});
            return console.log(err);
        } else {
            res.json({status:'OK', human:user.scores[0], wopr: user.scores[2], tie: user.scores[1]});
        }
    });
});
module.exports = router;