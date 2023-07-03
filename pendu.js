const prompts = require('prompts');
const axios = require('axios');

let secretWord = '';
let wordCategory = '';
let guessedLetters = [];
let remainingGuesses = 6;

async function getRandomWord() {
    try {
      const response = await axios.get('https://trouve-mot.fr/api/random');
      const wordData = response.data;
      secretWord = wordData[0].name.toLowerCase();
      wordCategory = wordData[0].categorie
      return secretWord
    } catch (error) {
      console.error('Error fetching random word:', error.message);
      process.exit(1);
    }
  }



function drawHangman() {
  const drawings = [
    `
     _____
    |     |
    |     
    |     
    |     
    |     
   _|_
  |   |______
  |__________|
  `,
    `
     _____
    |     |
    |     o
    |     
    |     
    |     
   _|_
  |   |______
  |__________|
  `,
    `
     _____
    |     |
    |     o
    |     |
    |     
    |     
   _|_
  |   |______
  |__________|
  `,
    `
     _____
    |     |
    |     o
    |    /|
    |     
    |     
   _|_
  |   |______
  |__________|
  `,
    `
     _____
    |     |
    |     o
    |    /|\\
    |     
    |     
   _|_
  |   |______
  |__________|
  `,
    `
     _____
    |     |
    |     o
    |    /|\\
    |    /  
    |     
   _|_
  |   |______
  |__________|
  `,
    `
     _____
    |     |
    |     o
    |    /|\\
    |    / \\
    |     
   _|_
  |   |______
  |__________|
  `
  ];

  console.log(drawings[6 - remainingGuesses]);
}

function initializeUncoveredWord(secretWord) {
  return '_'.repeat(secretWord.length);
}

function updateUncoveredWord(secretWord, uncoveredWord, letter) {
  let newUncoveredWord = '';

  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === letter) {
      newUncoveredWord += letter;
    } else {
      newUncoveredWord += uncoveredWord[i];
    }
  }

  return newUncoveredWord;
}

function isLetterValid(letter) {
  const regex = /^[a-zA-Z]$/;
  return regex.test(letter);
}

function isLetterInWord(secretWord, letter) {
  return secretWord.includes(letter);
}

function isWordGuessed(secretWord, guessedLetters) {
  const secretLetters = secretWord.split('');
  return secretLetters.every((letter) => guessedLetters.includes(letter));
}


function displayWord() {
  let displayedWord = '';
  for (const letter of secretWord) {
    if (guessedLetters.includes(letter)) {
      displayedWord += letter;
    } else {
      displayedWord += '_';
    }
  }
  console.log(displayedWord);
}

function decrementRemainingGuesses(remainingGuesses, guessedLetter) {
  if (!secretWord.includes(guessedLetter)) {
    return remainingGuesses - 1;
  }
  return remainingGuesses;
}

async function playGame() {
  console.log('Welcome to Hangman!');

  secretWord = await getRandomWord();
  let uncoveredWord = initializeUncoveredWord(secretWord);

  while (remainingGuesses > 0) {
    console.log(`\nRemaining guesses: ${remainingGuesses}`);
    console.log(`\nDiscovered Letters: ${guessedLetters}`);
    drawHangman();
    displayWord();

    const response = await prompts({
      type: 'text',
      name: 'letter',
      message: 'Guess a letter:'
    });

    const guessedLetter = response.letter.toLowerCase();

    if (!isLetterValid(guessedLetter)) {
      console.log('Please enter a valid letter!');
      continue;
    }

    if (guessedLetters.includes(guessedLetter)) {
      console.log('You already guessed that letter!');
      continue;
    }

    guessedLetters.push(guessedLetter);

    if (isLetterInWord(secretWord, guessedLetter)) {
      uncoveredWord = updateUncoveredWord(secretWord, uncoveredWord, guessedLetter);
      console.log('Correct guess!');

      if (isWordGuessed(secretWord, guessedLetters)) {
        console.log('Congratulations! You won!');
        return;
      }
    } else {
      console.log('Incorrect guess!');
      remainingGuesses = decrementRemainingGuesses(remainingGuesses, guessedLetter);

      if (remainingGuesses === 0) {
        console.log('Game over! You lost.');
        console.log(`\nThe secret word was: ${secretWord}`);
        return;
      }
    }
  }
}

playGame();
module.exports = { getRandomWord, playGame, drawHangman, displayWord, initializeUncoveredWord, updateUncoveredWord, isLetterValid, isLetterInWord, isWordGuessed, decrementRemainingGuesses };