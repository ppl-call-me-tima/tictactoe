import { minimax, result, terminal, winner } from "./ttt.js";

var turn = "X";
var human = "X";  // should be able to choose
var ai = "O";  // again: dependent on above choice

var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function move(action) {
    const ret = result(board, action);

    if (ret === null) {
        console.log("invalid move");
        return;
    }

    board = ret;
    updateBoard();

    if (terminal(board)) {
        console.log("game over. " + winner(board) + " wins");
        resetBoard();
    }
}

function updateBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`c${i}${j}`).innerText = board[i][j];
        }
    }
}

function resetBoard() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    updateBoard();
}

async function gameLoop() {
    while (!terminal(board)) {
        console.log("game loop iteration");
        if (turn === human) {
            await new Promise(resolve => {

                function removeEvents() {
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            document.getElementById(`c${i}${j}`).onclick = null;
                        }
                    }
                }

                function handleClicks(i, j) {
                    document.getElementById(`c${i}${j}`).onclick = () => {
                        move([i, j]);
                        removeEvents();
                        resolve();
                    };
                }

                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        handleClicks(i, j);
                    }
                }
            });
            // flip the move
            console.log("human move");
            turn = ai;
        }
        else {
            // move(minimax(board));
            console.log("ai move");
            turn = human;
        }
    }
}

gameLoop();