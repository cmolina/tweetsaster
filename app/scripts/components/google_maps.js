Tweetsaster.GoogleMapsComponent = Ember.Component.extend({
  map: null,
  radius: 1000,
  latLng: null,
  zoom: 10,
  geocoder: new google.maps.Geocoder(),
  formattedAddress: '',
  insertMap: function() {
    var geocoder = this.get('geocoder');
    var container = document.querySelector('.map-canvas');
    var options = {
      center: this.get('latLng'),
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
      center: this.get('latLng'),
      radius: this.get('radius'),
      editable: true
    };
    circle = new google.maps.Circle(options);

    var centerMap = function(latLng) {
      window.setTimeout(function() {
        map.panTo(circle.getCenter());
      }, 500);
    };

    var reverseGeocoding = function(latLng) {
      geocoder.geocode({latLng: latLng}, function(results, status) {
        var address = '',
            addrDetail = 1;
        if (status != google.maps.GeocoderStatus.OK) {
          console.error('Problema obteniendo dirección desde coordenadas, '+status);
        }
        else {
          if (addrDetail >= results.length)
            addrDetail = results.length - 1;
          if (results[addrDetail])
            address = results[addrDetail].formatted_address;
        }
        this.set('formattedAddress', address);
      }.bind(this));
    }.bind(this);

    google.maps.event.addListener(circle, 'center_changed', function() {
      var latLng = circle.getCenter();
      centerMap(latLng);
      this.set('latLng', latLng);
      reverseGeocoding(latLng);
    }.bind(this));
    google.maps.event.addListener(circle, 'radius_changed', function() {
      centerMap(circle.getCenter());
      this.set('radius', Math.ceil(circle.getRadius()));
    }.bind(this));
    google.maps.event.addListener(map, 'zoom_changed', function() {
      this.set('zoom', map.getZoom());
    }.bind(this));
  }.on('didInsertElement'),
  setCenter: function() {
    var latLng = this.get('latLng');
    if (!latLng)
      return;
    circle.setCenter(latLng);
  }.observes('latLng')
});
