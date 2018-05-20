var cards = [];

cards[0] = '/img/reddraw2.png';
cards[1] = '/img/redreverse-card.png';
cards[2] = '/img/wild.png';
cards[3] = '/img/yellowskip.png';
cards[4] = '/img/wild.png';
cards[5] = '/img/yellowskip.png';
cards[6] = '/img/wild.png';
cards[7] = '/img/reddraw2';

//Play card function that deals out 7 cards for player hand when user clicks play button.
function play() {
    var i;
    for (i = 0; i < 7; i++) {
        var x = document.createElement("IMG");
        x.setAttribute("src", cards[i]);
        x.setAttribute("width", "75");
        x.setAttribute("height", "125");
        document.body.appendChild(x);


    }
}

//Draw card function that draws one card for player hand when user clicks draw card button.
function drawCard() {
    var i;
    for (i = 0; i < 1; i++) {
        var x = document.createElement("IMG");
        x.setAttribute("src", cards[getRndInteger(0,7)]);
        x.setAttribute("width", "75");
        x.setAttribute("height", "125");
        document.body.appendChild(x);

    }
}





function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

