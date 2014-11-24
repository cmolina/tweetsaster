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
      alert('Denuncia envidada ;)');
      this.transitionToRoute('reports.index', this.get('model.channel'));
    }
  }
});