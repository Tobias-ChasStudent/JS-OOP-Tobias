const h3CardDeck = document.querySelector("#cardDeck")
const h3DiscardPile = document.querySelector("#discardPile")
const btnRestart = document.querySelector("#restart")

class cardDeck {
    constructor() {
        this.cardDeck = []
        this.discardPile = []
    }
    generateDeck() {
        let suits = ["diamonds", "spades", "hearts", "clubs"]
        let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"]
        let number = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]

        suits.forEach(suit => {
            values.forEach(value => {
                let card = {
                    readable: `${value}_of_${suit}`,
                    value: value,
                    suit: suit,
                    number: number[values.indexOf(value)]
                }
                //console.log(card);
                this.cardDeck.push(card)
            });
        });

        h3CardDeck.textContent = "Cards left in the deck:" + this.cardDeck.length
        //console.log(this.cardDeck);
    }
    shuffleDeck() {
        for (let i = this.cardDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.cardDeck[i];
            this.cardDeck[i] = this.cardDeck[j];
            this.cardDeck[j] = temp;
        }
        console.log(this.cardDeck);
    }
}

class pokerPlayer {
    constructor(name) {
        this.name = name
        this.cardHand = []
    }

    dealCards(handSize, deckName) {
        for (let i = 0; i < handSize; i++) {
            let cardAdd = deckName.cardDeck.pop()
            this.cardHand.push(cardAdd)

        }
        console.log(`${this.name}'s hand after being dealt: `);
        console.log(this.cardHand);
        this.updateCardHtml()

        h3CardDeck.textContent = "Cards left in the deck: " + deckName.cardDeck.length



    }

    discardCard(cardIndex, deckName) {
        //Convert cardHand into a JSON array, then convert it back
        //Why does this work? HAHAHAHAHAHAHAHAHAAHAHAHAHAHAHAHAHHAH
        console.log(this.cardHand);
        console.log(this.cardHand[cardIndex]);
        /* console.log(deckName.cardDeck.pop()); */

        deckName.discardPile.push(this.cardHand[cardIndex]);
        h3DiscardPile.textContent = "Discard pile size: " + deckName.discardPile.length

        this.cardHand[cardIndex] = deckName.cardDeck.pop()
        console.log(this.name + "'s new hand after removing a card:");
        console.log(this.cardHand);
        this.updateCardHtml()

        h3CardDeck.textContent = "Cards left in the deck: " + deckName.cardDeck.length
    }

    discardAllCards(deckName) {
        console.log("Discarded all cards");
        for (let i = this.cardHand.length; i > 0; i--) {

            const card = this.cardHand[i - 1];
            console.log(card);
            deckName.discardPile.push(this.cardHand.pop())

        }
        //console.log(this.cardHand);
        h3DiscardPile.textContent = "Discard pile size: " + deckName.discardPile.length
        this.updateCardHtml()

    }

    updateCardHtml() {
        let divCardHand = ""
        let handValue = 0
        if (document.querySelector(`#${this.name}`)) {
            divCardHand = document.querySelector(`#${this.name}`)
            divCardHand.innerHTML = ""
        } else {
            divCardHand = document.createElement("div")
        }
        let h2Player = document.createElement("h2")
        h2Player.textContent = this.name
        divCardHand.appendChild(h2Player)

        divCardHand.id = this.name
        this.cardHand.forEach(card => {
            handValue += parseInt(card.number)
            let imgCard = document.createElement("img")
            imgCard.setAttribute("src", "./img/" + card.readable + ".png")
            imgCard.setAttribute("width", 100)
            divCardHand.appendChild(imgCard);
        });

        let h4HandValue = document.createElement("h4")
        h4HandValue.textContent = `Hand value: ${handValue}`
        divCardHand.appendChild(h4HandValue);

        divCardHand.appendChild(document.createElement("hr"))

        console.log(divCardHand);
        document.body.appendChild(divCardHand)
    }
}

btnRestart.addEventListener("click", () => {
    
    btnRestart.disabled = true

    playerSlim.discardAllCards(pokerDeck)
    playerLuke.discardAllCards(pokerDeck)
    
    setTimeout(() => {
        for (let i = pokerDeck.discardPile.length; i > 0; i--) {
            const card = pokerDeck.discardPile[i - 1];
            console.log(card);

            pokerDeck.cardDeck.push(pokerDeck.discardPile.pop())

            h3DiscardPile.textContent = "Discard pile size: " + pokerDeck.discardPile.length

            h3CardDeck.textContent = "Cards left in the deck: " + pokerDeck.cardDeck.length

            pokerDeck.shuffleDeck()

        }
    }, 500);

    setTimeout(() => {
        playerSlim.dealCards(5, pokerDeck)
        playerLuke.dealCards(5, pokerDeck)
        btnRestart.disabled = false
    }, 1000);


})

let pokerDeck = new cardDeck()

pokerDeck.generateDeck()

pokerDeck.shuffleDeck()

//Player Slim and Luke
let playerSlim = new pokerPlayer("Slim")
let playerLuke = new pokerPlayer("Luke")

playerSlim.dealCards(5, pokerDeck)
playerLuke.dealCards(5, pokerDeck)

console.log(pokerDeck.cardDeck);

setTimeout(() => {
    playerSlim.discardCard(0, pokerDeck)
    playerSlim.discardCard(3, pokerDeck)

    playerLuke.discardCard(0, pokerDeck)
    playerLuke.discardCard(3, pokerDeck)

}, 1000);


    



//console.log(pokerDeck.cardDeck);