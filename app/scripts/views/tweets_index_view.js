Tweetsaster.TweetsIndexView = Ember.View.extend({
	didScroll: function(){
		if(this.isScrolledToBottom()){
			this.get('controller').send('getMoreBottom');
		}
	},
	isScrolledToBottom: function(){
		var topViewportPosition = window.pageYOffset;
		var viewportMaxGap = ($(document).height() - $(window).height());
		console.log(topViewportPosition);
		console.log(viewportMaxGap);
		if (topViewportPosition === 0){
			return false;
		}
		return topViewportPosition > (viewportMaxGap-100);
	},
	
	didInsertElement: function(){
		console.log('insert');
		$(window).on('scroll', $.proxy(this.didScroll, this));
		view = this;
		$('#hook').hook({
  		reloadPage: false,
  		reloadEl: function(){
				view.get('controller').send('getMoreTop');
  		},
			swipeDistance: 250
		});
	},
	
	willDestroyElement: function(){
		console.log('destroy');
		$(window).off('scroll', $.proxy(this.didScroll, this));
	}
});