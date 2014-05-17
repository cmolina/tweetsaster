Alarma.TweetsTweetoutController = Ember.ArrayController.extend({
	text: null,
	selectedChannel: '',
	needs: ['tweetsIndex'],
	channels: [
		{value: '', label: '#generico'}, 
		{value: 'earthquake', label: '#terremotos'}, 
		{value: 'fire', label: '#incendios'}
		],
	actions: {
		tweet: function(){
			var nowDatetime = new Date();
			var nowIsoDatetime = nowDatetime.toISOString();
			var created_at_str = nowIsoDatetime;
			console.log(created_at_str);
			var tweet = window.tweet = this.store.createRecord('tweet', {
				created_at: created_at_str,
				text: this.get('text'),
				channel: this.get('selectedChannel')
			});
			this.set('text', '');
			tweet.save();
			console.log(tweet);
			this.transitionToRoute('tweets');
		}
	}
});