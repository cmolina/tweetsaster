Tweetsaster.ReportsNewController = Ember.ArrayController.extend({
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
      var report = this.store.createRecord('report', {
        text: this.get('text'),
        coordinates: this.get('coordinates')
      });
      report.save().then(
        function(report) {
          this.set('text', '');
          this.send('hideModal');
          this.transitionToRoute('reports.index').then(function(route) {
            route.controller.trigger('newElementCreated');
          });
        }.bind(this),
        function(error) {
          console.error('Noticia no enviada :( '+error);
        }.bind(this)
      );
    }
  }
});