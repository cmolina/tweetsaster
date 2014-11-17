Tweetsaster.ReportsController = Ember.ArrayController.extend({
  channel: 'earthquake',
  lat: null,
  lng: null,
  within: null,
  showFilter: true,
  
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
      var getGeolocation = new Ember.RSVP.Promise(function(resolve) {
          if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(function(position) {
                var latLng = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                resolve(latLng);
            });
          else
            // if no geolocation available
            // return 'San Joaquín' by default
            resolve({lat: -33.5001, lng: -70.6092});
        });
      // now set the default value
      getGeolocation.then(function(latLng) {
        this.set('lat', latLng.lat);
        this.set('lng', latLng.lng);
        this.set('within', 5.0);

        this.addObserver('lat', this, this.onFilterChanges);
        this.addObserver('lng', this, this.onFilterChanges);
        this.addObserver('within', this, this.onFilterChanges);
      }.bind(this));
    }
  }.on('init')
});