Alarma.TweetsFiresRoute = Ember.Route.extend({
	model: function() {
	return this.modelFor('tweets').filterProperty('channel','fire');
	},
	renderTemplate: function(controller){
	  this.render('tweets/index', {controller: controller});
	},
	setupController: function(controller, model) {
	  this.controllerFor('tweets').set('title', 'Incendios');
	  controller.set('model', model);
	}
});