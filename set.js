/* Game of Set: game engine. */

const MAX_ON_TABLE = 30;
const STARTING_CARDS = 12;
const ATTRIBUTES = {
    color: ["red", "green", "purple"],
    shape: ["oval", "diamond", "squiggle"],
    shading: ["solid", "outline", "striped"],
    number: ["one", "two", "three"],
};

let cards = [];          // undealt cards
let deck = [];           // cards on the table
let cardsInSet = [];     // indices of cards on the table that belong to some set
let userSet = [];        // indices the current player has clicked
let autocheck = true;
let setExists = false;
const players = [0, 0, 0, 0].map(() => ({ score: 0 }));
let currentPlayer = 0;

/* Builds all 81 cards. */
function initializeCards() {
    cards = [];
    for (const color of ATTRIBUTES.color)
        for (const shape of ATTRIBUTES.shape)
            for (const shading of ATTRIBUTES.shading)
                for (const number of ATTRIBUTES.number)
                    cards.push({
                        color, shape, shading, number,
                        image: "images/" + color + shape + shading + number + ".png",
                    });
}

/* Fisher-Yates shuffle; returns a new array. */
function shuffle(original) {
    const array = original.slice();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* Shuffles the cards and deals the starting table. */
function deal() {
    cards = shuffle(cards);
    deck = cards.splice(-STARTING_CARDS);
}

/* True if, for every attribute, the three cards are all the same or all different. */
function setChecker(a, b, c) {
    return Object.keys(ATTRIBUTES).every((attr) => {
        const distinct = new Set([a[attr], b[attr], c[attr]]).size;
        return distinct === 1 || distinct === 3;
    });
}

/* Finds every card on the table that is part of a set. */
function checkForSet() {
    const found = new Set();
    for (let i = 0; i < deck.length; i++)
        for (let j = i + 1; j < deck.length; j++)
            for (let k = j + 1; k < deck.length; k++)
                if (setChecker(deck[i], deck[j], deck[k])) {
                    found.add(i).add(j).add(k);
                }
    cardsInSet = [...found];
    setExists = cardsInSet.length > 0;
    return setExists;
}

function setHint(text) {
    document.getElementById("hint").textContent = text;
}

function updateScores() {
    players.forEach((p, i) => {
        document.getElementById("player" + (i + 1)).textContent =
            "Player " + (i + 1) + " Score: " + p.score;
    });
}

/* Builds the 30 card slots, 3 per row. */
function buildTable() {
    const table = document.getElementById("cardTable");
    for (let row = 0; row < MAX_ON_TABLE / 3; row++) {
        const tr = table.insertRow();
        for (let col = 0; col < 3; col++) {
            tr.insertCell().innerHTML = '<div id="image' + (row * 3 + col) + '"></div>';
        }
    }
}

/* Shows the cards-left counter and every card on the table. */
function displayDeck() {
    document.getElementById("cardsLeft").innerHTML = "<h4>Cards left: " + cards.length + "</h4>";
    for (let i = 0; i < MAX_ON_TABLE; i++) {
        document.getElementById("image" + i).innerHTML = i < deck.length
            ? "<h5>" + (i + 1) + "</h5>" +
              '<img id="' + i + '" class="images" src="' + deck[i].image + '" onclick="imageEvent(this.id)">'
            : "";
    }
}

function resetBorders() {
    for (const index of userSet) {
        document.getElementById(index).style.border = "";
    }
    userSet = [];
}

/* Handles a click on a card. After three clicks, scores the attempt. */
function imageEvent(imageId) {
    const index = parseInt(imageId, 10);
    if (userSet.includes(index)) {
        alert("You cannot click the same card twice.");
        resetBorders();
        return;
    }

    userSet.push(index);
    document.getElementById(imageId).style.border = "6px solid #FFFF00";
    if (userSet.length < 3) return;

    const [a, b, c] = userSet.map((i) => deck[i]);
    if (setChecker(a, b, c)) {
        players[currentPlayer].score++;
        // Remove from the highest index down so earlier indices stay valid.
        userSet.slice().sort((x, y) => y - x).forEach((i) => deck.splice(i, 1));
        userSet = [];
        if (deck.length < STARTING_CARDS) addCards();
        setHint("");
        game();
    } else {
        players[currentPlayer].score--;
        alert("That is not a set. You lose a point.");
        resetBorders();
    }
    updateScores();
}

/* Shows one card that is part of a set. */
function giveHint() {
    if (setExists) {
        const pick = cardsInSet[Math.floor(Math.random() * cardsInSet.length)];
        setHint("Card " + (pick + 1) + " is in a set.");
    } else {
        setHint("No sets on the table!");
    }
}

/* Deals three more cards, up to the table limit. */
function addCards() {
    if (deck.length + 3 > MAX_ON_TABLE) {
        alert("Maximum cards on table.");
    } else {
        deck.push(...cards.splice(-3));
    }
    checkForSet();
    displayDeck();
}

function toggleAutoCheck() {
    autocheck = !autocheck;
    document.getElementById("autoCheckButton").textContent = "Auto Check: " + (autocheck ? "On" : "Off");
}

function playerHandler(playerId) {
    currentPlayer = parseInt(playerId.replace("player", ""), 10) - 1;
    players.forEach((_, i) => {
        document.getElementById("player" + (i + 1)).classList.toggle("active", i === currentPlayer);
    });
}

function determineWinner() {
    const scores = players.map((p) => p.score);
    return "Player " + (scores.indexOf(Math.max(...scores)) + 1) + " is the winner.";
}

/* Redraws the table, deals extra cards if needed and detects the end of the game. */
function game() {
    displayDeck();
    if (checkForSet()) return;

    while (autocheck && cards.length > 0 && !checkForSet()) {
        addCards();
        alert("There were no sets in the cards dealt.\n3 more were added so a set can be found.");
    }

    if (!setExists && cards.length === 0) {
        alert("Game is over.\n" + determineWinner());
    }
}

/* Starts a fresh game: new shuffled deck and zeroed scores. */
function newGame() {
    players.forEach((p) => { p.score = 0; });
    userSet = [];
    setHint("");
    updateScores();
    initializeCards();
    deal();
    game();
}

function main() {
    buildTable();
    playerHandler("player1");
    newGame();
}
