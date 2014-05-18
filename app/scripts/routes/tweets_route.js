Alarma.TweetsRoute = Ember.Route.extend({
  model: function() {
	  return this.store.find('tweet');
  },
  setupController: function(controller, model) {
	  this.controllerFor('tweets').set('title', 'Terremotos');
  }
});