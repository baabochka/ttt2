var table;
var winner = false;
function make_move(num) {
    if (winner) return;
    $("#" + num).text("O");
    table = [];
    for (let i = 0; i < 9; i++) {
        table[i] = $("#" + i).text();
    }
    $.ajax({
        method: "POST",
        url: "/ttt/play",
        data: JSON.stringify({grid: table}),
        contentType: 'application/json; charset=UTF-8',
        success: response
    });

}

function response(resp) {
    if (resp.winner !== '') winner = true;
    for (let j = 0; j < 9; j++) {
        $("#" + j).text(resp.grid[j]);
    }
}