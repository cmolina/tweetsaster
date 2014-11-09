Tweetsaster.TweetsIndexRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin, {
  model: function(params) {
    this.controllerFor('tweets').set('channel', params.channel);
    return this.store.find('tweet', params);
  }
});
