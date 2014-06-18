Tweetsaster.TweetsIndexController = Ember.ArrayController.extend({
	sortProperties: ['id'],
	sortAscending: false,
	gettingMore: false,
	page: 1,
	tweetsPerPage: 20, 
	lastID: false,
	actions: {
		getMore: function(){
			if(this.get('gettingMore')){
				return;
			}
			console.log("getting more");
			this.set('gettingMore', true);
			var controller = this;
			var model = this.get('model');
			var store = this.store;
			var lastID = model.get('lastObject').get('id');
			console.log(lastID);
			$.get('http://alarmer.herokuapp.com/tweets?quantity=' + controller.get('tweetsPerPage')+'&position=bottom&id='+lastID).then(function(tweets){
				tweets.forEach(function(tweet){
					mongoID = tweet.id;
					if(mongoID < lastID){
						controller.set('lastID', mongoID);
					}
					store.push('tweet',{id: tweet.id, text: Tweetsaster.truncStr(tweet.text), created_at: tweet.created_at, channel: tweet.channel});
				});
				page = controller.get('page');
				controller.set('page', page+1);
				console.log("page " + controller.page);
				controller.set('gettingMore', false);
			});
		}
	}
});