Tweetsaster.ReportsNewController = Ember.ArrayController.extend(Tweetsaster.Toast, {
  needs: ['reportsIndex'],
  newFutureReportBinding: 'controllers.reportsIndex.newFutureReport',
  text: '',
  similarReports: [],
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
    return thereIsNoText || isVeryLarge;
  }.property('remainingCharacters'),
  sendOrEdit: function() {
    // must decide: send the report, or go back to edit it
    if (this.get('mustContinue')) {
      // send it
      var report = this.store.createRecord('report', {
        text: this.get('text'),
        coordinates: this.get('coordinates')
      });
      report.save().then(
        function(report) {
          // clean UI
          this.set('text', '');
          this.send('hideModal');
          // remove fake report
          this.set('newFutureReport', null);
        }.bind(this),
        function(error) {
          console.warn('Noticia no enviada :( ', error);
          this.showToast({
            heading: 'Ups',
            text: 'Hubo un error al enviar tu noticia.<br>'+
                  'Asegúrate de tener internet, y <strong>envia nuevamente la noticia</strong> más tarde', 
            error: error, hideAfter: 10000
          });
          report.deleteRecord();
          // remove fake report
          this.set('newFutureReport', null);
        }.bind(this)
      );
    }
    else {
      // dont send!
      // clean UI
      this.set('newFutureReport', null);
      this.transitionToRoute('reports.new');
    }
  },

  actions: {
    search: function() {
      // empty any possible previus search
      this.store.find('report', {q: this.get('text')}).then(function(reports) {
        if (reports.get('length') > 0) {
          this.set('similarReports', reports);
          Ember.$(".themodal-overlay").show();
        }
        else
          this.send('sendReport');
      }.bind(this));
    },
    hideModal: function() {
      Ember.$('.themodal-overlay').hide();
    },
    sendReport: function() {
      // transition
      this.transitionToRoute('reports.index').then(function(route) {
        // simulate a new report on the UI
        this.set('newFutureReport', this.get('text'));
        route.controller.trigger('newElementCreated');
        // show toast message
        this.showToast({
          text: 'Tu noticia ha sido enviada <a class="pull-right">Deshacer</a>', 
          afterHidden: this.sendOrEdit.bind(this), 
          clicked: function() {
            // the user clicked on 'undo'
            this.set('mustContinue', false);
            this.hideToast();
          }.bind(this)
        });
      }.bind(this));
    }
  }
});