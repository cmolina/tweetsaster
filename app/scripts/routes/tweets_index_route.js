Alarma.TweetsIndexRoute = Ember.Route.extend(Alarma.ScrollTopMixin,{
	model: function(){
		return this.modelFor('tweets');
	},
	setupController: function(controller, model){
		this.controllerFor('tweets').set('title', 'Todas');
		controller.set('model', model);
		controller.set('page', 1);
	}
	
});

