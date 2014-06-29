Tweetsaster.TweetsEarthquakesRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin,{
 	beforeModel: function(){
		this.controllerFor('tweets').send('hideSearchBar');
		var store = this.store;
		$.get('http://alarmer.herokuapp.com/tweets?quantity=20&position=top&channel=earthquakes').then(function(res){
			store.pushMany('tweet',res);
		});
 	},
  model: function() {
		return this.store.filter('tweet', function(tweet){
			return tweet.get('channel') === 'earthquakes';
		})
	},
  renderTemplate: function(controller){
	  this.render('tweets/index', {controller: controller});
  },
  controllerName: 'tweetsIndex',
  setupController: function(controller, model) {
	  this.controllerFor('tweets').set('title', 'Canal: Terremotos');
	  this._super(controller, model);
  },
  
});