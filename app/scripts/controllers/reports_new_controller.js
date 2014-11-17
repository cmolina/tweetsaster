Tweetsaster.ReportsNewController = Ember.ArrayController.extend({
  needs: 'reports',
  text: '',
  selectedChannel: '',
  similarReports: [],
  channels: [
    {value: '', label: 'Seleccione un canal'},
    {value: 'earthquake', label: 'Terremoto'}, 
    {value: 'fire', label: 'Incendio'}, 
    {value: 'flood', label: 'Inundación'}
  ],
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
    var hasNoChannel = Ember.isEmpty(this.get('selectedChannel'));
    return thereIsNoText || isVeryLarge || hasNoChannel;
  }.property('remainingCharacters', 'selectedChannel'),

  onInit: function() {
    this.set('selectedChannel', this.get('controllers.reports.channel'));
  }.on('init'),

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
        coordinates: this.get('coordinates'),
        channel: this.get('selectedChannel')
      });
      report.save().then(
        function(report) {
          this.set('text', '');
          this.send('hideModal');
          this.transitionToRoute('report', report);
        }.bind(this),
        function(error) {
          console.error('Noticia no enviada :( '+error);
        }.bind(this)
      );
    }
  }
});