const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.querySelector('.winning-message')
const winningMessageTextElement = document.querySelector('[data-winning-message-text')
const restartButton = document.getElementById('restartButton')

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [0, 4, 8]
]

let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        // Only ever fire this eventListener once. Once we click on the element once, it will never fire again. 
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
    cellElements.forEach( x => {
        x.classList.remove(X_CLASS)
        x.classList.remove(CIRCLE_CLASS)
    })
    
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else{
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if(draw){
        // If isDraw() is true, draw becomes true and sends the string 'Draw!' into the winningMessageText
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        // if endGame(false), draw becomes false and sends the string O or X into the winningMessageTextElement
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    // Adds display flex to the winning message element 
    winningMessageElement.classList.add('show')
}

function isDraw() {
    // destructuring a nodelist to convert it and spread into an array of elements. Then, we check if each cell contains a class of either X or Circle. If all cells are filled with those classes, then endGame is true. 
return [...cellElements].every(cell =>{
    return cell.classList.contains(X_CLASS) || 
    cell.classList.contains(CIRCLE_CLASS)
})
}


function placeMark (cell,currentClass){
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else {
        board.classList.add(X_CLASS)
    }

}

function checkWin(currentClass){
    // some determines whether the callback functions returns true for any element in array
return WINNING_COMBINATIONS.some(combination => {
    // determines whether all members an array satisfy the specified test
    return combination.every(index => {
        return cellElements[index].classList.contains(currentClass)
    })
})
}



