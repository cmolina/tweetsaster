Tweetsaster.TweetsGeolocatedController = Ember.ArrayController.extend({
  needs: 'tweets',
  lat: Ember.computed.alias('controllers.tweets.lat'),
  lng: Ember.computed.alias('controllers.tweets.lng'),
  within: Ember.computed.alias('controllers.tweets.within'),
  filterActive: true,
  filterAddress: '',
  filterRadius: function(key, value) {
    if (arguments.length > 1) {
      this.set('within', (value/1000).toFixed(1));
    }
    return this.get('within')*1000;
  }.property('within'),
  filterCoords: function(key, value) {
    if (arguments.length > 1) {
      // this way the params go to the URL
      this.set('lat', value.lat());
      this.set('lng', value.lng());
    }
    var lat = this.get('lat'),
        lng = this.get('lng');
    return new google.maps.LatLng(lat, lng);
  }.property('lat', 'lng'),
  filterZoom: 11,
  geocoder: new google.maps.Geocoder(),

  actions: {
    searchAddress: function(address) {
      this.get('geocoder').geocode({address: address, region: 'CL'}, 
        function(results, status) {
          if (status != google.maps.GeocoderStatus.OK) {
            if (status == google.maps.GeocoderStatus.ZERO_RESULTS)
              alert('No pudimos encontrar ese lugar. ¿Está bien escrito?\n'+
                    'Cambia la dirección y vuelve a intentar');
            console.error('Error al buscar dirección, '+status);
            return;
          }
          var latLng = results[0].geometry.location;
          this.set('lat', latLng.lat().toFixed(4));
          this.set('lng', latLng.lng().toFixed(4));
          Ember.$('[type=search]').blur();
        }.bind(this));
    }
  }
});