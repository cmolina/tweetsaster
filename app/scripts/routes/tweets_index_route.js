Tweetsaster.TweetsIndexRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin, {
  beforeModel: function() {
    this.controllerFor('tweets').send('hideSearchBar');
  },
  model: function() {
    return this.store.find('tweet');
  },
  setupController: function(controller, model) {
    this.controllerFor('tweets').set('title', 'Canal: Todas');
    this._super(controller, model);
  }
});

