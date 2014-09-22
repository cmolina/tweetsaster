Tweetsaster.TweetsController = Ember.ObjectController.extend({
  title: '',
  searchBarVisible: false,
  actions: {
    toggleSearchBar: function() {
      this.toggleProperty('searchBarVisible');
    },
    hideSearchBar: function() {
      this.set('searchBarVisible', false);
    },
    getMoreSearch: function(query) {
      var params = Ember.Router.QueryParameters.create({ query: query });
      this.transitionToRoute('tweets.search', params);
    }
  }
});