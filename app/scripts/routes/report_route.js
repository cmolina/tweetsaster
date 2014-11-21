Tweetsaster.ReportRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('report', params.report_id);
  },
  afterModel: function(report) {
    var key = 'favourites.'+report.id,
        isFavourite = !!localStorage.getItem(key);
    this.controllerFor('reportIndex').set('isFavourite', isFavourite);
  }
});