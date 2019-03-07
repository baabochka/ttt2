var express = require('express');
var router = express.Router();
const Users = require('../models/Users');
var mongoStore = require('../mongoSess');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendfile('public/tttlogin.html');
});
router.post('/', function(req, res, next) {
    console.log("               ");
    console.log("=======================");
    console.log(req);
    console.log("========================");
    console.log("               ");
    let username = req.body.username;
    let pwd = req.body.password;
    console.log("I got " + username + " and " + pwd + " Lets find it in database");
    Users.findOne({username: username, password: pwd}, function(err, user) {
        console.log("I got this user: " + user);
        if (user === null) {
            console.log("               ");
            console.log("=======================");
            res.json({status: 'ERROR'});
            console.log("========================");
            console.log("               ");
            return console.log(err);
        }
        else if (err) {
            console.log("               ");
            console.log("=======================");
            res.json({status: 'ERROR'});
            console.log("========================");
            console.log("               ");
            return console.log(err);
        } else if (user.active !== 'Active' || !user) {
            console.log("               ");
            console.log("=======================");
            res.json({status: 'ERROR'});
            console.log("========================");
            console.log("               ");
            return console.log(err);
        }

        let prev_sess = user.sess_id;
        console.log("Previous session here: " + prev_sess);
        user.sid = req.sessionID;
        console.log("req.sessionID: " + user.sid);
        req.session.userID = user._id;
        if (prev_sess) {
            mongoStore.get(prev_sess, function(err, session){
                if (err) console.log(err);
                if (session) req.session.grid = session.grid;
                user.save(function(err) {
                    if (err) return console.log(err);
                    console.log("Saving your progress");
                    mongoStore.set(req.sessionID, req.session);
                });
            });
        }
        console.log("               ");
        console.log("=======================");
        res.json({status: 'OK'});
        console.log("========================");
        console.log("               ");
    });

});



module.exports = router;