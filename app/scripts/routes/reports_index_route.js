Tweetsaster.ReportsIndexRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin, {
  model: function(params) {
    return this.store.all('report');
  }
});
