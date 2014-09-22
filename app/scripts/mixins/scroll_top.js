Tweetsaster.ScrollTopMixin = Ember.Mixin.create({
  actions: 
  {
    willTransition: function(transition) {
      //on channel change get back to top
      window.scrollTo(0,0);
    }
  }
});