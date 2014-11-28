Tweetsaster.ReportsIndexView = Ember.View.extend({
  didInsertElement: function() {
    var element = this.get('element').parentElement;
    console.log(element);
    $(element).on('scroll', this.didScroll.bind(this));
  },
  isScrolledToBottom: function(element) {
    return (element.scrollHeight - element.scrollTop === element.clientHeight);
  },
  didScroll: function(event) {
    if (this.isScrolledToBottom(event.currentTarget)) {
      console.log('botton!');
      this.get('controller').send('loadMore', 'report', 'previous', 'reportsIndex');
    }
  },
  willDestroyElement: function() {
    var element = this.get('element').parentElement;
    $(element).off('scroll');
  }
});