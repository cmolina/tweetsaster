Tweetsaster.TweetsRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin, {
  setupController: function(controller, model) {
    this.controllerFor('tweets').set('title', 'Terremotos');
    this._super(controller, model);
  }
});