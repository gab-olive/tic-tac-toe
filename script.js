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
        return false
    }

    let gameArray = [
        '','','',
        '','','',
        '','','']

    place = (player, i) => gameArray.splice(i, 1, player);

    resetArray = () => gameArray = ['', '', '', '', '', '', '', '', ''];

    return { place, gameArray, checkWin, resetArray};

}();


const player = function() {

    const options = document.querySelectorAll(".X, .O");
    let chosenPlayer = null;

    const getPlayer = function() {
        options.forEach(option=> {
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

    const resetChosenPlayer = function() {
        chosenPlayer = null
        options.forEach(option => {option.style.backgroundColor = "#578E7E"})
    }

    return { getPlayer, getChosenPlayer, resetChosenPlayer };

};


const display = function() {
    const squares = document.querySelectorAll(".square")
    const reset = document.querySelector(".reset")
    const playerModule = player()
    playerModule.getPlayer()
    let currentPlayer = null
    let gameStarted = false
    let gameEnd = false
    
    
    reset.addEventListener("click", () => {
        console.log('Reset clicked');
        currentPlayer = null;
        gameStarted = false;
        gameEnd = false;
        playerModule.resetChosenPlayer()
        gameBoard.resetArray()

        squares.forEach(square => {
            square.style.backgroundImage = ''; 
            square.disabled = false; 
            square.style.backgroundColor = '';
        });
        playerModule.getPlayer();
    });

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


        if (gameEnd){
            return
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
            squares.forEach(square => {
                square.disabled = true
                square.style.backgroundColor = "grey"
        })
            alert(`${currentPlayer} wins!`)
            gameEnd = true
            return
        }

        currentPlayer = currentPlayer == "X" ? "O" : "X";

        })
       })
    }();



