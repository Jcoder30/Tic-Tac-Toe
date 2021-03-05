let board_full = false;
let play_board = ['', '', '', '', '', '', '', '', ''];

var player = 'X';
var computer = 'O';

var p1 = 'X';
var p2 = 'O';

var twoPlayers = false;
var p1Turn = true;
var p1Start = true;
var turnCounter = 1;

var isEasy = false;
var isNormal = true;
var isHard = false;

var score1Counter = 0;
var score2Counter = 0;

var player1First = true;

/* This selects the one player mode. */
function onePlayer() {
  if (twoPlayers == true) {
    reset_board();
    resetScores();
  }
  twoPlayers = false;
  players.innerText = 'One player mode selected.';
  playerTurn.innerText = 'You go first.';
  first.innerText = 'X (First)';
  second.innerText = 'O (Second)';
  playerOneCharacter.innerText = '';
  difficulty.innerText = 'Normal mode selected.';
  scoreOne.innerText = 'Player Score';
  scoreTwo.innerText = 'Computer Score';
}

/* This selects the two player mode. */
function twoPlayer() {
  if (twoPlayers == false) {
    player = 'X';
    reset_board();
    resetScores();
  }
  twoPlayers = true;
  players.innerText = 'Two player mode selected.';
  playerTurn.innerText = "Player One's Turn.";
  first.innerText = 'Player One Goes First';
  second.innerText = 'Player Two Goes First';
  playerOneCharacter.innerText = 'Player One is X and Goes First';
  difficulty.innerText = '';
  scoreOne.innerText = 'Player One Score';
  scoreTwo.innerText = 'Player Two Score';
}

/* If it is one player, this sets the real player to be "X" go first. If it is two player, this sets player one to be "X" and go first. */
function X() {
  if (twoPlayers == false && player == 'O') {
    player = 'X';
    computer = 'O';
    reset_board();
    playerTurn.innerText = 'You go first.';
  } else if (twoPlayers == true && p1Start != true) {
    reset_board();
    playerOneCharacter.innerText = 'Player One is X and Goes First';
    p1Start = true;
    playerTurn.innerText = "Player One's Turn.";
    turnCounter += 1;
  }
  p1Start = true;
  player = 'X';
  computer = 'O';
}

/* If it is one player, this sets the computer to be "X" go first. If it is two player, this sets player two to be "X" and go first. */
function O() {
  if (twoPlayers == false && player == 'X') {
    player = 'O';
    computer = 'X';
    reset_board();
    playerTurn.innerText = 'You go second.';
    if (play_board == ['', '', '', '', '', '', '', '', '']) {
      addComputerMove();
    }
  } else if (twoPlayers == true && p1Start != false) {
    reset_board();
    playerOneCharacter.innerText = 'Player Two is X and Goes First';
    p1Start = false;
    playerTurn.innerText = "Player Two's Turn.";
  }
  p1Start = false;
  player = 'O';
  computer = 'X';
}

/* Sets the computer to easy mode. */
function easy() {
  if (twoPlayers == false) {
    difficulty.innerText = 'Easy mode selected.';
  }
  if (isEasy != true) {
    reset_board();
  }
  isEasy = true;
  isNormal = false;
  isHard = false;
}

/* Sets the computer to normal mode. */
function normal() {
  if (twoPlayers == false) {
    difficulty.innerText = 'Normal mode selected.';
  }
  if (isNormal != true) {
    reset_board();
  }
  isEasy = false;
  isNormal = true;
  isHard = false;
}

/* Sets the computer to hard mode. */
function hard() {
  if (twoPlayers == false) {
    difficulty.innerText = 'Hard mode selected.';
  }
  if (isHard != true) {
    reset_board();
  }
  isEasy = false;
  isNormal = false;
  isHard = true;
}

/* Resets the score counter. */
function resetScores() {
  score1Counter = 0;
  score2Counter = 0;
  score1.innerText = score1Counter;
  score2.innerText = score2Counter;
}

const board_container = document.querySelector('.play-area');

const winner_statement = document.getElementById('winner');

/* Checks if the board is full and is therefore a draw. */
check_board_complete = () => {
  let flag = true;
  play_board.forEach((element) => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  board_full = flag;
};

/* Checks if someone won the game in a given combonation of three squares. */
const f = (a, b, c) => {
  return (
    play_board[a] == play_board[b] &&
    play_board[b] == play_board[c] &&
    (play_board[a] == player || play_board[a] == computer)
  );
};

/* Checks if someone won the game and sets the board up accordingly. */
const check_match = () => {
  for (i = 0; i < 9; i += 3) {
    if (check_line(play_board, i, i + 1, i + 2)) {
      document.querySelector(`#block_${i}`).classList.add('win');
      document.querySelector(`#block_${i + 1}`).classList.add('win');
      document.querySelector(`#block_${i + 2}`).classList.add('win');
      return play_board[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(play_board, i, i + 3, i + 6)) {
      document.querySelector(`#block_${i}`).classList.add('win');
      document.querySelector(`#block_${i + 3}`).classList.add('win');
      document.querySelector(`#block_${i + 6}`).classList.add('win');
      return play_board[i];
    }
  }
  if (check_line(play_board, 0, 4, 8)) {
    document.querySelector('#block_0').classList.add('win');
    document.querySelector('#block_4').classList.add('win');
    document.querySelector('#block_8').classList.add('win');
    return play_board[0];
  }
  if (check_line(play_board, 2, 4, 6)) {
    document.querySelector('#block_2').classList.add('win');
    document.querySelector('#block_4').classList.add('win');
    document.querySelector('#block_6').classList.add('win');
    return play_board[2];
  }
  return '';
};

/* Checks if someone won the game and sets the board up accordingly. */
const check_for_winner = () => {
  let res = check_match();
  if (twoPlayers == false) {
    if (res == player) {
      winner.innerText = 'You Won :)';
      winner.classList.add('playerWin');
      score1Counter += 1;
      score1.innerText = score1Counter;
      board_full = true;
    } else if (res == computer) {
      winner.innerText = 'You Lost :(';
      winner.classList.add('computerWin');
      score2Counter += 1;
      score2.innerText = score2Counter;
      board_full = true;
    } else if (board_full) {
      winner.innerText = 'Draw Game :|';
      winner.classList.add('draw');
    }
  } else if (twoPlayers == true) {
    if (res == p1) {
      if (p1Start == true) {
        winner.innerText = 'Player One Wins :)';
        winner.classList.add('playerWin');
        score1Counter += 1;
        score1.innerText = score1Counter;
      } else if (p1Start == false) {
        winner.innerText = 'Player Two Wins :)';
        winner.classList.add('playerWin');
        score2Counter += 1;
        score2.innerText = score2Counter;
      }
      board_full = true;
    } else if (res == p2) {
      if (p1Start == false) {
        winner.innerText = 'Player Two Wins :)';
        winner.classList.add('playerWin');
        score2Counter += 1;
        score2.innerText = score2Counter;
      } else if (p1Start == true) {
        winner.innerText = 'Player One Wins :)';
        winner.classList.add('playerWin');
        score1Counter += 1;
        score1.innerText = score1Counter;
      }
      board_full = true;
    } else if (board_full) {
      winner.innerText = 'Draw Game :|';
      winner.classList.add('draw');
    }
  }
};

/* Sets up the boards starting position. */
const render_board = () => {
  board_container.innerHTML = '';
  play_board.forEach((e, i) => {
    board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`;
    if (e == player || e == computer) {
      document.querySelector(`#block_${i}`).classList.add('occupied');
    }
  });
};

/* Checks if the game is over and calls the reset function if it is. */
const game_loop = () => {
  render_board();
  check_board_complete();
  check_for_winner();
};

/* Function that adds the player's move to the board.*/
const addPlayerMove = (e) => {
  if (twoPlayers == false) {
    if (!board_full && play_board[e] == '') {
      play_board[e] = player;
      game_loop();
      if (checkWinner(play_board) === 'null') {
        addComputerMove();
      }
    }
  } else if (twoPlayers == true) {
    if (!board_full && play_board[e] == '') {
      if (p1Turn == true) {
        play_board[e] = p1;
        game_loop();
        if (turnCounter % 2 == 1) {
          playerTurn.innerText = "Player One's Turn.";
        } else if (turnCounter % 2 == 0) {
          playerTurn.innerText = "Player Two's Turn";
        }
        turnCounter += 1;
        p1Turn = false;
      } else if (p1Turn == false) {
        play_board[e] = p2;
        game_loop();
        if (turnCounter % 2 == 1) {
          playerTurn.innerText = "Player One's Turn.";
        } else if (turnCounter % 2 == 0) {
          playerTurn.innerText = "Player Two's Turn";
        }
        turnCounter += 1;
        p1Turn = true;
      }
    }
  }
};

/* Function that adds a computer move to the board. */
const addComputerMove = () => {
  if (isEasy == true) {
    let superScore = -100;
    let move;
    let score = 0;
    for (let i = 0; i < 9; i++) {
      let play_board2 = [...play_board];
      if (play_board2[i] == '') {
        play_board2[i] = computer;
        score = minimax(play_board2, 0, false, 1);

        if (score > superScore) {
          superScore = score;
          move = i;
        }
      }
    }
    play_board[move] = computer;
    game_loop();
  } else if (isNormal == true) {
    let superScore = -100;
    let move;
    let score = 0;
    for (let i = 0; i < 9; i++) {
      let play_board2 = [...play_board];
      if (play_board2[i] == '') {
        play_board2[i] = computer;
        score = minimax(play_board2, 0, false, 5);
        if (score > superScore) {
          superScore = score;
          move = i;
        }
      }
    }
    setTimeout(delayComputerMove(move), 2000);
    game_loop();
  } else if (isHard == true) {
    let bestScore = -100;
    let move;
    let score = 0;
    let play_board2 = [...play_board];
    for (let i = 0; i < 9; i++) {
      if (play_board2[i] == '') {
        play_board2 = [...play_board];
        play_board2[i] = computer;
        score = minimax(play_board2, 0, false, 9);
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    play_board[move] = computer;
    game_loop();
  }
};

/* Computer move after set delay */
function delayComputerMove(move) {
  play_board[move] = computer;
}

/* Function that chooses a random move */
function randomMove() {
  do {
    selected = Math.floor(Math.random() * 9);
  } while (play_board[selected] != '');
  play_board[selected] = computer;
  game_loop();
}

/* Minimax algorithm to find the best move */
function minimax(boardCopy, depth, isMaximizing, maxDepth) {
  let result = checkWinner(boardCopy);
  board = [...boardCopy];
  let bestScore;
  let finalScore;

  if (depth > maxDepth) {
    finalScore = 0;
  } else {
    if (result !== 'null') {
      if (result == computer) {
        finalScore = 10 - depth;
      } else if (result == player) {
        finalScore = depth - 10;
      } else if (result == 'tie') {
        finalScore = 0;
      }
    } else {
      if (isMaximizing) {
        /* Maximizing function for the minimax algorithm. */
        bestScore = -100;
        for (let i = 0; i < 9; i++) {
          if (board[i] == '') {
            board[i] = computer;
            let score = minimax(board, depth + 1, false, maxDepth);
            board = [...boardCopy];
            if (score > bestScore) {
              bestScore = score;
            }
          }
        }
        finalScore = bestScore;
      } else {
        /* Minimizing function for the minimax algorithm. */
        bestScore = 100;
        for (let i = 0; i < 9; i++) {
          if (board[i] == '') {
            board[i] = player;
            let score = minimax(board, depth + 1, true, maxDepth);
            board = [...boardCopy];
            if (score < bestScore) {
              bestScore = score;
            }
          }
        }
        finalScore = bestScore;
      }
    }
  }

  return finalScore;
}

/* Function to check if someone won the game in a combonation of three squares. */
function check_line(board, a, b, c) {
  return board[a] == board[b] && board[b] == board[c] && board[a] != '';
}

/* function to check if there is a winner or a tie.*/
function checkWinner(board) {
  let winner = 'null';

  for (let i = 0; i < 9; i += 3) {
    if (check_line(board, i, i + 1, i + 2)) {
      winner = board[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (check_line(board, i, i + 3, i + 6)) {
      winner = board[i];
    }
  }

  if (check_line(board, 0, 4, 8)) {
    winner = board[0];
  }
  if (check_line(board, 2, 4, 6)) {
    winner = board[2];
  }

  let openSpots = 0;
  for (let i = 0; i < 9; i++) {
    if (board[i] == '') {
      openSpots++;
    }
  }

  if (winner == 'null' && openSpots == 0) {
    winner = 'tie';
  }
  return winner;
}

/* Checks if the board is full and it is a tie. */
boardFull = (i) => {
  let flag = true;
  i.forEach((element) => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  board_full = flag;
};

/* Resets the board if the game is over. */
const reset_board = () => {
  play_board = ['', '', '', '', '', '', '', '', ''];
  board_full = false;
  winner.classList.remove('playerWin');
  winner.classList.remove('computerWin');
  winner.classList.remove('draw');
  winner.innerText = '';
  render_board();
  if (player == 'O' && twoPlayers == false) {
    addComputerMove();
  }
  if (twoPlayers == true) {
    if (p1Start == true) {
      playerTurn.innerText = "Player One's Turn.";
    } else if (p1Start == false) {
      playerTurn.innerText = "Player Two's Turn.";
    }
    p1Turn = true;
    playerOneCharacter.innerText = 'Player One is X and Goes First';
    turnCounter = 1;
    p1Start = false;
  }
};

/* Initial render to start the game */
render_board();
