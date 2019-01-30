// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
		$('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
			$('html, body').stop();
		});
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top-75
        }, 600, 'easeInOutCubic');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top',
	offset: 76
});

// Close the responsive menu on menu item click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('div.modal').on('show.bs.modal', function() {
	var modal = this;
	var hash = modal.id;
	window.location.hash = hash;
	window.onhashchange = function() {
		if (!location.hash){
			$(modal).modal('hide');
		}
	}
});

// Countdown
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
