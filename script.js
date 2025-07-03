const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function checkWin() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            
            gameActive = false;

            if (board[a] === 'X') {
                setTimeout(() => {
            alert("Вы победили!");
            restartGame();
        }, 500);
            } else {
               setTimeout(() => {
            alert("Вы проиграли!");
            restartGame();
        }, 500);
            }
            
            return;
        }
    }
    if (!board.includes('')) {
        gameActive = false;
        alert('Ничья!');
    }
}


function handleClick(e) {
    const index = e.target.dataset.index - 1;

    if (board[index] || !gameActive || currentPlayer !== 'X') return;

    makeMove(index, 'X');
    
    if (gameActive) {
        setTimeout(botMove, 500); // Задержка, чтоб было видно ход игрока
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add('disabled');
    checkWin();
    currentPlayer = player === 'X' ? 'O' : 'X';
}

function botMove() {
    
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        let line = [board[a], board[b], board[c]];

        if (line.filter(x => x === 'O').length === 2 && line.includes('')) {
            const emptyIndex = combo[line.indexOf('')];
            makeMove(emptyIndex, 'O');
            return;
        }
    }

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        let line = [board[a], board[b], board[c]];

        if (line.filter(x => x === 'X').length === 2 && line.includes('')) {
            const emptyIndex = combo[line.indexOf('')];
            makeMove(emptyIndex, 'O');
            return;
        }
    }

    let available = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    
    if (available.length === 0) return;

    const randomIndex = available[Math.floor(Math.random() * available.length)];
    makeMove(randomIndex, 'O');
}



function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
