var express = require('express');
var router = express.Router();
const Users = require('../models/Users');
module.exports = router;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendfile('public/tttlogin.html');
});
router.post('/', function(req, res, next) {
    let username = req.body.username;
    let pwd = req.body.pwd;

    Users.findOne({username: username, password: pwd}, function(err, user) {
        if (err) {
            res.json({status: 'ERROR'});
            return console.log(err);
        } else if (user.active !== 'Active' || !user) {
            res.json({status: 'ERROR'});
            return console.log(err);
        }

        let prev_sess = user.sess_id;
        user.sid = req.sessionID;
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
        res.json({status: 'OK'});
    });

});


//logout

router.post('/', function(req, res, next) {
    if(!req.session.userId) return res.json({status: 'ERROR'});
    res.clearCookie('ttt2');
    res.json({status: 'OK'});
});