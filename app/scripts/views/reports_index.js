Tweetsaster.ReportsIndexView = Ember.View.extend({
  didInsertElement: function() {
    var element = this.get('element').parentElement;
    $(element).on('scroll', this.didScroll.bind(this));
    this.get('controller').on('newElementCreated', this, this.highlightNew);
  },
  isScrolledToBottom: function(element) {
    return (element.scrollHeight - element.scrollTop === element.clientHeight);
  },
  didScroll: function(event) {
    if (this.isScrolledToBottom(event.currentTarget)) {
      this.get('controller').send('loadMore', 'report', 'previous', 'reportsIndex');
    }
  },
  highlightNew: function() {
    console.log('highlightNew 1');
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