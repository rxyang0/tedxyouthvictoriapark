var countDownDate = new Date("May 25, 2019 10:00:00").getTime();
var x = setInterval(function() {
	var now = new Date().getTime();
	// Find the distance between now and the countdown date
	var distance = countDownDate - now;
	// Time calculations and prefix "0" if needed
	var days = Math.floor(distance / (1000*60*60*24));
	var hours = ("0" + Math.floor((distance % (1000*60*60*24)) / (1000*60*60))).slice(-2);
	var minutes = ("0" + Math.floor((distance % (1000*60*60)) / (1000*60))).slice(-2);
	var seconds = ("0" + Math.floor((distance % (1000*60)) / 1000)).slice(-2);
	// Display
	document.getElementById("countdown").innerHTML = days + " days " + hours + ":" + minutes + ":" + seconds;
	// If the count down is finished, write some text
	if (distance < 0) {
		clearInterval(x);
		document.getElementById("countdown").innerHTML = "0 days 00:00:00";
	}
}, 1000);