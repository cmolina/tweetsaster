Alarma.TweetsController = Ember.ObjectController.extend({
	title: '',
	searchBarVisible: false,
	actions:{
		toggleSearchBar: function(){
			this.toggleProperty('searchBarVisible');
		}
	}
});