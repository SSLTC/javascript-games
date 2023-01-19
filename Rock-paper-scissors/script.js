import { getRndInteger } from "../modules/getRndInteger.js";

const rock = "&#x270A;";
const paper = "&#x270B;"
const scissors = "&#x270C;"

const lstChoices = [rock, paper, scissors];

const questionMark = "&#x2753";

let randomChoice = lstChoices[getRndInteger(0, 2)];

let userChoice;
let listenKeyUp = true;

const onKeyUp = (e) => {

    if(listenKeyUp === false && e.code !== "KeyN") {return};
    
    switch(e.code) {
        case "KeyR":
            userChoice = lstChoices[0];
            break;
        case "KeyP":
            userChoice = lstChoices[1];
            break;
        case "KeyS":
            userChoice = lstChoices[2];
            break;
        case "KeyN":
            newGame();
            return;
    }

    listenKeyUp = false;

    playGame();

}

let scoreUser = 0;
let scoreComputer = 0;

const showChoices = (user, computer) => {
    const elChoices = document.querySelector("#choices");
    elChoices.innerHTML = scoreUser + ' ' + user + ' ' + computer + ' ' + scoreComputer;
}

const playGame = () => {

    let message;

    switch(true) {
        case (userChoice === randomChoice):
            message = "IT IS A DRAW!";
            break;

        case (userChoice === scissors && randomChoice === rock):
            message = "YOU LOSE!";
            scoreComputer += 1;
            break;
        
        case (userChoice === rock && randomChoice === scissors):
        case (userChoice > randomChoice):
            message = "YOU WON!";
            scoreUser += 1;
            break; 
        
        case (userChoice < randomChoice):
            message = "YOU LOSE!";
            scoreComputer += 1;
            break;
    }

    showChoices(userChoice, randomChoice)
    showMessage(`${message}<br/>Press (<b>N</b>) for new game`);
}

const showMessage = (msg) => {
    const elResult = document.querySelector("#result");

    if(msg.indexOf("WON") !== -1) {
        elResult.classList.add("greenBackgroundColor");
    } else if(msg.indexOf("DRAW") !== -1) {
        elResult.classList.add("orangeBackgroundColor");
    } else if(msg.indexOf("LOSE") !== -1) {
        elResult.classList.add("redBackgroundColor");
    } else {
        elResult.classList.remove("greenBackgroundColor");
        elResult.classList.remove("orangeBackgroundColor");
        elResult.classList.remove("redBackgroundColor");
    }

    elResult.innerHTML = msg;
}

const newGame = () => {
    showMessage("");
    showChoices(questionMark, questionMark);
    randomChoice = lstChoices[getRndInteger(0, 2)];
    listenKeyUp = true;
}

newGame()

document.body.addEventListener("keyup", onKeyUp);