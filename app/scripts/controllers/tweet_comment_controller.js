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
    var thereIsText = 0 < this.get('textComment').length;
    var isShortEnough = this.get('remainingCharacters') >= 0;
    return thereIsText && isShortEnough;
  }.property('remainingCharacters'),
  cantSend: Ember.computed.not('canSend'),

  actions: {
    sendComment: function() {
      var comment = this.store.createRecord('tweet', {
        text: this.get('prefix') + this.get('textComment'),
        in_reply_to_status_id: this.model.get('id_str'),
        coordinates: this.get('coordinates'),
        channel: this.get('model.channel')
      });
      comment.save().then(
        function(comment) {
          this.set('textComment', '');
          this.transitionToRoute('tweet.index');
        }.bind(this),
        function(comment) {
          // show message to user
          console.error('Mensaje no enviado :(');
        }.bind(this)
      );
    }
  }
});