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
		gameObj.moves[i] = Math.random();
	}
	// //when page loads, create tic tac toe board
	if(loggedIn){
		
		events.createGame(gameObj);
		$('#message').html(gameObj.currentPlayer + " , it's your turn to play")
		//when user clicks
		$('.square').click(function(){
			events.makeMove($(this),gameObj)
		})

		$('#resetButton').click(function(){
			events.resetGame(gameObj) //reset board
		})		
	}else{
		$('#signedin, nav, #main-content').css("display","none")
	}







})
