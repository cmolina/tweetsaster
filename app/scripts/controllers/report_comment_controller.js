Tweetsaster.ReportCommentController = Ember.ObjectController.extend({
  remainingCharacters: function() {
    return 140 - this.get('text').length;
  }.property('text'),
  inRange: function() {
    var textLength = this.get('comment').length;
    return 0 <= textLength && 0 <= this.get('remainingCharacters');
  }.property('comment', 'remainingCharacters'),
  canSend: function() {
    var thereIsText = 0 < this.get('comment').length;
    var isShortEnough = this.get('remainingCharacters') >= 0;
    return thereIsText && isShortEnough;
  }.property('comment'),
  cantSend: Ember.computed.not('canSend'),

  actions: {
    sendComment: function() {
      var comment = this.get('model');
      comment.prepareText();
      comment.save().then(function(comment) {
        this.set('textComment', '');
        this.transitionToRoute('report.comments', this.get('model.inReplyToStatus'));
      }.bind(this),
      function(error) {
        // show message to user
        console.error('Mensaje no enviado :(');
        console.error(error);
      }.bind(this));
    }
  }
});