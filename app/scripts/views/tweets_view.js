Tweetsaster.TweetsView = Ember.View.extend({	
	fastClick: function(){
		console.log('fast');
		FastClick.attach(document.body);
	},
	
	enableActivePseudoStyles: function(){
		document.addEventListener("touchstart", function() {},false);
	},
	
	didInsertElement: function(){
		this.fastClick();
		this.enableActivePseudoStyles();
	}
})