Tweetsaster.ReportsGeolocatedRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin, {
  model: function(params) {
    var reportsController = this.controllerFor('reports');
    reportsController.set('lat', params.lat);
    reportsController.set('lng', params.lng);
    reportsController.set('within', params.within);
    reportsController.set('showFilter', true);
    return this.store.find('report', params);
  },
  renderTemplate: function(controller) {
    this.render('reports/index', {controller: controller});
  }
});