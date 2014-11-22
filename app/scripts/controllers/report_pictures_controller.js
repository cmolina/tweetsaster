Tweetsaster.ReportPicturesController = Ember.Controller.extend(DropletController, {
  dropletUrl: 'http://restapi-streamsaster.ngrok.com/upload',

  canAddAPhoto: function() {
    return this.get('validFiles.length') < 4;
  }.property('validFiles.length'),
  cantSend: function() {
    var countFiles = this.get('validFiles.length');
    return !(0 < countFiles && countFiles <= 4);
  }.property('validFiles.length'),

  didUploadFiles: function(response) {
    console.log(response);
    // send the comment with the pictures ids
    if (response.success) {
      this.send('hideModal');
      var comment = this.get('model'),
          mediaIds = [];
      response.files.forEach(function(file) {
        mediaIds.push(file.media_id_string);
      });
      comment.set('mediaIds', mediaIds);
      comment.save().then(function(comment) {
        // TODO: show confirmation to user
      }.bind(this));
    }
  },

  actions: {
    showSelectPhotos: function() {
      // show the modal
      Ember.$('.themodal-overlay').show();
    },
    selectFile: function() {
      Ember.$('input[type=file]').click();
    },
    hideModal: function() {
      Ember.$('.themodal-overlay').hide();
      this.send('clearAllFiles');
    }
  }
});