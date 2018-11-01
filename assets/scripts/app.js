'use strict'

const events = require('./events.js')



$(() => {
	
	
	//when page loads, display tic tac toe board
	events.displayBoard();

	//when user clicks
	$('.square').click(events.displayMove)





})
