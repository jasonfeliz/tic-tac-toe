
const ui = require('./ui.js')
const store = require('./store.js')
const config = require('./config.js')

const signUpApi = function(){
	const credentialsObj = {"credentials":{}}
	$('#register-form').serializeArray().forEach(function(e){
		credentialsObj.credentials[e.name] = e.value
	}) 
	return $.ajax({
		method:"POST",
		url: config.apiUrl + "sign-up",
		data: credentialsObj,
		success: ui.signUpSuccessHandler,
		error: ui.signUpFailureHandler
	})
}

const signInApi = function(){
	const credentialsObj = {"credentials":{}}
	$('#signin-form').serializeArray().forEach(function(e){
		credentialsObj.credentials[e.name] = e.value
	}) 
	return $.ajax({
		method:"POST",
		url: config.apiUrl + "sign-in",
		data: credentialsObj,
		success: ui.signInSuccessHandler,
		error: ui.signInFailureHandler
	})


}

const signOutApi = function(){
	return $.ajax({
		method:"DELETE",
		url: config.apiUrl + "sign-out",
		headers: {
			Authorization: "Token token=" + store.user.token
		},
		success: ui.signOutSuccessHandler
	})
}

const changePasswordApi = function(){

	const passwordObj = {"passwords":{}}
	$('#change-password-form').serializeArray().forEach(function(e){
		passwordObj.passwords[e.name] = e.value
	}) 
	return $.ajax({
		method:"PATCH",
		url: config.apiUrl + "change-password",
		headers: {
			Authorization: "Token token=" + store.user.token
		},
		data: passwordObj,
		success: function(response){
			$('.modal,.modal-message').hide()
			$('#welcome-message').html("Password has changed.")
			$('#welcome-message').show()
			setTimeout(function(){
				$('#welcome-message').hide()
			},4000)
		},
		error: function(response){
			$('.modal-message').show()
			$('.modal-message').html("Password could not be changed. Try again")
		}
	})
}
const createGameApi = function(){
	return $.ajax({
		method:"POST",
		url: config.apiUrl + "games",
		headers: {
			Authorization: "Token token=" + store.user.token
		},		
		data: {},
		success: ui.createGameSuccessHandler,
		error: ui.createGameFailedHandler

	})
}

const updateGameApi = function(currentMove,currentIndex,over){
	if (over) {
		over = true
	}else{
		over = false
	}
	const currentGameId = store.game.id
	const gameObj = {
			  "game": {
			    "cell": {
			      "index": currentIndex,
			      "value": currentMove
			    },
			    "over": over
			  }
		}
	return $.ajax({
		method:"PATCH",
		url: config.apiUrl + "games/" + currentGameId,
		headers: {
			Authorization: "Token token=" + store.user.token
		},		
		data: gameObj
	})
}

const getGamesApi = function(){

	let content = ""
	return $.ajax({
		method:"GET",
		url: config.apiUrl + "games?over=true",
		headers: {
			"Content-type": 'application/json',
			Authorization: "Token token=" + store.user.token
		},
		success: ui.getGamesHandler
	})
}
module.exports = {
	signUpApi,
	signInApi,
	signOutApi,
	changePasswordApi,
	createGameApi,
	updateGameApi,
	getGamesApi
}