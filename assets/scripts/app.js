'use strict'

const events = require('./events.js')



$(() => {
	
	const gameObj = {
		player_one:"x",
		player_two:"o",
		currentPlayer:"",
		moves: new Array(),
		winner:false
	}

	for(let i=0;i < 9;i++){
		gameObj.moves[i] = Math.random();
	}
	// //when page loads, create tic tac toe board
	events.createGame(gameObj);
	//when user clicks
	$('.square').click(function(){
		events.displayMove($(this),gameObj)
	})







})
