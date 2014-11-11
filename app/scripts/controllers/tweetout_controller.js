Tweetsaster.TweetoutController = Ember.ArrayController.extend({
  needs: 'tweets',
  text: '',
  selectedChannel: '',
  similarTweets: [],
  channels: [
    {value: '', label: 'Seleccione un canal'},
    {value: 'earthquake', label: 'Terremoto'}, 
    {value: 'fire', label: 'Incendio'}, 
    {value: 'flood', label: 'Inundación'}
  ],
  remainingCharacters: function() {
    return 140 - this.get('text').length;
  }.property('text'),
  inRange: function() {
    var textLength = this.get('text').length;
    return 0 <= textLength && textLength <= 140;
  }.property('text'),
  cantSend: function() {
    var thereIsNoText = Ember.isBlank(this.get('text'));
    var isVeryLarge = this.get('remainingCharacters') < 0;
    var hasNoChannel = Ember.isEmpty(this.get('selectedChannel'));
    return thereIsNoText || isVeryLarge || hasNoChannel;
  }.property('remainingCharacters', 'selectedChannel'),

  onInit: function() {
    this.set('selectedChannel', this.get('controllers.tweets.channel'));
  }.on('init'),

  actions: {
    search: function() {
      // empty any possible previus search
      this.store.find('tweet', {q: this.get('text')}).then(function(tweets) {
        if (tweets.get('length') > 0) {
          this.set('similarTweets', tweets);
          Ember.$(".themodal-overlay").show();
        }
        else
          this.send('sendTweet');
      }.bind(this));
    },
    hideModal: function() {
      Ember.$('.themodal-overlay').hide();
    },
    sendTweet: function() {
      var tweet = this.store.createRecord('tweet', {
        text: this.get('text'),
        coordinates: this.get('coordinates'),
        channel: this.get('selectedChannel')
      });
      tweet.save().then(
        function(tweet) {
          this.set('text', '');
          this.send('hideModal');
          this.transitionToRoute('tweet', tweet);
        }.bind(this),
        function(tweet) {
          console.error('Tweet no enviado :(');
        }.bind(this)
      );
    }
  }
});