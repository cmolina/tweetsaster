Tweetsaster.ReportPicturesController = Ember.Controller.extend(DropletController, Tweetsaster.Toast, {
  dropletUrl: 'http://restapi-dsas3.ngrok.com/upload',
  tasks: [],
  validAndUploadedFiles: function() {
    return this._filesByProperties({valid: true, deleted: false, uploaded: true});
  }.property('files.length', 'files.@each.deleted', 'files.@each.uploaded'),
  canAddAPhoto: function() {
    return this.get('validAndUploadedFiles.length') < 4;
  }.property('validAndUploadedFiles.length'),
  cantSend: function() {
    var countFiles = this.get('validAndUploadedFiles.length');
    return !(0 < countFiles && countFiles <= 4);
  }.property('validAndUploadedFiles.length'),
  didAddFiles: function(files) {
    // TODO compress pictures
    this.send('uploadAllFiles');
  },
  didUploadFiles: function(response) {
    if (response._id) {
      var tasks = this.get('tasks');
      tasks.pushObject(response._id);
    }
  },
  actions: {
    sendComment: function() {
      var report = this.get('model'),
          tasks = this.get('tasks'),
          comment = this.store.createRecord('comment', {
        comment: 'Nuevas fotos',
        inReplyToStatus: report,
        channel: report.get('channel'),
        coordinates: this.get('coordinates')
      });
      comment.set('mediaIds', tasks);
      comment.save().then(
        function(comment) {
          this.showToast({text: 'Ya puedes ver las nuevas fotos'}); 
        }.bind(this),
        function(error) {
          this.send('hideModal');
          this.showToast({
            heading: 'Ups',
            text: 'Hubo un problema enviando las fotos.<br>'+
                  'Asegúrate de tener internet, y <strong>envia nuevamente '+
                  'las fotos</strong> más tarde', 
            error: error, hideAfter: 10000
          });
        }.bind(this)
      );
      Ember.run.schedule('afterRender', this, function() {
        this.send('hideModal');
        this.showToast({
          heading: 'Fotos enviadas',
          text: 'Las fotos apareceran en los próximos minutos'
        });
      });
    },
    deletePicture: function(file, index) {
      this.send('deleteFile', file);
      this.get('tasks').removeAt(index);
    },
    showSelectPhotos: function() {
      // show the modal
      Ember.$('.themodal-overlay').show();
    },
    selectFile: function() {
      Ember.$('input[type=file]').click();
    },
    hideModal: function() {
      Ember.$('.themodal-overlay').hide();
      this.get('tasks').clear();
      this.send('clearAllFiles');
    }
  }
});