Tweetsaster.ReportPicturesRoute = Ember.Route.extend({
  model: function(params) {
    var report = this.modelFor('report');
    return this.store.createRecord('comment', {
      comment: 'Nuevas fotos',
      inReplyToStatus: report,
      channel: report.get('channel')
    });
  },
  setupController: function(controller, model) {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(function(position) {
        var geoJSON = {
          type: 'Point', 
          coordinates: [position.coords.longitude, position.coords.latitude]
        };
        model.set('coordinates', geoJSON);
      });
    this._super(controller, model);
  },
  deactivate: function() {
    // if the model was not sent to the server, delete it
    var comment = this.modelFor('reportPictures');
    if (comment.get('isNew')) {
      comment.deleteRecord();
    }
  }
});