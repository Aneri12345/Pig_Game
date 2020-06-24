/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var diceValue,setclick=0;
var roundScore=0, prev=0;
var playerScore=[0,0];
var activePlayer=0;
var winner=0;
var dice= new Audio('sounds/dice.mp3');
var applause= new Audio('sounds/applause.mp3');
var swish= new Audio('sounds/swish.m4a');
var finalScore=-1;
document.querySelector("#roll").addEventListener("click",roll);
document.querySelector("#hold").addEventListener('click',hold);
document.querySelector("#newGame").addEventListener('click',newGame);
document.querySelector("#set").addEventListener('click',set);
function set()
{
   
    if(winner==0)
    {
        finalScore=document.getElementById("input").value;
        if(finalScore<=0)
        {
            alert('Enter number greater than 0');
        }
        else
        {
            document.getElementById('set').style.backgroundColor="#008000";
            setclick=1;
        }
    }
   
}
function roll()
{
    //on rolling:
    //change picture
    //check if it is one else add to the present one
    if(setclick==0)
    {
        alert('You need to set score limit : )');
    }
    if(winner==0 && finalScore>0)
    {
       dice.play();
       diceRandom();
       picUpdate();
       currentScore();
    }
}
function diceRandom()
{
    diceValue= Math.floor ( Math.random() * 6 ) + 1;
}
function picUpdate()
{
    document.querySelector('.dice').style.display= 'block';
    document.querySelector('.dice').src='image/dice-' + diceValue + '.png';
}
function currentScore()
{
    if(diceValue==1)
    {
        document.querySelector('#current-'+activePlayer).textContent=0;
        activePlayer== 0 ? activePlayer=1 : activePlayer=0;
        swish.play();
        prev=0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('#name-0').classList.toggle('activatePlayer');
        document.querySelector('#name-1').classList.toggle('activatePlayer');
        roundScore=0;
        document.querySelector('.dice').getElementsByClassName.display= 'none';
    }
    else
    {
        //got two 6 in a row
        //change active player
        //change total score to 0
        if(diceValue==6 && diceValue==prev)
        {
            document.querySelector('#current-'+activePlayer).textContent=0;
            playerScore[activePlayer]=0;
            document.querySelector('#current-'+activePlayer).textContent=0;
            activePlayer== 0 ? activePlayer=1 : activePlayer=0;
            swish.play();
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
            document.querySelector('#name-0').classList.toggle('activatePlayer');
            document.querySelector('#name-1').classList.toggle('activatePlayer');
            roundScore=0;
            document.querySelector('.dice').getElementsByClassName.display= 'none';
            prev=0;
        }
        else
        {
            roundScore+=diceValue;
            document.querySelector('#current-'+activePlayer).textContent=roundScore;
        }
        
    }
    prev=diceValue;
}
function hold()
{
    //update present player score
    //change active player
 if(winner==0 && setclick==1)
  {
    playerScore[activePlayer]+=roundScore;
    document.querySelector("#score-"+activePlayer).textContent=playerScore[activePlayer];

    if(playerScore[activePlayer]>=finalScore)
    {
            document.querySelector('#name-'+activePlayer).textContent="Winner!!";
            document.querySelector('.dice').style.display= 'none';

            document.querySelector('.player-' +activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-' +activePlayer +'-panel').classList.remove('active');
            document.querySelector('#name-' +activePlayer).classList.remove('activatePlayer');
            prev=0;
            finalScore=-1;
            applause.play();
            winner=1;
    }

    else{ 
            activePlayer== 0 ? activePlayer=1 : activePlayer=0;
            roundScore=0
            swish.play();
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
            document.querySelector('#name-0').classList.toggle('activatePlayer');
            document.querySelector('#name-1').classList.toggle('activatePlayer');

            document.getElementById("current-0").textContent='0';
            document.getElementById("current-1").textContent='0';
            document.querySelector('.dice').style.display= 'none';
        }
        prev=0;
    }
    
}
function newGame()
{
    playerScore=[0,0];
    roundScore=0;
    prev=0;
    winner=0;
    swish.play();
    document.querySelector('.player-' +activePlayer +'-panel').classList.remove('winner');
    document.querySelector('#name-'+activePlayer).textContent='PLAYER '+(activePlayer+1);
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').classList.add('activatePlayer');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('#name-1').classList.remove('activatePlayer');


    document.querySelector("#score-0").textContent='0';
    document.querySelector("#score-1").textContent='0';

    document.getElementById("current-0").textContent='0';
    document.getElementById("current-1").textContent='0';
    
    activePlayer=0;
}