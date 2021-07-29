# Set Game

## Information on Files and Team Roles

Team members: Justin Raiff, Dave Verano, Hanxiang Jang, Mitchell Bihn
All group members participated in writing, formatting, and testing code for each file.

- gameOfSet.html: This is the file that contains the structuring for our page, all of the html code. It links to our styling css file and Javascript file. 
- set.js: This file contains the game engine. It holds all the functions and behavior for our game. 
- site.css.scss: This file contains all of the styling rules used in our game, for html tags, ids, etc.
- images folder: This folder contains all of the images of all the cards we used. 

We put all of our JavaScript in one file as Charlie reccomended because of the way JavaScript works and it's difference from Java and Ruby. 

## Getting Started

To play our game, you don't need to install anything, just simply clone our github repository and type this command into your terminal from the team-sapphire-project5 directory.

```
> firefox gameOfSet.html
```
## Rules of Set

In this version of the game, 1 to 4 players can compete against each other on the same computer. Each player will be one of the 4 player buttons on the screen, and when they are ready to enter a set they click which player they are and click the cards in the set. If it is right, they gain a point, if not they lose a point. The player with the most score at the end wins. A set is a group of 3 cards that, for each attribute (color, number, texture, shape), all cards match, or all cards are unique. Each attribute is independent of another. 
<br><br>
The "New Game" button will completely reset the game, with a whole new shuffled deck, new cards on the table, and reset everyone's scores. 
<br><br>
The "Hint" button will upon click, tell you 1 card that is in a set on the table. 
<br><br>
The "AutoCheck: On/Off" button will if toggled on, automatically detect if there is a set on the table and if not will automatically add 3 cards until there is a findable set. If turned off, this is on the user ot identify and add 3 cards manually with the add 3 cards button.
<br><br>
The "Add 3 Cards" button adds 3 cards to the board manually upon click. This and AutoCheck Off are the configuration most like the card game. 

## More About the Game
Set is played at a fast pace, and you are racing to identify a set in a given card deal.

When a player identifies a set, the player must click their button on the screen, either 1 2 3 or 4. 

The player will then click the three cards on screen they think are a set. If the set is not valid, the player will lose a point, and the cards remain on the table. If the set is valid, the cards will be removed from the table and replaced by 3 different cards, and the player will earn a point. 

If at any point there are no sets left on a given deal, if AutoCheck is on, cards will be added to the table in groups of 3 until there is a set. If AutoCheck is off, the player will have to identify that there are no sets and hit the "Add 3 Cards" button to manually add 3 cards to the table. If the deck runs out before there is a set present, the game will end.

A hint will reveal a card at random that is a part of a set. There are unlimited hints, but keep in mind that these hints are global, and other players will be able to see them! 

The winner of the game is the player with the most points when the deck runs out.

Good luck, and have fun!


## For graders 
There is an optional, currently not commented out "cheat code" that is enabled to help yourself find sets quickly. The checkForSets method in the set.js file at line 221 contains a print statement that will show you where sets are. It is labeled with a comment.

