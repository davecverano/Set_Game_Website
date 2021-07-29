/* Initialize all variables used throughout the file to starting values */
var cards;
var deck;
var cardsInSet;
var numInDeck = 12;
var userSet = [];
var autocheck = true;
var setExists = false;
var player1 = { score: 0, isPlaying: true };
var player2 = { score: 0, isPlaying: false };
var player3 = { score: 0, isPlaying: false };
var player4 = { score: 0, isPlaying: false };

/* 
   Description: 
    Handles the clicking of images event. Does not allow 2 of the same card to be clicked.
    Once 3 have been clicked, it checks if it is a valid set and handles removing the cards,
    incrementing player score and putting in the new cards. It also handles the borders of the cards.
    If the cards are not a valid set, it decrements the player a point.
*/  
function imageEvent(image_id){

	// Check if same card clicked twice
	if(userSet.indexOf(parseInt(image_id)) != -1){
	
		alert(" You cannot click the same card twice. ");
		
		for(var i = 0; i < userSet.length; i++){
        	//put borders back to black
        	document.getElementById(userSet[i]).style.border = "4px solid #000000";
        }
		userSet = [];
	}
	else{
	
	// Enter images user clicked into array
    userSet.push(parseInt(image_id));
    
    // Set border when clicked
    document.getElementById(image_id).style.border = "6px solid #FFFF00";
    
    if(userSet.length == 3){
    
    	// Check if valid set
        if(setChecker(deck[userSet[0]],deck[userSet[1]],deck[userSet[2]])){
        	// If yes, add score to correct player
			if(player1.isPlaying == true) { player1.score++; document.getElementById("player1").innerHTML = "Player 1 Score: " + player1.score; }
			else if (player2.isPlaying == true) { player2.score++; document.getElementById("player2").innerHTML = "Player 2 Score: " + player2.score; }
			else if (player3.isPlaying == true) { player3.score++; document.getElementById("player3").innerHTML = "Player 3 Score: " + player3.score; }
			else if (player4.isPlaying == true) { player4.score++; document.getElementById("player4").innerHTML = "Player 4 Score: " + player4.score; }
			
			// Sort the indices of the valid set
            var sortedUserSet = sortArray(userSet);
            
            // Remove those cards from the deck
            for(var i = 2; i >= 0; i--){
                deck.splice(sortedUserSet[i],1);
		        numInDeck--;
            }
            
            // Replace the cards that were removed
            if(numInDeck < 12){
            	addCards();
            }
            cardsInSet.length=0;
            
            // Run it again
            game();
            }

        else{
        
        	// If not a set, decrement the right player's score
        	if(player1.isPlaying == true) { player1.score--; document.getElementById("player1").innerHTML = "Player 1 Score: " + player1.score; }
			else if (player2.isPlaying == true) { player2.score--; document.getElementById("player2").innerHTML = "Player 2 Score: " + player2.score; }
			else if (player3.isPlaying == true) { player3.score--; document.getElementById("player3").innerHTML = "Player 3 Score: " + player3.score; }
			else if (player4.isPlaying == true) { player4.score--; document.getElementById("player4").innerHTML = "Player 4 Score: " + player4.score; }
            alert(" That is not a set. You lose a point. ");
            
            for(var i = 0; i < 3; i++){
            	//put borders back to black
            	document.getElementById(userSet[i]).style.border = "4px solid #000000";
            }
        }
        userSet = [];
        }
     }
}

/* 
   Description: 
    Function used to clear out the array variables used in the program.
*/  
function clear(){
    cards = [];
    deck = [];
    cardsInSet = [];
    userSet = [];
}

/* 
   Description: 
    Function used to start a new fresh game that can be used at any point in the program.
*/  
function newGame(){
	// Reset all variables to starting values
	cards = [];
	deck = [];
	numInDeck = 12;
	cardsInSet = [];
	userSet = [];
	player1.score = 0;
	player2.score = 0;
	player3.score = 0;
	player4.score = 0;
	
	// Remake all the cards
    initializeCards();   
    
    // Shuffle them and put them in a new deck
    deck = newDeck(cards);
    
    //Start the game
    game();
}


/*
  Description: 
   Prints the index of one card that is in a set
   Ensures:
   Printed index is in a set
*/
function giveHint(){
    
    if (setExists) {
    
    	// Get index of random card that is in a set on the table
		var randomVar = Math.floor(Math.random() * Math.floor(cardsInSet.length));
		
		// Display it
		document.getElementById("deleteThis").innerHTML = ("<p>Card " + (cardsInSet[randomVar] + 1) + " is in a set." + "</p>");
	} else {
	
		// If there are no sets (AutoCheck is off), then display this hint
		document.getElementById("deleteThis").innerHTML = "No Sets on Table!";
	}	 		
}

/* 
   Description: 
    Initializes all the cards in the game, and puts them in an array called cards.
*/  
function initializeCards(){


    /* Initialization */
    clear();
    var colors = ["red","green", "purple"];
    var shapes = ["oval","diamond","squiggle"];
    var shadings = ["solid","outline","striped"];
    var numbers = ["one", "two", "three"];

    /* Add all of 81 cards into cards[] */
    var i,j,k,l;
    for(i in colors){
        for(j in shapes){
            for(k in shadings){
                for(l in numbers){
                    var card = {color: colors[i],
                                shape: shapes[j],
                                shading: shadings[k],
                                number: numbers[l],
                                image: "images/" + colors[i] + shapes[j] + shadings[k] + numbers[l] + ".png",
                                };
                    cards.push(card);

                }
            }
        }
    }
}

/* 
   Description: 
    Shuffles the deck of cards at the beginning of the game.
*/  
function shuffle(original_array){

		// Copy array from the original deck
        let array= Array.from(original_array);
        let length=array.length;
        let index=0;
        let temp;
        while(length>0){
        
        	//pick a card randomly and put in at the bottom of the deck
            index=Math.floor(Math.random()*length);  
            length--;

            // Swap the cards at the bottom with the one picked randomly
            temp=array[length];
            array[length]=array[index];
            array[index]=temp;
        }
        
        // Return shuffled array
        return array;
}

/* 
   Description: 
    Sorts the array so that removal is always done from the end.
*/  
function sortArray(arr){

	// Copy array from original
	let array= Array.from(arr);
    let n=array.length;
    let index=0;
    var i;
    var j;
    
    // Loop through, grab two elements, compare, and swap if necessary 
    for (i = 0; i < n-1; i++) {
        for (j = 0; j < n-i-1; j++) {
        
        	// Compare values
            if (array[j] > array[j+1]) {
            
                // swap arr[j+1] and arr[j]
                var temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
       	}
    }
    return array;
}

/* 
   Description: 
    Displays the cards left, the numbers above the cards, and all of the cards on the screen.
*/  
function displayDeck(){
	var i;
	var j;
	var displayCode = "";	
	
	// Display cards left
	document.getElementById("debug").innerHTML = "<h4> Cards left: " + cards.length + "</h4>";
	
	// Loop through all possible table cells and remove images
	for(i = 0; i < 30; i++) {
		document.getElementById("image" + i).innerHTML = "";
	}
	
	// Display all cards currently in the deck
	for(i = 0; i < numInDeck; i++) {
		document.getElementById("image" + i).innerHTML = "<h5>" + (i+1) + "</h5>" + "<img id = \"" + i + "\" class = \"images\" src=\"" + deck[i].image + "\" onclick=\"imageEvent(this.id)\">";
		
    }
	    
}


/* 
   Description: 
    Removes duplicates from an array.
*/  
function uniq(array) {

		// Filter out duplicates
        return array.filter(function(e, i, a) {
        
          //return only when it first appears
          return a.indexOf(e, 0) === i;
        });
}

/* 
   Description: 
    Shuffles all the cards, deals a deck at beginning of game.
*/  
function newDeck(){

		// Shuffle the cards
        cards = shuffle(cards);
        
        // Push 12 cards into deck
        while(deck.length < numInDeck){
        	deck.push(cards.pop());
        }
        
        // Return beginning deck
        return deck;
}

/* 
   Description: 
   		Determines whether a set is in the deck or not
   Ensures:
        Either |cardsInSet| = 0 or |cardsInSet| = 3 and
        For all i,j in cardsInSet, 0 <= i,j <= numInDeck-1 and i!=j
        Returns true if cards in indeces of @cardsInSet is a set and false otherwise
*/  
function checkForSet(){
        let i = 0;
        let j = i+1;
        let k = j+1;
        setExists = false;
        
        // clear the array
        cardsInSet.length=0;   
        while (i < j){
            j=i+1;
            while (j < k){
                k=j+1;
                while (k < deck.length){
                
                	// Check if it is a set
                    if (setChecker(deck[i], deck[j], deck[k])){                   
                        setExists = true;
                        //CHEAT CODE IS LINE BELOW
                        document.getElementById("deleteThis").innerHTML = "CHEAT CODE: Set is " + (i+1) + "," + (j+1) + "," + (k+1);
                        
                        // Add index of each card for hint
                        cardsInSet.push(i);
                        cardsInSet.push(j);
                        cardsInSet.push(k);
                        
                        // Delete duplicates
                        uniq(cardsInSet);
                     }
                    k++;
                }
                j++;
            }
            i++;
        }
        
        // don't want to return integer, want to return boolean
        return setExists;
}

/*	
	Description:
      	Checks if the 3 card objects, card1, card2, card3 
      	All have either the same or different color, shape, shading, and number  
	Ensures:
      	Returns true if card1, card2, card3 is a set otherwise false
*/
function setChecker(card1, card2, card3){
    
        let tColor = (card1.color == card2.color && card2.color == card3.color) || (card1.color != card2.color && card2.color != card3.color && card1.color != card3.color);
        let tShape = (card1.shape == card2.shape && card2.shape == card3.shape) || (card1.shape != card2.shape && card2.shape != card3.shape && card1.shape != card3.shape);
        let tShading = (card1.shading == card2.shading && card2.shading == card3.shading) || (card1.shading != card2.shading && card2.shading != card3.shading && card1.shading != card3.shading);
        let tNumber = (card1.number == card2.number && card2.number == card3.number) || (card1.number != card2.number && card2.number != card3.number && card1.number != card3.number);

        if (tColor&&tShape&&tShading&&tNumber){
            return true;
        }
        else{
            return false;
        }
}
    
/* 
	Description: 
    	Adds a card to the deck and removes a card from the remaining pool of cards 
    Ensures:
    	|cards| = |cards| - 1 and |deck| = |deck| + 1 and
    	There exists a card <x> in Cards such that cards * <x> = cards and deck = deck * <x>   
*/    
function addCards(){
		
		// We do not allow more than 30 cards on table
		if(deck.length > 27) {
			alert("Maximum cards on table.");
        } 
        // 
        else if(cards.length > 0) {
        
        	// Push cards into the deck
		    for (var i=0; i<=2; i++){
		    	deck.push(cards.pop());
		    	numInDeck++;
		    }
		}
		
		// Check if there are sets in new deck
		checkForSet();
		
		// Display the whole deck after additions
    	displayDeck();     
}

/* 
   Description: 
    Toggles on or off the autocheck feature of the game. 
*/  
function toggleAutoCheck(){

	// If it is clicked and is on, turn it off
	if(autocheck) {
		document.getElementById("autoCheckButton").innerHTML = "Autocheck: Off";
		autocheck = false;
	} 
	
	// If it is clicked and is off, turn it on
	else {
		document.getElementById("autoCheckButton").innerHTML = "Autocheck: On";
		autocheck = true;
	}
}

/* 
   Description: 
    Determines which player button was clicked, and toggles that player as the
    player currently playing.
*/ 
function playerHandler(player_id){

	// Immediately set them all to false, to clear out past clicks
	player1.isPlaying = false;
	player2.isPlaying = false;
	player3.isPlaying = false;
	player4.isPlaying = false;
	
	// Check which one was clicked and set it to true
	if(player_id == "player1") { player1.isPlaying = true; }
	else if(player_id == "player2") { player2.isPlaying = true; }
	else if(player_id == "player3") { player3.isPlaying = true; }
	else if(player_id == "player4") { player4.isPlaying = true; }
	 
}

/* 
   Description: 
    Used to determine winner at end of game and returns string used in alert.
*/ 
function determineWinner(){

	// Load each player score into array
	var scores = [];
	scores[0] = player1.score;
	scores[1] = player2.score;
	scores[2] = player3.score;
	scores[3] = player4.score;
	
	// Return index of winning score + 1 for 1 off errors
	winner = scores.indexOf(Math.max(...scores)) + 1;
	
	// Return string used in winner alert at end of game
	return "Player " + winner + " is the winner."
}

/* 
   Description: 
    Main gameplay loop triggered by imageEvent, and start of game.
    Displays deck, Checks if cards are needed for autocheck feature, determines when end of game is and winner.
*/ 
function game(){

	// Diplay cards in deck
    displayDeck();
    
    // If there is not a set
    if(!checkForSet()){
       
        // Autocheck feature, if there is not a set, then cards need to be added
        while ((cards.length > 0) && (deck.length < 12 || !checkForSet()) && autocheck){
            
                //Add 3 cards to the table (deck)
                addCards();
                
                
                //Let player know there are extra cards dealt
                if(numInDeck > 12){
                    alert("There were no sets found in the cards dealt.\n3 more were added to be able to find a set.\n");
                }
        }

		// Determine end of game, and congratulate winner
        if(cards.length <= 2){       
        	var winner = determineWinner();
            alert("Game is over.\n " + winner);     
            numInDeck = 12;
			userSet = [];
        }
    }  
}

/* 
   Description: 
    Is the call made in html file to start the first game. 
*/ 
function main() {

	// Make all the cards
	initializeCards();
	
	// Make a shuffled deck from those cards
	deck = newDeck();
	
	// Start gameplay loop
	game();
	
}

