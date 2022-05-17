const container = document.getElementById('gameBoard');
const gridArray = [];
const restartButton = document.getElementById('restartButton');
let nextMove = 'X';

/*
For every move:
    1. Determine if game ends or continues
    2. If end, determine if game is draw and add reset button, else continue
    3. If game is draw, display "Draw"
    4. If game isnt draw, display "Player ${} Wins!"
*/

restartButton.addEventListener('click', winningPlayer);

//determine whether game ends or continues
function gameOver(message) {
    document.getElementById('winner').innerHTML = message;
    container.style.display = 'none';
    document.getElementById('gameOver').style.display = 'block';
}
//determine if the game is a draw
function draw() {
    let shouldReturn = true;
    //loops through board to make sure all squares have a state assigned
    gridArray.forEach(({state}) => {
        if (state == '') shouldReturn = false; 
    });
    return shouldReturn;
}

//determine which player won
function winningPlayer() {
    //create a nested array with all the winning combinations
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    //loops through every line
    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        //determines if all three states in an array equal the same character
        if (
            gridArray[a].state !== '' &&
            gridArray[a].state === gridArray[b].state &&
            gridArray[a].state === gridArray[c].state
            ) {
                return true;
            }
        }
        return false;
    }
    
    
    //a constructor allows us to create and initiliaze objects for SquareClass
    class SquareClass {
        constructor(element, index) {
            this.element = element;
            this.index = index;
            this.state = '';
        }
        
        clicked() {
            //sets state to nextMove
            //removes notClicked class from square
            //sets onClick to return false
            this.state = nextMove;
            this.element.classList.remove('notClicked');
            this.element.onclick = () => {
                return false;
            };
            //insert X/O onto the board
            this.element.querySelector('p').innerHTML = this.state;
            //if statement to determine wether to display winningPlayer or draw function
            if(winningPlayer()) return gameOver(this.state + " wins!");
            if (draw()) return gameOver('Draw!');
            //tenerary statement to determine wether nextMove = X or O
            nextMove == 'X' ? (nextMove ='O') : (nextMove = 'X');
        }
    }
    
/*
for loop to create 9x9 box:
    creates 9 divs with a class of 'square'. 
    'notClicked' is used to add hover styling in CSS
    Creates new const "square" that calls on SquareClass constructor
    Adds p element to div, used to display "X" or "O"
    Gives square element of div & targets the current index
    Logs which squares have been clicked in the console
    Appends div to the board div
    Pushes square to gridArray
*/
for (let index = 0; index < 9; index++) {
    const div = document.createElement('div');
    div.classList.add('square', 'notClicked');
    const square = new SquareClass(div, index);
    div.onclick = () => {
        square.clicked();
    };
    div.appendChild(document.createElement('p'));
    container.appendChild(div);
    gridArray.push(square);
}


