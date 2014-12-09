Tweetsaster.ReportCommentRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('report', params.report_id);
  },
  setupController: function(controller, model) {
    var comment = this.store.createRecord('comment', {
      comment: this.get('comment') || '',
      inReplyToStatus: model,
      channel: model.get('channel')
    });
    var makeGeoJSON = function(lng, lat) {
      return {
        type: 'Point', 
        coordinates: [lng, lat]
      };
    };
    var failed = makeGeoJSON(-70.6092, -33.5001);
    if ('geolocation' in navigator)
      navigator.geolocation.getCurrentPosition(
        function(position) {
          var geoJSON = makeGeoJSON(position.coords.longitude, 
                                    position.coords.latitude);
          comment.set('coordinates', geoJSON);
        },
        function(e) {
          console.warn('ERROR(' + e.code + '): ' + e.message);
          console.warn(e);
          comment.set('coordinates', failed);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 60000
        }
      );
    else
      comment.set('coordinates', failed);
    controller.set('model', comment);
    this._super(controller, comment);
  },
  deactivate: function() {
    // if the model was not sent to the server, delete it
    var comment = this.controllerFor('reportComment').get('model');
    if (comment.get('isNew')) {
      this.set('comment', comment.get('comment'));
      comment.deleteRecord();
    }
    else {
      this.set('comment', '');
    }
  }
});