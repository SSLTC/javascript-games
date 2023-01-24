import deckOfCards from "./modules/deckOfCards.js";
import gameplay21cardGame from "./modules/21Rules.js";
import getRndInteger from "./modules/getRndInteger.js";

const cardsUser = [];
const cardsComputer = [];

let shuffledDeckOfCards;

let stickUser = false;
let stickComputer = false;

let scoreUser = 0;
let scoreComputer = 0;

let endGame = true;

const setInitialValues = () => {

    cardsUser.length = 0;
    cardsComputer.length = 0;

    showCards(cardsUser, "#cardsUser");
    showCards(cardsComputer, "#cardsComputer");

    showMessage("");

    shuffledDeckOfCards = structuredClone(deckOfCards);

    stickComputer = false;
}

const drawCard = () => {

    let randomSuit = 0;
    let randomCardOfSuit = 0;
    let randomDrawnCard = "";

    do {
        randomSuit = getRndInteger(0, 3);
        randomCardOfSuit = getRndInteger(0, 12);
        
        randomDrawnCard = shuffledDeckOfCards[randomSuit].card[randomCardOfSuit];

    } while (typeof(randomDrawnCard) === "undefined");

    const removedCard = shuffledDeckOfCards[randomSuit].card.splice(randomCardOfSuit, 1);

    return randomDrawnCard;
}

const onKeyUp = (e) => {

    if(endGame === true && e.code !== "KeyN") { return };
    
    switch(e.code) {
        case "KeyH":

            drawUser();

            drawComputer();

            break;

        case "KeyS":

            if(stickComputer === true) 
            { 
                showHands();

            } else {
                stickUser = true;
                // do loop until stick computer
                drawComputer();
            }
            
            break;
        case "KeyN":
            if(endGame === true) { 
                newGame(); 
            }

            break;
    }
}

const drawUser = () => {
    cardsUser.push(drawCard());

    showCards(cardsUser, "#cardsUser");

    if(calculateTotal(cardsUser) > 21) {
        showMessage("YOU LOSE!");
        scoreComputer += 1;
        return;
    }
}

const drawComputer = (amount = 1) => {
    if(stickComputer !== true) {

        let cards = 0;
        while (cards < amount) {
            cardsComputer.push(drawCard());

            showCards(cardsComputer, "#cardsComputer");

            cards++;
        }

        if(calculateTotal(cardsComputer) > 21) {
            showMessage("YOU WON!");
            scoreUser += 1;
            return;
        }

        computerCalculation();

        if(stickUser) { drawComputer; }
    } else if(stickUser) { showHands(); }
}

const calculateTotal = (cards) => {
    // Pass an array

    const total = cards.reduce((total, value) => {

        switch(value) {
            case "J":
            case "Q":
            case "K":
                value = 10;
                break;
        }

        return parseInt(total) + parseInt(value);
    });

    return total;
}

const computerCalculation = () => {
    const total = calculateTotal(cardsComputer);

    switch(true) {
        case total === 21:
            stickComputer = true;
            break;
        case total > 11:
            stickComputer = true;
            break;
    }
}

const showCards = (cards, idCards) => {
    // Pass an array and a string

    const elCards = document.querySelector(idCards);

    if(cards.length == 0) {
        elCards.innerHTML = "";
    } else {
        const elCard = document.createElement("div");
        elCard.classList.add("card");
        elCard.innerHTML = cards[cards.length -1];

        elCards.appendChild(elCard);
    }
}

const showHands = () => {

    let message = "";
    endGame = true;

    const totalUser = calculateTotal(cardsUser);
    const totalComputer = calculateTotal(cardsComputer);

    switch(true) {
        case (totalUser === totalComputer):
            message = "IT IS A DRAW!";
            break;
        
        case (totalUser > totalComputer):
            message = "YOU WON!";
            scoreUser += 1;
            break; 
        
        case (totalUser < totalComputer):
            message = "YOU LOSE!";
            scoreComputer += 1;
            break;
    }

    // showCardsComputer() ***

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

    endGame = true;
}

const newGame = () => {
    
    setInitialValues();

    // Draw two cards to begin the game
    drawUser();
    drawUser();

    drawComputer(2);

    endGame = false;
}

document.body.addEventListener("keyup", onKeyUp);