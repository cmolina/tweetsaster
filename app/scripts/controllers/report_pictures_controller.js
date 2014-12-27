Tweetsaster.ReportPicturesController = Ember.Controller.extend(DropletController, Tweetsaster.Toast, {
  dropletUrl: 'http://restapi-dsas3.ngrok.com/upload',
  tasks: [],
  uploading: false,
  validAndUploadedFiles: function() {
    return this._filesByProperties({valid: true, deleted: false, uploaded: true});
  }.property('files.length', 'files.@each.deleted', 'files.@each.uploaded'),
  canAddAPhoto: function() {
    return this.get('validAndUploadedFiles.length') < 4;
  }.property('validAndUploadedFiles.length'),
  cantSend: function() {
    var countFiles = this.get('validAndUploadedFiles.length'),
        uploading = this.get('uploading');
    return uploading || 0 === countFiles || countFiles > 4;
  }.property('validAndUploadedFiles.length', 'uploading'),
  didAddFiles: function(files) {
    // TODO compress pictures
    this.set('uploading', true);
    this.send('uploadAllFiles');
  },
  didUploadFiles: function(response) {
    if (response._id) {
      var tasks = this.get('tasks');
      tasks.pushObject(response._id);
      this.set('uploading', false);
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
          this.showToast({text: 'Ya puedes comenzar a ver las nuevas fotos'});
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
      this.send('hideModal');
      this.showToast({
        heading: 'Fotos enviadas',
        text: 'Las fotos aparecerán en los próximos minutos'
      });
    },
    deletePicture: function(file, index) {
      this.send('deleteFile', file);
      this.get('tasks').removeAt(index);
    },
    showSelectPhotos: function() {
      // show the modal
      this.send('clearPictures');
      Ember.$('.themodal-overlay').show();
    },
    selectFile: function() {
      Ember.$('input[type=file]').click();
    },
    hideModal: function() {
      Ember.$('.themodal-overlay').hide();
    },
    clearPictures: function() {
      this.get('tasks').clear();
      this.send('clearAllFiles');
    }
  }
});