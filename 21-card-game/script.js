import deckOfCards from "./modules/deckOfCards.js";
import gameplay21cardGame from "./modules/21Rules.js";
import getRndInteger from "./modules/getRndInteger.js";

let randomSuit = getRndInteger(0, 3);
let randomCardOfSuit = getRndInteger(0, 12);

let randomDrawnCard = deckOfCards[randomSuit].card[randomCardOfSuit];
let removedCard = deckOfCards[randomSuit].card.splice(randomCardOfSuit, 1);
console.log(randomDrawnCard);
console.log(removedCard);