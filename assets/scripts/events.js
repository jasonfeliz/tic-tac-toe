
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


const makeMove = function(_data,gameObj){
	const currentSquareIndex = _data.data('squareid')
	if(_data.text() === "") {
		_data.text(gameObj.currentPlayer)
		gameObj.moves[currentSquareIndex] = gameObj.currentPlayer
		if ( _data.text() === "x") {
			gameObj.currentPlayer = gameObj.player_two
		}else{
			gameObj.currentPlayer = gameObj.player_one
		}
		const movesArr = gameObj.moves
		let movesArrLength = movesArr.filter((e) => isNaN(e)).length
		if(movesArrLength > 4){
			const _winner = checkWinner(currentSquareIndex,movesArr) 
			if (!_winner && movesArrLength === 9) {
				ui.tieHandler(_winner)
			}else if(_winner){
				ui.winHandler(_winner,gameObj)
			}
		}

		
	}else{
		console.log("not empty")
	}

	
}

const checkWinner = function(i,a){
	const winObj = {
		 case1 : a[0] === a[1] && a[0]===a[2],
		 case2 : a[0] === a[4] && a[0]===a[8],
		 case3 : a[0] === a[3] && a[0]===a[6],
		 case4 : a[1] === a[4] && a[1]===a[7],
		 case5 : a[2] === a[4] && a[2]===a[6],
		 case6 : a[2] === a[5] && a[2]===a[8],
		 case7 : a[3] === a[4] && a[3]===a[5],
		 case8 : a[6] === a[7] && a[6]===a[8]
	}
	if (winObj.case1 || winObj.case2 || winObj.case3 || winObj.case4 || winObj.case5 || winObj.case6 || winObj.case7 || winObj.case8) {
		return a[i]
	}else{
		return false;
	}	
}




module.exports = {
	displayBoard,
	makeMove,
	createGame,
	checkWinner
}