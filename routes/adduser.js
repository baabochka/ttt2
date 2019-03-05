    var express = require('express');
    var router = express.Router();
    module.exports = router;
    const nodemailer = require('nodemailer');
    const Users = require('../models/Users');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile('public/tttname.html');
});
router.post('/', function(req, res, next) {

    var username = req.body.username;
    var pwd = req.body.password;
    var email = req.body.email;
    console.log(username, pwd, email);
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";


    // Check if the user already exists
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("tictactoe");
        var query = { username: username };
        dbo.collection("users").count(query)
            .then ((count) => {
            if (count > 0) {
                console.log("User found.");
                db.close();
            } else {
                console.log("User NOT found.");
                let newUser = new Users(req.body);
                newUser.active = user_key();
                newUser.save(function (err, res) {
                    if (err) throw err;
                    console.log("New user added");
                });
                console.log("Creating transporter...");
                let transporter = nodemailer.createTransport({
                    service: "Yahoo",
                    port: 465,
                    service: 'yahoo',
                    secure: false,
                    auth: {
                        user: 'smartypantsttt@yahoo.com',
                        pass: 'shmartyparty'
                    }
                });
                console.log("====  "+newUser.email);
                let mailOptions = {
                    from: 'smartypantsttt@yahoo.com',
                    to: newUser.email,
                    subject: 'Tic Tac Toe account verification',
                    text: 'Please follow this link to verify your account http://localhost:3000/verify?email=' + newUser.email + "&user_key=" + user.active
                };
                transporter.sendMail(mailOptions, function(err, info) {
                    if (err) {
                        res.json({status: 'ERROR'});
                        return console.log(err)
                    }
                    console.log('Email %s has been sent: %s', info.messageId, info.response);
                    res.json({status: 'OK'});
                });

                // var myobj = {username: username, password: pwd, email: email, active: false};
                // dbo.collection("users").insertOne(myobj, function (err, res) {
                //     if (err) throw err;
                //     console.log("New user added");
                //
                //     // req.sendfile('public/verifpage.html');
                //     db.close();
                // });
            }
        });
    });
});

function user_key() {
    let key = "";
    key = Math.random().toString(36).substring(7);
    return key;
}