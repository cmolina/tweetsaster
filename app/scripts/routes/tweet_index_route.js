Alarma.TweetsIndexRoute = Ember.Route.extend({
	model: function(){
		return this.modelFor('tweets').slice(0,10);
	},
	setupController: function(controller, model){
		this.controllerFor('tweets').set('title', 'Todas');
		this.controller.set('model', model);
	}
});
