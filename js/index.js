//modeled after https://medium.com/front-end-hacking/create-simon-game-in-javascript-d53b474a7416#.qslgdxod9

var game = {
  count: 0,
  colorArr: ['#green','#blue', '#red', '#yellow'],
  currentGame: [],
  player: [],
  sound:{
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  strict: false,
}

function clearGame() {
  game.currentGame = [];
  game.count = 0;
  addCount();
}


function strict() {
  if (game.strict == false) {
    game.strict = true;
    $('#strict').html('STRICT &#10004;');
  } else {
    game.strict = false;
    $('#strict').html("STRICT");
  }
  
  clearGame();
}

function showMoves() {
  var i = 0;
  var moves = setInterval(function(){
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 850)
  
  game.player = [];
}

function sound(name) {
  switch(name) {
    case'#green':
      game.sound.green.play();
      break;
    case '#blue':
      game.sound.blue.play();
      break;
    case '#red':
      game.sound.red.play();
      break;
    case '#yellow':
      game.sound.yellow.play();
      break;
  };
}

function playGame(field) {
  $(field).addClass('hover');
  sound(field);
  setTimeout(function(){
      $(field).removeClass('hover');
  }, 500);
}


function addToPlayer(id) {
  var field = "#"+id
  game.player.push(field);
  playerTurn(field);
} 

function playerTurn(x) {
  if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
    if(game.strict){
      alert('Sorry, Start All Over');
      clearGame();
    } else {
      alert('Incorrect! Try again!');
      showMoves();
    }
   } else {
      sound(x);
      var check = game.player.length === game.currentGame.length;
      if (check) {
        if(game.count == 21){
          alert('You won!');
        } else {
          addCount();
        }
      }
    }
} 

function generateMove(){
  game.currentGame.push(game.colorArr[(Math.floor(Math.random()*4))]);
  showMoves();
}

function addCount() {
  game.count++;
  $('#display').html(game.count);
  generateMove();
}

clearGame();