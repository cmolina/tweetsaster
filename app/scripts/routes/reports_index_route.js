Tweetsaster.ReportsIndexRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin, {
  model: function(params) {
    var reportsController = this.controllerFor('reports');
    reportsController.set('channel', params.channel);
    reportsController.set('showChannels', true);
    return this.store.all('report').filterBy('channel', params.channel);
  }
});
