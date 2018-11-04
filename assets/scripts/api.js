const store = require('./store.js')
const baseUrl = "https://tic-tac-toe-wdi.herokuapp.com/"
const signUpApi = function(){
	const credentialsObj = {"credentials":{}}
	$('#register-form').serializeArray().forEach(function(e){
		credentialsObj.credentials[e.name] = e.value
	}) 
	return $.ajax({
		method:"POST",
		url: baseUrl + "sign-up",
		data: credentialsObj,
		success: function(response){
			$('.modal').hide()
			$('#welcome-message').html("Registration Successful! Sign In to start playing!")
			$('.modal-message').hide()
			$('.modal-message').html("")
			$('#welcome-message').show()
		},
		error: function(response){
			$('.modal-message').show()
			$('.modal-message').html("Oops! Something went wrong. Try again.")
		}
	})
}

const signInApi = function(){
	const credentialsObj = {"credentials":{}}
	$('#signin-form').serializeArray().forEach(function(e){
		credentialsObj.credentials[e.name] = e.value
	}) 
	return $.ajax({
		method:"POST",
		url: baseUrl + "sign-in",
		data: credentialsObj,
		success: function(response){
			store.token = response.user.token
			sessionStorage.setItem("token",response.user.token)
			$('.modal').hide()
			$('#welcome-message').hide()
			$('#not-signedin,.modal-message').hide()
			$('#signedin').show()
			$('#main-content').css("filter","unset")
			$('#signedin,.nav-links').show()
			$('#gameBoard div').map(function(){
				$(this).css("pointer-events","unset")
			});
		},
		error: function(response){
			$('.modal-message').show()
			$('.modal-message').html("Email/Password combination is invalid. Try again")
		}
	})


}

const signOutApi = function(){
	return $.ajax({
		method:"DELETE",
		url: baseUrl + "sign-out",
		headers: {
			Authorization: "Token token=" + store.token
		},
		success: function(response){
			$('#welcome-message').html("You have logged out. Come back soon!")
			$('#welcome-message').show()
			$('#signedin,.nav-links,.modal-message').hide()
			$('#not-signedin').show()
			$('#main-content').css("filter","blur(5px)")
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
		url: baseUrl + "change-password",
		headers: {
			Authorization: "Token token=" + store.token
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
const createGameApi = function(getToken){
	const token = getToken
	return $.ajax({
		method:"POST",
		url: baseUrl + "games",
		headers: {
			Authorization: "Token token=" + token
		},		
		data: {},
		success: function(response){
			console.log(response)
		},
		error: function(response){
			console.log(response)
		}
	})
}

module.exports = {
	signUpApi,
	signInApi,
	signOutApi,
	changePasswordApi,
	createGameApi
}