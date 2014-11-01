Tweetsaster.TweetsIndexRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin, {
  beforeModel: function() {
    this.controllerFor('tweets').send('hideSearchBar');
  },
  model: function() {
    return this.store.find('tweet');
  },
  setupController: function(controller, model) {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(function(position) {
        var latLng = new google.maps.LatLng(position.coords.latitude, 
                                             position.coords.longitude);
        controller.set('filterPosition', latLng);
      });
    this._super(controller, model);
  }
});

