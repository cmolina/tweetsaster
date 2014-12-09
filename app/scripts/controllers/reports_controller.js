Tweetsaster.ReportsController = Ember.ArrayController.extend({
  lat: null,
  lng: null,
  within: 5.0,
  
  onFilterChanges: function() {
    Ember.run.once(this, 'saveFilterParams');
  },
  saveFilterParams: function() {
    // this way the params are save in the URL
    this.transitionToRoute('reports.geolocated', this.get('lat'), 
                           this.get('lng'), this.get('within'));
  },

  setDefaultLocation: function() {
    if (Em.isBlank(this.get('lat')) || Em.isEmpty(this.get('lng'))) {
      // if no geolocation available
      // return 'San Joaquín' by default
      var failed = {lat: -33.5001, lng: -70.6092};
      var getGeolocation = new Ember.RSVP.Promise(function(resolve) {
          if ('geolocation' in navigator)
            navigator.geolocation.getCurrentPosition(
              function(position) {
                var latLng = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                resolve(latLng);
              }, 
              function(e) {
                console.warn('ERROR(' + e.code + '): ' + e.message);
                console.warn(e);
                resolve(failed);
              },
              {
                enableHighAccuracy: true,
                timeout: 3000,
                maximumAge: 60000
              }
            );
          else
            resolve(failed);
        });
      // now set the default value
      getGeolocation.then(function(latLng) {
        if (Em.isBlank(this.get('lat')) || Em.isEmpty(this.get('lng'))) {
          this.set('lat', latLng.lat);
          this.set('lng', latLng.lng);
        }

        this.addObserver('lat', this, this.onFilterChanges);
        this.addObserver('lng', this, this.onFilterChanges);
        this.addObserver('within', this, this.onFilterChanges);
      }.bind(this));
    }
  }.on('init')
});