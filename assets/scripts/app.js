'use strict'

const events = require('./events.js')



$(() => {
	
	const gameObj = {
		player_one:"x",
		player_two:"o",
		currentPlayer:"",
		winner:false
	}

	// //when page loads, create tic tac toe board
	events.createGame(gameObj);
	console.log(gameObj)
	//when user clicks
	$('.square').click(function(){
		events.displayMove($(this),gameObj)
		events.checkWinner($(this))
	})





})
