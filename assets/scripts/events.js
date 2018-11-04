const api = require('./api.js')
const ui = require('./ui.js')

const displayBoard = function(){
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
	displayBoard()
	gameObj.currentPlayer = gameObj.player_one
}

const resetGame = function(gameObj){
	$('#gameBoard div').map(function(){
		$(this).text("")
		$(this).css("pointer-events","unset")

	})
	for(let i=0;i < 9;i++){
		gameObj.moves[i] = Math.random();
	}
	gameObj.currentPlayer = gameObj.player_one
	gameObj.winner = false	
	$('#message').html(gameObj.currentPlayer+ " , it's your turn to play")
}


const endGame = function(){
	$('#gameBoard div').map(function(){
		$(this).css("pointer-events","none")
	});
}

const makeMove = function(_data,gameObj){
	const currentSquareIndex = _data.data('squareid')
	$('#message').text()
		if(_data.text() === "") {
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
					ui.tieHandler(_winner)
					endGame()
				}else if(_winner){
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
	// console.log(a)
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

//registrations and signup handlers
const onSignUp = function(){
	event.preventDefault()
	api.signUpApi()
}


module.exports = {
	displayBoard,
	makeMove,
	createGame,
	checkWinner,
	resetGame,
	onSignUp
}