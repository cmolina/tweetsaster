Tweetsaster.TweetCommentRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(function(position) {
        var geoJSON = {
          type: 'Point', 
          coordinates: [position.coords.longitude, position.coords.latitude]
        };
        controller.set('coordinates', geoJSON);
      });
    this._super(controller, model);
  }
});