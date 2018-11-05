const store = require('./store.js')

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
const signUpSuccessHandler = function(response){
		$('.modal').hide()
		$('#welcome-message').html("Registration Successful! Sign In to start playing!")
		$('.modal-message').hide()
		$('.modal-message').html("")
		$('#welcome-message').show()
}
const signUpFailureHandler = function(response){
		$('.modal-message').show()
		$('.modal-message').html("Oops! Something went wrong. Try again.")
}
const signInSuccessHandler = function(response){
		store.user = response.user
		$('.modal').hide()
		$('#welcome-message').hide()
		$('#not-signedin,.modal-message').hide()
		$('#signedin').show()
		$('#main-content').css("filter","unset")
		$('#signedin,.nav-links').show()
		$('#gameBoard div').map(function(){
			$(this).css("pointer-events","unset")
		});
}
const signInFailureHandler = function(response){
		$('.modal-message').show()
		$('.modal-message').html("Email/Password combination is invalid. Try again")
}

const createGameSuccessHandler = function(response){
	store.game = response.game
}
const createGameFailedHandler = function(response){
	console.log(response)
}
 const signOutSuccessHandler = function(response){
 		$('#welcome-message').html("You have logged out. Come back soon!")
		$('#welcome-message').show()
		$('#signedin,.nav-links,.modal-message').hide()
		$('#not-signedin').show()
		$('#main-content').css("filter","blur(5px)")
 }

const getGamesHandler = function(response){
		let content = ""
		$('#gameBoard').html("")
		response.games.forEach(function(e,i){
			content += '<div class="new-game">'
			e.cells.forEach(function(_a){
				content += '<div class="square">' + _a +'</div>'
			})
			content += '</div>'
		})
		$('#gameBoard').html(content)
		$('#resetButton').hide()
		$('#message').html("Your Past Games")
}

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
	tieHandler,
	signUpSuccessHandler,
	signUpFailureHandler,
	signInSuccessHandler,
	signInFailureHandler,
	createGameSuccessHandler,
	createGameFailedHandler,
	signOutSuccessHandler,
	getGamesHandler
}