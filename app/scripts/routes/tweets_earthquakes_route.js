Alarma.TweetsEarthquakesRoute = Ember.Route.extend(Alarma.ScrollTopMixin,{
  model: function() {
    return this.modelFor('tweets').filterProperty('channel','earthquake');
  },
  renderTemplate: function(controller){
	  this.render('tweets/index', {controller: controller});
  },
  controllerName: 'tweetsIndex',
  setupController: function(controller, model) {
	  this.controllerFor('tweets').set('title', 'Canal: Terremotos');
	  controller.set('model', model);
	  controller.set('page', 1);
  },
  
});