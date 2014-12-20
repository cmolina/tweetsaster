Tweetsaster.LoadMore = Ember.Mixin.create({
  actions: {
    loadMore: function(queryString) {
      this.controller.set('isLoading', true);
      var query = this.get(queryString);
      if (!query) return;
      Ember.assert('The query is missing "model" argument', 'model' in query);
      this.store.find(query.model, query.params).then(function(objects) {
        this.controller.get('model').addObjects(objects);
        this.controller.set('query', objects.get('meta'));
        this.controller.set('isLoading', false);
      }.bind(this));
    }
  }
});