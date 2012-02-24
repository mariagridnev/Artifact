// usage: log('inside coolFunc', this, arguments);
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
      arguments.callee = arguments.callee.caller;
      console.log( Array.prototype.slice.call(arguments) );
  }
};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});


/* =============================================================================
   scrollTo
   ========================================================================== */
(function($){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window)._scrollable();
	};

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function(){
		return this.map(function(){
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return $.browser.safari || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.speed || settings.duration;

		return this._scrollable().each(function(){
			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');


			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( {scrollTop : $(target).position().top}, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};

		}).end();
	};
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis ){
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
			
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );



/* =============================================================================
   quickFlip
   ========================================================================== */
/*
 * jQuery QuickFlip v2.1.1
 * http://jonraasch.com/blog/quickflip-2-jquery-plugin
 *
 * Copyright (c) 2009 Jon Raasch (http://jonraasch.com/)
 * Licensed under the FreeBSD License:
 * http://dev.jonraasch.com/quickflip/docs#licensing
 *
 */
(function(c){var a=false,b=null;c.quickFlip={wrappers:[],opts:[],objs:[],init:function(d,f){var d=d||{};d.closeSpeed=d.closeSpeed||180;d.openSpeed=d.openSpeed||120;d.ctaSelector=d.ctaSelector||".quickFlipCta";d.refresh=d.refresh||a;d.easing=d.easing||"swing";d.noResize=d.noResize||a;d.vertical=d.vertical||a;var g=typeof(f)!="undefined"?c(f):c(".quickFlip"),h=g.children();if(g.css("position")=="static"){g.css("position","relative")}var e=c.quickFlip.wrappers.length;h.each(function(i){var k=c(this);if(d.ctaSelector){k.find(d.ctaSelector).click(function(j){j.preventDefault();c.quickFlip.flip(e)})}if(i){k.hide()}});c.quickFlip.opts.push(d);c.quickFlip.objs.push({$box:c(g),$kids:c(h)});c.quickFlip.build(e);if(!d.noResize){c(window).resize(function(){for(var j=0;j<c.quickFlip.wrappers.length;j++){c.quickFlip.removeFlipDivs(j);c.quickFlip.build(j)}})}},build:function(f,h){c.quickFlip.opts[f].panelWidth=c.quickFlip.opts[f].panelWidth||c.quickFlip.objs[f].$box.width();c.quickFlip.opts[f].panelHeight=c.quickFlip.opts[f].panelHeight||c.quickFlip.objs[f].$box.height();var e=c.quickFlip.opts[f],g={wrapper:c.quickFlip.objs[f].$box,index:f,half:parseInt((e.vertical?e.panelHeight:e.panelWidth)/2),panels:[],flipDivs:[],flipDivCols:[],currPanel:h||0,options:e};c.quickFlip.objs[f].$kids.each(function(k){var i=c(this).css({position:"absolute",top:0,left:0,margin:0,padding:0,width:e.panelWidth,height:e.panelHeight});g.panels[k]=i;var l=d(g,k).hide().appendTo(g.wrapper);g.flipDivs[k]=l;g.flipDivCols[k]=l.children()});c.quickFlip.wrappers[f]=g;function d(i,p){function o(q,t){var r=c("<div></div>"),s=q.panels[t].clone().show();r.css(l);r.html(s);return r}var n=c("<div></div>"),j=i.panels[p].html(),l={width:e.vertical?e.panelWidth:i.half,height:e.vertical?i.half:e.panelHeight,position:"absolute",overflow:"hidden",margin:0,padding:0};if(e.vertical){l.left=0}else{l.top=0}var m=c(o(i,p)).appendTo(n),k=c(o(i,p)).appendTo(n);if(e.vertical){m.css("bottom",i.half);k.css("top",i.half);k.children().css({top:b,bottom:0})}else{m.css("right",i.half);k.css("left",i.half);k.children().css({right:0,left:"auto"})}return n}},flip:function(g,q,l,r){function h(j,i){j=j||{};i=i||{};for(opt in j){i[opt]=j[opt]}return i}if(typeof g!="number"||typeof c.quickFlip.wrappers[g]=="undefined"){return}var n=c.quickFlip.wrappers[g],f=n.currPanel,e=(typeof(q)!="undefined"&&q!=b)?q:(n.panels.length>f+1)?f+1:0;n.currPanel=e,l=(typeof(l)!="undefined"&&l!=b)?l:1;r=h(r,c.quickFlip.opts[g]);n.panels[f].hide();if(r.refresh){c.quickFlip.removeFlipDivs(g);c.quickFlip.build(g,e);n=c.quickFlip.wrappers[g]}n.flipDivs[f].show();var p=0,o=0,d=r.vertical?{height:0}:{width:0},m=r.vertical?{height:n.half}:{width:n.half};n.flipDivCols[f].animate(d,r.closeSpeed,r.easing,function(){if(!p){p++}else{n.flipDivs[e].show();n.flipDivCols[e].css(d);n.flipDivCols[e].animate(m,r.openSpeed,r.easing,function(){if(!o){o++}else{n.flipDivs[e].hide();n.panels[e].show();switch(l){case 0:case -1:c.quickFlip.flip(g,b,-1);break;case 1:break;default:c.quickFlip.flip(g,b,l-1);break}}})}})},removeFlipDivs:function(e){for(var d=0;d<c.quickFlip.wrappers[e].flipDivs.length;d++){c.quickFlip.wrappers[e].flipDivs[d].remove()}}};c.fn.quickFlip=function(d){this.each(function(){new c.quickFlip.init(d,this)});return this};c.fn.whichQuickFlip=function(){function f(j,h){if(!j||!h||!j.length||!h.length||j.length!=h.length){return a}for(var g=0;g<j.length;g++){if(j[g]!==h[g]){return a}}return true}var d=b;for(var e=0;e<c.quickFlip.wrappers.length;e++){if(f(this,c(c.quickFlip.wrappers[e].wrapper))){d=e}}return d};c.fn.quickFlipper=function(d,f,e){this.each(function(){var h=c(this),g=h.whichQuickFlip();if(g==b){h.quickFlip(d);g=h.whichQuickFlip()}c.quickFlip.flip(g,f,e,d)})}})(jQuery);



/* =============================================================================
   easing
   ========================================================================== */
jQuery.easing['jswing'] = jQuery.easing['swing'];jQuery.extend( jQuery.easing,{def: 'easeInOutQuart',swing: function (x, t, b, c, d) { return jQuery.easing[jQuery.easing.def](x, t, b, c, d);},easeInOutQuart: function (x, t, b, c, d) { if ((t/=d/2) < 1) return c/2*t*t*t*t + b; return -c/2 * ((t-=2)*t*t*t - 2) + b;}});



/* =============================================================================
   slides
   ========================================================================== */
/*
* Slides, A Slideshow Plugin for jQuery
* Intructions: http://slidesjs.com
* By: Nathan Searles, http://nathansearles.com
* Version: 1.1.9
* Updated: September 5th, 2011
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function(A){A.fn.slides=function(B){B=A.extend({},A.fn.slides.option,B);return this.each(function(){A("."+B.container,A(this)).children().wrapAll('<div class="slides_control"/>');var V=A(this),J=A(".slides_control",V),Z=J.children().size(),Q=J.children().outerWidth(),M=J.children().outerHeight(),D=B.start-1,L=B.effect.indexOf(",")<0?B.effect:B.effect.replace(" ","").split(",")[0],S=B.effect.indexOf(",")<0?L:B.effect.replace(" ","").split(",")[1],O=0,N=0,C=0,P=0,U,H,I,X,W,T,K,F;function E(c,b,a){if(!H&&U){H=true;B.animationStart(P+1);switch(c){case"next":N=P;O=P+1;O=Z===O?0:O;X=Q*2;c=-Q*2;P=O;break;case"prev":N=P;O=P-1;O=O===-1?Z-1:O;X=0;c=0;P=O;break;case"pagination":O=parseInt(a,10);N=A("."+B.paginationClass+" li."+B.currentClass+" a",V).attr("href").match("[^#/]+$");if(O>N){X=Q*2;c=-Q*2;}else{X=0;c=0;}P=O;break;}if(b==="fade"){if(B.crossfade){J.children(":eq("+O+")",V).css({zIndex:10}).fadeIn(B.fadeSpeed,B.fadeEasing,function(){if(B.autoHeight){J.animate({height:J.children(":eq("+O+")",V).outerHeight()},B.autoHeightSpeed,function(){J.children(":eq("+N+")",V).css({display:"none",zIndex:0});J.children(":eq("+O+")",V).css({zIndex:0});B.animationComplete(O+1);H=false;});}else{J.children(":eq("+N+")",V).css({display:"none",zIndex:0});J.children(":eq("+O+")",V).css({zIndex:0});B.animationComplete(O+1);H=false;}});}else{J.children(":eq("+N+")",V).fadeOut(B.fadeSpeed,B.fadeEasing,function(){if(B.autoHeight){J.animate({height:J.children(":eq("+O+")",V).outerHeight()},B.autoHeightSpeed,function(){J.children(":eq("+O+")",V).fadeIn(B.fadeSpeed,B.fadeEasing);});}else{J.children(":eq("+O+")",V).fadeIn(B.fadeSpeed,B.fadeEasing,function(){if(A.browser.msie){A(this).get(0).style.removeAttribute("filter");}});}B.animationComplete(O+1);H=false;});}}else{J.children(":eq("+O+")").css({left:X,display:"block"});if(B.autoHeight){J.animate({left:c,height:J.children(":eq("+O+")").outerHeight()},B.slideSpeed,B.slideEasing,function(){J.css({left:-Q});J.children(":eq("+O+")").css({left:Q,zIndex:5});J.children(":eq("+N+")").css({left:Q,display:"none",zIndex:0});B.animationComplete(O+1);H=false;});}else{J.animate({left:c},B.slideSpeed,B.slideEasing,function(){J.css({left:-Q});J.children(":eq("+O+")").css({left:Q,zIndex:5});J.children(":eq("+N+")").css({left:Q,display:"none",zIndex:0});B.animationComplete(O+1);H=false;});}}if(B.pagination){A("."+B.paginationClass+" li."+B.currentClass,V).removeClass(B.currentClass);A("."+B.paginationClass+" li:eq("+O+")",V).addClass(B.currentClass);}}}function R(){clearInterval(V.data("interval"));}function G(){if(B.pause){clearTimeout(V.data("pause"));clearInterval(V.data("interval"));K=setTimeout(function(){clearTimeout(V.data("pause"));F=setInterval(function(){E("next",L);},B.play);V.data("interval",F);},B.pause);V.data("pause",K);}else{R();}}if(Z<2){return ;}if(D<0){D=0;}if(D>Z){D=Z-1;}if(B.start){P=D;}if(B.randomize){J.randomize();}A("."+B.container,V).css({overflow:"hidden",position:"relative"});J.children().css({position:"absolute",top:0,left:J.children().outerWidth(),zIndex:0,display:"none"});J.css({position:"relative",width:(Q*3),height:M,left:-Q});A("."+B.container,V).css({display:"block"});if(B.autoHeight){J.children().css({height:"auto"});J.animate({height:J.children(":eq("+D+")").outerHeight()},B.autoHeightSpeed);}if(B.preload&&J.find("img:eq("+D+")").length){A("."+B.container,V).css({background:"url("+B.preloadImage+") no-repeat 50% 50%"});var Y=J.find("img:eq("+D+")").attr("src")+"?"+(new Date()).getTime();if(A("img",V).parent().attr("class")!="slides_control"){T=J.children(":eq(0)")[0].tagName.toLowerCase();}else{T=J.find("img:eq("+D+")");}J.find("img:eq("+D+")").attr("src",Y).load(function(){J.find(T+":eq("+D+")").fadeIn(B.fadeSpeed,B.fadeEasing,function(){A(this).css({zIndex:5});A("."+B.container,V).css({background:""});U=true;B.slidesLoaded();});});}else{J.children(":eq("+D+")").fadeIn(B.fadeSpeed,B.fadeEasing,function(){U=true;B.slidesLoaded();});}if(B.bigTarget){J.children().css({cursor:"pointer"});J.children().click(function(){E("next",L);return false;});}if(B.hoverPause&&B.play){J.bind("mouseover",function(){R();});J.bind("mouseleave",function(){G();});}if(B.generateNextPrev){A("."+B.container,V).after('<a href="#" class="nav '+B.prev+'">-</a>');A("."+B.prev,V).after('<a href="#" class="nav '+B.next+'">+</a>');}A("."+B.next,V).click(function(a){a.preventDefault();if(B.play){G();}E("next",L);});A("."+B.prev,V).click(function(a){a.preventDefault();if(B.play){G();}E("prev",L);});if(B.generatePagination){if(B.prependPagination){V.prepend("<ul class="+B.paginationClass+"></ul>");}else{V.append("<ul class="+B.paginationClass+"></ul>");}J.children().each(function(){A("."+B.paginationClass,V).append('<li><a href="#'+C+'">'+(C+1)+"</a></li>");C++;});}else{A("."+B.paginationClass+" li a",V).each(function(){A(this).attr("href","#"+C);C++;});}A("."+B.paginationClass+" li:eq("+D+")",V).addClass(B.currentClass);A("."+B.paginationClass+" li a",V).click(function(){if(B.play){G();}I=A(this).attr("href").match("[^#/]+$");if(P!=I){E("pagination",S,I);}return false;});A("a.link",V).click(function(){if(B.play){G();}I=A(this).attr("href").match("[^#/]+$")-1;if(P!=I){E("pagination",S,I);}return false;});if(B.play){F=setInterval(function(){E("next",L);},B.play);V.data("interval",F);}});};A.fn.slides.option={preload:false,preloadImage:"/img/loading.gif",container:"slides_container",generateNextPrev:false,next:"next",prev:"prev",pagination:true,generatePagination:true,prependPagination:false,paginationClass:"pagination",currentClass:"current",fadeSpeed:350,fadeEasing:"",slideSpeed:350,slideEasing:"",start:1,effect:"slide",crossfade:false,randomize:false,play:0,pause:0,hoverPause:false,autoHeight:false,autoHeightSpeed:350,bigTarget:false,animationStart:function(){},animationComplete:function(){},slidesLoaded:function(){}};A.fn.randomize=function(C){function B(){return(Math.round(Math.random())-0.5);}return(A(this).each(function(){var F=A(this);var E=F.children();var D=E.length;if(D>1){E.hide();var G=[];for(i=0;i<D;i++){G[G.length]=i;}G=G.sort(B);A.each(G,function(I,H){var K=E.eq(H);var J=K.clone(true);J.show().appendTo(F);if(C!==undefined){C(K,J);}K.remove();});}}));};})(jQuery);



/* =============================================================================
   inview
   ========================================================================== */
(function(c){function p(){var d,a={height:h.innerHeight,width:h.innerWidth};if(!a.height&&((d=i.compatMode)||!c.support.boxModel))d=d==="CSS1Compat"?k:i.body,a={height:d.clientHeight,width:d.clientWidth};return a}var m={},e,a,i=document,h=window,k=i.documentElement,j=c.expando;c.event.special.inview={add:function(a){m[a.guid+"-"+this[j]]={data:a,$element:c(this)}},remove:function(a){try{delete m[a.guid+"-"+this[j]]}catch(c){}}};c(h).bind("scroll resize",function(){e=a=null});setInterval(function(){var d=
c(),j,l=0;c.each(m,function(a,b){var c=b.data.selector,e=b.$element;d=d.add(c?e.find(c):e)});if(j=d.length){e=e||p();for(a=a||{top:h.pageYOffset||k.scrollTop||i.body.scrollTop,left:h.pageXOffset||k.scrollLeft||i.body.scrollLeft};l<j;l++)if(c.contains(k,d[l])){var g=c(d[l]),f={height:g.height(),width:g.width()},b=g.offset(),n=g.data("inview"),o;if(!a||!e)break;b.top+f.height>a.top&&b.top<a.top+e.height&&b.left+f.width>a.left&&b.left<a.left+e.width?(o=a.left>b.left?"right":a.left+e.width<b.left+f.width?
"left":"both",f=a.top>b.top?"bottom":a.top+e.height<b.top+f.height?"top":"both",b=o+"-"+f,(!n||n!==b)&&g.data("inview",b).trigger("inview",[!0,o,f])):n&&g.data("inview",!1).trigger("inview",[!1])}}},250)})(jQuery);



// ColorBox v1.3.18 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
// Copyright (c) 2011 Jack Moore - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
(function ($, document, window) {
    var
    // Default settings object.	
    // See http://jacklmoore.com/colorbox for details.
    defaults = {
        transition: "elastic",
        speed: 300,
        width: false,
        initialWidth: "600",
        innerWidth: false,
        maxWidth: false,
        height: false,
        initialHeight: "450",
        innerHeight: false,
        maxHeight: false,
        scalePhotos: true,
        scrolling: true,
        inline: false,
        html: false,
        iframe: false,
        fastIframe: true,
        photo: false,
        href: false,
        title: false,
        rel: false,
        opacity: 0.9,
        preloading: true,
        current: "image {current} of {total}",
        previous: "previous",
        next: "next",
        close: "close",
        open: false,
        returnFocus: true,
        loop: true,
        slideshow: false,
        slideshowAuto: true,
        slideshowSpeed: 2500,
        slideshowStart: "start slideshow",
        slideshowStop: "stop slideshow",
        onOpen: false,
        onLoad: false,
        onComplete: false,
        onCleanup: false,
        onClosed: false,
        overlayClose: true,		
        escKey: true,
        arrowKey: true,
        top: false,
        bottom: false,
        left: false,
        right: false,
        fixed: false,
        data: undefined
    },
	
    // Abstracting the HTML and event identifiers for easy rebranding
    colorbox = 'colorbox',
    prefix = 'cbox',
    boxElement = prefix + 'Element',
    
    // Events	
    event_open = prefix + '_open',
    event_load = prefix + '_load',
    event_complete = prefix + '_complete',
    event_cleanup = prefix + '_cleanup',
    event_closed = prefix + '_closed',
    event_purge = prefix + '_purge',
    
    // Special Handling for IE
    isIE = $.browser.msie && !$.support.opacity, // Detects IE6,7,8.  IE9 supports opacity.  Feature detection alone gave a false positive on at least one phone browser and on some development versions of Chrome, hence the user-agent test.
    isIE6 = isIE && $.browser.version < 7,
    event_ie6 = prefix + '_IE6',
    
    // Cached jQuery Object Variables
    $overlay,
    $box,
    $wrap,
    $content,
    $topBorder,
    $leftBorder,
    $rightBorder,
    $bottomBorder,
    $related,
    $window,
    $loaded,
    $loadingBay,
    $loadingOverlay,
    $title,
    $current,
    $slideshow,
    $next,
    $prev,
    $close,
    $groupControls,
    
    // Variables for cached values or use across multiple functions
    settings,
    interfaceHeight,
    interfaceWidth,
    loadedHeight,
    loadedWidth,
    element,
    index,
    photo,
    open,
    active,
    closing,
    loadingTimer,
    publicMethod,
    div = "div";

	// ****************
	// HELPER FUNCTIONS
	// ****************
    
	// Convience function for creating new jQuery objects
    function $tag(tag, id, css) {
        var element = document.createElement(tag);
        
        if (id) {
            element.id = prefix + id;
        }
        
        if (css) {
            element.style.cssText = css;
        }
        
        return $(element);
    }

	// Determine the next and previous members in a group.
	function getIndex(increment) {
		var 
		max = $related.length, 
		newIndex = (index + increment) % max;
		
		return (newIndex < 0) ? max + newIndex : newIndex;
	}

	// Convert '%' and 'px' values to integers
	function setSize(size, dimension) {
		return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : $window.height()) / 100) : 1) * parseInt(size, 10));
	}
	
	// Checks an href to see if it is a photo.
	// There is a force photo option (photo: true) for hrefs that cannot be matched by this regex.
	function isImage(url) {
		return settings.photo || /\.(gif|png|jpe?g|bmp|ico)((#|\?).*)?$/i.test(url);
	}
	
	// Assigns function results to their respective properties
	function makeSettings() {
        var i;
        settings = $.extend({}, $.data(element, colorbox));
        
		for (i in settings) {
			if ($.isFunction(settings[i]) && i.slice(0, 2) !== 'on') { // checks to make sure the function isn't one of the callbacks, they will be handled at the appropriate time.
			    settings[i] = settings[i].call(element);
			}
		}
        
		settings.rel = settings.rel || element.rel || 'nofollow';
		settings.href = settings.href || $(element).attr('href');
		settings.title = settings.title || element.title;
        
        if (typeof settings.href === "string") {
            settings.href = $.trim(settings.href);
        }
	}

	function trigger(event, callback) {
		$.event.trigger(event);
		if (callback) {
			callback.call(element);
		}
	}

	// Slideshow functionality
	function slideshow() {
		var
		timeOut,
		className = prefix + "Slideshow_",
		click = "click." + prefix,
		start,
		stop,
		clear;
		
		if (settings.slideshow && $related[1]) {
			start = function () {
				$slideshow
					.text(settings.slideshowStop)
					.unbind(click)
					.bind(event_complete, function () {
						if (index < $related.length - 1 || settings.loop) {
							timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
						}
					})
					.bind(event_load, function () {
						clearTimeout(timeOut);
					})
					.one(click + ' ' + event_cleanup, stop);
				$box.removeClass(className + "off").addClass(className + "on");
				timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
			};
			
			stop = function () {
				clearTimeout(timeOut);
				$slideshow
					.text(settings.slideshowStart)
					.unbind([event_complete, event_load, event_cleanup, click].join(' '))
					.one(click, function () {
						publicMethod.next();
						start();
					});
				$box.removeClass(className + "on").addClass(className + "off");
			};
			
			if (settings.slideshowAuto) {
				start();
			} else {
				stop();
			}
		} else {
            $box.removeClass(className + "off " + className + "on");
        }
	}

	function launch(target) {
		if (!closing) {
			
			element = target;
			
			makeSettings();
			
			$related = $(element);
			
			index = 0;
			
			if (settings.rel !== 'nofollow') {
				$related = $('.' + boxElement).filter(function () {
					var relRelated = $.data(this, colorbox).rel || this.rel;
					return (relRelated === settings.rel);
				});
				index = $related.index(element);
				
				// Check direct calls to ColorBox.
				if (index === -1) {
					$related = $related.add(element);
					index = $related.length - 1;
				}
			}
			
			if (!open) {
				open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.
				
				$box.show();
				
				if (settings.returnFocus) {
					try {
						element.blur();
						$(element).one(event_closed, function () {
							try {
								this.focus();
							} catch (e) {
								// do nothing
							}
						});
					} catch (e) {
						// do nothing
					}
				}
				
				// +settings.opacity avoids a problem in IE when using non-zero-prefixed-string-values, like '.5'
				$overlay.css({"height": $('body').height(), "opacity": +settings.opacity, "cursor": settings.overlayClose ? "pointer" : "auto"}).show();
				
				// Opens inital empty ColorBox prior to content being loaded.
				settings.w = setSize(settings.initialWidth, 'x');
				settings.h = setSize(settings.initialHeight, 'y');
				publicMethod.position();
				
				if (isIE6) {
					$window.bind('resize.' + event_ie6 + ' scroll.' + event_ie6, function () {
						$overlay.css({width: $window.width(), height: $window.height(), top: $window.scrollTop(), left: $window.scrollLeft()});
					}).trigger('resize.' + event_ie6);
				}
				
				trigger(event_open, settings.onOpen);
				
				$groupControls.add($title).hide();
				
				$close.html(settings.close).show();
			}
			
			publicMethod.load(true);
		}
	}

	// ****************
	// PUBLIC FUNCTIONS
	// Usage format: $.fn.colorbox.close();
	// Usage from within an iframe: parent.$.fn.colorbox.close();
	// ****************
	
	publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
		var $this = this;
		
        options = options || {};
        
		publicMethod.init();
		
		if (!$this[0]) {
			if ($this.selector) { // if a selector was given and it didn't match any elements, go ahead and exit.
                return $this;
            }
            // if no selector was given (ie. $.colorbox()), create a temporary element to work with
			$this = $('<a/>');
			options.open = true; // assume an immediate open
		}
		
		if (callback) {
			options.onComplete = callback;
		}
		
		$this.each(function () {
			$.data(this, colorbox, $.extend({}, $.data(this, colorbox) || defaults, options));
			$(this).addClass(boxElement);
		});
		
        if (($.isFunction(options.open) && options.open.call($this)) || options.open) {
			launch($this[0]);
		}
        
		return $this;
	};

	// Initialize ColorBox: store common calculations, preload the interface graphics, append the html.
	// This preps ColorBox for a speedy open when clicked, and minimizes the burdon on the browser by only
	// having to run once, instead of each time colorbox is opened.
	publicMethod.init = function () {
		if (!$box) {
			
			// If the body is not present yet, wait for DOM ready
			if (!$('body')[0]) {
				$(publicMethod.init);
				return;
			}
			
			// Create the markup and append to BODY
			$window = $(window);
			$box = $tag(div).attr({id: colorbox, 'class': isIE ? prefix + (isIE6 ? 'IE6' : 'IE') : ''});
			$overlay = $tag(div, "Overlay", isIE6 ? 'position:absolute' : '').hide();
			$wrap = $tag(div, "Wrapper");
			$content = $tag(div, "Content").append(
				$loaded = $tag(div, "LoadedContent", 'width:0; height:0; overflow:hidden'),
				$loadingOverlay = $tag(div, "LoadingOverlay").add($tag(div, "LoadingGraphic")),
				$title = $tag(div, "Title"),
				$current = $tag(div, "Current"),
				$next = $tag(div, "Next"),
				$prev = $tag(div, "Previous"),
				$slideshow = $tag(div, "Slideshow").bind(event_open, slideshow),
				$close = $tag(div, "Close")
			);
			
			$wrap.append( // The 3x3 Grid that makes up ColorBox
				$tag(div).append(
					$tag(div, "TopLeft"),
					$topBorder = $tag(div, "TopCenter"),
					$tag(div, "TopRight")
				),
				$tag(div, false, 'clear:left').append(
					$leftBorder = $tag(div, "MiddleLeft"),
					$content,
					$rightBorder = $tag(div, "MiddleRight")
				),
				$tag(div, false, 'clear:left').append(
					$tag(div, "BottomLeft"),
					$bottomBorder = $tag(div, "BottomCenter"),
					$tag(div, "BottomRight")
				)
			).find('div div').css({'float': 'left'});
			
			$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none');
			
			$('body').prepend($overlay, $box.append($wrap, $loadingBay));
			
			// Cache values needed for size calculations
			interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
			interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
			loadedHeight = $loaded.outerHeight(true);
			loadedWidth = $loaded.outerWidth(true);
			
			// Setting padding to remove the need to do size conversions during the animation step.
			$box.css({"padding-bottom": interfaceHeight, "padding-right": interfaceWidth}).hide();
			
			// Setup button events.
			// Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.
			$next.click(function () {
				publicMethod.next();
			});
			$prev.click(function () {
				publicMethod.prev();
			});
			$close.click(function () {
				publicMethod.close();
			});
			
			$groupControls = $next.add($prev).add($current).add($slideshow);
			
			$overlay.click(function () {
				if (settings.overlayClose) {
					publicMethod.close();
				}
			});
			
			// Set Navigation Key Bindings
			$(document).bind('keydown.' + prefix, function (e) {
				var key = e.keyCode;
				if (open && settings.escKey && key === 27) {
					e.preventDefault();
					publicMethod.close();
				}
				if (open && settings.arrowKey && $related[1]) {
					if (key === 37) {
						e.preventDefault();
						$prev.click();
					} else if (key === 39) {
						e.preventDefault();
						$next.click();
					}
				}
			});
		}
	};
	
	publicMethod.remove = function () {
		$box.add($overlay).remove();
		$box = null;
		$('.' + boxElement).removeData(colorbox).removeClass(boxElement);
	};

	publicMethod.position = function (speed, loadedCallback) {
        var top = 0, left = 0, offset = $box.offset();
        
        $window.unbind('resize.' + prefix);

        // remove the modal so that it doesn't influence the document width/height        
        $box.css({top: -99999, left: -99999});

        if (settings.fixed && !isIE6) {
            $box.css({position: 'fixed'});
        } else {
            top = $window.scrollTop();
            left = $window.scrollLeft();
            $box.css({position: 'absolute'});
        }

		// keeps the top and left positions within the browser's viewport.
        if (settings.right !== false) {
            left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.right, 'x'), 0);
        } else if (settings.left !== false) {
            left += setSize(settings.left, 'x');
        } else {
            left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
        }
        
        if (settings.bottom !== false) {
            top += Math.max($window.height() - settings.h - loadedHeight - interfaceHeight - setSize(settings.bottom, 'y'), 0);
        } else if (settings.top !== false) {
            top += setSize(settings.top, 'y');
        } else {
            top += Math.round(Math.max($window.height() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
        }
        
        $box.css({top: offset.top, left: offset.left});
        
		// setting the speed to 0 to reduce the delay between same-sized content.
		speed = ($box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight) ? 0 : speed || 0;
        
		// this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
		// but it has to be shrank down around the size of div#colorbox when it's done.  If not,
		// it can invoke an obscure IE bug when using iframes.
		$wrap[0].style.width = $wrap[0].style.height = "9999px";
		
		function modalDimensions(that) {
			// loading overlay height has to be explicitly set for IE6.
			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = that.style.width;
			$loadingOverlay[0].style.height = $loadingOverlay[1].style.height = $content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = that.style.height;
		}
		
		$box.dequeue().animate({width: settings.w + loadedWidth, height: settings.h + loadedHeight, top: top, left: left}, {
			duration: speed,
			complete: function () {
				modalDimensions(this);
				
				active = false;
				
				// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
				$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
				$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";
				
				if (loadedCallback) {
					loadedCallback();
				}
                
                setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
                    $window.bind('resize.' + prefix, publicMethod.position);
                }, 1);
			},
			step: function () {
				modalDimensions(this);
			}
		});
	};

	publicMethod.resize = function (options) {
		if (open) {
			options = options || {};
			
			if (options.width) {
				settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
			}
			if (options.innerWidth) {
				settings.w = setSize(options.innerWidth, 'x');
			}
			$loaded.css({width: settings.w});
			
			if (options.height) {
				settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
			}
			if (options.innerHeight) {
				settings.h = setSize(options.innerHeight, 'y');
			}
			if (!options.innerHeight && !options.height) {
				$loaded.css({height: "auto"});
				settings.h = $loaded.height();
			}
			$loaded.css({height: settings.h});
			
			publicMethod.position(settings.transition === "none" ? 0 : settings.speed);
		}
	};

	publicMethod.prep = function (object) {
		if (!open) {
			return;
		}
		
		var callback, speed = settings.transition === "none" ? 0 : settings.speed;
		
		$loaded.remove();
		$loaded = $tag(div, 'LoadedContent').append(object);
		
		function getWidth() {
			settings.w = settings.w || $loaded.width();
			settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
			return settings.w;
		}
		function getHeight() {
			settings.h = settings.h || $loaded.height();
			settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
			return settings.h;
		}
		
		$loaded.hide()
		.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
		.css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})
		.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
		.prependTo($content);
		
		$loadingBay.hide();
		
		// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
		//$(photo).css({'float': 'none', marginLeft: 'auto', marginRight: 'auto'});
		
        $(photo).css({'float': 'none'});
        
		// Hides SELECT elements in IE6 because they would otherwise sit on top of the overlay.
		if (isIE6) {
			$('select').not($box.find('select')).filter(function () {
				return this.style.visibility !== 'hidden';
			}).css({'visibility': 'hidden'}).one(event_cleanup, function () {
				this.style.visibility = 'inherit';
			});
		}
		
		callback = function () {
            var preload, i, total = $related.length, iframe, frameBorder = 'frameBorder', allowTransparency = 'allowTransparency', complete, src, img;
            
            if (!open) {
                return;
            }
            
            function removeFilter() {
                if (isIE) {
                    $box[0].style.removeAttribute('filter');
                }
            }
            
            complete = function () {
                clearTimeout(loadingTimer);
                $loadingOverlay.hide();
                trigger(event_complete, settings.onComplete);
            };
            
            if (isIE) {
                //This fadeIn helps the bicubic resampling to kick-in.
                if (photo) {
                    $loaded.fadeIn(100);
                }
            }
            
            $title.html(settings.title).add($loaded).show();
            
            if (total > 1) { // handle grouping
                if (typeof settings.current === "string") {
                    $current.html(settings.current.replace('{current}', index + 1).replace('{total}', total)).show();
                }
                
                $next[(settings.loop || index < total - 1) ? "show" : "hide"]().html(settings.next);
                $prev[(settings.loop || index) ? "show" : "hide"]().html(settings.previous);
				
                if (settings.slideshow) {
                    $slideshow.show();
                }
				
                // Preloads images within a rel group
                if (settings.preloading) {
					preload = [
						getIndex(-1),
						getIndex(1)
					];
					while ((i = $related[preload.pop()])) {
						src = $.data(i, colorbox).href || i.href;
						if ($.isFunction(src)) {
							src = src.call(i);
						}
						if (isImage(src)) {
							img = new Image();
							img.src = src;
						}
					}
                }
            } else {
                $groupControls.hide();
            }
            
            if (settings.iframe) {
                iframe = $tag('iframe')[0];
                
                if (frameBorder in iframe) {
                    iframe[frameBorder] = 0;
                }
                if (allowTransparency in iframe) {
                    iframe[allowTransparency] = "true";
                }
                // give the iframe a unique name to prevent caching
                iframe.name = prefix + (+new Date());
                if (settings.fastIframe) {
                    complete();
                } else {
                    $(iframe).one('load', complete);
                }
                iframe.src = settings.href;
                if (!settings.scrolling) {
                    iframe.scrolling = "no";
                }
                $(iframe).addClass(prefix + 'Iframe').appendTo($loaded).one(event_purge, function () {
                    iframe.src = "//about:blank";
                });
            } else {
                complete();
            }
            
            if (settings.transition === 'fade') {
                $box.fadeTo(speed, 1, removeFilter);
            } else {
                removeFilter();
            }
		};
		
		if (settings.transition === 'fade') {
			$box.fadeTo(speed, 0, function () {
				publicMethod.position(0, callback);
			});
		} else {
			publicMethod.position(speed, callback);
		}
	};

	publicMethod.load = function (launched) {
		var href, setResize, prep = publicMethod.prep;
		
		active = true;
		
		photo = false;
		
		element = $related[index];
		
		if (!launched) {
			makeSettings();
		}
		
		trigger(event_purge);
		
		trigger(event_load, settings.onLoad);
		
		settings.h = settings.height ?
				setSize(settings.height, 'y') - loadedHeight - interfaceHeight :
				settings.innerHeight && setSize(settings.innerHeight, 'y');
		
		settings.w = settings.width ?
				setSize(settings.width, 'x') - loadedWidth - interfaceWidth :
				settings.innerWidth && setSize(settings.innerWidth, 'x');
		
		// Sets the minimum dimensions for use in image scaling
		settings.mw = settings.w;
		settings.mh = settings.h;
		
		// Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
		// If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
		if (settings.maxWidth) {
			settings.mw = setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;
			settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
		}
		if (settings.maxHeight) {
			settings.mh = setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;
			settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
		}
		
		href = settings.href;
		
        loadingTimer = setTimeout(function () {
            $loadingOverlay.show();
        }, 100);
        
		if (settings.inline) {
			// Inserts an empty placeholder where inline content is being pulled from.
			// An event is bound to put inline content back when ColorBox closes or loads new content.
			$tag(div).hide().insertBefore($(href)[0]).one(event_purge, function () {
				$(this).replaceWith($loaded.children());
			});
			prep($(href));
		} else if (settings.iframe) {
			// IFrame element won't be added to the DOM until it is ready to be displayed,
			// to avoid problems with DOM-ready JS that might be trying to run in that iframe.
			prep(" ");
		} else if (settings.html) {
			prep(settings.html);
		} else if (isImage(href)) {
			$(photo = new Image())
			.addClass(prefix + 'Photo')
			.error(function () {
				settings.title = false;
				prep($tag(div, 'Error').text('This image could not be loaded'));
			})
			.load(function () {
				var percent;
				photo.onload = null; //stops animated gifs from firing the onload repeatedly.
				
				if (settings.scalePhotos) {
					setResize = function () {
						photo.height -= photo.height * percent;
						photo.width -= photo.width * percent;	
					};
					if (settings.mw && photo.width > settings.mw) {
						percent = (photo.width - settings.mw) / photo.width;
						setResize();
					}
					if (settings.mh && photo.height > settings.mh) {
						percent = (photo.height - settings.mh) / photo.height;
						setResize();
					}
				}
				
				if (settings.h) {
					photo.style.marginTop = Math.max(settings.h - photo.height, 0) / 2 + 'px';
				}
				
				if ($related[1] && (index < $related.length - 1 || settings.loop)) {
					photo.style.cursor = 'pointer';
					photo.onclick = function () {
                        publicMethod.next();
                    };
				}
				
				if (isIE) {
					photo.style.msInterpolationMode = 'bicubic';
				}
				
				setTimeout(function () { // A pause because Chrome will sometimes report a 0 by 0 size otherwise.
					prep(photo);
				}, 1);
			});
			
			setTimeout(function () { // A pause because Opera 10.6+ will sometimes not run the onload function otherwise.
				photo.src = href;
			}, 1);
		} else if (href) {
			$loadingBay.load(href, settings.data, function (data, status, xhr) {
				prep(status === 'error' ? $tag(div, 'Error').text('Request unsuccessful: ' + xhr.statusText) : $(this).contents());
			});
		}
	};
        
	// Navigates to the next page/image in a set.
	publicMethod.next = function () {
		if (!active && $related[1] && (index < $related.length - 1 || settings.loop)) {
			index = getIndex(1);
			publicMethod.load();
		}
	};
	
	publicMethod.prev = function () {
		if (!active && $related[1] && (index || settings.loop)) {
			index = getIndex(-1);
			publicMethod.load();
		}
	};

	// Note: to use this within an iframe use the following format: parent.$.fn.colorbox.close();
	publicMethod.close = function () {
		if (open && !closing) {
			
			closing = true;
			
			open = false;
			
			trigger(event_cleanup, settings.onCleanup);
			
			$window.unbind('.' + prefix + ' .' + event_ie6);
			
			$overlay.fadeTo(200, 0);
			
			$box.stop().fadeTo(300, 0, function () {
                 
				$box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();
				
				trigger(event_purge);
				
				$loaded.remove();
				
				setTimeout(function () {
					closing = false;
					trigger(event_closed, settings.onClosed);
				}, 1);
			});
		}
	};

	// A method for fetching the current element ColorBox is referencing.
	// returns a jQuery object.
	publicMethod.element = function () {
		return $(element);
	};

	publicMethod.settings = defaults;
    
	// Bind the live event before DOM-ready for maximum performance in IE6 & 7.
	$('.' + boxElement, document).live('click', function (e) {
        // ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.
        // See: http://jacklmoore.com/notes/click-events/
        if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
            e.preventDefault();
            launch(this);
        }
    });

	// Setup ColorBox
	publicMethod.init();

}(jQuery, document, this));


/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);



/*
 * jQuery FlexSlider v1.8
 * http://flex.madebymufffin.com
 *
 * Copyright 2011, Tyler Smith
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Contrib: Darin Richardson
 */

;(function ($) {
  
  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = el;

    slider.init = function() {
      slider.vars = $.extend({}, $.flexslider.defaults, options);
      slider.data('flexslider', true);
      slider.container = $('.slides', slider);
      slider.slides = $('.slides > li', slider);
      slider.count = slider.slides.length;
      slider.animating = false;
      slider.currentSlide = slider.vars.slideToStart;
      slider.animatingTo = slider.currentSlide;
      slider.atEnd = (slider.currentSlide == 0) ? true : false;
      slider.eventType = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';
      slider.cloneCount = 0;
      slider.cloneOffset = 0;
      slider.manualPause = false;
      slider.vertical = (slider.vars.slideDirection == "vertical");
      slider.prop = (slider.vertical) ? "top" : "marginLeft";
      slider.args = {};
      
      //Test for webbkit CSS3 Animations
      slider.transitions = "webkitTransition" in document.body.style;
      if (slider.transitions) slider.prop = "-webkit-transform";
      
      //Test for controlsContainer
      if (slider.vars.controlsContainer != "") {
        slider.controlsContainer = $(slider.vars.controlsContainer).eq($('.slides').index(slider.container));
        slider.containerExists = slider.controlsContainer.length > 0;
      }
      //Test for manualControls
      if (slider.vars.manualControls != "") {
        slider.manualControls = $(slider.vars.manualControls, ((slider.containerExists) ? slider.controlsContainer : slider));
        slider.manualExists = slider.manualControls.length > 0;
      }
      
      ///////////////////////////////////////////////////////////////////
      // FlexSlider: Randomize Slides
      if (slider.vars.randomize) {
        slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
        slider.container.empty().append(slider.slides);
      }
      ///////////////////////////////////////////////////////////////////
      
      ///////////////////////////////////////////////////////////////////
      // FlexSlider: Slider Animation Initialize
      if (slider.vars.animation.toLowerCase() == "slide") {
        if (slider.transitions) {
          slider.setTransition(0);
        }
        slider.css({"overflow": "hidden"});
        if (slider.vars.animationLoop) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          slider.container.append(slider.slides.filter(':first').clone().addClass('clone')).prepend(slider.slides.filter(':last').clone().addClass('clone'));
        }
        //create newSlides to capture possible clones
        slider.newSlides = $('.slides > li', slider);
        var sliderOffset = (-1 * (slider.currentSlide + slider.cloneOffset));
        if (slider.vertical) {
          slider.newSlides.css({"display": "block", "width": "100%", "float": "left"});
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          //Timeout function to give browser enough time to get proper height initially
          setTimeout(function() {
            slider.css({"position": "relative"}).height(slider.slides.filter(':first').height());
            slider.args[slider.prop] = (slider.transitions) ? "translate3d(0," + sliderOffset * slider.height() + "px,0)" : sliderOffset * slider.height() + "px";
            slider.container.css(slider.args);
          }, 100);

        } else {
          slider.args[slider.prop] = (slider.transitions) ? "translate3d(" + sliderOffset * slider.width() + "px,0,0)" : sliderOffset * slider.width() + "px";
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%").css(slider.args);
          //Timeout function to give browser enough time to get proper width initially
          setTimeout(function() {
            slider.newSlides.width(slider.width()).css({"float": "left", "display": "block"});
          }, 100);
        }
        
      } else { //Default to fade
        //Not supporting fade CSS3 transitions right now
        slider.transitions = false;
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%"}).eq(slider.currentSlide).fadeIn(slider.vars.animationDuration); 
      }
      ///////////////////////////////////////////////////////////////////
      
      ///////////////////////////////////////////////////////////////////
      // FlexSlider: Control Nav
      if (slider.vars.controlNav) {
        if (slider.manualExists) {
          slider.controlNav = slider.manualControls;
        } else {
          var controlNavScaffold = $('<ol class="flex-control-nav"></ol>');
          var j = 1;
          for (var i = 0; i < slider.count; i++) {
            controlNavScaffold.append('<li><a>' + j + '</a></li>');
            j++;
          }

          if (slider.containerExists) {
            $(slider.controlsContainer).append(controlNavScaffold);
            slider.controlNav = $('.flex-control-nav li a', slider.controlsContainer);
          } else {
            slider.append(controlNavScaffold);
            slider.controlNav = $('.flex-control-nav li a', slider);
          }
        }

        slider.controlNav.eq(slider.currentSlide).addClass('active');

        slider.controlNav.on('click', function(event) {
          event.preventDefault();
          if (!$(this).hasClass('active')) {
            (slider.controlNav.index($(this)) > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
            slider.flexAnimate(slider.controlNav.index($(this)), slider.vars.pauseOnAction);
          }
		  
        });

		controlNavScaffold.css('marginLeft',-(slider.count*8));
		
      }
      ///////////////////////////////////////////////////////////////////
      
      //////////////////////////////////////////////////////////////////
      //FlexSlider: Direction Nav
      if (slider.vars.directionNav) {
        var directionNavScaffold = $('<ul class="flex-direction-nav"><li><a class="prev" href="#">' + slider.vars.prevText + '</a></li><li><a class="next" href="#">' + slider.vars.nextText + '</a></li></ul>');
        
        if (slider.containerExists) {
          $(slider.controlsContainer).append(directionNavScaffold);
          slider.directionNav = $('.flex-direction-nav li a', slider.controlsContainer);
        } else {
          slider.append(directionNavScaffold);
          slider.directionNav = $('.flex-direction-nav li a', slider);
        }
        
        //Set initial disable styles if necessary
        if (!slider.vars.animationLoop) {
          if (slider.currentSlide == 0) {
            slider.directionNav.filter('.prev').addClass('disabled');
          } else if (slider.currentSlide == slider.count - 1) {
            slider.directionNav.filter('.next').addClass('disabled');
          }
        }
        
        slider.directionNav.bind('click', function(event) {
          event.preventDefault();
          var target = ($(this).hasClass('next')) ? slider.getTarget('next') : slider.getTarget('prev');
          
          if (slider.canAdvance(target)) {
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          }
        });
      }
      //////////////////////////////////////////////////////////////////
      
      //////////////////////////////////////////////////////////////////
      //FlexSlider: Keyboard Nav
      if (slider.vars.keyboardNav && $('ul.slides').length == 1) {
        function keyboardMove(event) {
          if (slider.animating) {
            return;
          } else if (event.keyCode != 39 && event.keyCode != 37){
            return;
          } else {
            if (event.keyCode == 39) {
              var target = slider.getTarget('next');

            } else if (event.keyCode == 37){
              var target = slider.getTarget('prev');
            }
        
            if (slider.canAdvance(target)) {
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          }
        }
        $(document).bind('keyup', keyboardMove);
      }
      //////////////////////////////////////////////////////////////////
      
      ///////////////////////////////////////////////////////////////////
      // FlexSlider: Mousewheel interaction
      if (slider.vars.mousewheel) {
        slider.mousewheelEvent = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
        slider.bind(slider.mousewheelEvent, function(e) {
          e.preventDefault();
          e = e ? e : window.event;
          var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40,
              target = (wheelData < 0) ? slider.getTarget('next') : slider.getTarget('prev');
          
          if (slider.canAdvance(target)) {
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          }
        });
      }
      ///////////////////////////////////////////////////////////////////
      
      //////////////////////////////////////////////////////////////////
      //FlexSlider: Slideshow Setup
      if (slider.vars.slideshow) {
        //pauseOnHover
        if (slider.vars.pauseOnHover && slider.vars.slideshow) {
          slider.hover(function() {
            slider.pause();
          }, function() {
            if (!slider.manualPause) {
              slider.resume();
            }
          });
        }

        //Initialize animation
        slider.animatedSlides = setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      }
      //////////////////////////////////////////////////////////////////
      
      //////////////////////////////////////////////////////////////////
      //FlexSlider: Pause/Play
      if (slider.vars.pausePlay) {
        var pausePlayScaffold = $('<div class="flex-pauseplay"><span></span></div>');
      
        if (slider.containerExists) {
          slider.controlsContainer.append(pausePlayScaffold);
          slider.pausePlay = $('.flex-pauseplay span', slider.controlsContainer);
        } else {
          slider.append(pausePlayScaffold);
          slider.pausePlay = $('.flex-pauseplay span', slider);
        }
        
        var pausePlayState = (slider.vars.slideshow) ? 'pause' : 'play';
        slider.pausePlay.addClass(pausePlayState).text((pausePlayState == 'pause') ? slider.vars.pauseText : slider.vars.playText);
        
        slider.pausePlay.bind(slider.eventType, function(event) {
          event.preventDefault();
          if ($(this).hasClass('pause')) {
            slider.pause();
            slider.manualPause = true;
          } else {
            slider.resume();
            slider.manualPause = false;
          }
        });
      }
      //////////////////////////////////////////////////////////////////
      
      //////////////////////////////////////////////////////////////////
      //FlexSlider:Touch Swip Gestures
      //Some brilliant concepts adapted from the following sources
      //Source: TouchSwipe - http://www.netcu.de/jquery-touchwipe-iphone-ipad-library
      //Source: SwipeJS - http://swipejs.com
      if ('ontouchstart' in document.documentElement) {
        //For brevity, variables are named for x-axis scrolling
        //The variables are then swapped if vertical sliding is applied
        //This reduces redundant code...I think :)
        //If debugging, recognize variables are named for horizontal scrolling
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          scrolling = false;
              
        slider.each(function() {
          if ('ontouchstart' in document.documentElement) {
            this.addEventListener('touchstart', onTouchStart, false);
          }
        });
        
        function onTouchStart(e) {
          if (slider.animating) {
            e.preventDefault();
          } else if (e.touches.length == 1) {
            slider.pause();
            cwidth = (slider.vertical) ? slider.height() : slider.width();
            startT = Number(new Date());
            offset = (slider.vertical) ? (slider.currentSlide + slider.cloneOffset) * slider.height() : (slider.currentSlide + slider.cloneOffset) * slider.width();
            startX = (slider.vertical) ? e.touches[0].pageY : e.touches[0].pageX;
            startY = (slider.vertical) ? e.touches[0].pageX : e.touches[0].pageY;
            slider.setTransition(0);

            this.addEventListener('touchmove', onTouchMove, false);
            this.addEventListener('touchend', onTouchEnd, false);
          }
        }

        function onTouchMove(e) {
          dx = (slider.vertical) ? startX - e.touches[0].pageY : startX - e.touches[0].pageX;
          scrolling = (slider.vertical) ? (Math.abs(dx) < Math.abs(e.touches[0].pageX - startY)) : (Math.abs(dx) < Math.abs(e.touches[0].pageY - startY));

          if (!scrolling) {
            e.preventDefault();
            if (slider.vars.animation == "slide" && slider.transitions) {
              if (!slider.vars.animationLoop) {
                dx = dx/((slider.currentSlide == 0 && dx < 0 || slider.currentSlide == slider.count - 1 && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
              }
              slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + (-offset - dx) + "px,0)": "translate3d(" + (-offset - dx) + "px,0,0)";
              slider.container.css(slider.args);
            }
          }
        }
        
        function onTouchEnd(e) {
          slider.animating = false;
          if (slider.animatingTo == slider.currentSlide && !scrolling && !(dx == null)) {
            var target = (dx > 0) ? slider.getTarget('next') : slider.getTarget('prev');
            if (slider.canAdvance(target) && Number(new Date()) - startT < 550 && Math.abs(dx) > 20 || Math.abs(dx) > cwidth/2) {
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            } else {
              slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction);
            }
          }
          
          //Finish the touch by undoing the touch session
          this.removeEventListener('touchmove', onTouchMove, false);
          this.removeEventListener('touchend', onTouchEnd, false);
          startX = null;
          startY = null;
          dx = null;
          offset = null;
        }
      }
      //////////////////////////////////////////////////////////////////
      
      //////////////////////////////////////////////////////////////////
      //FlexSlider: Resize Functions (If necessary)
      if (slider.vars.animation.toLowerCase() == "slide") {
        $(window).resize(function(){
          if (!slider.animating) {
            if (slider.vertical) {
              slider.height(slider.slides.filter(':first').height());
              slider.args[slider.prop] = (-1 * (slider.currentSlide + slider.cloneOffset))* slider.slides.filter(':first').height() + "px";
              if (slider.transitions) {
                slider.setTransition(0);
                slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.args[slider.prop] + ",0)" : "translate3d(" + slider.args[slider.prop] + ",0,0)";
              }
              slider.container.css(slider.args);
            } else {
              slider.newSlides.width(slider.width());
              slider.args[slider.prop] = (-1 * (slider.currentSlide + slider.cloneOffset))* slider.width() + "px";
              if (slider.transitions) {
                slider.setTransition(0);
                slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.args[slider.prop] + ",0)" : "translate3d(" + slider.args[slider.prop] + ",0,0)";
              }
              slider.container.css(slider.args);
            }
          }

        });
      }
      //////////////////////////////////////////////////////////////////
      
      //////////////////////////////////////////////////////////////////
      //FlexSlider: Destroy the slider entity
      //Destory is not included in the minified version right now, but this is a working function for anyone who wants to include it.
      //Simply bind the actions you need from this function into a function in the start() callback to the event of your chosing
      
      slider.destroy = function() {
        slider.pause();
        if (slider.controlNav && slider.vars.manualControls == "") slider.controlNav.closest('.flex-control-nav').remove();
        if (slider.directionNav) slider.directionNav.closest('.flex-direction-nav').remove();
        if (slider.vars.pausePlay) slider.pausePlay.closest('.flex-pauseplay').remove();
        if (slider.vars.keyboardNav && $('ul.slides').length == 1) $(document).unbind('keyup', keyboardMove);
        if (slider.vars.mousewheel) slider.unbind(slider.mousewheelEvent);
        if (slider.transitions) slider.each(function(){this.removeEventListener('touchstart', onTouchStart, false);});
        if (slider.vars.animation == "slide" && slider.vars.animationLoop) slider.newSlides.filter('.clone').remove();
        if (slider.vertical) slider.height("auto");
        slider.slides.hide();
        slider.removeData('flexslider');
      }
      
      //////////////////////////////////////////////////////////////////
      
      //FlexSlider: start() Callback
      slider.vars.start(slider);
    }
    
    //FlexSlider: Animation Actions
    slider.flexAnimate = function(target, pause) {
      if (!slider.animating) {
        //Animating flag
        slider.animating = true;
        
        //FlexSlider: before() animation Callback
        slider.animatingTo = target;
        slider.vars.before(slider);
        
        //Optional paramter to pause slider when making an anmiation call
        if (pause) {
          slider.pause();
        }
        
        //Update controlNav   
        if (slider.vars.controlNav) {
          slider.controlNav.removeClass('active').eq(target).addClass('active');
        }
        
        //Is the slider at either end
        slider.atEnd = (target == 0 || target == slider.count - 1) ? true : false;
        if (!slider.vars.animationLoop && slider.vars.directionNav) {
          if (target == 0) {
            slider.directionNav.removeClass('disabled').filter('.prev').addClass('disabled');
          } else if (target == slider.count - 1) {
            slider.directionNav.removeClass('disabled').filter('.next').addClass('disabled');
          } else {
            slider.directionNav.removeClass('disabled');
          }
        }
        
        if (!slider.vars.animationLoop && target == slider.count - 1) {
          slider.pause();
          //FlexSlider: end() of cycle Callback
          slider.vars.end(slider);
        }
        
        if (slider.vars.animation.toLowerCase() == "slide") {
          var dimension = (slider.vertical) ? slider.slides.filter(':first').height() : slider.slides.filter(':first').width();
          
          if (slider.currentSlide == 0 && target == slider.count - 1 && slider.vars.animationLoop && slider.direction != "next") {
            slider.slideString = "0px";
          } else if (slider.currentSlide == slider.count - 1 && target == 0 && slider.vars.animationLoop && slider.direction != "prev") {
            slider.slideString = (-1 * (slider.count + 1)) * dimension + "px";
          } else {
            slider.slideString = (-1 * (target + slider.cloneOffset)) * dimension + "px";
          }
          slider.args[slider.prop] = slider.slideString;

          if (slider.transitions) {
              slider.setTransition(slider.vars.animationDuration); 
              slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.slideString + ",0)" : "translate3d(" + slider.slideString + ",0,0)";
              slider.container.css(slider.args).one("webkitTransitionEnd transitionend", function(){
                slider.wrapup(dimension);
              });   
          } else {
            slider.container.animate(slider.args, slider.vars.animationDuration, function(){
              slider.wrapup(dimension);
            });
          }
        } else { //Default to Fade
          slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationDuration);
          slider.slides.eq(target).fadeIn(slider.vars.animationDuration, function() {
            slider.wrapup();
          });
        }
      }
    }
    
    //FlexSlider: Function to minify redundant animation actions
    slider.wrapup = function(dimension) {
      if (slider.vars.animation == "slide") {
        //Jump the slider if necessary
        if (slider.currentSlide == 0 && slider.animatingTo == slider.count - 1 && slider.vars.animationLoop) {
          slider.args[slider.prop] = (-1 * slider.count) * dimension + "px";
          if (slider.transitions) {
            slider.setTransition(0);
            slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.args[slider.prop] + ",0)" : "translate3d(" + slider.args[slider.prop] + ",0,0)";
          }
          slider.container.css(slider.args);
        } else if (slider.currentSlide == slider.count - 1 && slider.animatingTo == 0 && slider.vars.animationLoop) {
          slider.args[slider.prop] = -1 * dimension + "px";
          if (slider.transitions) {
            slider.setTransition(0);
            slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.args[slider.prop] + ",0)" : "translate3d(" + slider.args[slider.prop] + ",0,0)";
          }
          slider.container.css(slider.args);
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      //FlexSlider: after() animation Callback
      slider.vars.after(slider);
    }
    
    //FlexSlider: Automatic Slideshow
    slider.animateSlides = function() {
      if (!slider.animating) {
        slider.flexAnimate(slider.getTarget("next"));
      }
    }
    
    //FlexSlider: Automatic Slideshow Pause
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      if (slider.vars.pausePlay) {
        slider.pausePlay.removeClass('pause').addClass('play').text(slider.vars.playText);
      }
    }
    
    //FlexSlider: Automatic Slideshow Start/Resume
    slider.resume = function() {
      slider.animatedSlides = setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      if (slider.vars.pausePlay) {
        slider.pausePlay.removeClass('play').addClass('pause').text(slider.vars.pauseText);
      }
    }
    
    //FlexSlider: Helper function for non-looping sliders
    slider.canAdvance = function(target) {
      if (!slider.vars.animationLoop && slider.atEnd) {
        if (slider.currentSlide == 0 && target == slider.count - 1 && slider.direction != "next") {
          return false;
        } else if (slider.currentSlide == slider.count - 1 && target == 0 && slider.direction == "next") {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }  
    }
    
    //FlexSlider: Helper function to determine animation target
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir == "next") {
        return (slider.currentSlide == slider.count - 1) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide == 0) ? slider.count - 1 : slider.currentSlide - 1;
      }
    }
    
    //FlexSlider: Helper function to set CSS3 transitions
    slider.setTransition = function(dur) {
      slider.container.css({'-webkit-transition-duration': (dur/1000) + "s"});
    }

    //FlexSlider: Initialize
    slider.init();
  }
  
  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    slideDirection: "horizontal",   //String: Select the sliding direction, "horizontal" or "vertical"
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationDuration: 600,         //Integer: Set the speed of animations, in milliseconds
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
    keyboardNav: true,              //Boolean: Allow slider navigating via keyboard left/right keys
    mousewheel: false,              //Boolean: Allow slider navigating via mousewheel
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
    playText: 'Play',               //String: Set the text for the "play" pausePlay item
    randomize: false,               //Boolean: Randomize slide order
    slideToStart: 0,                //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    controlsContainer: "",          //Selector: Declare which container the navigation elements should be appended too. Default container is the flexSlider element. Example use would be ".flexslider-container", "#container", etc. If the given element is not found, the default action will be taken.
    manualControls: "",             //Selector: Declare custom control navigation. Example would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){}               //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
  }
  
  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    return this.each(function() {
      if ($(this).find('.slides li').length == 1) {
        $(this).find('.slides li').fadeIn(400);
      }
      else  {
        new $.flexslider($(this), options);
      }
    });
  }  

})(jQuery);

(function(a){a.xLazyLoader=function(d,c){if(typeof d=="object"){c=d;d="load"}b[d](c)};var b=new function(){var c=document.getElementsByTagName("head")[0];this.load=function(g){var k={js:[],css:[],image:[],name:null,load:function(){}};a.extend(k,g);var e=this,h=false,f={js:[],css:[],image:[]};j("js",k.js);j("css",k.css);j("image",k.image);function j(d,l){if(a.isArray(l)&&l.length>0){a.each(l,function(n,m){i(d,m)})}else{if(typeof l=="string"){i(d,l)}}}function i(l,d){e[l](d,function(){a.isArray(k[l])?f[l].push(d):f[l]=d;k.js.length==f.js.length&&k.css.length==f.css.length&&k.image.length==f.image.length&&k.load.apply(f,[]);return},k.name?"lazy-loaded-"+k.name:"lazy-loaded-"+new Date().getTime())}};this.js=function(f,g,e){if(a('script[src*="'+f+'"]').length>0){g();return}var d=document.createElement("script");d.setAttribute("type","text/javascript");d.setAttribute("src",f);d.setAttribute("id",e);if(a.browser.msie){d.onreadystatechange=function(){/loaded|complete/.test(d.readyState)&&g()}}else{d.onload=g}c.appendChild(d)};this.css=function(d,g,e){if(a('link[href*="'+d+'"]').length>0){g();return}var f=a('<link rel="stylesheet" type="text/css" media="all" href="'+d+'" id="'+e+'"></link>')[0];if(a.browser.msie){f.onreadystatechange=function(){if(f.readyState=="loaded"||f.readyState=="complete"){f.onreadystatechange=null;g()}}}else{if(a.browser.opera){f.onload=g}else{(function(){try{f.sheet.cssRule}catch(h){setTimeout(arguments.callee,20);return}g()})()}}c.appendChild(f)};this.image=function(e,f){var d=new Image();d.onload=f;d.src=e};this.disable=function(d){a("#lazy-loaded-"+d,c).attr("disabled","disabled")};this.enable=function(d){a("#lazy-loaded-"+d,c).removeAttr("disabled")};this.destroy=function(d){a("#lazy-loaded-"+d,c).remove()}}})(jQuery);