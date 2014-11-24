Tweetsaster.SimpleGoogleMapsComponent = Ember.Component.extend({
  tagName: 'div',
  classNames: ['map-canvas'],
  map: null,
  latLng: null,
  zoom: 15,
  geocoder: new google.maps.Geocoder(),
  insertMap: function() {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  }.on('didInsertElement'),
  afterRenderEvent: function() {
    var geocoder = this.get('geocoder');
    var container = document.querySelector('.map-canvas');
    var options = {
      center: this.get('latLng'),
      zoom: this.get('zoom'),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    map = new google.maps.Map(container, options);
    
    options = {
      position: this.get('latLng'),
      map: map,
      title: 'Hello World!'
    };
    marker = new google.maps.Marker(options);

    var centerMap = function(latLng) {
      window.setTimeout(function() {
        map.panTo(marker.getPosition());
      }, 500);
    };

    google.maps.event.addListener(marker, 'position_changed', function() {
      var latLng = marker.getPosition();
      centerMap(latLng);
      this.set('latLng', latLng);
    }.bind(this));
  },
  setCenter: function() {
    var latLng = this.get('latLng');
    if (!latLng)
      return;
    circle.setCenter(latLng);
  }.observes('latLng')
});
