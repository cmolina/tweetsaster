Tweetsaster.ReportsGeolocatedRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin, {
  model: function(params) {
    var reportsController = this.controllerFor('reports'),
        reportsGeolocatedController = this.controllerFor('reportsGeolocated');
    reportsController.set('lat', params.lat);
    reportsController.set('lng', params.lng);
    reportsController.set('within', params.within);
    var radius = reportsGeolocatedController.get('filterRadius'),
        center = reportsGeolocatedController.get('filterCoords'),
        distance = google.maps.geometry.spherical.computeDistanceBetween;
    return this.store.all('report').filter(function(report) {
      return distance(report.get('center'), center) <= radius;
    });
  },
  renderTemplate: function(controller) {
    this.render('reports/index', {controller: controller});
  }
});