Tweetsaster.SimpleGoogleMapsComponent = Ember.Component.extend({
  tagName: 'div',
  classNames: ['map-canvas'],
  map: null,
  marker: null,
  latLng: null,
  zoom: 15,
  geocoder: new google.maps.Geocoder(),
  draggable: false,
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
      title: 'Ubicación de la noticia'
    };
    marker = new google.maps.Marker(options);

    google.maps.event.addListener(marker, 'dragend', function() {
      var latLng = marker.getPosition();
      this.centerMap(latLng);
      if (this.get('latLng') != latLng)
        this.set('latLng', latLng);
    }.bind(this));
  },
  centerMap: function(latLng) {
    window.setTimeout(function() {
      map.panTo(marker.getPosition());
    }, 500);
  },
  onLatLngChanged: function() {
    var latLng = this.get('latLng');
    if (!latLng)
      return;
    marker.setPosition(latLng);
    this.centerMap(latLng);
  }.observes('latLng'),
  onDraggableChanged: function() {
    var draggable = this.get('draggable');
    marker.setDraggable(draggable);
  }.observes('draggable')
});
