var express = require('express');
var router = express.Router();
const Games = require('../models/Games');
const Users = require('../models/Users');
module.exports = router;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    let user = new Users(req.body);

    let us_id = user._id //get id

    // User.find({games: }, function(err, games) {
    //     if (err) {
    //         res.json({status: 'ERROR'});
    //         return console.log(err);
    //     }
    //
    //     res.json({status:'OK', games:[ {id:, start_date:}, …] })
    //
    // });

});