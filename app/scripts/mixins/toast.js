Tweetsaster.Toast = Ember.Mixin.create({
  toast: null,
  showToast: function(params) {
    // https://github.com/kamranahmedse/jquery-toast-plugin
    $.toast().reset('all');
    var defaultParams = {
      allowToastClose: false,
      hideAfter: 5000, // miliseconds
      stack: false, // there should be only one toast at a time
      position: 'bottom-center',        
      bgColor: params.error ? '#FA1F3D' : '#5476E8',
      textColor: '#ffffff',
    };
    Object.keys(defaultParams).forEach(function(key) {
      if (key in params) return;
      params[key] = defaultParams[key];
    });
    if (params.error) 
      console.error(params.error);
    this.set('toast', $.toast(params));
  },
  hideToast: function() {
    this.get('toast').close();
  }
});