Tweetsaster.TweetsSearchController = Ember.ArrayController.extend({
  hasTweets: function() {
    return this.get('length');
  }.property('length'),
  showSpinner: false
});