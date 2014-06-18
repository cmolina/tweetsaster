Tweetsaster.TweetsRoute = Ember.Route.extend({
  setupController: function(controller, model) {
	  this.controllerFor('tweets').set('title', 'Terremotos');
  }
});