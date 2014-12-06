Tweetsaster.ReportsGeolocatedRoute = Ember.Route.extend(Tweetsaster.LoadMore, {
  previous: function() {
    var params = this.get('controller.query.previous');
    if (!params) {
      params = {
        lat: this.controller.get('lat'),
        lng: this.controller.get('lng'),
        within: this.controller.get('within')
      };
    }
    return {model: 'report', params: params};
  }.property('controller.query.previous'),
  next: function() {
    var params = this.get('controller.query.next') || {};
    params.lat = this.controller.get('lat');
    params.lng = this.controller.get('lng');
    params.within = this.controller.get('within');
    return {model: 'report', params: params};
  }.property('controller.query.next'),
  model: function(params) {
    var reportsController = this.controllerFor('reports');
    reportsController.set('lat', params.lat);
    reportsController.set('lng', params.lng);
    reportsController.set('within', params.within);
    return this.store.all('report');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
  },
  renderTemplate: function(controller) {
    this.render('reports/index', {controller: controller});
    this.render('reports/_footer', {
      outlet: 'footer',
      controller: controller
    });
  }
});