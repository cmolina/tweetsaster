Tweetsaster.TweetsTweetoutRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controllerFor('tweets').send('hideSearchBar');
    this.controllerFor('tweets').set('title', 'Componer Mensaje');
    this._super(controller, model);
  }
});