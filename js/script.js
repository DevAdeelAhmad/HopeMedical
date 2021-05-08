(function($) {
	
	"use strict";
	
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(500).fadeOut(500);
		}
	}
	
	
	//Update Header Style + Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var topHeader = $('.header-top').innerHeight();
			var windowpos = $(window).scrollTop();
			if (windowpos >= topHeader) {
				$('.main-header').addClass('fixed-header');
				$('.scroll-to-top').fadeIn(300);
			} else {
				$('.main-header').removeClass('fixed-header');
				$('.scroll-to-top').fadeOut(300);
			}
		}
	}
	
	
	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"></div>');
		
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
	}
	
	// twitter feed widget 
	function twitterFeedWidget() {
	  if ($('.twitter').length) {	  	
	  	var twitterWrapper = $('.twitter');	  		
	  	var twitterCount = twitterWrapper.data('twitter-query-count');
	  	var twitterName = twitterWrapper.data('twitter-name');
	  	var slideCondition = twitterWrapper.data('enable-slide');
	  	var slideCount = twitterWrapper.data('slide-count');
	    $.ajax({
			method: "POST",
			url: "inc/twitter/tweet-api.php",
			data: {
				count: twitterCount,
				name: twitterName,
				slide_condition: slideCondition,
				slide_count: slideCount
			}
		})
		.done(function(msg) {
			twitterWrapper.append(function () {
				return msg;
			});
		});
	  };
	}
	
	
	//Main Slider
	if($('.main-slider .tp-banner').length){

		jQuery('.main-slider .tp-banner').show().revolution({
		  delay:10000,
		  startwidth:1200,
		  startheight:780,
		  hideThumbs:600,
	
		  thumbWidth:80,
		  thumbHeight:50,
		  thumbAmount:5,
	
		  navigationType:"bullet",
		  navigationArrows:"0",
		  navigationStyle:"preview4",
	
		  touchenabled:"on",
		  onHoverStop:"off",
	
		  swipe_velocity: 0.7,
		  swipe_min_touches: 1,
		  swipe_max_touches: 1,
		  drag_block_vertical: false,
	
		  parallax:"mouse",
		  parallaxBgFreeze:"on",
		  parallaxLevels:[7,4,3,2,5,4,3,2,1,0],
	
		  keyboardNavigation:"off",
	
		  navigationHAlign:"center",
		  navigationVAlign:"bottom",
		  navigationHOffset:0,
		  navigationVOffset:20,
	
		  soloArrowLeftHalign:"left",
		  soloArrowLeftValign:"center",
		  soloArrowLeftHOffset:20,
		  soloArrowLeftVOffset:0,
	
		  soloArrowRightHalign:"right",
		  soloArrowRightValign:"center",
		  soloArrowRightHOffset:20,
		  soloArrowRightVOffset:0,
	
		  shadow:0,
		  fullWidth:"on",
		  fullScreen:"off",
	
		  spinner:"spinner4",
	
		  stopLoop:"off",
		  stopAfterLoops:-1,
		  stopAtSlide:-1,
	
		  shuffle:"off",
	
		  autoHeight:"off",
		  forceFullWidth:"on",
	
		  hideThumbsOnMobile:"on",
		  hideNavDelayOnMobile:1500,
		  hideBulletsOnMobile:"on",
		  hideArrowsOnMobile:"on",
		  hideThumbsUnderResolution:0,
	
		  hideSliderAtLimit:0,
		  hideCaptionAtLimit:0,
		  hideAllCaptionAtLilmit:0,
		  startWithSlide:0,
		  videoJsPath:"",
		  fullScreenOffsetContainer: ""
	  });
		
	}

	
	// Fact Counter
	function factCounter() {
		if($('.fact-counter').length){
			$('.fact-counter .column.animated').each(function() {
		
				var $t = $(this),
					n = $t.find(".count-text").attr("data-stop"),
					r = parseInt($t.find(".count-text").attr("data-speed"), 10);
					
				if (!$t.hasClass("counted")) {
					$t.addClass("counted");
					$({
						countNum: $t.find(".count-text").text()
					}).animate({
						countNum: n
					}, {
						duration: r,
						easing: "linear",
						step: function() {
							$t.find(".count-text").text(Math.floor(this.countNum));
						},
						complete: function() {
							$t.find(".count-text").text(this.countNum);
						}
					});
				}
				
			});
		}
	}

	//Jquery Knob animation fot Pie Charts 
	if($('.dial').length){
		$('.dial').appear(function(){
          var elm = $(this);
          var color = elm.attr('data-fgColor');  
          var perc = elm.attr('value');  
 
          elm.knob({ 
               'value': 0, 
                'min':0,
                'max':100,
                'skin':'tron',
                'readOnly':true,
                'thickness':0.15,
				'dynamicDraw': true,
				'displayInput':false
          });

          $({value: 0}).animate({ value: perc }, {
			  duration: 1000,
              easing: 'swing',
              progress: function () { elm.val(Math.ceil(this.value)).trigger('change');
              }
          });

          //circular progress bar color
          $(this).append(function() {
              elm.parent().parent().find('.circular-bar-content').css('color',color);
              elm.parent().parent().find('.circular-bar-content label').text(perc+'%');
          });

          },{accY: 20});
    }
	
	//Progress Bar
	if($('.progress-levels .progress-box .bar-fill').length){
		$(".progress-box .bar-fill").each(function() {
			var progressWidth = $(this).attr('data-percent');
			$(this).css('width',progressWidth+'%');
			$(this).parents('.bar').children('.percent').html(progressWidth+'%');
		});
	}
	
	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('href'));
			$('.tabs-box .tab-btn').removeClass('active');
			$(this).addClass('active');
			$('.tabs-box .tab').fadeOut(0);
			$('.tabs-box .tab').removeClass('active-tab');
			$(target).fadeIn(300);
			$(target).addClass('active-tab');
		});
		
	}

	//Accordions
	if($('.accordion-box').length){
		$('.accordion-box .acc-btn').on('click', function() {
		if($(this).hasClass('active')!==true){
				$('.accordion-box .acc-btn').removeClass('active');
			}
			
		if ($(this).next('.acc-content').is(':visible')){
				$(this).removeClass('active');
				$(this).next('.acc-content').slideUp(500);
			}
		else{
				$(this).addClass('active');
				$('.accordion-box .acc-content').slideUp(500);
				$(this).next('.acc-content').slideDown(500);	
			}
		});
	}

	//  backgroud images
	/* https://gist.github.com/laverboy/7356665 */
	$('[data-bg-src]').each(function () {
	    $(this).css('background-image', 'url(' + $(this).data('bg-src') + ')');
	});
	
	
	//Testimonials Slider
	if ($('.testimonial-slider .slider').length) {
		$('.testimonial-slider .slider').bxSlider({
			adaptiveHeight: true,
			auto:true,
			controls: false,
			pause: 5000,
			speed: 500,
			pager: true,
			mode:'fade'
		});	
	}

	// Date Select
	function dateSelect() {
		if($(".datepicker").length) {
			$( ".datepicker" ).datepicker();
		};
	}

	// Time Picker
	function timeSelect() {
		if ($(".timepicker").length) {
			$(".timepicker").timepicker();
		}
	}

	// Time Picker
	function bgParallax() {
		if ($(".bg-parallax").length) {
		    $('#nav').localScroll(800);
		    $('.bg-parallax').parallax("50%", 0.5);
		}
	}

	//Update Default Banner to Fullscreen
	function fullScreenBanner() {
		if($('.window-size').length){
			var HeaderHeight = $('.main-header').height() - 25;
			var defBannerHeight = $('.window-size .auto-container').innerHeight();
			var windowHeight = $(window).height() - $('.header-top').height() - HeaderHeight;
			if (windowHeight >= defBannerHeight) {
				$('.window-size').css({'height':windowHeight,'min-height':windowHeight});
				$('.window-size .auto-container').css({'position':'absolute','height':windowHeight,'min-height':windowHeight,});
			} else {
				$('.window-size').css({'height':'auto','min-height':windowHeight});
				$('.window-size .auto-container').css({'min-height':windowHeight,'height':windowHeight});
			}
		}
	}
	
	
	//Sponsors Slider
	if ($('.sponsors-section .slider').length) {
		$('.sponsors-section .slider').owlCarousel({
			loop:true,
			margin:20,
			nav:false,
			autoplay: 5000,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:3
				},
				800:{
					items:4
				},
				1024:{
					items:5
				},
				1100:{
					items:6
				}
			}
		});    		
	}

	//Sponsors Slider
	if ($('.clients-carousel').length) {
	    $(".clients-carousel").owlCarousel({
	        rtl: false,
	        autoplay: true,
	        autoplayTimeout: 2000,
	        loop: true,
	        items: 1,
	        dots: true,
	        nav: false,
	        navText: [
	            '<i class="pe-7s-angle-left"></i>',
	            '<i class="pe-7s-angle-right"></i>'
	        ]
	    });	
	}
	
	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox();
	}
	
	
	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				subject: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}
	
	
	// Google Map Settings
	if($('#map-location').length){
		var map;
		 map = new GMaps({
			el: '#map-location',
			zoom: 14,
			scrollwheel:false,
			//Set Latitude and Longitude Here
			lat: -37.817085,
			lng: 144.955631
		  });
		  
		  //Add map Marker
		  map.addMarker({
			lat: -37.817085,
			lng: 144.955631,
			infoWindow: {
			  content: '<p style="text-align:center;"><strong>Envato</strong><br>Melbourne VIC 3000, Australia</p>'
			}
		 
		});
	}
	
	
	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var HeaderHeight = $('.header-lower').height();
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top - HeaderHeight
			 }, 1000);
	
		});
	}
	
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}

    function customTabProductPageTab () {
        if ($('.product-details-tab-title').length) {
            var tabWrap = $('.product-details-tab-content');
            var tabClicker = $('.product-details-tab-title ul li');
            
            tabWrap.children('div').hide();
            tabWrap.children('div').eq(0).show();
            tabClicker.on('click', function() {
                var tabName = $(this).data('tab-name');
                tabClicker.removeClass('active');
                $(this).addClass('active');
                var id = '#'+ tabName;
                tabWrap.children('div').not(id).hide();
                tabWrap.children('div'+id).fadeIn('500');
                return false;
            });        
        }
    }

/* ==========================================================================
   When document is ready, do
   ========================================================================== */
   
	$(document).on('ready', function() {
		headerStyle();
		fullScreenBanner();
		customTabProductPageTab();
		dateSelect();
		timeSelect();
		bgParallax();
	});

/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
		factCounter();
	});
	
/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
		fullScreenBanner();
		twitterFeedWidget()
	});
	

/* ==========================================================================
   When Window is resizing, do
   ========================================================================== */
	
	$(window).on('resize', function() {
		fullScreenBanner();
	});
	

})(window.jQuery);