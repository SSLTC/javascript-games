import { getRndInteger } from "../modules/getRndInteger.js";

const lstChoices = ["&#x270A;", "&#x270B;", "&#x270C;"];
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

const showChoices = (user, computer) => {
    const elChoices = document.querySelector("#choices");
    elChoices.innerHTML = user + ' ' + computer;
}

const playGame = () => {

    showChoices(userChoice, randomChoice)

    let message;

    switch(true) {
        case (userChoice === randomChoice):
            message = "IT IS A DRAW!";
            break;
        case (userChoice > randomChoice):
            message = "YOU WON!";
            break;
        case (userChoice < randomChoice):
            message = "YOU LOSE!";
            break;
    }

    showMessage(`${message}<br/>Press (<b>N</b>) for new game`);
}

const showMessage = (msg) => {
    const elResult = document.querySelector("#result");
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