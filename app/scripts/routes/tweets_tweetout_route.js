Alarma.TweetsTweetoutRoute = Ember.Route.extend({
	setupController: function(controller, model){
		this.controllerFor('tweets').set('title', 'Componer Mensaje')
	}
});