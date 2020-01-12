/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, totalSixInRow, maxScore;
init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        //1. Random Number dice
        var $1stDiceRnd = Math.floor(Math.random()*6)+1;
        var $2ndDiceRnd = Math.floor(Math.random()*6)+1;

        //2. Display the result
        document.querySelector('#dice-1st').style.display='block';
        document.querySelector('#dice-2nd').style.display='block';
        document.querySelector('#dice-1st').src='dice-'+$1stDiceRnd+'.png'             
        document.querySelector('#dice-2nd').src='dice-'+$2ndDiceRnd+'.png'

        
        if($1stDiceRnd!== 1 && $2ndDiceRnd !==1){
            roundScore+=$1stDiceRnd+$2ndDiceRnd
            document.querySelector('#current-'+activePlayer).textContent=roundScore;
            if($1stDiceRnd===6){
                totalSixInRow+=1
            }
            console.log(totalSixInRow)
            if(totalSixInRow===2){
                scores[activePlayer] = 0;
                document.querySelector('#score-'+activePlayer).textContent = 0
                nextPlayer(); 
            }            
        }                 
        else{
            nextPlayer();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        scores[activePlayer]+=roundScore;    
        document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];
       

        if(scores[activePlayer] >= maxScore){
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!'
            document.querySelector('#dice-1st' ).style.display = 'none';
            document.querySelector('#dice-2nd' ).style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner')
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active')
            gamePlaying = false;       
        }else{
            nextPlayer(); 
        }
    }    
})


document.querySelector('.btn-new').addEventListener('click', function(){
    init();
    gamePlaying = true
    randomFirstPlayer();      
})

document.querySelector('.btn-set').addEventListener('click',function(){
    maxScore = prompt('Enter your targer score!')
})
    


function nextPlayer(){
    activePlayer === 0 ? activePlayer=1 : activePlayer = 0;    
    roundScore = 0;
    totalSixInRow = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.dice').style.display = 'none';
}

function randomFirstPlayer(){
    //Choose first player
    //Choose random between 1 and 0
    activePlayer= Math.floor(Math.random()*2) ? 1:0;
    alert('Player '+(activePlayer+1) +' goes first')
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
}

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying =false;
    totalSixInRow = 0;       

    //Reset all value to default
    document.getElementById('score-0').textContent=0;
    document.getElementById('score-1').textContent=0;
    document.getElementById('current-0').textContent =0;
    document.getElementById('current-1').textContent =0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('#dice-1st').style.display = 'none'
    document.querySelector('#dice-2nd').style.display = 'none'
}










