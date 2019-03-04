var express = require('express');
var router = express.Router();
module.exports = router;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile('public/tttname.html');
});
router.post('/', function(req, res, next) {

    var name = req.body.name;
    var pwd = req.body.password;
    var email = req.body.email;
    console.log(name, pwd, email);
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    // Check if the user already exists
    var found = false;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ttt");
        var query = { name: name };
        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            if (result !== null) {
                found = true;
            }
            db.close();
        });
    });

    if (found === false) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("ttt");
            var myobj = {name: name, password: pwd, email: email, disabled: true};
            dbo.collection("users").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("New user added");
                db.close();
            });
        });
    }
});

