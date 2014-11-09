Tweetsaster.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('tweets', 'earthquake');
  }
}); 