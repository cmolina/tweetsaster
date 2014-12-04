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
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(function(position) {
        var geoJSON = {
          type: 'Point', 
          coordinates: [position.coords.longitude, position.coords.latitude]
        };
        comment.set('coordinates', geoJSON);
      });
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