Tweetsaster.LocalStorage = Ember.Object.extend({
  setUpEventListener: function() {
    window.addEventListener('storage', function(e) {
      this.notifyPropertyChange(e.key);
    }.bind(this), false);
  }.on('init'),
  unknownProperty: function(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  setUnknownProperty: function(key, value) {
    if(Ember.isNone(value)) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
    this.notifyPropertyChange(key);
    return value;
  },
  clear: function() {
    this.beginPropertyChanges();
    for (var i=0, l=localStorage.length; i<l; i++){
      this.set(localStorage.key(i));
    }
    localStorage.clear();
    this.endPropertyChanges();
  }
});
