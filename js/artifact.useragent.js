artifact.useragent = {
	
	ua:{
		type:'desktop', device:'pc'
	},
	
	init:function(){
		var self = this
		
		if ((navigator.userAgent.indexOf('AppleWebKit') != -1) && ((navigator.userAgent.indexOf('Mobile') != -1) || (navigator.userAgent.indexOf('webOS') != -1)) ) {
			this.ua.type = 'mobile';
		}
	
		if ((navigator.userAgent.indexOf('iPad') != -1)) {
			this.ua.type = 'tablet';
			this.ua.device = 'ipad';
		}
		if ((navigator.userAgent.indexOf('iPhone') != -1)) {
			this.ua.type = 'mobile';
			this.ua.device = 'iphone';
		}	
		if ((navigator.userAgent.indexOf('iPod') != -1)) {
			this.ua.type = 'mobile';
			this.ua.device = 'iphone';
		}
		if ((navigator.userAgent.indexOf('Android') != -1)) {
			this.ua.type = 'mobile';
			this.ua.device = 'android';
		}
		
		
		document.documentElement.className += ' ua_type_' + this.ua.type + ' ua_device_' + this.ua.device;
		document.documentElement.className = document.documentElement.className.replace(/no-js/i,'js');
	},
	
	getDevice:function(){
		var self = this;
		return this.ua.device;	
	}, 
	
	getType:function(){
		var self = this;
		return this.ua.type;	
	}
	
}
artifact.useragent.init();