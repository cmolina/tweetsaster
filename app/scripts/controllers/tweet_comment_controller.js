Tweetsaster.TweetCommentController = Ember.ObjectController.extend({
  textComment: '',
  coordinates: null,
  prefix: function() {
    return '@' + this.get('model.user.name') + ' ';
  }.property('model.user.name'),
  remainingCharacters: function() {
    return 140 - (this.get('prefix').length + this.get('textComment').length);
  }.property('textComment'),
  canSend: function() {
    var o = 0 < this.get('textComment').length;
    var p = this.get('remainingCharacters') >= 0;
    return o && p;
  }.property('remainingCharacters'),
  cantSend: Ember.computed.not('canSend'),

  actions: {
    sendComment: function() {
      var comment = this.store.createRecord('tweet', {
        text: this.get('prefix') + this.get('textComment'),
        in_reply_to_status_id: this.model.id,
        coordinates: this.get('coordinates'),
        channel: this.model.channel
      });
      comment.save().then(
        function(comment) {
          this.get('controller').transitionToRoute('tweet.index');
        },
        function(comment) {
          // show message to user
          console.error('Mensaje no enviado :(');
        }
      );
    }
  }
});