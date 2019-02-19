var express = require('express');
var router = express.Router();
var winner = "";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile('public/tttname.html');
});
router.post('/', function(req, res, next) {

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
router.post('/play', function(req, res, next) {
    var table = req.body.grid;
    checkwin(table,'O');
    console.log(table, winner)
    if (winner === 'O') {
        res.json({ grid: table, winner: winner });
        return;
    }
    var tie = true;
    for (var i = 0; i < 9; i++) {
        if (table[i] === "") {
            table[i] = "X";
            tie = false;
            break;
        }
    }
    if (tie) winner = " ";
    checkwin(table,'X');
        res.json({ grid: table, winner: winner });
});

function checkwin(grid, play) {
    if (grid[0] === grid[1] && grid[1] === grid[2] && grid[2] === play) {
        winner = play;
    }
    if (grid[3] === grid[4] && grid[4] === grid[5] && grid[5] === play) {
        winner = play;
    }
    if (grid[6] === grid[7] && grid[7] === grid[8] && grid[8] === play) {
        winner = play;
    }
    if (grid[0] === grid[3] && grid[3] === grid[6] && grid[6] === play) {
        winner = play;
    }
    if (grid[1] === grid[4] && grid[4] === grid[7] && grid[7] === play) {
        winner = play;
    }
    if (grid[2] === grid[5] && grid[5] === grid[8] && grid[8] === play) {
        winner = play;
    }
    if (grid[0] === grid[4] && grid[4] === grid[8] && grid[8] === play) {
        winner = play;
    }
    if (grid[2] === grid[4] && grid[4] === grid[6] && grid[6] === play) {
        winner = play;
    }
}

module.exports = router;
