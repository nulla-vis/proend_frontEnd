let blackjackGame = {
    'player': {'scoreSpan' : '#player-blackjack-result' , 'div' : '#player-box' , 'score' : 0},
    'dealer': {'scoreSpan' : '#dealer-blackjack-result' , 'div' : '#dealer-box' , 'score' : 0},
    'cards' : ['2C','3C','4C','5C','6C','7C','8C','9C','10C','AC','JC','QC','KC',
                '2D','3D','4D','5D','6D','7D','8D','9D','10D','AD','JD','QD','KD',
                '2H','3H','4H','5H','6H','7H','8H','9H','10H','AH','JH','QH','KH',
                '2S','3S','4S','5S','6S','7S','8S','9S','10S','AS','JS','QS','KS'],
    'cardsMap' : {'2': 2 ,'3' : 3 ,'4' : 4 ,'5' : 5 ,'6' : 6,'7' : 7 ,'8' : 8 , '9' : 9 , '1' : 10 ,'A' : [1 , 11] , 'J' : 10 ,'Q' : 10 , 'K' :10},
    'wins' : 0,
    'loses' : 0,
    'draws' : 0,
    'isStart' : false,
    'isHit' : false,
    'isStand' : false,
    'turnsOver' : false
}

const player = blackjackGame['player']
const dealer = blackjackGame['dealer']

var playerHandCards = []
var dealerHandCards = []

const hitSound = new Audio('assets/Audio/swish.m4a');
const bustSound = new Audio('assets/Audio/bust.m4a');
const winSound = new Audio('assets/Audio/cash.mp3');
const loseSound = new Audio('assets/Audio/aww.mp3');

document.querySelector('#blackjack-start-button').addEventListener('click',blackjackStart)
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit)
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic)
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal)

function blackjackStart() {
    if(blackjackGame['isStart'] === false) {
        document.querySelector('#blackjack-start-button').style.display = 'none'
        let cardPlayer = randomCards()
        let cardDealer = randomCards()
        showCard(player,cardPlayer)
        rearrangeCard(player,cardPlayer,playerHandCards)
        calculateScore(player,playerHandCards)
        showScore(player)
        showCard(dealer,cardDealer)
        rearrangeCard(dealer,cardDealer,dealerHandCards)
        calculateScore(dealer,dealerHandCards)
        showScore(dealer)
        blackjackGame['isStart'] = true
    }
}

function blackjackHit() {
    if(blackjackGame['isStand'] === false && blackjackGame['isStart'] === true) {
        let card = randomCards()
        showCard(player,card)
        // showCard(dealer,card)
        rearrangeCard(player,card,playerHandCards)
        calculateScore(player,playerHandCards)    
        // updateScore(player,card)
        showScore(player)
        blackjackGame['isHit'] = true
    }

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}


async function dealerLogic() {
    
    if(blackjackGame['turnsOver'] === false && blackjackGame['isStart'] === true && blackjackGame['isHit'] === true) {
        blackjackGame['isStand'] = true
        while(dealer['score'] < 16 && blackjackGame['isStand'] === true){
            document.querySelector('#blackjack-stand-button').style.display = 'none'
            document.querySelector('#blackjack-hit-button').style.display = 'none'
            let card = randomCards()
            showCard(dealer,card)
            rearrangeCard(dealer,card,dealerHandCards)
            calculateScore(dealer,dealerHandCards)
            showScore(dealer)
            await sleep(1000)
        }
        
        // if(dealer['score'] > 15) {
            blackjackGame['turnsOver'] = true;
            showResult(computeWinner());
        // }
    }
  
}
function blackjackDeal() {
    if(blackjackGame['turnsOver'] === true){
        //2p :
        // showResult(computeWinner())
        playerHandCards = []
        dealerHandCards = []
        let playerImages = document.querySelector('#player-box').querySelectorAll('img')
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')
        for(let i = 0 ; i <playerImages.length ; i++) {
            playerImages[i].remove()
        }
        for(let i = 0 ; i <dealerImages.length ; i++) {
            dealerImages[i].remove()
        }
        player['score'] = 0
        dealer['score'] = 0
        document.querySelector('#player-blackjack-result').textContent = 0
        document.querySelector('#dealer-blackjack-result').textContent = 0

        document.querySelector('#player-blackjack-result').style.color = 'white'
        document.querySelector('#dealer-blackjack-result').style.color = 'white'

        document.querySelector('#blackjack-result').textContent = "レッツ・プレー"
        document.querySelector('#blackjack-result').style.color = 'black'
        blackjackGame['isStand'] = false
        blackjackGame['turnsOver'] = false
        blackjackGame['isStart'] = false
        blackjackGame['isHit'] = false
        document.querySelector('#blackjack-start-button').style.display = 'block'
        document.querySelector('#blackjack-hit-button').style.display = 'block'
        document.querySelector('#blackjack-stand-button').style.display = 'block'
    }

}


function showCard(activePlayer,card) { 
    if(activePlayer['score'] <= 21){
        let cardImage =  document.createElement('img')
        cardImage.src = `assets/Images/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage)
        hitSound.play()
    }
}


function randomCards() {
    let randomIndex = Math.floor(Math.random() * 52)
    return blackjackGame['cards'][randomIndex]
}

function rearrangeCard(activePlayer,card,activePlayerHandCards) {
    activePlayer['score'] = 0
    activePlayerHandCards.push(card[0])
    if(activePlayerHandCards.includes('A')){
      var aIndex = activePlayerHandCards.indexOf('A',0)
      activePlayerHandCards[aIndex] = activePlayerHandCards[activePlayerHandCards.length-1]
      activePlayerHandCards[activePlayerHandCards.length-1] = 'A'
    }
}

function calculateScore(activePlayer,activePlayerHandCards) {
    // console.log(playerHandCards)
    for(let i = 0 ; i < activePlayerHandCards.length ; i++) {
        updateScore(activePlayer,activePlayerHandCards[i])
    }
}

function updateScore(activePlayer, card) {
    // console.log(card[0])
    
    //A is 1 or 11
    //this will update the score in object blackjackGame
    if(card[0] === 'A'){
        if(activePlayer['score'] + blackjackGame['cardsMap'][card[0]][1] <=21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card[0]][1]
        }else {
            activePlayer['score'] += blackjackGame['cardsMap'][card[0]][0]
        }
    }else {
        activePlayer['score'] += blackjackGame['cardsMap'][card[0]]
    }
    
}

function showScore(activePlayer) {
    if(activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
        document.querySelector('#blackjack-hit-button').style.display = 'none'
        bustSound.play()
    }else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
    
}

//compute winner and return who won
//update wins,loses,draws value
function computeWinner() {
    let winner

    if(player['score'] <=21) {
    // conditions are : if player > than dealer or when dealer bust but player <=21
    if(player['score'] > dealer['score'] || dealer['score'] > 21) {
        // console.log('PLAYER WON')
        blackjackGame['wins']++
        winner = player
    }else if(player['score'] < dealer['score']) {
        // console.log('DEALER WON')
        blackjackGame['loses']++
        winner = dealer
    }else if(player['score'] === dealer['score']) {
        // console.log('DREW')
        blackjackGame['draws']++
    }
    
    //condition : when player BUST but dealer doesnt
    }else if (player['score'] >21 && dealer['score'] <= 21){
        // console.log('PLAYER LOST')
        blackjackGame['loses']++
        winner = dealer

    //condition : when both dealer and player BUST
    }else if(player['score'] > 21 && dealer['score'] > 21) {
        console.log('DREW')
        blackjackGame['draws']++
    }

    // console.log(winner)
    return winner
}

function showResult(winner) {
    let message,messageColor

    // if(blackjackGame['turnsOver'] === true) {
        if(winner === player ) {
            message = 'プレイヤーの勝ち'
            messageColor = 'green'
            winSound.play()
        }else if(winner === dealer) {
            message = 'ディーラーの勝ち'
            messageColor = 'red'
            loseSound.play()
        } else {
            message = '引き分け'
            messageColor = 'black'
        }
    
        document.querySelector('#blackjack-result').textContent = message
        document.querySelector('#blackjack-result').style.color = messageColor
        document.querySelector('#wins').textContent = blackjackGame['wins']
        document.querySelector('#losses').textContent = blackjackGame['loses']
        document.querySelector('#draws').textContent = blackjackGame['draws']
    // }

}