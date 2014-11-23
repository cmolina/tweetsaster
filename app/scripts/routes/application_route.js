Tweetsaster.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('report');
  }
});