Alarma.TweetsIndexController = Ember.ArrayController.extend({
	gettingMore: false,
	page: 1,
	tweetsPerPage: 10, 
	actions: {
		getMore: function(){
			if(this.get('gettingMore')){
				return;
			}
			console.log("getting more");
			this.set('gettingMore', true);
			//TODO good practice to get with this. ??
			var lowIndex = this.page * this.tweetsPerPage;
			var highIndex = lowIndex + this.tweetsPerPage;
			var thisController = this;
			setTimeout(function(){
				thisController.pushObjects(Alarma.tweets.slice(lowIndex, highIndex));
				thisController.set('page', thisController.page+1);
				thisController.set('gettingMore', false);
			}, 1500);
		}
	}
});