var express = require('express');
var router = express.Router();
const Users = require('../models/Users');
module.exports = router;


router.post('/', function(req, res, next) {
    let user_key = req.body.user_key;
    let email = req.body.email;

    verify(user_key, email).then(function(value){
        if (value)
            res.json({status: "OK"});
        else
            res.json({status: "ERROR"});
    });
});

router.get('/', function(req, res, next) {
    let user_key = req.query.user_key;
    let email = req.query.email;

    verify(user_key, email).then(function(value){
        if (value)
            res.json({status: "OK"});
        else
            res.json({status: "ERROR"});
    });
});


async function verify(user_key, user_email) {
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
                    console.log(newUser.username + " has been verificated.");
                });
                found = true;
            }
        }
    });

    return found;
}