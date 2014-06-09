Alarma.TweetsIndexRoute = Ember.Route.extend(Alarma.ScrollTopMixin,{
	model: function(){
		return this.modelFor('tweets');
		//return $.get('http://alarmer.herokuapp.com/tweets.json');
	},
	setupController: function(controller, model){
		this.controllerFor('tweets').set('title', 'Canal: Todas');
		controller.set('model', model);
		controller.set('page', 1);
	}
	
});

