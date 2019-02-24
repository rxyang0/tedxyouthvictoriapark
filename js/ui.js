/**
 * jQuery Plugin: Are-You-Sure (Dirty Form Detection)
 * https://github.com/codedance/jquery.AreYouSure/
 */
(function ($) {
    $.fn.areYouSure = function (options) {
        var settings = $.extend(
            {
                'message': 'You have unsaved changes!',
                'dirtyClass': 'dirty',
                'change': null,
                'silent': false,
                'addRemoveFieldsMarksDirty': false,
                'fieldEvents': 'change keyup propertychange input',
                'fieldSelector': ":input:not(input[type=submit]):not(input[type=button])"
            }, options);
        var getValue = function ($field) {
            if ($field.hasClass('ays-ignore')
                || $field.hasClass('aysIgnore')
                || $field.attr('data-ays-ignore')
                || $field.attr('name') === undefined) {
                return null;
            }
            if ($field.is(':disabled')) {
                return 'ays-disabled';
            }
            var val;
            var type = $field.attr('type');
            if ($field.is('select')) {
                type = 'select';
            }
            switch (type) {
                case 'checkbox':
                case 'radio':
                    val = $field.is(':checked');
                    break;
                case 'select':
                    val = '';
                    $field.find('option').each(function (o) {
                        var $option = $(this);
                        if ($option.is(':selected')) {
                            val += $option.val();
                        }
                    });
                    break;
                default:
                    val = $field.val();
            }
            return val;
        };
        var storeOrigValue = function ($field) {
            $field.data('ays-orig', getValue($field));
        };
        var checkForm = function (evt) {
            var isFieldDirty = function ($field) {
                var origValue = $field.data('ays-orig');
                if (undefined === origValue) {
                    return false;
                }
                return (getValue($field) != origValue);
            };
            var $form = ($(this).is('form'))
                ? $(this)
                : $(this).parents('form');
            // Test on the target first as it's the most likely to be dirty
            if (isFieldDirty($(evt.target))) {
                setDirtyStatus($form, true);
                return;
            }
            $fields = $form.find(settings.fieldSelector);
            if (settings.addRemoveFieldsMarksDirty) {
                // Check if field count has changed
                var origCount = $form.data("ays-orig-field-count");
                if (origCount != $fields.length) {
                    setDirtyStatus($form, true);
                    return;
                }
            }
            // Brute force - check each field
            var isDirty = false;
            $fields.each(function () {
                $field = $(this);
                if (isFieldDirty($field)) {
                    isDirty = true;
                    return false; // break
                }
            });
            setDirtyStatus($form, isDirty);
        };
        var initForm = function ($form) {
            var fields = $form.find(settings.fieldSelector);
            $(fields).each(function () { storeOrigValue($(this)); });
            $(fields).off(settings.fieldEvents, checkForm);
            $(fields).on(settings.fieldEvents, checkForm);
            $form.data("ays-orig-field-count", $(fields).length);
            setDirtyStatus($form, false);
        };
        var setDirtyStatus = function ($form, isDirty) {
            var changed = isDirty != $form.hasClass(settings.dirtyClass);
            $form.toggleClass(settings.dirtyClass, isDirty);
            // Fire change event if required
            if (changed) {
                if (settings.change) settings.change.call($form, $form);
                if (isDirty) $form.trigger('dirty.areYouSure', [$form]);
                if (!isDirty) $form.trigger('clean.areYouSure', [$form]);
                $form.trigger('change.areYouSure', [$form]);
            }
        };
        var rescan = function () {
            var $form = $(this);
            var fields = $form.find(settings.fieldSelector);
            $(fields).each(function () {
                var $field = $(this);
                if (!$field.data('ays-orig')) {
                    storeOrigValue($field);
                    $field.bind(settings.fieldEvents, checkForm);
                }
            });
            // Check for changes while we're here
            $form.trigger('checkform.areYouSure');
        };
        var reinitialize = function () {
            initForm($(this));
        }
        if (!settings.silent && !window.aysUnloadSet) {
            window.aysUnloadSet = true;
            $(window).on('beforeunload', function () {
                $dirtyForms = $("form").filter('.' + settings.dirtyClass);
                if ($dirtyForms.length == 0) {
                    return;
                }
                // Prevent multiple prompts - seen on Chrome and IE
                if (navigator.userAgent.toLowerCase().match(/msie|chrome/)) {
                    if (window.aysHasPrompted) {
                        return;
                    }
                    window.aysHasPrompted = true;
                    window.setTimeout(function () { window.aysHasPrompted = false; }, 900);
                }
                return settings.message;
            });
        }
        return this.each(function (elem) {
            if (!$(this).is('form')) {
                return;
            }
            var $form = $(this);
            $form.on("submit", function () {
                $form.removeClass(settings.dirtyClass);
            });
            $form.on('reset', function () { setDirtyStatus($form, false); });
            // Add a custom events
            $form.on('rescan.areYouSure', rescan);
            $form.on('reinitialize.areYouSure', reinitialize);
            $form.on('checkform.areYouSure', checkForm);
            initForm($form);
        });
    };
})(jQuery);


// Countdown timer
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

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').on('click', function(event) {
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
$('.navbar-collapse ul li a').on("click", function() {
    $('.navbar-toggle:visible').trigger("click");
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

// Warn user before leaving with changes
$(function() {
    $('#gform').areYouSure();
});

// For nominate speaker form
$('input[name="entry.67914793"]:radio').on("change", function() {
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

$('input[name="entry.1217299839"]:radio').on("change", function() {
    if ($('#q6k').is(':checked')) {
        $('#q6k_').prop('required', true);
    } else {
        $('#q6k_').prop('required', false);
    }
});
