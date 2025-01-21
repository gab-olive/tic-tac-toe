const gameBoard = function () {
    const winCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
    
        [0,3,6],
        [1,4,7],
        [2,5,8],
    
        [0,4,8],
        [2,4,6]
    ];

    const indexesOf = (arr, x) => 
        arr.reduce(
            (acc, cur, index) => (cur === x && acc.push(index), acc),
        [])

    const checkWin = (player) => {
        const playerIndexes = indexesOf(gameArray, player);
        for (let [a,b,c] of winCombinations) {
            if (playerIndexes.includes(a) && playerIndexes.includes(b) && playerIndexes.includes(c)){
                return true
            }
        }
    }

    const gameArray = [
        '','','',
        '','','',
        '','','']

    place = (player, i) => gameArray.splice(i, 1, player);

    return { place, gameArray, checkWin};

}();


const player = function() {

    const options = document.querySelectorAll(".options > button");
    let chosenPlayer = null;

    const getPlayer = function() {
        options.forEach(option => {
            option.addEventListener("click", () => {
                if (!chosenPlayer) {
                    option.style.backgroundColor = "#4DA1A9";
                    console.log(option.getAttribute("class"));
                    chosenPlayer = option.getAttribute("class");
                }
            });
        });
    };

    const getChosenPlayer = function() {
        return chosenPlayer;
    };

    return { getPlayer, getChosenPlayer };

};


const display = function() {
    const squares = document.querySelectorAll(".square")
    const playerModule = player()
    playerModule.getPlayer()
    let currentPlayer = null
    let gameStarted = false
    
    
    squares.forEach(square => {
        square.addEventListener("click", () => {

            if (!gameStarted){
            if (!currentPlayer) {
                currentPlayer = playerModule.getChosenPlayer();
                if (currentPlayer) {
                    gameStarted = true
                }
                else {
                    return
                }
            }
        }

        const squareID = square.getAttribute('id')
        function renderPlay(currentPlayer) {
            square.style.backgroundImage = `url(./images/${currentPlayer}.svg)`
        }    
        
        if (square.style.backgroundImage === ''){
        place(currentPlayer, squareID)
        renderPlay(currentPlayer)
    }

        if (gameBoard.checkWin(currentPlayer)) {
            console.log(`${currentPlayer} wins!`)
            return
        }

        currentPlayer = currentPlayer == "X" ? "O" : "X";

        })
       })
    }();



