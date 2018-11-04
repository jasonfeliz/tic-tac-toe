$('.close,.cancel-button').click(function(){
	$('.modal').hide()
})

$('#register').click(function(){
	$('#register-modal').show()
})
$('#signin').click(function(){
	$('#signin-modal').show()
})
$('#change-password').click(function(){
	$('#cp-modal').show()
})


const winHandler = function(_winner,gameObj){
	if (_winner === "x") {
		gameObj.winner = gameObj.player_one
	}else{
		gameObj.winner = gameObj.player_two
	}
	//TO-DO 
	//display winning message to board
	$('#message').html(_winner + " wins the game!")
}

const tieHandler = function(){
	$('#message').html("Oh snap! We have a tie :(")
}



module.exports = {
	winHandler,
	tieHandler
}