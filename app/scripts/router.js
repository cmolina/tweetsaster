Tweetsaster.Router.map(function () {
	this.resource('tweets', {path: '/'}, function(){
		this.route('earthquakes');
		this.route('fires');
		this.route('tweetout');
	});
});

// Tweetsaster.ApplicationRoute = Ember.Route.extend({});
// Tweetsaster.TweetsController = Ember.ArrayController.extend({}); 
// Tweetsaster.TweetsFiresController = Ember.ArrayController.extend({});
// Tweetsaster.TweetsEarthquakesController = Ember.ArrayController.extend({});




