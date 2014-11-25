Tweetsaster.ReportMapController = Ember.ObjectController.extend({
  isDraggable: false,
  originalCoords: null,
  coordsHasNotChanged: function() {
    return this.get('originalCoords') == this.get('coordinates.coordinates');
  }.property('originalCoords', 'coordinates.coordinates'),
  actions: {
    toggleEditing: function() {
      var isDraggable = this.toggleProperty('isDraggable');
      this.set('originalCoords', isDraggable ? 
               this.get('coordinates.coordinates') : null);
    },
    revert: function() {
      this.set('coordinates.coordinates', this.get('originalCoords'));
      this.send('toggleEditing');
    },
    update: function() {
      this.get('model').save().then(function(report) {
        // TODO notifies the user everything is fine
        alert('Punto modificado!');
      });
      this.send('toggleEditing');
    }
  }
});