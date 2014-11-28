Tweetsaster.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('report');
  },
  actions: {
    loadMore: function(type, meta, controller) {
      var query = this.store.metadataFor(type)[meta];
      this.store.find(type, query).then(function(records) {
        this.controllerFor(controller).get('model').addObjects(records);
      }.bind(this));
    }
  }
});