
Welcome to the Exciting World of Tic-Tac Toe

# Technologies

- jQuery
- Html
- Scss
- Ajax
- JSON


# Planning

- The scope of the project is to build a workable tic-tac-toe game,
- The strategy was to use Javascript to manipulate the DOM and control
	what the user sees in the browser
- This game is built for users to sign-up, sign-in, play tic-tac-toe against
themselves, and be able to see their game history

- One of the core functionality of my code is to use Ajax to be able to talk to a server.
- Talking to the server includes:
	- signing up
	- signing in
	- signing out
	- getting all games for logged in user
	- creating a new game
	- updating the game after each move

My main goal was to keep my code simple and robust. I wanted to do more with less. I feel that using loops,
objects, and arrays helped me achieve this goal


# Unsolved Problems
- I wanted to display the past games view to user once the user has signed in. I noticed that when I called a callback inside the sign-in click event that my store.token would be set to as undefined. I needed the token to retrieve past games.

- As time goes, I would certaintly like to jazz up the site and add more functionalities like getting profile info, let user add a profile photo and get wins/loss record for the user

# User Stories

- game player must be able to sign up
- game player must be able to sign in
- game player must be able to click on a square and have an x,o or a message display in an instant
- game player must be able to know if it's their turn to make a move
- game player must be able to see their wins/loss record
- game player must be able to see their past game history
- game player must be able to reset a current game or finished game

# wireframe
![alt text](https://i.imgur.com/mcK2axZ.jpg "Logo Title Text 1")
![alt text](https://i.imgur.com/vbKsNou.jpg "Logo Title Text 1")
