import { getRndInteger } from "../modules/getRndInteger.js";

const elImg = document.createElement("img");
elImg.setAttribute("src", "./images/pasteis.jpeg");
elImg.setAttribute("alt", "Image of three pies");

const elFigure = document.querySelector("figure");
elFigure.insertBefore(elImg, elFigure.firstChild);

const elFigCaption = document.querySelector("figcaption");
elFigCaption.innerHTML = "Three pies whereof only one left, who will get it?"

const randomNumber = getRndInteger(1, 30);

const elResult = document.querySelector("#result");
elResult.addEventListener("click", () => {
    if(elResult.innerHTML !== "PLAY") { return };

    const guess = elNumberInput.value;

    if(guess == randomNumber) {
        elResult.innerHTML = "Congratulations! <br/> You guessed right!";  
    } else if (guess == randomNumber -1 || guess == randomNumber +1) {
        elResult.innerHTML = `So close...<br/> The number was ${randomNumber}`;
    } else {
        elResult.innerHTML = `You guessed wrong<br/> The number was ${randomNumber}`;  
    }

    elResult.style.cursor = "";
    elNumberInput.value = null;
    elNumberInput.setAttribute("disabled", false);
});
elResult.style.visibility = "hidden";

const elNumberInput = document.querySelector("#guess");
elNumberInput.addEventListener("change", (e) => {
    if(elNumberInput.value != null) {
        elResult.style.cursor = "pointer";
        elResult.style.visibility = "visible";
    }
});