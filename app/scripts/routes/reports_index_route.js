Tweetsaster.ReportsIndexRoute = Ember.Route.extend(Tweetsaster.LoadMore, {
  previous: function() {
    var params = this.get('controller.query.previous') || 
      this.store.metadataFor('report').previous;
    return {model: 'report', params: params};
  }.property('controller.query.previous'),
  next: function() {
    var params = this.get('controller.query.next') || {};
    return {model: 'report', params: params};
  }.property('controller.query.next'),
  model: function(params) {
    return this.store.all('report');
  },
  activate: function() {
    // load more reports after the stack is free
    window.setTimeout(function() {this.send('loadMore', 'next');}.bind(this));
  }
});
