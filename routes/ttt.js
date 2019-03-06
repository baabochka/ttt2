var express = require('express');
var router = express.Router();
var wnr = undefined;
var mongoStore = require('../mongoSess');
const Users = require('../models/Users');
let mike = 'X', me = 'O';
/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendfile('public/tttname.html');
});
router.post('/', function (req, res, next) {

    var name = req.body.name;


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    today = mm + '/' + dd + '/' + yyyy;
    winner = "";
    res.render('tttboard', {name: name, date: today});
});
router.post('/play', function (req, res, next) {
    let move = req.body.move;
    console.log("User's move: " + move);
    console.log("1" + req.session.grid);

    if (!req.session.grid) {
        req.session.grid = [];
        for (let i = 0; i < 9; i++) {
            req.session.grid[i] = " ";
        }
    }
    let table = req.session.grid;

    if (move === null || move === undefined) {
        res.json({grid: table, winner: wnr});
        return;
    }
    table[move] = mike;
    // req.session.grid = table;

    checkwin(table, mike);
    console.log("2" + table + wnr);
    if (wnr === mike) {
        let usID = req.session.userID;
        let tmp_grid = [];
        // console.log("-1-1--winner--1-1-"+wnr);
        for (let i = 0; i < 9; i++) {
            tmp_grid[i] = req.session.grid[i];
        }
        let tmp_wnr = wnr;
        Users.findById(usID, function (err, user) {
            if (err) {
                res.json({status: 'ERROR'});
                return console.log(err);
            } else {
                user.scores = [user.scores[0]+1, user.scores[1], user.scores[2]];
                // console.log("----winner----"+tmp_wnr);
                user.games.push({id: user.games.length, start_date: new Date(), grid: tmp_grid, winner: tmp_wnr});
                user.save();
            }
        });

        res.json({grid: table, winner: wnr});
        for (let i = 0; i < 9; i++) {
            req.session.grid[i] = " ";
        }
        wnr = undefined;
        console.log("3" + req.session.grid);
        mongoStore.set(req.sessionID, req.session);
        return;
    }
    var tie = true;
    for (var i = 0; i < 9; i++) {
        if (table[i] === " ") {
            table[i] = me;
            tie = false;
            break;
        }
    }
    if (tie) {
        wnr = " ";
        let usID = req.session.userID;
        let tmp_grid = [];
        let tmp_wnr = wnr;
        for (let i = 0; i < 9; i++) {
            tmp_grid[i] = req.session.grid[i];
        }
        Users.findById(usID, function (err, user) {
            if (err) {
                res.json({status: 'ERROR'});
                return console.log(err);
            } else {
                user.scores = [user.scores[0], user.scores[1]+1, user.scores[2]];
                user.games.push({id: user.games.length, start_date: new Date(), grid: tmp_grid, winner: tmp_wnr});
                user.save();
            }
        });
    }
    checkwin(table, me);

    res.json({grid: table, winner: wnr});
    if (wnr !== undefined) {
        if (wnr === me) {
            let usID = req.session.userID;
            let tmp_grid = [];
            let tmp_wnr = wnr;
            for (let i = 0; i < 9; i++) {
                tmp_grid[i] = req.session.grid[i];
            }
            Users.findById(usID, function (err, user) {
                if (err) {
                    res.json({status: 'ERROR'});
                    return console.log(err);
                } else {
                    user.scores = [user.scores[0], user.scores[1], user.scores[2]+1];
                    user.games.push({id: user.games.length, start_date: new Date(), grid: tmp_grid, winner: tmp_wnr});
                    user.save();
                }
            });
        }
        for (let i = 0; i < 9; i++) {
            req.session.grid[i] = " ";
        }
        wnr = undefined;
    }
    console.log("4" + req.session.grid);
    mongoStore.set(req.sessionID, req.session);
});

function checkwin(grid, play) {
    if (grid[0] === grid[1] && grid[1] === grid[2] && grid[2] === play) {
        wnr = play;
    }
    if (grid[3] === grid[4] && grid[4] === grid[5] && grid[5] === play) {
        wnr = play;
    }
    if (grid[6] === grid[7] && grid[7] === grid[8] && grid[8] === play) {
        wnr = play;
    }
    if (grid[0] === grid[3] && grid[3] === grid[6] && grid[6] === play) {
        wnr = play;
    }
    if (grid[1] === grid[4] && grid[4] === grid[7] && grid[7] === play) {
        wnr = play;
    }
    if (grid[2] === grid[5] && grid[5] === grid[8] && grid[8] === play) {
        wnr = play;
    }
    if (grid[0] === grid[4] && grid[4] === grid[8] && grid[8] === play) {
        wnr = play;
    }
    if (grid[2] === grid[4] && grid[4] === grid[6] && grid[6] === play) {
        wnr = play;
    }
}

module.exports = router;
