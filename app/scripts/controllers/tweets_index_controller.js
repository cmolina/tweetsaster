Tweetsaster.getLastIdFrom = function(arrangedContent, position) {
  if (position === 'bottom') {
      return arrangedContent.get('lastObject').get('id');
    } else { //top
      return arrangedContent.get('firstObject').get('id');
    }
};

Tweetsaster.ghashtags= function(arrangedContent, position) {
  if (position === 'bottom') {
      return arrangedContent.get('lastObject').get('id');
    } else { //top
      return arrangedContent.get('firstObject').get('id');
    }
};

Tweetsaster.updateControllerIDs = function(id, position, controller) {
  if (position === 'bottom') {
    if (id < controller.get('lastID')) {
      controller.set('lastID', id);
      }
    } else { //top
      if (id > controller.get('lastID')) {
        controller.set('firstID', id);
      }
    }
};

Tweetsaster.moreBottomTweets = function(tweets, controller) {
  var moreTweets = true;
  if (tweets.length != 20) {
    moreTweets = false;
  }
  controller.set('moreBottomTweets', moreTweets);
};

Tweetsaster.getMoreTweets = function(position, controller) {
  if (controller.get('gettingMore')) {
    return;
  }
  controller.set('gettingMore', true);
  var id = Tweetsaster.getLastIdFrom(controller.get('arrangedContent'), position);
  var store = controller.store;
  $.get('http://alarmer.herokuapp.com/tweets?quantity=' + controller.get('tweetsPerRequest')+'&position='+position+'&id='+id).always(function() {
    controller.set('gettingMore', false);
  }).then(function(tweets) {
    tweets.forEach(function(tweet) {
      Tweetsaster.updateControllerIDs(tweet.id, position, controller);
      store.push('tweet', {id: tweet.id, text: Tweetsaster.truncStr(tweet.text), created_at: tweet.created_at, channel: tweet.channel});
    });
    if (position === 'bottom') {
      Tweetsaster.moreBottomTweets(tweets, controller);
    }
  });
};

Tweetsaster.TweetsIndexController = Ember.ArrayController.extend({
  sortProperties: ['id'],
  sortAscending: false,
  gettingMore: false,
  tweetsPerRequest: 20, 
  lastID: false,
  firstID: false,
  moreBottomTweets: true,
  showingSpinner: function() {
    return this.get('arrangedContent.length') > 10 && this.get('moreBottomTweets');
  }.property('length', 'moreBottomTweets'),
  actions: {
    getMoreBottom: function() {
      Tweetsaster.getMoreTweets('bottom', this);
    },
    getMoreTop: function() {
      Tweetsaster.getMoreTweets('top', this);
    }
  }
});