board = [
    ['','',''],
    ['','',''],
    ['','','']
];



function clicked(i, j) {
    
    updateBoard();
}

for (let i = 0; i < 3; i++) {
    for (let j =0; j < 3; j++) {
        document.getElementById(`c${i}${j}`).onclick = () => clicked(i, j);
    }
}

function updateBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`c${i}${j}`).innerText = board[i][j];
        }
    }
}