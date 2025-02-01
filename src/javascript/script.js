import { minimax, result, terminal, winner } from "./ttt.js";

var turn = "X";
var human = "X";
var ai = "O";
var midGame = false;

var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function sleep(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function move(action) {
    board = result(board, action);
    updateBoard();
}

function updateBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`c${i}${j}`).innerText = board[i][j];
        }
    }
}

function resetBoard() {
    turn = "X";

    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    updateBoard();
}

function removeEvents() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`c${i}${j}`).onclick = null;
        }
    }
}

function setStatusBar(status) {
    document.getElementById("status-bar").innerText = status;
}

function removeChoiceEvents() {
    document.getElementById("choice-X").onclick = null;
    document.getElementById("choice-O").onclick = null;
}

async function acceptHumanChoice() {
    document.getElementById("choice-popup").style.display = "flex";

    const choiceX = document.getElementById("choice-X");
    const choiceO = document.getElementById("choice-O");

    await new Promise(resolve => {
        choiceX.onclick = () => {
            human = "X";
            ai = "O";
            removeChoiceEvents();
            resolve();
        };
        choiceO.onclick = () => {
            human = "O";
            ai = "X";
            removeChoiceEvents();
            resolve();
        }
    });
    document.getElementById("choice-popup").style.display = "none";
}

async function acceptRestart() {
    document.getElementById("restart-popup").style.display = "flex";

    await new Promise(resolve => {
        document.getElementById("restart").onclick = () => {
            resetBoard();
            document.getElementById("restart").onclick = null;
            resolve();
        };
    });
    document.getElementById("restart-popup").style.display = "none";
}

async function gameLoop() {

    while (true) {
        if (!midGame) {
            await acceptHumanChoice();
            midGame = true;
        }

        if (turn === human) {
            setStatusBar(`PLAY AS ${human}:`);

            await new Promise(resolve => {

                function handleClicks(i, j) {
                    document.getElementById(`c${i}${j}`).onclick = () => {
                        move([i, j]);
                        removeEvents();
                        resolve();
                    };
                }

                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (board[i][j] === "") {
                            handleClicks(i, j);
                        }
                    }
                }
            });
            turn = ai;
        }
        else {
            setStatusBar("AI is thinking...");
            await sleep(250);  // lol
            move(minimax(board));
            turn = human;
        }

        // game over
        if (terminal(board)) {
            midGame = false;
            const winnerr = winner(board);

            if (winnerr === ai) {
                setStatusBar("AI WON!");
            }
            else if (winnerr === null) {
                setStatusBar("IT'S A TIE!");
            }
            else {
                // lmao n3v3r gonna happen
                setStatusBar("YOU WON!");
            }

            await sleep(2000);
            await acceptRestart();
        }
    }
}

gameLoop();