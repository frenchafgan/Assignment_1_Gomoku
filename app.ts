enum Player {
    None,
    Black,
    White
}

class Gomoku {
    size: number;
    board: Player[][];
    currentPlayer: Player;
    boardElement: HTMLElement;
    gameOver: boolean;
    messageElement: HTMLElement;
    turnElement: HTMLElement;
    blackWins: number;
    whiteWins: number;
    blackWinsElement: HTMLElement;
    whiteWinsElement: HTMLElement;


    constructor(size: number, boardElementId: string, messageElementId: string, turnElementId: string, blackWinsElementId: string, whiteWinsElementId: string) {
        this.size = size;
        this.board = Array.from({ length: size }, () => Array(size).fill(Player.None));
        this.currentPlayer = Player.Black;
        this.boardElement = document.getElementById(boardElementId) as HTMLElement;
        this.gameOver = false;
        this.messageElement = document.getElementById(messageElementId) as HTMLElement;
        this.turnElement = document.getElementById(turnElementId) as HTMLElement;
        this.blackWins = 0;
        this.whiteWins = 0;
        this.blackWinsElement = document.getElementById(blackWinsElementId) as HTMLElement;
        this.whiteWinsElement = document.getElementById(whiteWinsElementId) as HTMLElement;
        this.blackWinsElement.innerText = `Black wins: ${this.blackWins}`;
        this.whiteWinsElement.innerText = `White wins: ${this.whiteWins}`;
    }

    play(x: number, y: number) {
        if (this.gameOver || this.board[y][x] !== Player.None) {
            return;
        }
        this.placeStone(x, y, this.currentPlayer);
    }

    placeStone(x: number, y: number, player: Player) {
        this.board[y][x] = player;
        this.render();
    
        if (this.checkForWin(x, y, player)) {
            this.gameOver = true;
            if (player === Player.Black) {
                this.blackWins++;
                this.blackWinsElement.innerText = `Black wins: ${this.blackWins}`;
            } else {
                this.whiteWins++;
                this.whiteWinsElement.innerText = `White wins: ${this.whiteWins}`;
            }
            this.messageElement.innerText = `${Player[player]} wins!`;
            this.messageElement.style.display = "block";
            this.turnElement.style.display = "none";
        } else if (this.isBoardFull()) {
            this.gameOver = true;
            this.messageElement.innerText = 'It\'s a tie!';
            this.messageElement.style.display = "block";
            this.turnElement.style.display = "none";
        } else {
            this.currentPlayer = this.currentPlayer === Player.Black ? Player.White : Player.Black;
            this.turnElement.innerText = `It's ${Player[this.currentPlayer]}'s turn`;
            this.turnElement.style.display = "block";
        }
    }


    isBoardFull(): boolean {
        return this.board.every(row => row.every(cell => cell !== Player.None));
    }

    checkForWin(x: number, y: number, player: Player): boolean {
        const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
        for (let [dx, dy] of directions) {
            let count = 0;
            for (let i = -4; i <= 4; i++) {
                const nx = x + i * dx;
                const ny = y + i * dy;
                if (nx >= 0 && ny >= 0 && nx < this.size && ny < this.size && this.board[ny][nx] === player) {
                    count++;
                    if (count === 5) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
        return false;
    }

    reset() {
        this.board = Array.from({ length: this.size }, () => Array(this.size).fill(Player.None));
        this.currentPlayer = Player.Black;
        this.gameOver = false;
        this.messageElement.style.display = "none";
        this.turnElement.innerText = `It's ${Player[this.currentPlayer]}'s turn`;
        this.turnElement.style.display = "block";
        this.render();
    }
    
    render() {
        this.boardElement.innerHTML = '';
        this.board.forEach((row, y) => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            row.forEach((cell, x) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                if (cell !== Player.None) {
                    const piece = document.createElement('span');
                    piece.classList.add(cell === Player.Black ? 'black' : 'white');
                    cellElement.appendChild(piece);
                }
                
                cellElement.addEventListener('click', () => {
                    if (!this.gameOver) {
                        this.play(x, y);
                    }
                });
                
                rowElement.appendChild(cellElement);
            });
            this.boardElement.appendChild(rowElement);
        });
    }
}


const startButton = document.getElementById('startGame') as HTMLButtonElement;
const sizeInput = document.getElementById('boardSize') as HTMLInputElement;
let gomoku: Gomoku;

startButton.addEventListener('click', () => {
    let size = parseInt(sizeInput.value, 10);
    if (size < 5) {
        alert('Board size can\'t be less than 5');
        return;
    }
    if (size > 25) {
        alert('Board size can\'t be greater than 25');
        return;
    } 
    size = size || 5;
    gomoku = new Gomoku(size, 'board', 'message', 'turn', 'blackWins', 'whiteWins');
    gomoku.render();
});

const resetButton = document.getElementById('reset') as HTMLButtonElement;
resetButton.addEventListener('click', () => gomoku.reset());

// Event listener for "Enter" key.
sizeInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        startButton.click();
    }
});
