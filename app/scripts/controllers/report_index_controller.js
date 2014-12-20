Tweetsaster.ReportIndexController = Ember.ObjectController.extend(Tweetsaster.Toast, {
  isDraggable: false,
  originalCoords: null,
  coordsHasNotChanged: function() {
    return this.get('originalCoords') == this.get('coordinates.coordinates');
  }.property('originalCoords', 'coordinates.coordinates'),
  actions: {
    toggleEditing: function() {
      var isDraggable = this.toggleProperty('isDraggable');
      if (isDraggable) {
        this.showToast({
          text: 'Arrastra el pin para darle una nueva posición',
          hideAfter: 3000
        });
        this.set('originalCoords', this.get('coordinates.coordinates'));
      }
    },
    revert: function() {
      this.set('coordinates.coordinates', this.get('originalCoords'));
      this.send('toggleEditing');
    },
    update: function() {
      this.get('model').save().then(function(report) {
        this.showToast({
          text: 'La posición se ha cambiado exitosamente',
          hideAfter: 3000
        });
      }.bind(this));
      this.send('toggleEditing');
    }
  }
});