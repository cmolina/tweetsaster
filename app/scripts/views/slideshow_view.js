Tweetsaster.SlideshowView = Ember.View.extend({
  classNames: ['slideshow-class-goes-here'],
  templateName: 'views/slideshow',
  pictures: [],
  didInsertElement: function() {
    if (this.pictures.length <= 0)
      console.log('There is no "pictures" to display in the Slideshow.');
    else
      Tweetsaster.makeBSS('.slideshow-class-goes-here');
  }
});