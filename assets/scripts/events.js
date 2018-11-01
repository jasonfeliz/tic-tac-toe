
const displayBoard = function(){
	const arr = new Array(3);
	let counter = 0;
	for(let i =0; i < arr.length; i++){
		arr[i] = new Array(3);
		for(let j=0;j<arr.length;j++){
			$('#gameBoard').append('<div class="square"  data-squareId="'+counter+'" val="">' + counter + '</div>')
			counter++
		}
	}
}


const displayMove = function(){
	let _currentPlayer;
	let currentValue = $(this).val()
	if (currentValue === "") {
		$(this).val(_currentPlayer)
	}
}


module.exports = {
	displayBoard,
	displayMove
}