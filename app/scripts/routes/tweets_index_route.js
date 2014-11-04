Tweetsaster.TweetsIndexRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin, {
  beforeModel: function() {
    this.controllerFor('tweets').send('hideSearchBar');
  },
  model: function() {
    var latLng = this.controllerFor('tweets.index').get('filterPosition'),
        radius = this.controllerFor('tweets.index').get('radiusKm'),
        getTweets = function(latLng, radius) {
          return this.store.find('tweet', {
            coordinates: [latLng.lng(), latLng.lat()],
            radius: radius
          });
        }.bind(this);
    if (latLng)
      return getTweets(latLng, radius)
    else if (navigator.geolocation)
      return new Ember.RSVP.Promise(function(resolve) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var latLng = new google.maps.LatLng(position.coords.latitude, 
                                              position.coords.longitude);
          this.controllerFor('tweets.index').set('filterPosition', latLng);
          resolve(getTweets(latLng, radius));
        }.bind(this));
      }.bind(this));
  },
  setupController: function(controller, model) {
    this._super(controller, model);
  }
});

