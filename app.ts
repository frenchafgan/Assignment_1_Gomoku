enum Player {
    None = 0,
    One = 1,
    Two = 2
}

export default class Gomoku {
    board: Player[][];
    currentPlayer: Player;
    gameActive: boolean;
    boardElement: HTMLElement;
    statusElement: HTMLElement;

    constructor(public width: number = 15, public height: number = 15) {
        this.boardElement = document.getElementById('board')!;
        this.statusElement = document.getElementById('status')!;
        this.reset();
        document.getElementById('reset')!.addEventListener('click', () => this.reset());
    }

    reset() {
        this.board = Array(this.height).fill(0).map(() => Array(this.width).fill(Player.None));
        this.currentPlayer = Player.One;
        this.gameActive = true;
        this.render();
    }

    // render() {
    //     this.boardElement.innerHTML = '';
    //     this.board.forEach((row, y) => {
    //         row.forEach((cell, x) => {
    //             const cellElement = document.createElement('div');
    //             cellElement.classList.add('cell');
    //             cellElement.classList.add(cell === Player.One ? 'B' : cell === Player.Two ? 'W' : '');
    //             cellElement.addEventListener('click', () => {
    //                 if (cell === Player.None && this.gameActive && this.makeMove(x, y)) {
    //                     const winner = this.checkWin();
    //                     if (winner !== Player.None) {
    //                         this.gameActive = false;
    //                         this.statusElement.textContent = `Player ${winner === Player.One ? 'Black' : 'White'} wins!`;
    //                     } else if (this.board.flat().every(cell => cell !== Player.None)) {
    //                         this.gameActive = false;
    //                         this.statusElement.textContent = `Game is a draw`;
    //                     } else {
    //                         this.statusElement.textContent = `Player ${this.currentPlayer === Player.One ? 'Black' : 'White'}'s turn`;
    //                     }
    //                 }
    //             });
    //             this.boardElement.appendChild(cellElement);
    //         });
    //         this.boardElement.appendChild(document.createElement('br'));
    //     });
    // }
    render() {
        this.boardElement.innerHTML = '';
        this.board.forEach((row, y) => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            row.forEach((cell, x) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                const piece = document.createElement('span');
                piece.classList.add(cell === Player.One ? 'black' : cell === Player.Two ? 'white' : 'empty');
                cellElement.appendChild(piece);
                cellElement.addEventListener('click', () => {
                    if (cell === Player.None && this.gameActive && this.makeMove(x, y)) {
                        const winner = this.checkWin();
                        if (winner !== Player.None) {
                            this.gameActive = false;
                            this.statusElement.textContent = `Player ${winner === Player.One ? 'Black' : 'White'} wins!`;
                        } else if (this.board.flat().every(cell => cell !== Player.None)) {
                            this.gameActive = false;
                            this.statusElement.textContent = `Game is a draw`;
                        } else {
                            this.statusElement.textContent = `Player ${this.currentPlayer === Player.One ? 'Black' : 'White'}'s turn`;
                        }
                    }
                });
                rowElement.appendChild(cellElement);
            });
            this.boardElement.appendChild(rowElement);
        });
    }



    makeMove(x: number, y: number): boolean {
        this.board[y][x] = this.currentPlayer;
        this.currentPlayer = 3 - this.currentPlayer;
        this.render();
        return true;
    }

    checkWin(): Player {

        return Player.None;
    }
}

window.onload = () => {
    const game = new Gomoku(5, 5);
};
