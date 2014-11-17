Tweetsaster.ReportsIndexRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin, {
  model: function(params) {
    var reportsController = this.controllerFor('reports');
    reportsController.set('channel', params.channel);
    reportsController.set('showFilter', true);
    return this.store.find('report', params);
  }
});
