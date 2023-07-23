import Gomoku from './Gomoku';

let gomoku: Gomoku;

const startButton = document.getElementById('startGame') as HTMLButtonElement;
const sizeInput = document.getElementById('boardSize') as HTMLInputElement;
const resetButton = document.getElementById('reset') as HTMLButtonElement;
resetButton.addEventListener('click', () => gomoku.reset());


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
    size = 5;
    gomoku = new Gomoku(size, 'board', 'message', 'turn', 'blackWins', 'whiteWins');
    gomoku.render();
});


// Event listener for "Enter" key.
sizeInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        startButton.click();
    }
});
