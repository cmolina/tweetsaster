Tweetsaster.SearchController = Ember.ArrayController.extend({
  needs: 'reports',
  queryParams: ['q'],
  q: null,
  searchText: Ember.computed.oneWay('q'),
  hasReports: function() {
    return this.get('length');
  }.property('length'),
  showSpinner: false,

  onInit: function() {
    if(!window.localStorage)
      return;
    var list = JSON.parse(localStorage.getItem('latestQueries'));
    if (list === null) 
      list = [];
    this.set('latestQueries', Ember.ArrayProxy.create({
      content: Ember.A(list)
    }));
  }.on('init'),
  latestQueriesChanged: function() {
    if(!window.localStorage)
      return;
    window.localStorage.setItem('latestQueries', 
      JSON.stringify(this.get('latestQueries.content')));
  }.observes('latestQueries.@each'),
  onQueryChanged: function() {
    this.set('showSpinner', true);
    var q = this.get('q');
    if (q) {
      // add the search text to the recent list
      var latestQueries = this.get('latestQueries');
      latestQueries.removeObject(q);
      latestQueries.unshiftObject(q);

      // keep a max of 5 elements
      while (latestQueries.length > 5) {
        latestQueries.popObject();
      }
    }
  }.on('init').observes('q'),

  actions: {
    findNews: function(q) {
      this.set('q', q);
    }
  }
});