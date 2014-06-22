Tweetsaster.TweetsIndexController = Ember.ArrayController.extend({
	sortProperties: ['id'],
	sortAscending: false,
	gettingMore: false,
	page: 1,
	tweetsPerPage: 20, 
	lastID: false,
	firstID: false,
	actions: {
		getMoreBottom: function(){
			if(this.get('gettingMore')){
				return;
			}
			console.log("getting more bottom");
			this.set('gettingMore', true);
			var controller = this;
			var model = this.get('model');
			var store = this.store;
			var lastID = this.get('arrangedContent').get('lastObject').get('id');
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
		},
		getMoreTop: function(){
			if(this.get('gettingMore')){
				return;
			}
			console.log("getting more top");
			this.set('gettingMore', true);
			var controller = this;
			var model = this.get('model');
			var store = this.store;
			var firstID = this.get('arrangedContent').get('firstObject').get('id');
			$.get('http://alarmer.herokuapp.com/tweets?quantity=' + controller.get('tweetsPerPage')+'&position=top&id='+firstID).then(function(tweets){
				tweets.forEach(function(tweet){
					mongoID = tweet.id;
					if(mongoID > firstID){
						controller.set('firstID', mongoID);
					}
					store.push('tweet',{id: tweet.id, text: Tweetsaster.truncStr(tweet.text), created_at: tweet.created_at, channel: tweet.channel});
				});
				controller.set('gettingMore', false);
			});
		}
	}
});