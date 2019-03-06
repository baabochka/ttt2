var express = require('express');
var router = express.Router();
const Users = require('../models/Users');
var mongoStore = require('../mongoSess');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//logout

router.post('/', function(req, res, next) {
    if(!req.session.userId) return res.json({status: 'ERROR'});
    res.clearCookie('tictactoe');
    res.json({status: 'OK'});
});
module.exports = router;