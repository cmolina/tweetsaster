Tweetsaster.TweetsController = Ember.ObjectController.extend({
	title: '',
	searchString: '',
	searchBarVisible: false,
	actions:{
		toggleSearchBar: function(){
			this.toggleProperty('searchBarVisible');
			this.set('searchString', '');
		},
		hideSearchBar: function(){
			this.set('searchBarVisible', false);
			this.set('searchString', '');
		},
		getMoreSearch: function(query){
			var params = Ember.Router.QueryParameters.create({ query: query });
			this.transitionToRoute('tweets.search', params);
		}
	}
});