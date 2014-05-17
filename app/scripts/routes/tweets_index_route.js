Alarma.TweetsIndexRoute = Ember.Route.extend({
	model: function(){
		return this.modelFor('tweets');
	},
	setupController: function(controller, model){
		this.controllerFor('tweets').set('title', 'Todas');
		controller.set('model', model);
	}
});
