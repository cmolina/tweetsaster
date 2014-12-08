Tweetsaster.Toast = Ember.Mixin.create({
  toast: null,
  showToast: function(text, afterHidden, clicked) {
    // https://github.com/kamranahmedse/jquery-toast-plugin
    $.toast().reset('all');
    var config = {
      text: text,
      allowToastClose: false,
      hideAfter: 5000, // miliseconds
      stack: false, // there should be only one toast at a time
      position: 'bottom-center',        
      bgColor: '#6f8ced',
      textColor: '#ffffff',
    };
    if (afterHidden)
      config.afterHidden = afterHidden;
    if (clicked)
      config.clicked = clicked;
    this.set('toast', $.toast(config));
  },
  hideToast: function() {
    this.get('toast').close();
  }
});