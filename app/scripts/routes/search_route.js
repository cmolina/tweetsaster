Tweetsaster.SearchRoute = Ember.Route.extend({
  queryParams: {
    q: {refreshModel: true}
  },
  model: function(params) {
    if (params.q) {
      this.controllerFor('search').set('searchText', params.q);
      return this.store.find('report', params).then(function(reports) {
        this.controllerFor('search').set('showSpinner', false);
        return reports;
      }.bind(this));
    }
    else {
      this.controllerFor('search').set('showSpinner', false);
      return null;
    }
  },
  setupController: function(controller, model) {
    this._super(controller, model);
  },
  resetController: function (controller, isExiting, transition) {
    if (isExiting) {
      controller.set('q', null);
    }
  }
});

