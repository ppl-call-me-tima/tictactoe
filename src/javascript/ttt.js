const INF = 1000

function player(board) {
    let empty_count = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                empty_count++;
            }
        }
    }

    if (empty_count % 2 == 0)
        return "O";
    else 
        return "X";
}

function actions(board) {
    let possible_actions = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                possible_actions.push([i, j]);
            }
        }
    }

    return possible_actions;
}

export function winner(board) {
    let winnerr = null;

    // check rows
    for (let i = 0; i < 3; i++) {
        let first_in_row = board[i][0];
        for (let j = 1; j < 3; j++) {
            if (board[i][j] === "" || board[i][j] != first_in_row) {
                break;
            }
            else if (j == 2) {
                winnerr = first_in_row;
                return first_in_row;
            }
        }
    }

    // check cols
    for (let j = 0; j < 3; j++) {
        let first_in_col = board[0][j];
        for (let i = 1; i < 3; i++) {
            if (board[i][j] === "" || board[i][j] != first_in_col) {
                break;
            }
            else if (i == 2) {
                winnerr = first_in_col;
                return winnerr;
            }
        }
    }

    // check leading diag
    let first_in_diag = board[0][0];
    
    if (first_in_diag !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        winnerr = first_in_diag;
        return winnerr;
    }

    // check antidiag
    let first_in_anti = board[2][0];

    if (first_in_anti !== "" && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
        winnerr = first_in_anti;
        return winnerr;
    }

    return winnerr;
}

export function terminal(board) {
    let winnerr = winner(board);
    
    if (winnerr === "X" || winnerr === "O") {
        return true;
    }

    let empty_count = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                empty_count++;
            }
        }
    }

    return empty_count === 0;
}

function utility(board) {
    let winnerr = winner(board);

    if (winnerr === "X") return +1;
    else if (winnerr == "O") return -1;
    else return 0;
}

function bestMoveAndUtility(board) {
    if (terminal(board)) return null;

    const currentPlayer = player(board);
    let bestMove = [];

    if (currentPlayer === "X") {
        var max_util = -INF;
    }
    else {
        var min_util = +INF;
    }

    actions(board).forEach((action) => {

        const next_board = result(board, action);

        if (terminal(next_board)) {

            const util = utility(next_board);

            if (currentPlayer === "X" && util > max_util) {
                max_util = util;
                bestMove = action;
            }
            else if (currentPlayer === "O" && util < min_util) {
                min_util = util;
                bestMove = action;
            }
        }
        else {
            const ret = bestMoveAndUtility(next_board, action);
            const nextBestMove = ret[0];
            const nextBestUtil = ret[1];

            if (currentPlayer === "X" && nextBestUtil > max_util) {
                max_util = nextBestUtil;
                bestMove = action;
            }
            else if (currentPlayer === "O" && nextBestUtil < min_util) {
                min_util = nextBestUtil;
                bestMove = action;
            }
        }

    });
    
    const bestUtility = currentPlayer === "X" ? max_util : min_util;
    return [bestMove, bestUtility];
}

export function minimax(board) {
    const ret = bestMoveAndUtility(board);

    if (ret === null) return null;
    return ret[0];
}

export function result(board, action) {

    var action_in_actions = false;
    
    actions(board).forEach((item) => {
        action_in_actions |= JSON.stringify(action) === JSON.stringify(item);
    });

    if (!action_in_actions) {
        return null;
    }

    let next_board = JSON.parse(JSON.stringify(board));
    next_board[action[0]][action[1]] = player(board);

    return next_board;
}