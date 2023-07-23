 
import Gomoku from './Gomoku';

document.addEventListener('DOMContentLoaded', (event) => {
    let size = 5; // default board size
    let gomoku = new Gomoku(size, 'board', 'message', 'turn', 'blackWins', 'whiteWins');
    gomoku.render();

    const startButton = document.getElementById('startGame') as HTMLButtonElement;
    const sizeInput = document.getElementById('boardSize') as HTMLInputElement;
    const resetButton = document.getElementById('reset') as HTMLButtonElement;

    sizeInput.value = size.toString(); // default value

    startButton.addEventListener('click', () => {
        let inputSize = parseInt(sizeInput.value, 10);
        if (inputSize < 5) {
            alert('Board size can\'t be less than 5');
            return;
        }
        if (inputSize > 25) {
            alert('Board size can\'t be greater than 25');
            return;
        } 
        size = inputSize || size;
        gomoku = new Gomoku(size, 'board', 'message', 'turn', 'blackWins', 'whiteWins');
        gomoku.render();
    });

    // Event listener for "Enter" key.
    sizeInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            startButton.click();
        }
    });

    resetButton.addEventListener('click', () => gomoku.reset());
});
