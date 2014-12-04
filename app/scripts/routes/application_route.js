Tweetsaster.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('report');
  },
  actions: {
    showToast: function(text, afterHidden) {
      // https://github.com/kamranahmedse/jquery-toast-plugin
      $.toast().reset('all');
      $.toast({
        text: text,
        allowToastClose: false,
        hideAfter: 5000, // miliseconds
        stack: false, // there should be only one toast at a time
        position: 'bottom-center',        
        bgColor: '#6f8ced',
        textColor: '#ffffff',
        afterHidden: afterHidden || function() {}
      });
    }
  }
});