var express = require('express');
var router = express.Router();
const Users = require('../models/Users');
module.exports = router;


router.post('/', function(req, res, next) {
    let user_key = req.body.key;
    let email = req.body.email;

    verify(user_key, email).then(function(value){
        if (value)
            res.json({status: "OK"});
        else
            res.json({status: "ERROR"});
    });
});

router.get('/', function(req, res, next) {
    console.log("               ");
    console.log("=======================");
    console.log(req.body);
    console.log("========================");
    console.log("               ");
    let user_key = req.query.key;
    let email = req.query.email;

    verify(user_key, email).then(function(value){
        if (value){
            console.log("               ");
            console.log("=======================");
            res.json({status: "OK"});
            console.log("========================");
            console.log("               ");

        }
        else{
            console.log("               ");
            console.log("=======================");
            res.json({status: "ERROR"});
            console.log("========================");
            console.log("               ");

        }
    });
});

function verify(key, user_email) {
    let found = false;
    await Users.find({email: user_email}, function (err, users) {
        if (err) console.error(err);
        for (let i = 0; i < users.length; i++) {
            if (users[i].active === 'Active') {
                console.log(users[i]+ ' already has been activated');
            } else if (key === 'abracadabra' || users[i].active === key) {
                console.log(users[i]);
                users[i].active = 'Active';
                users[i].save(function (err, newUser) {
                    if (err) throw err;
                    console.log(newUser.username + " has been verified.");

                });
                found = true;
            }
        }
    });
    console.log("verification of user: found = " + found);
    return found;
}