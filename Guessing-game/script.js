const elImg = document.createElement("img");
elImg.setAttribute("src", "./images/pasteis.jpeg");
elImg.setAttribute("alt", "Image of three pies");

const elFigure = document.querySelector("figure");
elFigure.insertBefore(elImg, elFigure.firstChild);

const elFigCaption = document.querySelector("figcaption");
elFigCaption.innerHTML = "Three pies whereof only one left, who will get it?"

