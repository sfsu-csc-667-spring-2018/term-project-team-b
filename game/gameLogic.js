var socket = io();

var userid = document.currentScript.getAttribute('userid');
var username = document.currentScript.getAttribute('username');
var gameid = document.currentScript.getAttribute('gameid');

var playerCards = [];
var players = [];
var num_starting_cards = 7;

var userData = {
    userid: userid,
    username: username,
    gameid: gameid,
    nameOfCardsInhand: 7,
    ready: false
};

var gameData = {
    gameid : gameid,
    cardTurnClockwise: false,
    currentPlayerTurn: 0,
    start: false,
    topCard: {id: null, card_type: null, color: null, number: null, image: null}
};

console.log("userid: " + userid);
console.log("gameid: " + gameid);

socket.emit('join_game', userData, gameData, username);
socket.on('update_players', function(data) {
    console.log('updating game data for ' + username);
    gameData.topCard = data.topCard;
    renderTopCard();

    gameData.currentPlayerTurn = data.currentPlayerTurn;
    gameData.cardTurnClockwise = data.cardTurnClockwise;
})

//Logic

var card_area = document.getElementById('table-body');
document.getElementById("drawACard").addEventListener("click", function() {
    if (gameData.start) {
        console.log('UNO');
        console.log("cardturn " + gameData.cardTurnClockwise);
        if(playerCards.length != 1) {
            console.log('UNO check failed\n' + playerCards.length + " cards in hand.")
            alert("You have more than one card");
            var i
            for( i = 0; i < 2; i++) {
                socket.emit('drawACard', userData);
                userData.numberOfCardsInHand++;
            }
        }
        else {
            socket.emit('UNO_Called', "You called UNO");
            socket.broadcast.emit('UNO_called', userData.username + " had one card left.")
        }
    }
    
});

document.getElementById("ready").addEventListener("click", function() {
    console.log("User is ready to play");
    userData.ready = true;
});

document.getElementById("start").addEventListener("click", function() {
    gameData.start = (userData.ready);
    if(gameData.start) {
        console.log('Game ready to start');
        var i;
        console.log('Draw initial hand');
        for(i = 0; i < num_starting_cards; i++) {
            socket.emit('drawACard', userData);
            userData.numberOfCardsInHand++;
        }
        document.getElementById("ready").style.visibility = "hidden";
        document.getElementById("start").style.visibility = "hidden";
        renderTopcard();
    }
});

document.getElementById("end").addEventListener("click", function() {
    socket.emit('end_game', gameData);
    console.log('Ending Game')
})

socket.on('drawACard', function(gameCards, cardpath) {
    var card = gameCards.card_id;
    var path = cardpath.image;
    playerCards.push(cardpath);
    renderCard();
})

document.getElementById('cardToPlay').onkeypress = function(e) {
    if(!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            playCard();
            this.value='';
        }
};

function playCard() {
    players.forEach(function(index) {
        console.log("Players in game" + index);
    });

    if (isCurrentPlayerTurn() == false) {
        return;
    }

    console.log("inside PLAYCARD");
    if(document.getElementById("cardToPlay").value > playerCards.length) {
        alert("Number is greater than cards held");
        return;
    }

    if(document.getElementById("cardToPlay").value < 1) {
        alert("Plese choose a number greater or equal to 1");
        return;
    }

    var card = document.getElementById("cardToPlay").value - 1;
    console.log("inside PLAYCARD input: " + card);

    if(isValidPlay(playerCards[card])) {
        gameData.topCard = playerCards[card];
        var cardPlayed = playerCards[card];
        renderTopCard();

        document.getElementById('cardToPlay').value = '';
        console.log("playCard() PlayerCards[card].card_type" + playercards[card].card_type);
        removeCardFromPlayerHandAndBoard(card);

        if(cardPlayed.card_type != 'number') {
            if(cardPlayed.card_type == 'skip') {
                getNextPlayerTurn();
                getNextPlayerTurn();
                return;
            }

            else if(cardPlayed.card_type == 'reverse') {
                if(gameData.cardTurnClockwise == true) {
                    gameData.cardTurnClockwise == false;
                }
                else if(gameData.cardTurnClockwise == false) {
                    gameData.cardTurnClockwise == true;
                }
            }
            else if(cardPlayed.card_type == 'wild4') {
                getNextPlayerTurn();
                for (i = 0; i < 4; i++) {
                    socket.emit('drawACard', userData);
                }
                return;
            }
            else if(cardPlayed.card_type == 'draw2') {
                getNextPlayerTurn();
                for(i = 0; i < 2; i++) {
                    socket.emit('drawACard', userData);
                }
                return;
            }
        }

        if(playerCards.length == 0) {
            alert("You Win!")
        }

        getNextPlayerTurn();
    }
}

socket.on('init_topcard', function(tmpcard) {
    gameData.topCard.id = tmpcard.id;
    gameData.topCard.card_type = tmpcard.card_type;
    gameData.topCard.color = tmpcard.color;
    gameData.topCard.number = tmpcard.number;
    gameData.topCard.image = tmpcard.image;
    console.log('Client set top card: ' + gameData.topCard.id)
    console.log(gameData.topCard);
});

socket.on('uno_message', function(msg) {
    alert(msg);
});

function renderCard() {
    var tableBody = document.getElementById("table-body");
    var tableCard = document.createElement("td");
    var tableHead =document.getElementById("table-head");
    var tableNumber = document.createElement("th");
    var card = new Image(75, 125);

    playerCards.forEach(function(index) {
        card.src = index.image;
        card.id = index.id;

        tableNumber.setAttribute("id", "table-head" + (playerCards.indexOf(index) + 1));
        tableCard.setAttribute("id", "table-body" + (playerCards.indexOf(index) + 1));

        console.log(document.getElementById("table-head" + playerCards.indexOf(index)));
        tableNumber.innerHTML = playerCards.indexOf(index) + 1;
        tableHead.appendChild(tableNumber);
        tableCard.appendChild(card);
        tableBody.appendChild(tableCard);
    });
}

function renderTopCard() {
    document.getElementById("top-card").src = gameData.topCard.image;
}

function getNextPlayerTurn() {
    if(gamedata.cardTurnClockWise) {
        gameData.currentPlayerTurn--;
        if(gameData.currentPlayerTurn < 0) {
            gameData.currentPlayerTurn = players.length -1;
        }
    } else {
        gameData.currentPlayerTurn++;
        if(gameData.currentPlayerTurn > players.length - 1) {
            gameData.currentPlayerTurn = 0;
        }
    }
    socket.emit('update_gameData', gameData);
}

function removeTableNumber(index) {
    var tableRemove = document.getElementById("table-head" + (index + 1));
    console.log('remove: ' + tableRemove);
    tableRemove.remove();
}

function removeTableCard(index) {
    var tableRemove = document.getElementById("table-body" + (index + 1));
    tableRemove.remove();
}

function adjustTable() {
    var tableHead = document.getElementById("table-head");
    var tableNumber = document.createElement("th");
    var tableBody = document.getElementById("table-card");
    var tableCard = document.createElement("td");

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    for(var i = 0; i < playerCards.length; i++) {
        console.log('Entered loop');
        var tableHead = document.getElementById("table-head");
        var tableNumber = document.createElement("th");
        var tableBody = document.getElementById("table-body");
        var tableCard = document.createElement("td");

        var card = new Image(75, 125);
        card.id = playerCards[i].id;
        card.src = playerCards[i].image;

        tableNumber.setAttribute("id", "table-head" + (i + 1));
        tableCard.setAttribute("id", "table-body" + (i + 1));

        tableNumber.innerHTML = i + 1;
        tableHead.appendChild(tableNumber);
        tableCard.appendChild(card);
        tableBody.appendChild(tableCard);
    }
}

function removeCardFromPlayerAndCard(index) {
    if(index < playerCards.length) {
        removeTableNumber(index);
        removeTableCard(index);
        playerCards.splice(index, 1);

        adjustTable();
        console.log('Removed: ' + (index + 1));
    } else
        console.log("index out of range: " + index);
}

function isCurrentPlayerTurn() {
    console.log("players[gameData.currentPlayerTurn" + players[gameData.currentPlayerTurn]);
    console.log("username: " + username);

    if(players[gameData.currentPlayerTurn] == username) {
        return true;
    } else {
        alert("It's not your turn");
        return false;
    }
}

function isValidPlay(playerCard) {
    console.log("VALID PLAY: card type " + playerCard.card_type);
    console.log("VALID PLAY: card number " + playerCard.number);

    if(gamedata.topCard.card_type == 'wild' || gameData.topCard.card_type == 'wild4') {
        console.log("Valid Play: true");
        return true;
    }
    if(playerCard.card_type == 'wild' || playerCard.card_type == 'wild4') {
        console.log("Valid Play: true");
        return true;
    }

    if(playerCard.card_type == gameData.topCard.color) {
        console.log("VALID PLAY: true");
        renderTopCard();
        return true;
    }

    if(playerCard.color == gameData.topCard.color) {
        console.log("Valid Play: " + playerCard.color + " " + gameData.topCard.color);
        console.log("Valid Play: true");
        renderTopCard();
        return true;
    } else {
        alert("not valid play");
        return false;
    }



}