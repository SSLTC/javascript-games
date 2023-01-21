import deckOfCards from "./modules/deckOfCards.js";
import gameplay21cardGame from "./modules/21Rules.js";
import getRndInteger from "./modules/getRndInteger.js";

const drawCard = () => {
    const randomSuit = getRndInteger(0, 3);
    const randomCardOfSuit = getRndInteger(0, 12);
    
    const randomDrawnCard = deckOfCards[randomSuit].card[randomCardOfSuit];

    if(typeof randomDrawnCard == "undefined") {
        // draw again
        drawCard();
    }
    
    const removedCard = deckOfCards[randomSuit].card.splice(randomCardOfSuit, 1);

    //console.log(randomDrawnCard);
    //console.log(removedCard);

    return randomDrawnCard;
}


const cardsUser = [];
const cardsComputer = [];

const stickComputer = false;

let listenKeyUp = true;

const onKeyUp = (e) => {

    if(listenKeyUp === false && e.code !== "KeyN") {return};
    
    switch(e.code) {
        case "KeyH":
            cardsUser.push(drawCard());

            if(calculateTotal(cardsUser) > 21) {
                showMessage("YOU LOSE!");
                scoreComputer += 1;
            }

            showCards(cardsUser, "#cardsUser");

            if(stickComputer !== true) {
                cardsComputer.push(drawCard());

                if(calculateTotal(cardsComputer) > 21) {
                    showMessage("YOU WIN!");
                    scoreUser += 1;
                }
            }

            break;
        case "KeyS":
            // stick
            //playGame();
            break;
        case "KeyN":
            newGame();
            return;
    }

    //listenKeyUp = false;

}

const calculateTotal = (cards) => {
    // Pass an array

    const total = cards.reduce(funcTotal = (total, value) => {
        switch(value) {
            case ("J" || "Q" || "K"):
                value = 10;
        }

        return total + value;
    });

    return total;
}

const computerCalculation = () => {
    const total = calculateTotal(cardsComputer);



}

let scoreUser = 0;
let scoreComputer = 0;

const showCards = (cards, idCards) => {
    // Pass an array and a string

    const elCard = document.createElement("div");
    elCard.classList.add("card");
    elCard.innerHTML = cards[cards.length -1];

    const elCards = document.querySelector(idCards);
    elCards.appendChild(elCard);
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

    // Draw two cards to begin the game
    cardsUser.push(drawCard());
    showCards(cardsUser, "#cardsUser");
    cardsUser.push(drawCard());
    showCards(cardsUser, "#cardsUser");

    cardsComputer.push(drawCard());
    showCards(cardsComputer, "#cardsComputer");
    cardsComputer.push(drawCard());
    showCards(cardsComputer, "#cardsComputer");

    listenKeyUp = true;
}

//newGame()

document.body.addEventListener("keyup", onKeyUp);