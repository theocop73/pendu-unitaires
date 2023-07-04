const prompts = require('prompts');
const axios = require('axios');

let secretWord = '';
let wordCategory = '';
let guessedLetters = [];
let remainingGuesses = 6;


function enleverAccents(str) {
  const accentsMap = {
    'à': 'a',
    'â': 'a',
    'ä': 'a',
    'á': 'a',
    'ç': 'c',
    'é': 'e',
    'è': 'e',
    'ê': 'e',
    'ë': 'e',
    'í': 'i',
    'ì': 'i',
    'î': 'i',
    'ï': 'i',
    'ñ': 'n',
    'ó': 'o',
    'ò': 'o',
    'ô': 'o',
    'ö': 'o',
    'ú': 'u',
    'ù': 'u',
    'û': 'u',
    'ü': 'u',
    'ý': 'y',
    'ÿ': 'y'
    // Ajoutez d'autres caractères avec leurs équivalents sans accent
  };

  return str
    .replace(/[àâäáçéèêëíìîïñóòôöúùûüýÿ]/g, function(match) {
      return accentsMap[match];
    })
    .normalize('NFD') // Convertit les caractères spéciaux en leur équivalent non accentué
    .replace(/[\u0300-\u036f]/g, ''); // Supprime les caractères diacritiques restants
}

async function getRandomWord() {
    try {
      const response = await axios.get('https://trouve-mot.fr/api/random');
      const wordData = response.data;
      secretWord = enleverAccents(wordData[0].name.toLowerCase());
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

async function chooseDifficulty() {
  const response = await prompts({
    type: 'select',
    name: 'difficulty',
    message: 'Choose a difficulty level:',
    choices: [
      { title: 'Easy', value: 6 },
      { title: 'Medium', value: 5 },
      { title: 'Hard', value: 3 }
    ]
  });

  return response.difficulty;
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

function decrementRemainingGuesses(remainingGuesses, guessedLetter, difficulty) {
  if (!secretWord.includes(guessedLetter)) {
    return remainingGuesses - 1;
  }
  return remainingGuesses;
}

async function playGame() {
  console.log('Welcome to Hangman!');

  secretWord = await getRandomWord();
  let uncoveredWord = initializeUncoveredWord(secretWord);
  const difficulty = await chooseDifficulty();
  remainingGuesses = difficulty;

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
    if (guessedLetter == "indice") {
      console.log(`l'indice est : ${wordCategory}`);
      continue;
    }

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
        console.log(`\nThe secret word was: ${secretWord}`);
        return true;
      }
    } else {
      console.log('Incorrect guess!');
      remainingGuesses = decrementRemainingGuesses(remainingGuesses, guessedLetter, difficulty);

      if (remainingGuesses === 0) {
        console.log('Game over! You lost.');
        console.log(`\nThe secret word was: ${secretWord}`);
        return false;
      }
    }
    
  }
  return false;
}

playGame();
module.exports = { getRandomWord, playGame, drawHangman, displayWord, initializeUncoveredWord, updateUncoveredWord, isLetterValid, isLetterInWord, isWordGuessed, decrementRemainingGuesses };