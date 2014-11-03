Tweetsaster.GoogleMapsComponent = Ember.Component.extend({
  map: null,
  circle: null,
  radius: 1000,
  center: new google.maps.LatLng(-36.739055,-71.0574941),//Chile hardcoded
  zoom: 10,
  geocoder: null,
  formattedAddress: '',
  insertMap: function() {
    geocoder = new google.maps.Geocoder();
    var container = document.querySelector('.map-canvas');
    var options = {
      center: this.get('center'),
      zoom: this.get('zoom'),
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

    var reverseGeocoding = function(latLng) {
      geocoder.geocode({latLng: latLng}, function(results, status) {
        if (status != google.maps.GeocoderStatus.OK) {
          console.error('Problema obteniendo dirección desde coordenadas, '+status);
          return;
        }
        var addrDetail = 1;
        if (addrDetail >= results.length)
          addListener = results.length - 1;
        if (results[addrDetail])
          this.set('formattedAddress', results[addrDetail].formatted_address);
      }.bind(this));
    }.bind(this);

    google.maps.event.addListener(circle, 'center_changed', function() {
      centerMapToCircle();
      this.set('center', circle.getCenter());
      reverseGeocoding(circle.getCenter());
    }.bind(this));
    google.maps.event.addListener(circle, 'radius_changed', function() {
      centerMapToCircle();
      this.set('radius', Math.ceil(circle.getRadius()));
    }.bind(this));
    google.maps.event.addListener(map, 'zoom_changed', function() {
      this.set('zoom', map.getZoom());
    }.bind(this));


  }.on('didInsertElement'),
  setCenter: function() {
    if (!this.get('center'))
      return;
    map.panTo(this.get('center'));
    circle.setCenter(this.get('center'));
  }.observes('center')
});
