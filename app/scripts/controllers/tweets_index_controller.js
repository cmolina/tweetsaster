Alarma.TweetsFiresController = Ember.ArrayController.extend({
	sortProperties: ['created_at'],
	sortAscending: false,
	gettingMore: false,
	page: 1,
	tweetsPerPage: 10, 
	arrangedTweets: function(){
		 return this.get('arrangedContent').slice(0,this.page*this.tweetsPerPage);
	}.property('arrangedContent.[]', 'page'),
	actions: {
		getMore: function(){
			if(this.get('gettingMore')){
				return;
			}
			console.log("getting more");
			this.set('gettingMore', true);
			//TODO good practice to get with this. ??
			thisController = this;
			setTimeout(function(){
				thisController.set('page', thisController.page+1);
				console.log("page " + thisController.page);
				thisController.set('gettingMore', false);
			}, 1500);
		}
	}
});