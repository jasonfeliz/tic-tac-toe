
const winHandler = function(_winner,gameObj){
	if (_winner === "x") {
		gameObj.winner = gameObj.player_tone
	}else{
		gameObj.winner = gameObj.player_two
	}
	
	console.log("we have a winner: " + _winner)
}

const tieHandler = function(){
	console.log("Oh snap! We have a tie :(")
}



module.exports = {
	winHandler,
	tieHandler
}