// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
		$('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
			$('html, body').stop();
		});
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top-60
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

/**
 * For Nominate Speaker Form
 */
$(function() {
    $('#gform').areYouSure();
});

$('input[name="entry.1217299839"]:radio').change(function() {
    if ($('#q6k').is(':checked')) {
        $('#q6k_').prop('required', true);
    } else {
        $('#q6k_').prop('required', false);
    }
});

$('input[name="entry.67914793"]:radio').change(function() {
    if ($('#q1a').is(':checked')) {
        $('#group-q1-1').hide();
        $('#q1-1').prop('required', false);
        $('#group-q1-2').hide();
        $('#q1-2').prop('required', false);
        $('#group-q1-3').hide();
    } else {
        $('#group-q1-1').show();
        $('#q1-1').prop('required', true);
        $('#group-q1-2').show();
        $('#q1-2').prop('required', true);
        $('#group-q1-3').show();
    }
});
