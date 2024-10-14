const deck = [];
const suits = ["♠", "♥", "♣", "♦"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let playerCards = [];
let dealerCards = [];

function createDeck() {
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function startGame() {
    createDeck();
    shuffleDeck();
    playerCards = [deck.pop(), deck.pop()];
    dealerCards = [deck.pop(), deck.pop()];
    updateUI();
}

function updateUI() {
    document.getElementById('player-cards').innerHTML = playerCards.map(card => 
        `<div class="card">${card.value} ${card.suit}</div>`
    ).join('');
    
    document.getElementById('dealer-cards').innerHTML = dealerCards.map(card => 
        `<div class="card">${card.value} ${card.suit}</div>`
    ).join('');
    
    document.getElementById('player-score').textContent = `Puan: ${calculateScore(playerCards)}`;
    document.getElementById('dealer-score').textContent = `Puan: ${calculateScore(dealerCards)}`;
}
function calculateScore(cards) {
    let score = 0;
    let hasAce = false;

    for (let card of cards) {
        if (card.value === "A") {
            hasAce = true;
            score += 11;
        } else if (["J", "Q", "K"].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value);
        }
    }

    if (hasAce && score > 21) {
        score -= 10;
    }

    return score;
}

function hit() {
    playerCards.push(deck.pop());
    updateUI();
    checkGameOver();
}

function stand() {
    while (calculateScore(dealerCards) < 17) {
        dealerCards.push(deck.pop());
    }
    updateUI();
    checkGameOver(true);
}

function checkGameOver(isStand = false) {
    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(dealerCards);

    if (playerScore > 21) {
        document.getElementById('message').textContent = 'Kaybettiniz! Eliniz 21\'i aştı.';
    } else if (dealerScore > 21) {
        document.getElementById('message').textContent = 'Kazandınız! Krupiye 21\'i aştı.';
    } else if (isStand) {
        if (playerScore > dealerScore) {
            document.getElementById('message').textContent = 'Kazandınız!';
        } else if (playerScore < dealerScore) {
            document.getElementById('message').textContent = 'Kaybettiniz!';
        } else {
            document.getElementById('message').textContent = 'Berabere!';
        }
    }
}

function restartGame() {
    deck.length = 0;
    playerCards.length = 0;
    dealerCards.length = 0;
    document.getElementById('message').textContent = '';
    startGame();
}

document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stand').addEventListener('click', stand);
document.getElementById('restart').addEventListener('click', restartGame);

startGame();
