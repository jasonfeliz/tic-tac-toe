'use strict'

const events = require('./events.js')



$(() => {
	const loggedIn = false;

	const gameObj = {
		player_one:"x",
		player_two:"o",
		currentPlayer:"",
		moves: new Array(),
		winner:false
	}

	for(let i=0;i < 9;i++){
		gameObj.moves[i] = 0;
	}

	$('#signedin,.nav-links').hide()
	$('#welcome-message').show()
	$('#welcome-message').html("Register or Sign In to get started!")
	//when user clicks register button
	$("#register-button").click(events.onSignUp)
	$("#signin-button").click(function(){
		events.onSignIn()
		let x = sessionStorage.getItem('token')
		events.onCreateGame(x)
	})
	$("#cp-button").click(events.onChangePassword)
	$("#signout").click(events.onSignOut)

	// //when page loads, create tic tac toe board
		


		$('#resetButton').click(function(){
			events.resetGame(gameObj) //reset board
		})		


		events.createGame(gameObj);
		$('#message').html(gameObj.currentPlayer + " , it's your turn to play")

		//when user clicks
		$('.square').click(function(){
			events.makeMove($(this),gameObj)
		})





})
