const store = require('./store.js')

$('.close,.cancel-button').click(function(){
	$('.modal').hide()
	$('input').val("")
  $('.wrapper').css("filter","unset")
})

$('#register').click(function(){
	$('#register-modal').show()
})
$('#signin,#signin-link ').click(function(){
	$('#signin-modal').show()
  $('.wrapper').css("filter","blur(5px)")
})
$('#change-password').click(function(){
	$('#cp-modal').show()
})
const signUpSuccessHandler = function(response){
    store.user = response.user
    $('.register-message').text('').removeClass("fail-message")
		$('#welcome-message').html("Weclome to the exciting world of Tic Tac Toe!")
    $('#not-signedin,.modal-message,#register-landing').hide()
    $('#signedin').show()
		$('#signedin,.nav-links').show()
		$('#gameBoard div').map(function(){
			$(this).css("pointer-events","unset")
		});
		$('#welcome-message').show()
    setTimeout(function(){
      $('#welcome-message').hide()
    },4000)
		$('input').val("")
}
const signUpFailureHandler = function(response){
    let message = ""
    const responseKey = Object.keys(response.responseJSON)[0]
    if(responseKey === 'email') {
      message = "Email is already in use"
    }else if(responseKey === 'password_confirmation'){
      message = "Passwords do not match"
    }else {
      message = "Oops! Something went wrong"
    }
		$('.register-message').text(message).addClass("fail-message")
}
const signInSuccessHandler = function(response){
		store.user = response.user
    $('#user-greet').text('Welcome, ' + store.user.email.split('@').shift())
    $('.register-message').text('').removeClass("fail-message")
    $('.wrapper').css("filter","unset")
		$('#welcome-message').html("Weclome to the exciting world of Tic Tac Toe!")
    setTimeout(function(){
      $('#welcome-message').hide()
    },4000)
		$('#not-signedin,.modal-message,#register-landing,.modal').hide()
		$('#signedin,.nav-links,.modal-message, #main-content').show()
		$('#gameBoard div').map(function(){
			$(this).css("pointer-events","unset")
		});
		$('input').val("")
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
    store.user = null
    store.game = null
 		$('#welcome-message').html("You have logged out. Come back soon!")
		$('#welcome-message').show()
    $('#gameBoard').html('')
		$('#signedin,.nav-links,.modal-message, #main-content').hide()
		$('#not-signedin,#register-landing').show()
		$('input').text("")
 }

const changePasswordSuccess = function(){
  $('.modal,.modal-message').hide()
  $('#welcome-message').html("Password has successfully changed.")
  $('#welcome-message').show()
  setTimeout(function(){
    $('#welcome-message').hide()
  },3000)
  $('input').val("")
}

const changePasswordFailure = function(){
  $('.modal-message').show()
  $('.modal-message').html("You've entered an invalid old password")
}

const getWinner = function(a){
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
          return a[index[1]]
        }
	})
  return match ? a[match[0]] : false
}

const getGamesHandler = function(response){

		let content = ""
    $('#gameBoard').html("").css('width', '75%')
		response.games.forEach(function(e,i){
      let winner = getWinner(response.games[i].cells)
			content += '<div class="new-game">'
      content += winner ? `<span>Winner: ${winner}</span>` : `<span>It's a Tie</span>`
      content += `<div class="game">`
			e.cells.forEach(function(_a){
				content += '<div class="square">' + _a +'</div>'
			})
			content += '</div></div>'
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
	getGamesHandler,
  changePasswordSuccess,
  changePasswordFailure
}
