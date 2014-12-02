Tweetsaster.ReportsIndexView = Ember.View.extend({
  didInsertElement: function() {
    var element = this.get('element').parentElement;
    $(element).on('scroll', this.didScroll.bind(this));
    var controller = this.get('controller');
    if (controller.on)
      controller.on('newElementCreated', this, this.highlightNew);
  },
  isScrolledToBottom: function(element) {
    return (element.scrollHeight - element.scrollTop === element.clientHeight);
  },
  didScroll: function(event) {
    if (this.isScrolledToBottom(event.currentTarget)) {
      this.get('controller').send('loadMore', 'previous');
    }
  },
  highlightNew: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      var el = document.querySelector('.table-view li:first-child');
      el.classList.add('highlight-report');
    });
  },
  willDestroyElement: function() {
    var element = this.get('element').parentElement;
    $(element).off('scroll');
  }
});