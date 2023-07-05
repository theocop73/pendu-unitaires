import {test , expect, afterEach,beforeEach, describe, it, vi, beforeAll } from 'vitest'
const { getRandomWord, playGame, drawHangman, displayWord, initializeUncoveredWord, updateUncoveredWord, isLetterValid, isLetterInWord, isWordGuessed, decrementRemainingGuesses } = require('./pendu.js');
const axios = require('axios');
const prompts = require('prompts');
const pendu = require('./pendu');

  

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

  test('Decrement remaining guesses when incorrect letter is guessed', () => {
    let remainingGuesses = 5;
    const guessedLetter = 'x';
    const updatedRemainingGuesses = decrementRemainingGuesses(remainingGuesses, guessedLetter);
    expect(updatedRemainingGuesses).toBe(4);
  });






// describe('Hangman Game', () => {
//   let secretWord;
//   beforeEach( () => {
//     vi.restoreAllMocks();
//     const mockAxiosGet = vi.fn().mockResolvedValue({
//       data: [{ name: 'test', categorie: 'testcategory' }],
//     });
//     const mockGetRandomWord = vi.spyOn(pendu, 'getRandomWord').mockReturnValue('test');
  
    
 
//     const originalAxiosGet = axios.get;
//     axios.get = mockAxiosGet;

//     secretWord = mockGetRandomWord();

//     prompts.inject(['t']);
//     prompts.inject(['e']);
//     prompts.inject(['s']);
    

//     axios.get = originalAxiosGet;
//     mockGetRandomWord.mockRestore();


//   });

//   it('should play the game', async () => {
//     const spyConsoleLog = vi.spyOn(console, 'log');

   
//     await playGame();
//      // Vérifie si getRandomWord a été appelé
    
    
//     expect(spyConsoleLog).toHaveBeenCalledWith('Welcome to Hangman!');

//     spyConsoleLog.mockRestore();
  
    
    
//   });
  

//   it('should display the hangman drawing', () => {
//     const consoleSpy = vi.spyOn(console, 'log');
//     drawHangman();
//     expect(consoleSpy).toHaveBeenCalled();
//     consoleSpy.mockRestore();
//   });

//   it('should display the uncovered word', () => {

//     const uncoveredWord = initializeUncoveredWord(secretWord);
//     expect(uncoveredWord).toBe('____');
  
//   });

//   it('should update the uncovered word', () => {
//     const uncoveredWord = '____';
//     const updatedUncoveredWord = updateUncoveredWord(secretWord, uncoveredWord, 'e');
//     expect(updatedUncoveredWord).toBe('_e__');
//   });

//   it('should check if a letter is valid', () => {
//     expect(isLetterValid('a')).toBeTruthy();
//     expect(isLetterValid('5')).toBeFalsy();
//     expect(isLetterValid(' ')).toBeFalsy();
//     expect(isLetterValid('')).toBeFalsy();
//   });

//   it('should check if a letter is in the word', () => {
//     expect(isLetterInWord(secretWord, 't')).toBeTruthy();
//     expect(isLetterInWord(secretWord, 'a')).toBeFalsy();
//   });

//   it('should check if the word is guessed', () => {
//     const guessedLetters = ['e', 's'];
//     expect(isWordGuessed(secretWord, guessedLetters)).toBeFalsy();
//     guessedLetters.push('t');
//     expect(isWordGuessed(secretWord, guessedLetters)).toBeTruthy();
//   });

//   it('should decrement remaining guesses', () => {
//     let remainingGuesses = 5;
//     const guessedLetter = 'x';
//     const updatedRemainingGuesses = decrementRemainingGuesses(remainingGuesses, guessedLetter);
//     expect(updatedRemainingGuesses).toBe(4);
//   });
// });

  

  

 
  


  