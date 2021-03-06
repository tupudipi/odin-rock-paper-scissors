const playerButtons = Array.from(document.querySelectorAll(".player-buttons > *"));
playerButtons.forEach(button => button.addEventListener('click', playRound));
const allButtons = Array.from(document.getElementsByTagName('button'));
const playerPickTag = document.getElementsByClassName('player-pick')[0];
const computerPickTag = document.getElementsByClassName('computer-pick')[0];
const roundResultTag = document.getElementsByClassName('round-result')[0];
const playerScoreTag = document.getElementById('player-score');
const computerScoreTag = document.getElementById('computer-score');
const restartTag = document.getElementsByClassName('restart')[0];
const restartButton = document.createElement('button');
const vsTag = document.getElementsByClassName('vs')[0];

function endGame() {
    restartButton.textContent = 'restart';
    restartButton.className = 'restart-button';
    restartButton.addEventListener('click', restartGame);
    restartTag.appendChild(restartButton);
    allButtons.forEach(button => button.classList = '');
    playerPickTag.textContent = '';
    computerPickTag.textContent = '';
    vsTag.textContent = '';
}

function restartGame(){
    playerButtons.forEach(button => button.disabled = false);
    playerScoreTag.textContent = '0';
    computerScoreTag.textContent = '0';
    roundResultTag.textContent = '';
    vsTag.textContent = '';
    restartTag.removeChild(restartButton);
}

function computerPlay() {
    let array = ['rock', 'paper', 'scissors'];
    let random = Math.floor(Math.random() * array.length);
    return array[random];
}

function playerPlay(e) {
    switch (e.target.id) {
        case 'player-rock':
            return 'rock';
        case 'player-paper':
            return 'paper';
        case 'player-scissors':
           return 'scissors';
    }
}

function decideRound(player, computer){
    switch(player){
        case 'rock':
             switch(computer){
                case 'rock':
                    return "It's a tie!";
                case 'paper':
                    computerScoreTag.textContent = Number(computerScoreTag.textContent) + 1;
                    return "You lose this round!";
                case 'scissors':
                    playerScoreTag.textContent = Number(playerScoreTag.textContent) + 1;
                    return "You win this round!";
            }
        case 'paper':
            switch(computer){
                case 'rock':
                    playerScoreTag.textContent = Number(playerScoreTag.textContent) + 1;
                    return "You win this round!";
                case 'paper':
                    return "It's a tie!";
                case 'scissors':
                    computerScoreTag.textContent = Number(computerScoreTag.textContent) + 1;
                    return "You lose this round!";
            }
        case 'scissors':
            switch(computer){
                case 'rock':
                    computerScoreTag.textContent = Number(computerScoreTag.textContent) + 1;
                    return "You lose this round!";
                case 'paper':
                    playerScoreTag.textContent = Number(playerScoreTag.textContent) + 1;
                    return "You win this round!";
                case 'scissors':
                    return "It's a tie!";
            }
    }
}

function playRound(e) {
    allButtons.forEach(button => button.classList = '');

    let computerPick = computerPlay();
    let playerPick = playerPlay(e);

    let computerPickButton = document.getElementById(`computer-${computerPick}`);
    let playerPickButton = document.getElementById(`player-${playerPick}`);
    playerPickButton.classList += 'selected';
    computerPickButton.classList += 'selected';

    playerPickTag.textContent = playerPick;
    computerPickTag.textContent = computerPick;
    vsTag.textContent = 'vs';

    roundResultTag.textContent = decideRound(playerPick, computerPick);

    if(playerScoreTag.textContent == 5){
        roundResultTag.textContent = "You won!";
        playerButtons.forEach(button => button.disabled = true);
        endGame();
    } 
    else if (computerScoreTag.textContent == 5) {
        roundResultTag.textContent = "You lost! :(";
        playerButtons.forEach(button => button.disabled = true);
        endGame();
    }
}

