Tweetsaster.ReportPicturesRoute = Ember.Route.extend({
  setupController: function(controller, model) {
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
          controller.set('coordinates', geoJSON);
        },
        function(e) {
          console.warn('ERROR(' + e.code + '): ' + e.message);
          console.warn(e);
          controller.set('coordinates', failed);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 60000
        }
      );
    else
      controller.set('coordinates', failed);
    controller = this.controllerFor('reportPictures');
    this._super(controller, model);
  },
  deactivate: function() {
    this.controllerFor('reportPictures').send('clearPictures');
  },
  renderTemplates: function(controller) {
    controller = this.controllerFor('reportPictures');
    this.render('report/pictures', {controller: controller});
    this.render('report/pictures_modal', {
      outlet: 'modal',
      controller: controller
    });
    this.render('report/pictures_header', {
      outlet: 'header',
      controller: controller
    });
  }
});