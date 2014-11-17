Tweetsaster.ReportRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('report', params.report_id);
  }
});