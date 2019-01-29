
const ui = require('./ui.js')
const store = require('./store.js')
const config = require('./config.js')

const signUpApi = function(data){

	return $.ajax({
		method:"POST",
		url: config.apiUrl + "sign-up",
		data: data
	})
}

const signInApi = function(data){
	return $.ajax({
		method:"POST",
		url: config.apiUrl + "sign-in",
		data: data
	})


}

const signOutApi = function(){
	return $.ajax({
		method:"DELETE",
		url: config.apiUrl + "sign-out",
		headers: {
			Authorization: "Token token=" + store.user.token
		}
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
		data: passwordObj
	})
}

const createGameApi = function(){
	return $.ajax({
		method:"POST",
		url: config.apiUrl + "games",
		headers: {
			Authorization: "Token token=" + store.user.token
		},
		data: {}
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
		}
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
