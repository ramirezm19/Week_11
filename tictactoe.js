//creating the players//

const tiles = document.querySelectorAll(".tile");
const gatoX = "X";
const gatoO = "O";

//setting playerX as the starting player, didn't use const because we do want it to change//
let turn = gatoX;
let player = "";

//turn header//
function turnSwap() {
    if(player == gatoX){
        player = gatoO;
        $('#turnSwap').text('Es el turno de Gato X')
        
    }else{
        player = gatoX;
        $('#turnSwap').text('Es el turno de Gato O')
    }

}

//tracking where the markers go//
const boardState = Array(tiles.length);
boardState.fill(null);
    //console.log(boardState) -- tested that the tiles were empty//

//getting the elements from the HTML//
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startAgain);

//adding clicks to the tiles//
tiles.forEach((tile) => tile.addEventListener("click", tileClick));

//function to have pointer hover over a tile//
function hoveringText() {
    //removing all the hovers//
    tiles.forEach((tile) => {
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    })

    const hoverClass = `${turn.toLowerCase()}-hover`;

    tiles.forEach((tile)=> {
        if(tile.innerText == "") {
            tile.classList.add(hoverClass);
        }
    })
}

hoveringText()

//function for clicking on the tile and changing turns between players//
function tileClick(event) {
    turnSwap();
    if (gameOverArea.classList.contains("visible")) {
        return;
    }
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if (tile.innerText !="") {
        return;
    }
    if(turn === gatoX) {
        tile.innerText = gatoX;
        boardState[tileNumber-1] = gatoX;
        turn = gatoO;
    } else {
        tile.innerText = gatoO;
        boardState[tileNumber-1] = gatoO;
        turn = gatoX;
    }

    hoveringText();
    //calling the function that will declare who wins the game//
    declareWinner();
}

//need to say the different ways to fill tiles to win//
const winningCombos = [
   //combinations for the rows
    {combo: [1, 2, 3], strikeClass: "strike-row-1"},
    {combo: [4, 5, 6], strikeClass: "strike-row-2"},
    {combo: [7, 8, 9], strikeClass: "strike-row-3"},
    
    //combos for the columns
    {combo: [1, 4, 7], strikeClass: "strike-column-1"},
    {combo: [2, 5, 8], strikeClass: "strike-column-2"},
    {combo: [3, 6, 9], strikeClass: "strike-column-3"},

    //diagonals
    {combo: [1, 5, 9], strikeClass: "strike-diagonal-1"},
    {combo: [3, 5, 7], strikeClass: "strike-diagonal-2"},
];

//this function declares who wins the game and needs to iterate through all the combos. This function is being called w/i the tileClick function.//
function declareWinner() {
    //piece to check if there is a winning combination
    for(const winningCombo of winningCombos) {
        //console.log(winningCombo); <--was making sure it was working when clicking on the board

        //pulling the winning combo and the strike class from combos above//
        const {combo, strikeClass} = winningCombo
        const tileValue1 = boardState[combo[0]-1];
        const tileValue2 = boardState[combo[1]-1];
        const tileValue3 = boardState[combo[2]-1];

        if(tileValue1 != null && 
            tileValue1 === tileValue2 && 
            tileValue1 == tileValue3
        ) {
            strike.classList.add(strikeClass);
            gameOver(tileValue1);
            return;
        }
    }
    //part where need to check for draw//
    const allTilesFilled = boardState.every((tile) => tile != null);
    if(allTilesFilled) {
        gameOver(null);
    }
}

//function to work when the game is over//
function gameOver(winnerText) {
    let text = '¡Empate!';
    if (winnerText != null) {
        text = `¡El ganador es Gato ${winnerText}!`
    }
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
    gameOverText.setAttribute("class", "alert alert-dark");
}

//function to restart the game//
function startAgain(){
    strike.className = "strike";
    gameOverArea.className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = gatoX;
    hoveringText();
}