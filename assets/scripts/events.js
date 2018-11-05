const api = require('./api.js')
const ui = require('./ui.js')

const displayBoard = function(){
	$('#gameBoard').html("")
	const arr = new Array(3);
	let counter = 0;
	for(let i =0; i < arr.length; i++){
		arr[i] = new Array(3);
		for(let j=0;j<arr.length;j++){
			$('#gameBoard').append('<div class="square" data-squareId="'+counter+'"></div>')
			counter++
		}
	}
}

const createGame = function(gameObj){
	api.createGameApi()
	for(let i=0;i < 9;i++){
		gameObj.moves[i] = i;
	}
	displayBoard()
	gameObj.currentPlayer = gameObj.player_one
	gameObj.winner = false	
	$('#message,#resetButton').show()
	$('#message').html(gameObj.currentPlayer+ " , it's your turn to play")

}




const endGame = function(){
	$('#gameBoard div').map(function(){
		$(this).css("pointer-events","none")
	});
}

const makeMove = function(_data,gameObj){
	const currentSquareIndex = _data.data('squareid')
		if(_data.text() === "") {
			api.updateGameApi(gameObj.currentPlayer,currentSquareIndex,false)
			_data.text(gameObj.currentPlayer)
			gameObj.moves[currentSquareIndex] = gameObj.currentPlayer
			if ( _data.text() === "x") {
				_data.css('color','#ea7363')
				gameObj.currentPlayer = gameObj.player_two
			}else{
				_data.css('color','#5a626f')
				gameObj.currentPlayer = gameObj.player_one
			}
			$('#message').html(gameObj.currentPlayer+ " , it's your turn to play")
			const movesArr = gameObj.moves
			let movesArrLength = movesArr.filter((e) => isNaN(e)).length
			if(movesArrLength > 4){
				const _winner = checkWinner(currentSquareIndex,movesArr) 
				if (!_winner && movesArrLength === 9) {
					api.updateGameApi(_data.text(),currentSquareIndex,true)
					ui.tieHandler(_winner)
					endGame()
				}else if(_winner){
					api.updateGameApi(_winner,currentSquareIndex,true)
					ui.winHandler(_winner,gameObj)					
					endGame()
				}
			}
		}else{
			//display message to board that its an illegal move
			$('#message').html("Please click on an empty square")

		}


	
}

const checkWinner = function(i,a){
	const combos = [
		[0,1,2],
		[0,4,8],
		[0,3,6],
		[1,4,7],
		[2,4,6],
		[2,5,8],
		[3,4,5],
		[6,7,8]]

	let match = combos.find(function (index){
        if (a[index[0]] === a[index[1]] && a[index[1]] === a[index[2]]) {
          return true
        } 
	}) 
	if (match) {
		return a[i]
	}else{
		return false
	}
	
}
const getGames = function(){
	$('#games-modal').show()
	api.getGamesApi()

}
//registrations and signup handlers
const onSignUp = function(){
	event.preventDefault()
	api.signUpApi()
}
const onSignIn = function(){
	event.preventDefault()
	api.signInApi()
}
const onSignOut = function(){
	event.preventDefault()
	api.signOutApi()
}
const onChangePassword = function(){
	event.preventDefault()
	api.changePasswordApi()
}
module.exports = {
	displayBoard,
	makeMove,
	createGame,
	checkWinner,
	onSignUp,
	onSignIn,
	onSignOut,
	onChangePassword,
	getGames
}