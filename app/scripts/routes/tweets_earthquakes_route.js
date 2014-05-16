Alarma.TweetsEarthquakesRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('tweets').filterProperty('channel','earthquake');
  },
  renderTemplate: function(controller){
	  this.render('tweets/index', {controller: controller});
  },
  setupController: function(controller, model) {
	  this.controllerFor('tweets').set('title', 'Terremotos');
	  controller.set('model', model);
  }
});