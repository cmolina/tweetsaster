Tweetsaster.TweetsGeolocatedRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin, {
  model: function(params) {
    this.controllerFor('tweets').set('lat', params.lat);
    this.controllerFor('tweets').set('lng', params.lng);
    this.controllerFor('tweets').set('within', params.within);
    return this.store.find('tweet', params);
  },
  renderTemplate: function(controller) {
    this.render('tweets/index', {controller: controller});
  }
});