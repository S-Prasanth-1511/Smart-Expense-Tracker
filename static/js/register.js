/**
 * 
 */



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
	getAuth,
	RecaptchaVerifier,
	signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
const firebaseConfig = {
	apiKey: "AIzaSyAiKCnkcSJz3u66ZDK27ctPdfYFiaLXplw",
	authDomain: "dynamic-e7eb4.firebaseapp.com",
	projectId: "dynamic-e7eb4",
	storageBucket: "dynamic-e7eb4.firebasestorage.app",
	messagingSenderId: "558406815258",
	appId: "1:558406815258:web:9244fca0dae4687c350ba3",
	measurementId: "G-WSTM164PMZ"
  };

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();

window.recaptchaVerifier = null;

function render() {
	window.recaptchaVerifier = new RecaptchaVerifier(
		"recaptcha-container",
		{},
		auth
	);
	recaptchaVerifier.render();
}

//checking if phone number is verified
function phoneAuth() {
	var number = "+91" + document.getElementById("phone").value;
	console.log("working..");
	signInWithPhoneNumber(auth, number, window.recaptchaVerifier)
		.then((confirmationResult) => {
			window.confirmationResult = confirmationResult;
			console.log("OTP Sent");
			document.getElementById("verifier").style.display = "block";
		})
		.catch(function(error) {
			// error in sending OTP
			alert(error.message);
		});
}


function validate() {
	var pass1 = document.getElementById('password');
	var pass2 = document.getElementById('cpassword');

	if (pass1.value != pass2.value) {
		pass2.focus();
		alert("Passwords don't match");
		return false;
	}
	return true;

}


var validnum = [];

//checking if code is verified



function phoneChange() {
	var phone = document.getElementById("phone");
	console.log(validnum);

	for (var i = 0; i < validnum.length; i++) {
		if (phone.value == validnum[i]) {

			document.getElementById("submitbtn").disabled = false;
			document.getElementById("submitbtn").title = "";
			document.getElementById("sendotp").style.display = "none";
			document.getElementById("recaptcha-container").style.display = "none";

			document.getElementsByClassName("p-conf")[0].style.display = "block";
			return true;
		}
	}

	document.getElementById("recaptcha-container").style.display = "block";
	document.getElementsByClassName("p-conf")[0].style.display = "none";
}



window.addEventListener("load", phoneChange);
export { render, phoneChange, validate };
