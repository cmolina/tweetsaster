Tweetsaster.TweetoutController = Ember.ArrayController.extend({
  text: null,
  selectedChannel: '',
  channels: [
    {value: '', label: '#generico'}, 
    {value: 'earthquakes', label: '#terremotos'}, 
    {value: 'fires', label: '#incendios'}
    ],
  actions: {
    tweet: function() {
      var nowDatetime = new Date();
      var nowIsoDatetime = nowDatetime.toISOString();
      var created_at_str = nowIsoDatetime;
      var text = this.get('text');
      var channel = this.get('selectedChannel');
      var hashtags = '';
      if (channel !== '') {
        hashtags += ' #' + channel;
      }
      hashtags += ' #tweetsaster';
      var tweetText = text + hashtags;
      $.post('http://alarmer.herokuapp.com/tweets', {text: tweetText});
      this.set('text', '');
      this.set('selectedChannel', '');
      if (channel === '') {
        this.transitionToRoute('tweets');
      } else {
      this.transitionToRoute('tweets.'+channel);
      }
    }
  }
});