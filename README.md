# tests-unitaires
repo pour suivre 3 jours de formation sur les tests unitaires




# 1-Découverte des tests

**- Selon-vous, qu'est ce qu'un test ?**  
*pour moi un test est du code qui va permettre de vérifier le fonctionnement / logique d'un autre code*

**- À quoi servent les tests ?**  
*ils vont permettre plusieurs choses comme vérifier la vitesse d'execution d'un code ou encore vérifier des valeurs d'entrées ou de sortie*


**- Y a-t-il plusieurs types de tests ? Si oui, quelle est leur différence ?**
*à ma connaissance oui, je sais qu'il y à au moins les tests unitaires ansi que les tests fonctionnelles mais je suppose qu'il en existe encore des différrents*

**- Intuitivement, à quelles bonnes pratiques de conception de tests, vous pouvez penser ?** 
*tester son code dès que possible*

**- À l’inverse, et toujours sans vous aider d’internet, qu’est-ce qui pourrait être une mauvaise
pratique de conception de test?**  
*faire des tests non indépendants: les tests unitaires ne doivent pas dépendre du résultat d'un autre tests, sinon cela devient plus compliqué de localisé les bugs*



**Liste des fonctions pour le pendu**

1. Une fonction qui récupère un mot aléatoire bien formatté !
2. Une fonction qui met n _ par rapport à la taille du mot secret
3. Une fonction qui vérifie si la lettre proposé est dans le mot
4. Une fonction qui si la lettre proposé est dans le mot alors remplacé le _ par la lettre proposé 
5. Vérifier si une lettre incorrectement devinée réduit le nombre d'essais restants.
6. Vérifier si le jeu se termine correctement lorsqu'un joueur a gagné.
7. Vérifier si le jeu se termine correctement lorsqu'un joueur a perdu.
 




**Cahier de test**

| N  	| Action                                                     	| Attendu                                                                         	| Resultat attendu                                 	|
|----	|------------------------------------------------------------	|---------------------------------------------------------------------------------	|--------------------------------------------------	|
| 1  	| getRandomWord()                                            	| Une chaine de caractère non vide                                                	| Mot secret est une chaîne non vide               	|
| 2  	| decrementRemainingGuesses(remainingGuesses, guessedLetter) 	| Le nombre d'essais restants diminue si l'utilisateur fait un mauvais guess      	| Nombre d'essais restants est correctement réduit 	|
| 3  	| isWordGuessed("hello", ["h", "e", "l", "o"])               	| Vérifier si le mot est entièrement deviné                                       	| true                                             	|
| 4  	| isWordGuessed("apple", ["a", "p", "l"])                    	| Vérifier si le mot n'est pas entièrement deviné                                 	| false                                            	|
| 5  	| isLetterInWord("hello", "h")                               	| Verifier si la lettre demandé est dans le mot                                   	| true                                             	|
| 6  	| isLetterInWord("hello", "b")                               	| Verifier si la lettre demandé n'est pas dans le mot                             	| false                                            	|
| 7  	| isLetterValid("a")                                         	| Vérifier si la lettre est une lettre valide                                     	| true                                             	|
| 8  	| isLetterValid("B")                                         	| Vérifier si la lettre est une lettre valide                                     	| true                                             	|
| 9  	| isLetterValid("7")                                         	| Vérifier si la lettre est une lettre valide                                     	| false                                            	|
| 10 	| isLetterValid("@")                                         	| Vérifier si la lettre est une lettre valide                                     	| false                                            	|
| 11 	| isLetterValid("")                                          	| Vérifier si la chaîne vide est une lettre valide                                	| false                                            	|
| 11 	| initializeUncoveredWord('hello')                           	| Vérifier que le mot partiellement découvert est initialisé avec des underscores 	| Le mot partiellement découvert est "_ _ _ _ _"   	|
| 12 	| updateUncoveredWord('hello', '_____', 'l')                 	| Mettre à jour le mot partiellement dévoilé                                      	| "__ll\_"                                          	|
| 13 	| updateUncoveredWord("test", "t__t", "e")                   	| Mettre à jour le mot partiellement dévoilé                                      	| "te_t"                                           	|
| 14 	| updateUncoveredWord("test", "t__t", "b")                   	| Ne pas mettre à jour le mot si la lettre n'est pas présente dans le mot         	| "t__t"                                           	|