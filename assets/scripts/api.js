const baseUrl = "https://tic-tac-toe-wdi.herokuapp.com"

const signUpApi = function(){
	const credentialsObj = {"credentials":{}}
	$('#register-form').serializeArray().forEach(function(e){
		credentialsObj.credentials[e.name] = e.value
	}) 
	return $.ajax({
		method:"POST",
		url: baseUrl + "/sign-up",
		data: credentialsObj,
		success: function(response){
			console.log(response.user.id + " " + response.user.email)
		},
		error: function(response){
			console.log(response.responseText)
		}
	})
}





module.exports = {
	signUpApi
}