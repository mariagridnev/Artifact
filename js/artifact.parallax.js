
$(function(){ 
		  		   
/* =============================================================================
   Newsletter Form
   ========================================================================== */
   
	$('#newsletterSubmit').click(function(){
		var email = $('#email').val();
		
		if (!email.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$)/i)) {
			alert('Please enter a valid email address');
			return false;
		}	
		
		var postData = 'email=' + email;
		
		var errorHTML = '<p>Sorry, but there was a weird error! Please let email <a href="mailto:amanda@artifactdesign.com">amanda@artifactdesign.com</a> to sign up for our newsletter</p>';
		var successHTML = '<p>Thanks for subscribing to our newsletter!';
		
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: postData,
			cache: false,
			success: function(success){
				if(success) {
					$("#newsletter").hide().html(successHTML).fadeIn(500);
				}
				else {
					$("#newsletter").hide().html(errorHTML).fadeIn(500);
				}
			}
		});

		return false;
	});
		   
/* =============================================================================
   Scrolling. Need to clean up and create into functions/events 
   ========================================================================== */
		
	$('body').on('click','nav a',function(){
		$(window).trigger('action');
		$(window).unbind('action');
		
		var whereToScroll = $(this).attr('href');
		
		settings = {
			duration:1500,
			easing: 'easeInOutQuart',
			onAfter:function(){
				 
				$('html').removeClass('moving');
				window.location.hash = whereToScroll;
			}
		}
		
		if(((whereToScroll == '#news') && ((window.location.hash == '') || (window.location.hash == '#home'))) || (whereToScroll == '#home')) {
			settings.duration = 2000;
		}
		
		$('html').addClass('moving');
		
		// create dynamic pageview call
		_gaq.push(['_trackPageview', whereToScroll])
		
		$.scrollTo(whereToScroll,settings);
		
		return false;
	});
	
/* =============================================================================
   Homepage Promo flipping. If Webkit, chnage classes as we use native CSS. Otherwise, use jQuery plugin
   ========================================================================== */

	$('.promo_panel').hoverIntent({over:function(){
			$(this).addClass('flip');
	},interval:75,out:function(){
			$(this).removeClass('flip');
	}});

	
	
/* =============================================================================
   Enable the two slideshows
   ========================================================================== */
	//$('#news .slides').slides({
	//	generatePagination:true,
	//	generateNextPrev :true
	//});
	
	// generate slides out of a bunch of news_item divs
	$('#news .news_item:eq(0),#news .slides .news_item:eq(1),#news .slides .news_item:eq(2)').wrapAll('<li class="panel">');
	$('#news .news_item:eq(3),#news .slides .news_item:eq(4),#news .slides .news_item:eq(5)').wrapAll('<li class="panel">');
	$('#news .news_item:eq(6),#news .slides .news_item:eq(7),#news .slides .news_item:eq(8)').wrapAll('<li class="panel">');

	// create the flex slider
	$('#news .flexslider').flexslider({
				animation: 'slide',              //String: Select your animation type, "fade" or "slide"
				slideshow: false, 
				prevText: '<span class="arrow left">Previous</span>',           //String: Set the text for the "previous" directionNav item
				nextText: '<span class="arrow right">Next</span>'
	});
	
/* =============================================================================
   Video links for the homepage, work panels
   ========================================================================== */		
	$('#home_content .promo_panel .back').click(function(){
		var _cbHTML = '';
		if($(this).find('.video').length > 0) {
			_cbHTML = '<iframe src="http://player.vimeo.com/video/' + $(this).find('.video').data('videoid')  + '?color=ffffff" width="640" height="360" frameborder="0"></iframe><h4>' + $(this).find('.video').data('videotitle')  + '</h4><p>' + $(this).find('.video').data('videodesc')  + '</p>';
		}
		if($(this).find('.news_content').length > 0) {
			_cbHTML = $(this).find('.news_content').html();
		}
		
		var _cbWidth = '670px';
		
		if(artifact.displayWidth.whatSize() == 'mini' || artifact.displayWidth.whatSize() == 'small') {
			_cbWidth = '98%';
		}
		
		if (_cbHTML != '') {
			$.colorbox({close:'<img src="images/overlay_close.png" alt="Close" border="0" />', width:_cbWidth, transition: 'none', scrolling: false, html: _cbHTML, onComplete: function(){$('#colorbox').hide(); $('#colorbox').fadeIn(500); }});
		}
		else {
			window.open($(this).find('a').attr('href'));	
		}
		return false;
	});
	
	$('#work_content').on('click','.work_item .back',function(){
		var $theVideo = $(this).find('.video');
		
		var _cbHTML = '<iframe src="http://player.vimeo.com/video/' + $($theVideo).data('videoid')  + '?color=ffffff" width="640" height="360" frameborder="0"></iframe><h4>' + $($theVideo).data('videotitle')  + '</h4><p>' + $($theVideo).data('videodesc')  + '</p>';
		
		var _cbWidth = '670px';
		
		if(artifact.displayWidth.whatSize() == 'mini' || artifact.displayWidth.whatSize() == 'small') {
			_cbWidth = '98%';
		}
		
		$.colorbox({close:'<img src="images/overlay_close.png" alt="Close" border="0" />', width:_cbWidth, transition: 'none', scrolling: false, html: _cbHTML});
		return false;
	});
	
	$('#news .news_item').click(function(){
			
		$(this).find('.news_content').find('iframe').each(function(){
			$(this).attr('src',$(this).data('src'));
		}); 
		
		var _cbHTML = $(this).find('.news_content').html();
				
		var _cbWidth = '670px';
		
		if(artifact.displayWidth.whatSize() == 'mini' || artifact.displayWidth.whatSize() == 'small') {
			_cbWidth = '98%';
		}
		
		$.colorbox({close:'<img src="images/overlay_close.png" alt="Close" border="0" />', width:_cbWidth, transition: 'none', scrolling: false, html: _cbHTML});								
		return false;
	});
	
	artifact.newsDeepLink = artifact.url.getParam('news');
	
	if(artifact.newsDeepLink != undefined) {		
		$.colorbox({close:'<img src="images/overlay_close.png" alt="Close" border="0" />', width:200, transition: 'none', scrolling: false, html: '<div class="loading"></div>'});
		$('#cboxOverlay').css('height','100%');
		$('#cboxOverlay').css('position','fixed');
	}
});

	
/* =============================================================================
   Create the work page from the vimeo APIs. We are making 
   ========================================================================== */
      
   createWorkPage = {
	   
	init:function(){
	   
	  var self = this;
	  
	  self.albumID = 1762994;
	   
	  self.writePage();
	   
   },
   
   	itemTemplate:'<div class="work_item"><div class="front"><img src="{imgSource}" alt="" border="0" width="212" height="159" /></div><div class="back"><h5><a class="video" href="http://vimeo.com/{videoId}" data-videotitle="{videoTitle}" data-videodesc="{videoDescription}" data-videoid="{videoId}">{videoTitle}</a></h5><span class="circle"><span class="arrow"></span></span></div></div>',
         
   _assignClickHandler:function(){
	   
	   var self = this;
	   
	   $('#work .tags li').unbind('click');
	   
	   $('#work .tags li').click(function(){
			self.albumID = $(this).data('albumid');
	    	self.writePage();
			$('#work .tags li').removeClass('active');
			$(this).addClass('active');
		
			// so you can't click twice and end up redoing the call while the call is happening
			$('#work .tags li').unbind('click');
			$('#work .tags li').click(function(){
				return false;
			});
		
	  		return false;				   
	  });
	   
   },
   
   writePage:function(){
	   	   
	   var self = this;
	   self.itemSource = '<li class="panel clearfix">';
	   self.counter = 0;
	   
	   /* clean up flexslider out of the DOM which also kills all the bindings */
	   $('#work .flexslider').remove();
	   //$flexSlider.find('.flex-control-nav').remove();
	   //$flexSlider.find('.flex-direction-nav').remove();
	   //$flexSlider.find('.slides').css({'marginLeft':'0','width':'0','-webkit-transform':'translate3d(0px,0px,0px)'});

	   $('#work .panels').prepend('<div class="flexslider"><ul class="slides"><div class="loading"></div></ul></div>');
	   
		
		$.getJSON("http://www.artifactdesign.com/vimeo/index.php?album_id=" + self.albumID,function(data) {
			$(data.videos.video).each(function(i){
					
					self.itemSource += artifact.substitute(self.itemTemplate,{ 
						imgSource:this.thumbnails.thumbnail[1]._content,
						videoId:this.id,
						videoTitle:this.title,
						videoDescription:this.description 
					});	
					if (((i+1)%9 === 0) && ((i+1) != 27)) {
						self.itemSource += '</li><li class="panel clearfix">';
					}
					
			});
			self.itemSource += '</li>';
			
			$('#work .slides').html(self.itemSource);

			$('.work_item').hoverIntent({over:function(){
					$(this).addClass('flip');
			},interval:75,out:function(){
					$(this).removeClass('flip');
			}});
			
			$('#work .flexslider').flexslider({
				animation: 'slide',              //String: Select your animation type, "fade" or "slide"
				slideshow: false, 
				prevText: '<span class="arrow left">Previous</span>',           //String: Set the text for the "previous" directionNav item
				nextText: '<span class="arrow right">Next</span>'
			});

			self._assignClickHandler();
		});

   }

}
   
$(window).bind('action', function(){ 
	$(document).ready(function() {
		createWorkPage.init();
	});
							
/* =============================================================================
   Post load any images that are in the HTML, but loaded in as spans instead of img tags
   ========================================================================== */
	$('span.img_src').each(function(){
		var image_source = '<img ';
		
		// if width and height aren't defined, don't add them. We sometimes leave height off, so we can create percentage based resizable images
		if($(this).width() > 0) {
			image_source += 'width="' + $(this).width() + '" ';
		}
		if($(this).height() > 0) { 
			image_source += 'height="' + $(this).height() + '" ';
		}
		
		image_source += 'alt="' + $(this).attr('alt') + '" ';
		image_source += 'src="' + $(this).attr('src') + '" ';
		image_source += '/>';
		
		$(this).before(image_source);
		$(this).remove();
	});

});

$(window).load(function(){
	$('#home span.img_src').each(function(){
		var image_source = '<img ';
		
		// if width and height aren't defined, don't add them. We sometimes leave height off, so we can create percentage based resizable images
		if($(this).width() > 0) {
			image_source += 'width="' + $(this).width() + '" ';
		}
		if($(this).height() > 0) { 
			image_source += 'height="' + $(this).height() + '" ';
		}
		
		image_source += 'alt="' + $(this).attr('alt') + '" ';
		image_source += 'src="' + $(this).attr('src') + '" ';
		image_source += '/>';
		
		$(this).before(image_source);
		$(this).remove();
	});	
		
			
	if(artifact.newsDeepLink != undefined) {
			
		$('#' + artifact.newsDeepLink + ' span.img_src').each(function(){
			var image_source = '<img ';
			
			// if width and height aren't defined, don't add them. We sometimes leave height off, so we can create percentage based resizable images
			if($(this).width() > 0) {
				image_source += 'width="' + $(this).width() + '" ';
			}
			if($(this).height() > 0) { 
				image_source += 'height="' + $(this).height() + '" ';
			}
			
			image_source += 'alt="' + $(this).attr('alt') + '" ';
			image_source += 'src="' + $(this).attr('src') + '" ';
			image_source += '/>';
			
			$(this).before(image_source);
			$(this).remove();
		});	
		
		$('#' + artifact.newsDeepLink).find('.news_content').find('iframe').each(function(){
			$(this).attr('src',$(this).data('src'));
		}); 
		
		var _cbHTML = $('#' + artifact.newsDeepLink).find('.news_content').html();
				
		var _cbWidth = '670px';
		
		if(artifact.displayWidth.whatSize() == 'mini' || artifact.displayWidth.whatSize() == 'small') {
			_cbWidth = '98%';
		}
		
		// grab all the images that are in the deep linked news story and put them in an array
		var images = new Array;
		$('#' + artifact.newsDeepLink).find('.news_content').find('img').each(function(){
			images.push($(this).attr('src'));																		   
		});

		// make sure they are all loaded before we open up the hover to make sure we size it correctly		
		if(images.length > 0) {
		$.xLazyLoader({
			 image: images,
			 load: function(){
				$.colorbox({close:'<img src="images/overlay_close.png" alt="Close" border="0" />', width:_cbWidth, transition: 'none', scrolling: false, html: _cbHTML}); 
			 }
		 });
		}
		else {
			$.colorbox({close:'<img src="images/overlay_close.png" alt="Close" border="0" />', width:_cbWidth, transition: 'none', scrolling: false, html: _cbHTML}); 
		}
												
		return false;
		
	}
});


$(document).ready(function() {
					   
	//save selectors as variables to increase performance
	var $window = $(window);
	var $firstBG = $('#home');
	var $secondBG = $('#news');
	var $fourthBG = $('#connect');
	
	var windowHeight = $window.height(); //get the height of the window

	//apply the class "inview" to a section that is in the viewport
	$('#home, #news, #work, #connect').bind('inview', function (event, visible) {
		if (visible == true) {
			$(this).addClass("inview");
			
			if (artifact.useragent.getType() == 'desktop') { 
				$('nav a').removeClass('active');
				$('nav a[href=#' + $(this).attr('id') + ']').addClass('active');
			}
			
			// create dynamic pageview call
			_gaq.push(['_trackPageview', '#' + $(this).attr('id')])
			
		} else {
			$(this).removeClass("inview");
		}

	});
		
	//function that places the navigation in the center of the window
	function RepositionNav(){
		var windowWidth = $window.width();
		var windowHeight = $window.height();
		
		var horizonalCenter = (windowWidth / 2);  
		
		var navHeight = $('nav').height() / 2;
		var windowCenter = (windowHeight / 2); 
		
		if (artifact.displayWidth.whatSize() == 'full') {
			if ((horizonalCenter-465) > 0) { 
				$('nav').css({"left": horizonalCenter-465}); 
			}
			if (windowHeight > 650) {
				$('nav').css({"top": (windowCenter-navHeight-80)});
			}
			else {
				$('nav').css({"top": (138)});
			}
		}
			
		if (artifact.displayWidth.whatSize() == 'thin') {
			$('nav').css({"left": horizonalCenter-210});
			$('nav').css({"top": 20});
		}
		
		if (artifact.displayWidth.whatSize() == 'small') {
			$('nav').css({"left": horizonalCenter-155});
			$('nav').css({"top": 13});
		}

		if (artifact.displayWidth.whatSize() == 'mini') {
			$('nav').css({"left": horizonalCenter-145});
			$('nav').css({"top": 20});
		}

	}
	
	function resizeContainers(){
		var windowHeight = $window.height();
		if (artifact.displayWidth.whatSize() == 'full') {
			if(windowHeight > 650) {
				$('#home').css('height','3250px');
				$('#home').css('background-position','50% 0px');
				$('#home_content').css('height',windowHeight);
				$('#news').css('height',windowHeight);
				$('#work').css('height',windowHeight);
				$('#work_content').css('height',windowHeight);
				$('#connect').css('height',windowHeight);
				$('#connect_content').css('height',windowHeight);
			}
			else {
				$('#home').css('height',650);
				$('#home').css('margin-bottom',0);
				$('#home_content').css('height',650);
				$('#news').css('height',650);
				$('#work').css('height',650);
				$('#work_content').css('height',650);
				$('#connect').css('height',650);
				$('#connect_content').css('height',650);
			}
		}
		
		if (artifact.displayWidth.whatSize() == 'thin') {
			if(windowHeight > 840) {
				$('#home').css('height','3250px');
				$('#home').css('background-position','50% 0px');
				$('#home_content').css('height',windowHeight);
				$('#news').css('height',windowHeight);
				$('#work').css('height',windowHeight);
				$('#work_content').css('height',windowHeight);
				$('#connect').css('height',windowHeight);
				$('#connect_content').css('height',windowHeight);
			}
			else {
				$('#home').css('height',840);
				$('#home').css('margin-bottom',0);
				$('#home_content').css('height',840);
				$('#news').css('height',840);
				$('#work').css('height',840);
				$('#work_content').css('height',840);
				$('#connect').css('height',840);
				$('#connect_content').css('height',840);
			}
		}
		
		if (artifact.displayWidth.whatSize() == 'small') {
			$('#home').css('background-position','50% 80px');
			$('#home').css('height','720px');
			$('#home').css('margin-bottom',0);
			$('#home_content').css('height','720px');
			$('#news').css('height','620px');
			$('#work').css('height','700px');
			$('#work_content').css('height','700px');
			$('#connect').css('height','550px');
			$('#connect_content').css('height','550px');
		}
		
		if (artifact.displayWidth.whatSize() == 'mini') {
			$('#home').css('background-position','50% 80px');
			$('#home').css('height','600px');
			$('#home').css('margin-bottom',0);
			$('#home_content').css('height','600px');
			$('#news').css('height','470px');
			$('#work').css('height','570px');
			$('#work_content').css('height','570px');
			$('#connect').css('height','550px');
			$('#connect_content').css('height','550px');
		}
		
		
		/* couple of overrides for ipad */
		if (artifact.useragent.getType() == 'tablet') {
			
			$('#home').css('background-attachment','scroll');
			if (artifact.displayWidth.whatSize() == 'full') {
				$('#home').css('background-position','50% -150px');
				$('#home').css('height','1500px');
			}
			if (artifact.displayWidth.whatSize() == 'thin') {
				$('#home').css('background-position','50% 80px');
				$('#home').css('height','1700px');
			}
		}

		}
	
	//function that is called for every pixel the user scrolls. Determines the position of the background
	/*arguments: 
		x = horizontal position of background
		windowHeight = height of the viewport
		pos = position of the scrollbar
		adjuster = adjust the position of the background
		inertia = how fast the background moves in relation to scrolling
	*/
	function newPos(x, windowHeight, pos, adjuster, inertia){
		return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
	}
	
	//function to be called whenever the window is scrolled or resized
	function Move(){ 
	
		if (artifact.useragent.getType() == 'desktop') {
			var pos = $window.scrollTop(); //position of the scrollbar
	
			//if the first section is in view...
			if($firstBG.hasClass("inview")){
				//call the newPos function and change the background position
				$firstBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 400, 0.5)});  
			}
			
			//if the second section is in view...
			if($secondBG.hasClass("inview")){
				//call the newPos function and change the background position
				$secondBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 0, 0.3)});
			}

			//if the fourth section is in view...
			if($fourthBG.hasClass("inview")){
				//call the newPos function and change the background position for CSS3 multiple backgrounds
				$fourthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 450, 0.3)});
			}
		}

	}
		
	resizeContainers();
	
	if (artifact.useragent.getDevice() == 'iphone' || artifact.useragent.getDevice() == 'ipad') {
		window.onorientationchange = function() {
			Move(); //move the background images in relation to the movement of the scrollbar
			RepositionNav(); //reposition the navigation list so it remains vertically central
			resizeContainers(); // resize everything to new window size
			
			createWorkPage.init(); // rebuild the vimeo slideshow
	
			setTimeout(artifact.displayWidth.setBodyClasses,100); // set the body display class instead of using media queries, as we want to rely on the same exact number
		}
	}
	else {
		var timeout = false;
		
		$window.resize(function(){ //if the user resizes the window...
			Move(); //move the background images in relation to the movement of the scrollbar
			RepositionNav(); //reposition the navigation list so it remains vertically central
			resizeContainers(); // resize everything to new window size
			
			function rewriteWorkPage() {
				createWorkPage.writePage();
			}

			if(timeout !== false) {
   				clearTimeout(timeout);
			}
			timeout = setTimeout(rewriteWorkPage, 500);
 		});	
	}

	$window.bind('scroll', function(){ //when the user is scrolling...
		Move(); //move the background images in relation to the movement of the scrollbar
		$window.trigger('action');
		$window.unbind('action');
	});
	
	function cloneNav() {
		$('nav:first').clone().prependTo('#news');
		$('nav:first').clone().prependTo('#work');
		$('nav:first').clone().prependTo('#connect');
		
		$('nav').css('position','absolute');
		
		$('nav:first').find('a:eq(1)').addClass('active');
		$('#news nav a:eq(2)').addClass('active');
		$('#work nav a:eq(3)').addClass('active');
		$('#connect nav a:eq(4)').addClass('active');
	}
		
	if ((artifact.displayWidth.whatSize() == 'mini' || artifact.displayWidth.whatSize() == 'small') || (artifact.useragent.getType() != 'desktop')) { 
		cloneNav();
	}
	
	RepositionNav(); //Reposition the Navigation to center it in the window when the script loads
	
	$('#home, #news, #work, #connect, nav').fadeIn(500);
	
});

