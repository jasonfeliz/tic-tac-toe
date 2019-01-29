'use strict'

const events = require('./events.js')



$(() => {

	const gameObj = {
		player_one:"x",
		player_two:"o",
		currentPlayer:"",
		moves: [0,1,2,3,4,5,6,7,8],
		winner:false,
		gameOver:false
	}

	$('#signedin,.nav-links').hide()
	$('#welcome-message').show()
	$('#welcome-message').html("Register to get started!")
	//when user clicks register button
	$("#register-form").submit(events.onSignUp)
	$("#signin-button").click(function(){
		events.onSignIn()
	})
	$("#cp-button").click(events.onChangePassword)
	$("#signout").click(events.onSignOut)

	// //when page loads, create tic tac toe board


	$('#newGameButton,#resetButton').click(function(){
		events.createGame(gameObj);
			//when user clicks
		$('.square').click(function(){
			events.makeMove($(this),gameObj)
		})
	})




		$('#getPastGames').click(function(){
			events.getGames();

		})



})
