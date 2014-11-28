Tweetsaster.ReportCommentController = Ember.ObjectController.extend({
  remainingCharacters: function() {
    return 140 - this.get('model.text').length;
  }.property('model.text'),
  inRange: function() {
    var textLength = this.get('text').length;
    return 0 <= textLength && textLength <= 140;
  }.property('text'),
  canSend: function() {
    var thereIsText = 0 < this.get('model.comment').length;
    var isShortEnough = this.get('remainingCharacters') >= 0;
    return thereIsText && isShortEnough;
  }.property('model.comment'),
  cantSend: Ember.computed.not('canSend'),

  actions: {
    sendComment: function() {
      var comment = this.get('model');
      comment.prepareText();
      comment.save().then(function(comment) {
        this.set('textComment', '');
        this.transitionToRoute('report.index');
      }.bind(this),
      function(error) {
        // show message to user
        console.error('Mensaje no enviado :(');
        console.error(error);
      }.bind(this));
    }
  }
});