Tweetsaster.ReportsGeolocatedRoute = Ember.Route.extend(Tweetsaster.LoadMore, {
  previous: function() {
    var params = this.get('controller.query.previous'),
        lng = this.controller.get('lng'), 
        lat = this.controller.get('lat'),
        within = this.controller.get('within'),
        isValid = params.lng==lng && params.lat==lat && params.within==within;
    if (!(params && isValid)) {
      params = {
        lng: lng,
        lat: lat,
        within: within
      };
    }
    return {model: 'report', params: params};
  }.property('controller.query.previous'),
  next: function() {
    var params = this.get('controller.query.next') || {},
        lng = this.controller.get('lng'), 
        lat = this.controller.get('lat'),
        within = this.controller.get('within'),
        isValid = params.lng==lng && params.lat==lat && params.within==within;
    if (!(params && isValid)) {
      params = {
        lng: lng,
        lat: lat,
        within: within
      };
    }
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