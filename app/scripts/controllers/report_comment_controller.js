Tweetsaster.ReportCommentController = Ember.ObjectController.extend(Tweetsaster.Toast, {
  mustContinue: true,
  comment: '',
  coordinates: null,
  remainingCharacters: function() {
    return 140 - (this.get('comment.length') + 2 + this.get('user.name.length'));
  }.property('comment.length', 'user.name.length'),
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
  sendOrEdit: function() {
    var model = this.get('model');
    console.log('must decide!');
    if (this.get('mustContinue')) {
      console.log('save it');
      var comment = this.store.createRecord('comment', {
        comment: this.get('comment') || '',
        inReplyToStatus: model,
        coordinates: this.get('coordinates'),
        channel: model.get('channel')
      });
      comment.prepareText();
      comment.save().then(
        function(comment) {
          // clean UI
          this.set('comment', '');
        }.bind(this),
        function(error) {
          // show message to user
          this.showToast({
            heading: 'Ups',
            text: 'Hubo un error al enviar el comentario.<br>'+
                  'Asegúrate de tener internet e intenta más tarde', 
            error: true, hideAfter: 10000
          });
          console.error(error);
          comment.deleteRecord();
        }.bind(this)
      );
    }
    else {
      console.log('dont save it');
      this.replaceRoute('report.comment', model);
    }
  },

  actions: {
    sendComment: function() {
      this.replaceRoute('report.comments', this.get('model')).then(
        function() {
          this.showToast({
            text: 'Comentario enviado <a class="pull-right">Deshacer</a>', 
            afterHidden: this.sendOrEdit.bind(this), 
            clicked: function() {
              this.set('mustContinue', false);
              this.hideToast();
            }.bind(this)
          });
        }.bind(this)
      );
    }
  }
});