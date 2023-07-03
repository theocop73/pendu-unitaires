import {test , expect } from 'vitest'
const { getRandomWord, playGame, drawHangman, displayWord, initializeUncoveredWord, updateUncoveredWord, isLetterValid, isLetterInWord, isWordGuessed } = require('./pendu');

  

test('Test if secret word is correctly chosen', async (t) => {
  const randomWord = await getRandomWord();
    t.expect(typeof randomWord).toBe('string')
});

test('Test if uncovered word is initialized correctly', (t) => {
    const secretWord = 'hangman';
    const uncoveredWord = initializeUncoveredWord(secretWord);
    t.expect(uncoveredWord).toBe('_______');
  });
  
  test('Test if uncovered word is updated correctly', (t) => {
    const secretWord = 'hangman';
    const uncoveredWord = '_______';
    const updatedWord = updateUncoveredWord(secretWord, uncoveredWord, 'a');
    t.expect(updatedWord).toBe('_a___a_');
  });

  test('Test if letter validation works correctly', (t) => {
    t.expect(isLetterValid('a')).toBe(true);
    t.expect(isLetterValid('B')).toBe(true);
    t.expect(isLetterValid('1')).toBe(false);
    t.expect(isLetterValid('@')).toBe(false);
    // Add more test cases as needed
  });
  
  test('Test if letter is correctly checked in the word', (t) => {
    const secretWord = 'hangman';
    t.expect(isLetterInWord(secretWord, 'a')).toBe(true);
    t.expect(isLetterInWord(secretWord, 'z')).toBe(false);
    // Add more test cases as needed
  });
  
  test('Test if word is correctly guessed', (t) => {
    const secretWord = 'hangman';
    const guessedLetters = ['h', 'a', 'n', 'g', 'm'];
    t.expect(isWordGuessed(secretWord, guessedLetters)).toBe(true);
  });


  test('Test if word is uncorrectly guessed', (t) => {
    const secretWord = 'hangman';
    const guessedLetters = ['n', 'g', 'm'];
    t.expect(isWordGuessed(secretWord, guessedLetters)).toBe(false);
  });

 
  


  