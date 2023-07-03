const prompts = require('prompts');

const words = ['hangman', 'computer', 'javascript', 'nodejs'];

async function playHangman() {
  const secretWord = chooseSecretWord();
  let uncoveredWord = initializeUncoveredWord(secretWord);

  let remainingGuesses = 10;
  let guessedLetters = [];

  while (remainingGuesses > 0 && uncoveredWord !== secretWord) {
    console.log(`Mot à deviné: ${uncoveredWord}`);
    console.log(`Essais restants: ${remainingGuesses}`);
    console.log(`lettres devinée: ${guessedLetters.join(', ')}`);

    const response = await prompts({
        type: 'text',
        name: 'letter',
        message: 'hop hop hop tu me donnes une lettre:',
        validate: value => {
          const regex = /^[a-zA-Z]$/; 
          if (!regex.test(value)) {
            return 'on joue au pendu pourquoi tu met autre chose qu\'UNE lettre.';
          }
          return true;
        }
      });

    const guessedLetter = response.letter.toLowerCase();

    if (!guessedLetters.includes(guessedLetter)) {
      guessedLetters.push(guessedLetter);

      if (secretWord.includes(guessedLetter)) {
        uncoveredWord = updateUncoveredWord(secretWord, uncoveredWord, guessedLetter);
        console.log('Bien vu!');
      } else {
        remainingGuesses--;
        console.log('Raté nullos!');
      }
    } else {
      console.log('concentre toi tu as déjà proposé cette lettre');
    }
  }

  if (uncoveredWord === secretWord) {
    console.log(`LESGO LE MOT ETAIT BEL ET BIEN  "${secretWord}"!`);
  } else {
    console.log(`looser , le mot était : "${secretWord}"`);
  }
}

function chooseSecretWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
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

playHangman();
