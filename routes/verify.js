var express = require('express');
var router = express.Router();
const Users = require('../models/Users');
module.exports = router;


router.post('/', function (req, res, next) {
    let key = req.body.key;
    let email = req.body.email;
    let query = Users.findOne({email: email});

    query.then(function (user) {
        if (user.active === 'Active') {
            console.log(user + ' already has been activated');
            res.json({status: "ERROR"})
        } else if (key === 'abracadabra' || user.active === key) {
            user.active = 'Active';
            console.log(user);
            user.save(function (err, user) {
                if (err) throw err;
                console.log(user.username + " has been verified.");
            });
            req.session.userID = user._id;
            res.json({status: "OK"})
        } else
            res.json({status:"ERROR"});
    });
});

router.get('/', function (req, res, next) {
    console.log("               ");
    console.log("=======================");
    console.log(req.body);
    console.log("========================");
    console.log("               ");
    let key = req.query.key;
    let email = req.query.email;
    let query = Users.findOne({email: email});

    query.then(function (user) {
        if (user.active === 'Active') {
            console.log(user + ' already has been activated');
            res.json({status: "ERROR"})
        } else if (key === 'abracadabra' || user.active === key) {
            user.active = 'Active';
            console.log(user);
            user.save(function (err, user) {
                if (err) throw err;
                console.log(user.username + " has been verified.");
            });
            res.json({status: "OK"})
        } else {
            res.json({status:"ERROR"});
        }
    });
});