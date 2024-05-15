const game = document.getElementById('gridBox')
const snake = document.getElementById('snake')
const tailLenghtDisplay = document.getElementById('tailLenghtDisplay')
let snakePosition = 45
let tail = []
let lastPositions = [];


for (let i = 0; i < 100; i++) {

    const square = document.createElement('div')
    square.className = 'square'
    game.append(square)
    if (i === 45) {
        square.append(snake)
    }
}

const squares = game.querySelectorAll('.square')

function food () {
    const randomNumber = Math.floor(Math.random() * 100)
    if (!squares[randomNumber].className.includes('poison')) {
        squares[randomNumber].className += ' food'
    }else {
        squares[randomNumber +10].className += ' food'
    }
}
function poison () {
    const randomNumber = Math.floor(Math.random() * 100)
    if (!squares[randomNumber].className.includes('food')) {
        squares[randomNumber].className += ' poison'
    }else {
        squares[randomNumber +10].className += ' poison'
    }
}

poison()
food()

function moveSnake(direction) {
    // Store the previous position of the snake
    lastPositions.unshift(snakePosition);

    // If the tail length is greater than the number of last positions, remove the extra positions
    if (lastPositions.length > tail.length + 1) {
        lastPositions.pop();
    }

    // Clear the entire grid
    squares.forEach(square => {
        square.style.backgroundColor = '#6f9653';
        square.style.border = 'none'
    });

    // Update the tail segments starting from the second one
    for (let i = 1; i < tail.length+1; i++) {
        const tailPos = lastPositions[lastPositions.length - (i+1)];
        squares[tailPos].style.backgroundColor = 'green';
        squares[tailPos].style.borderRadius = '60%';
        squares[tailPos].style.border = '3px solid brown';
    }
    let lastKey = ''
    console.log(lastKey)
    // Move the snake based on the direction
    switch(direction) {
        case 'ArrowUp':
            // Check if moving up is within the grid bounds
            if (snakePosition >= 10 && lastKey !== 'down') {
                snakePosition -= 10;
                lastKey = 'up'
                snake.className = 'snakeUp'
            } else {
                snakePosition += 90;
                lastKey = 'up'
                snake.className = 'snakeUp'
            }
            break;
        case 'ArrowDown':
            // Check if moving down is within the grid bounds
            if (snakePosition < 90 && lastKey !== 'up') {
                snakePosition += 10;
                lastKey = 'down'
                snake.className = 'snakeDown'
            } else {
                snakePosition -= 90;
                lastKey = 'down'
                snake.className = 'snakeDown'
            }
            break;
        case 'ArrowLeft':
            // Check if moving left is within the grid bounds
            if (snakePosition % 10 !== 0 && lastKey !== 'right') {
                snakePosition--;
                lastKey = 'left'
                snake.className = 'snakeLeft'
            } else {
                snakePosition += 9;
                lastKey = 'left'
                snake.className = 'snakeLeft'
            }
            break;
        case 'ArrowRight':
            // Check if moving right is within the grid bounds
            if ((snakePosition + 1) % 10 !== 0 && lastKey !== 'left') {
                snakePosition++;
                lastKey = 'right'
                snake.className = 'snakeRight'
            } else {
                snakePosition -= 9;
                lastKey = 'right'
                snake.className = 'snakeRight'
            }
            break;
    }


    if (squares[snakePosition].className.includes('food')) {
        squares[snakePosition].className = 'square';
        tail.push('0'); // Add a new element to the tail array
        tailLenghtDisplay.innerHTML = `Tail Lenght: ${tail.length}`
        food();
    }
    if (squares[snakePosition].className.includes('poison')) {
        squares[snakePosition].className = 'square';
        tail.pop()
        lastPositions.pop();
        tailLenghtDisplay.innerHTML = `Tail Lenght: ${tail.length}`
        poison()
    }

    if (squares[snakePosition].style.backgroundColor === 'green') {
        clearInterval(intervalId);
        alert('Game over!');
        location.reload()
        return;
    }

    squares[snakePosition].append(snake);
}






let intervalId; // Define intervalId outside the event listener to make it accessible globally
let currentDirection; // Variable to store the current direction of the snake

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            if (!isOppositeDirection(currentDirection, event.key)) { // Check if the new direction is not opposite to the current direction
                currentDirection = event.key; // Update the current direction
                clearInterval(intervalId); // Clear the interval
                intervalId = setInterval(function () {
                    moveSnake(currentDirection); // Move the snake in the current direction
                    console.log(tail.length)
                }, 200);
            }
            break;
        default:
            clearInterval(intervalId); // Clear the interval for other keys
    }
});

function isOppositeDirection(dir1, dir2) {
    // Function to check if dir2 is opposite to dir1
    return (dir1 === 'ArrowUp' && dir2 === 'ArrowDown') ||
        (dir1 === 'ArrowDown' && dir2 === 'ArrowUp') ||
        (dir1 === 'ArrowLeft' && dir2 === 'ArrowRight') ||
        (dir1 === 'ArrowRight' && dir2 === 'ArrowLeft');
}




