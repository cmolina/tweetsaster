Tweetsaster.TweetsView = Ember.View.extend({	
	fastClick: function(){
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
