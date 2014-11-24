Tweetsaster.ReportDenounceController = Ember.ObjectController.extend({
  selectedReason: null,
  reasons: [
    'Se trata de una broma / no es cierto',
    'Es algo que ocurrió hace tiempo',
    'Es publicidad',
    'Otra razón'
  ],
  cantSend: function() {
    return Ember.isEmpty(this.get('selectedReason'));
  }.property('selectedReason'),
  actions: {
    sendDenounce: function() {
      var report = this.get('model');
      report.set('denounce', {reason: this.get('selectedReason')});
      report.save().then(function(report) {
        report.unloadRecord();
        // TODO msj to the user
      });
      this.transitionToRoute('reports.index', this.get('model.channel'));
    }
  }
});