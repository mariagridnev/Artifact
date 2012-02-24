artifact = {

	substitute: function (s, o) {

		return s.replace(/\{([^{}]*)\}/g,
						 function (a, b) {
							 // If the object has a member that matches the template marker,
							 // and the member is a string or a number, then insert it in the template.
							 // If the object does't have a member, leave the template marker alone.
							 var r = o[b];
							 return typeof r === 'string' || typeof r === 'number' ? r : a;
						 });
	}
	
};

artifact.displayWidth = {
	
	init:function() {
		this.setBodyClasses();
		$(window).resize(function(){ //if the user resizes the window...
			setTimeout(artifact.displayWidth.setBodyClasses,100); // set the body display class instead of using media queries, as we want to rely on the same exact number
		});
	}, 
	
	setBodyClasses:function() {
		var self = this;
		
		self.width = $(window).width();

		if(self.width >= 990) {  $('html').removeClass('thin'); $('html').removeClass('small'); $('html').removeClass('mini'); }
		if(self.width < 990) { $('html').removeClass('mini'); $('html').removeClass('small'); $('html').addClass('thin'); }
		if(self.width < 680) {  $('html').removeClass('thin'); $('html').removeClass('mini'); $('html').addClass('small'); } 
		if(self.width < 480) {  $('html').removeClass('thin'); $('html').removeClass('small'); $('html').addClass('mini'); }
		
	},
	
	whatSize:function() {
		var self = this; 
		var size = 'full';
		
		self.width = $(window).width();

		if(self.width >= 990) { size = 'full'; } 
		if(self.width < 990) { size = 'thin'; }
		if(self.width < 680) { size = 'small'; }
		if(self.width < 480) { size = 'mini'; }
		
		return size;
	}
	
}
artifact.displayWidth.init();
   

artifact.url={getParam:function(c,a){if(a===undefined){a=document.location.href}var b=this._getParts(a).params;return b[c]},addParam:function(g,b,a){if(a===undefined){a=document.location.href}var e,f,d,c;c="";d=this._getParts(a);if(b===undefined){b=""}d.params[g]=b;a=d.url+"?";f=d.params;for(e in f){if(f.hasOwnProperty(e)){a+=c+encodeURIComponent(e)+"="+encodeURIComponent(f[e]);c="&"}}if(d.hash){a+="#"+encodeURIComponent(d.hash)}return a},deleteParam:function(c,a){if(a===undefined){a=document.location.href}var b=new RegExp("[?&]"+encodeURIComponent(c)+"=[^&#]*","g");a=a.replace(b,"");return a},getHash:function(a){if(a===undefined){a=document.location.href}var b=this._getParts(a).hash;return b},setHash:function(b,a){if(a===undefined){a=document.location.href}a=a.replace(/#.*/,"");b=b.replace(/^#/,"");if(b){a=a+"#"+encodeURIComponent(b)}return a},clear:function(a){if(a===undefined){a=document.location.href}return this._getParts(a).url},_getParts:function(c){var b={url:"",query:"",hash:"",params:{}};var d=new RegExp("([^#?]*)\\??([^#]*)?#?(.*)?");var a=d.exec(c);if(a!==null){b.url=a[1]===undefined?"":a[1];b.query=a[2]===undefined?"":a[2];b.hash=a[3]===undefined?"":decodeURIComponent(a[3]);b.params=this._splitParams(b.query)}return b},_splitParams:function(g){var e,f,b,d,a,c;e={};if(g){f=g.split("&");for(b=0;b<f.length;b++){d=f[b].split("=");a=decodeURIComponent(d[0]);c=decodeURIComponent(d[1]);e[a]=c}}return e}};