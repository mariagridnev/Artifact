$('#screening_room,nav').fadeIn(500);

artifact.screening = {
	
	defaults: {
		$container:$('#screening .content'),
		errorDiv:'<p class="error">{error}</p>'
	},
	
	init:function() {	
		var self = this;
		
		self.albumID = artifact.url.getParam('id');	
		
		self._setupClickBindings();
		
		self._setupPage();
	},
	
	_setupPage:function() {
		var self = this;
		
		if (self.albumID == undefined) {
			self.defaults.$container.html(artifact.substitute(self.defaults.errorDiv,{'error':'Sorry, there was an error with your URL'}));
		}
		else {	
			self._vimeoAPICall();
		}
	}, 

	_writePage:function(data) {	
		var self = this;
		
		var linkTemplate = '<li><a class="video" href="http://vimeo.com/{videoId}" data-videotitle="{videoTitle}" data-videodesc="{videoDescription}" data-videoid="{videoId}"><img src="{imgSource}" alt="" border="0" /></a></li>';
		
		var screeningSource = '<h2>Screening Room <span class="albumName"></span></h2><ul class="clearfix">{list}</ul>';
		
		var listSource = '';
				
		$(data).each(function(){
			listSource += artifact.substitute(linkTemplate,{ 
				imgSource:this.thumbnails.thumbnail[1]._content,
				videoId:this.id,
				videoTitle:this.title.replace(/\x22/g, '&quot;'),
				videoDescription:this.description.replace(/\x22/g, '&quot;')
			});	
		});
		
		self.defaults.$container.hide();
		self.defaults.$container.html(artifact.substitute(screeningSource,{'list':listSource}));
		self.defaults.$container.fadeIn(500);
		self._getAlbumName();
		
	},
	
	_writePromos:function(data) {	
		var self = this;
		
		var linkTemplate = '<li id="video{videoId}" class="single"><iframe src="http://player.vimeo.com/video/{videoId}?color=ffffff" width="640" height="360" frameborder="0"></iframe></li>';
		
		var screeningSource = '<h2 style="margin-left:20px;">Screening Room</h2><ul class="clearfix">{list}</ul>';
		
		var listSource = '';
		
		$(data).each(function(){
			listSource += artifact.substitute(linkTemplate,{ 
				videoId:this.id
			});	
		});
				
		self.defaults.$container.hide();
		self.defaults.$container.html(artifact.substitute(screeningSource,{'list':listSource}));
		self.defaults.$container.fadeIn(500);
		self._getAlbumName();
		
		var scrollId = artifact.url.getParam('dl');
		if(typeof(scrollId) != 'undefined') {		
			$.scrollTo('#video' + scrollId);
		}
		
	},
	
	_setupClickBindings:function() {
		
		$('#screening').on('click','li',function(){
			var $theVideo = $(this).find('.video');
			
			var _cbHTML = '<iframe src="http://player.vimeo.com/video/' + $($theVideo).data('videoid')  + '?color=ffffff" width="640" height="360" frameborder="0"></iframe><h4>' + $($theVideo).data('videotitle')  + '</h4><p>' + $($theVideo).data('videodesc')  + '</p>';
			
			var _cbWidth = '670px';
			
			if(artifact.displayWidth.whatSize() == 'mini' || artifact.displayWidth.whatSize() == 'small') {
				_cbWidth = '98%';
			}
			
			$.colorbox({close:'<img src="images/overlay_close.png" alt="Close" border="0" />', width:_cbWidth, transition: 'none', scrolling: false, html: _cbHTML});
			return false;
		});
		
	},
	
	_getAlbumName:function() {
		var self = this;
		
		//$.getJSON("http://vimeo.com/api/v2/album/" + self.albumID + "/info.json?callback=?",function(data) {
		//	self.defaults.$container.find('.albumName').html(data.title);
		//});
	}, 
	
	_vimeoAPICall:function() {
		var self = this;
		
		$.getJSON("vimeo/index.php?album_id=" + self.albumID,function(data) {
			
			self.pageType = artifact.url.getParam('type');
			
			if(typeof(data.videos) == 'undefined') {
				self.defaults.$container.html(artifact.substitute(self.defaults.errorDiv,{'error':'Sorry, there was an error with your URL'}));
			}
			else {
				if(self.pageType == 'iframe') {
					self._writePromos(data.videos.video);
				}
				else {
					self._writePage(data.videos.video);
				}
			}
			
		});
	}	
}
artifact.screening.init();