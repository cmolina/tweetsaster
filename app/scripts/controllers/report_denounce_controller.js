Tweetsaster.ReportDenounceController = Ember.ObjectController.extend(Tweetsaster.Toast, {
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
      });
      this.set('selectedReason', null);
      this.replaceRoute('reports.index').then(function() {
        this.showToast('Gracias por enviar tu denuncia');
      }.bind(this));
    }
  }
});