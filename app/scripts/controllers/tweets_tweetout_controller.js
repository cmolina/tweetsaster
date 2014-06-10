Alarma.TweetsTweetoutController = Ember.ArrayController.extend({
	text: null,
	selectedChannel: '',
	needs: ['tweetsIndex'],
	channels: [
		{value: '', label: '#generico'}, 
		{value: 'earthquakes', label: '#terremotos'}, 
		{value: 'fires', label: '#incendios'}
		],
	actions: {
		tweet: function(){
			var nowDatetime = new Date();
			var nowIsoDatetime = nowDatetime.toISOString();
			var created_at_str = nowIsoDatetime;
			var text = this.get('text');
			var channel = this.get('selectedChannel');
			var tweet = window.tweet = this.store.createRecord('tweet', {
				created_at: created_at_str,
				text: text,
				channel: channel.substring(0,channel.length-1) //singularize
			});
			var tweetChannel = '';
			if (channel !== ''){
				tweetChannel = ' #' + channel;
			}
			var tweetText = text + tweetChannel + ' #iopalarma';
			$.post('http://alarmer.herokuapp.com/tweets', {text: tweetText});
			this.set('text', '');
			this.set('selectedChannel', '');
			tweet.save();
			if (channel === ''){
				this.transitionToRoute('tweets');
			} else {
			this.transitionToRoute('tweets.'+channel);
			}
		}
	}
});