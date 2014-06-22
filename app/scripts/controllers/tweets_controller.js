Tweetsaster.TweetsController = Ember.ObjectController.extend({
	title: '',
	searchString: '',
	searchBarVisible: false,
	actions:{
		toggleSearchBar: function(){
			this.toggleProperty('searchBarVisible');
			this.set('searchString', '');
		},
		getMoreSearch: function(){
			this.controllerFor('tweetsIndex').send('getMoreSearch');
		}
	}
});