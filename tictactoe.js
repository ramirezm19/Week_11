//creating players and the combinations that win the game. The numbers represent the cell number//
const playerX = "x"
const playerO = "o"
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//Id'ing all of the elements we need from the html and giving them variables
const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winnerMessage')
const restartButton = document.getElementById('restartButton')
const winnerMessageTextElement = document.getElementById('winnerMessageText')

//Calling the function to start the game
startTTTGame()

//Setting up the restart Button so that when clicked, it restarts the game.
restartButton.addEventListener('click', startTTTGame)

//function to start the game
function startTTTGame() {
    isPlayerO_Turn = false
    cellElements.forEach(cell => {
        cell.classList.remove(playerX)
        cell.classList.remove(playerO)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

//function for what to do on the clicks
function handleCellClick(e) {
    const cell = e.target
    const currentClass = isPlayerO_Turn ? playerO : playerX
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

//function to hover over the board
function hoverOverBoard() {
    boardElement.classList.remove(playerX)
    boardElement.classList.remove(playerO)
    if (isPlayerO_Turn) {
        boardElement.classList.add(playerO)
    } else {
        boardElement.classList.add(playerX)
    }
}

//function to check the winner
function winnerCheck(currentClass) {
    return winningCombos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

//function to end the game.
function endGame(draw) {
    if (draw) {
        winningMessageElement.innerText = "We have a draw! / ¡Tenemos un empate!"
    } else {
        winnerMessageTextElement.innerText = `Player with ${isPlayerO_Turn ? "O's" : "X's"} wins! / El jugador con ${isPlayerO_Turn ? "O's" : "X's"} es el ganador`
    }
    winningMessageElement.classList.add('show')
}

//function for when there is a draw
function draw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(playerX) || cell.classList.contains(playerO)
    })
}

//to place the character on the board
function placeCharacter (cell, currentClass) {
    cell.classList.add(currentClass)
}

//to give turns to each player after the other player has already taken turn
function swap() {
    isPlayerO_Turn = !isPlayerO_Turn
}
