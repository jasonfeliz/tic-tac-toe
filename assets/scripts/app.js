'use strict'

const events = require('./events.js')



$(() => {

	const gameObj = {
		player_one:"x",
		player_two:"o",
		currentPlayer:"",
		moves: new Array(),
		winner:false,
		gameOver:false
	}

	for(let i=0;i < 9;i++){
		gameObj.moves[i] = i;
	}

	$('#signedin,.nav-links').hide()
	$('#welcome-message').show()
	$('#welcome-message').html("Register or Sign In to get started!")
	//when user clicks register button
	$("#register-button").click(events.onSignUp)
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
