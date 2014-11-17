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
    var q = this.get('q');
    if (q) {
      // add the search text to the recent list
      var latestQueries = this.get('latestQueries');
      latestQueries.removeObject(q);
      latestQueries.unshiftObject(q);

      // keep a max of 3 elements
      while (latestQueries.get('length') > 3) {
        latestQueries.popObject();
      }
    }
  }.on('init').observes('q'),

  actions: {
    findNews: function(q) {
      this.set('showSpinner', true);
      this.set('q', q);
    }
  }
});