
const displayBoard = function(){
	const arr = new Array(3);
	let counter = 0;
	for(let i =0; i < arr.length; i++){
		arr[i] = new Array(3);
		for(let j=0;j<arr.length;j++){
			$('#gameBoard').append('<div class="square"  data-squareId="'+counter+'"></div>')
			counter++
		}
	}
}

const createGame = function(gameObj){
	displayBoard()
	gameObj.currentPlayer = gameObj.player_one
}


const displayMove = function(data,gameObj){
	if(data.text() === "") {
		data.text(gameObj.currentPlayer)
		if ( data.text() === "x") {
			gameObj.currentPlayer = gameObj.player_two
		}else{
			gameObj.currentPlayer = gameObj.player_one
		}
	}else{
		console.log("not empty")
	}

	
}

const checkWinner = function(_data){
	const arr = []
	const arr2 = []
	 $('#gameBoard div').map(function(i){
		arr[i] = {square: $(this).text()}
	})
	let square1 = arr[0].square
	let square2 = arr[1].square
	let square3 = arr[2].square
	let square4 = arr[3].square
	let square5 = arr[4].square
	let square6 = arr[5].square
	let square7 = arr[6].square
	let square8 = arr[7].square
	let square8 = arr[8].square
	if((square1 === square2 && square1 === square3) || (square2 === square5 && square2 === square8)){
		console.log("winnner")
	}




}




module.exports = {
	displayBoard,
	displayMove,
	createGame,
	checkWinner
}