Tweetsaster.GoogleMapsComponent = Ember.Component.extend({
  map: null,
  circle: null,
  radius: 1000,
  center: new google.maps.LatLng(-36.739055,-71.0574941),//Chile hardcoded
  insertMap: function() {
    var container = document.querySelector('.map-canvas');
    var options = {
      center: this.get('center'),
      zoom: this.get('zoom') || 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(container, options);
    
    options = {
      strokeWeight: 2,
      strokeOpacity: 0.8,
      fillOpacity: 0.33,
      fillColor: '#FF0000',
      map: map,
      center: this.get('center'),
      radius: this.get('radius'),
      editable: true
    };
    circle = new google.maps.Circle(options);

    var centerMapToCircle = function() {
      window.setTimeout(function() {
        map.panTo(circle.getCenter());
      }, 500);
    };

    google.maps.event.addListener(circle, 'center_changed', function() {
      centerMapToCircle();
      this.set('center', circle.getCenter());
    }.bind(this));
    google.maps.event.addListener(circle, 'radius_changed', function() {
      centerMapToCircle();
      this.set('radius', Math.ceil(circle.getRadius()));
    }.bind(this));
  }.on('didInsertElement'),
  setCenter: function() {
    if (!this.get('center'))
      return;
    map.panTo(this.get('center'));
    circle.setCenter(this.get('center'));
  }.observes('center')
});
