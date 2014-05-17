Alarma.Router.map(function () {
	this.resource('tweets', {path: '/'}, function(){
		this.route('earthquakes');
		this.route('fires');
		this.route('tweetout');
	});
});




// Alarma.ApplicationRoute = Ember.Route.extend({});
// Alarma.TweetsController = Ember.ArrayController.extend({}); 
// Alarma.TweetsFiresController = Ember.ArrayController.extend({});
// Alarma.TweetsEarthquakesController = Ember.ArrayController.extend({});




