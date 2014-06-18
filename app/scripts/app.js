localStorage.clear();
var Tweetsaster = window.Tweetsaster = Ember.Application.create({
	initialize: function(){
		
	}
});

//complete dataset


//truncate words longer than len with <br>
Tweetsaster.truncStrRec = function(str, index, len){
  var wordsArray = str.split("<br>");
  if(index > wordsArray.length-1 || wordsArray[index].length < len){
	  return str;
  }
  var word = wordsArray[index];
  var word1 = word.substring(0, len);
  var word2 = word.substring(len, word.length);
  var newStr = word1+ "<br>" + word2;
  wordsArray[index] = newStr;
  return Tweetsaster.truncStrRec(wordsArray.join("<br>"), index+1, len);
}

//prepare dataset to be pushed into localStorage
Tweetsaster.truncStr = function(text){
  var parsedText = new Array();
  var maxLen = 27;
  text.split(" ").forEach(function(word){
	  if(word.length > maxLen){
		  newStr = Tweetsaster.truncStrRec(word, 0, maxLen);
		  parsedText.push(newStr);
	  } else {
		  parsedText.push(word);
	  }
  });
  text = parsedText.join(" ");
	return text;
};

//TODO is it smart to load everything in store?
// Tweetsaster.tweets = tweets;
// if (!('alarma' in localStorage)){
// 	Tweetsaster.ApplicationRoute = Ember.Route.extend({
// 		model: function(){
// 			//thisModel = this;
// 			Tweetsaster.tweets.forEach(function(tweet){
// 				date = new Date(tweet.created_at);
// 				var tweet = this.store.createRecord('tweet', 
// 					{text: tweet.text, created_at: date.toISOString(), channel: tweet.channel}
// 				);
// 				tweet.save();
// 			}, this);
// 		}
// 	})
// }

Tweetsaster.FocusTextAreaComponent = Ember.TextArea.extend({
  becomeFocused: function() {
    this.$().focus();
  }.on('didInsertElement')
});

Tweetsaster.ScrollTopMixin = Ember.Mixin.create({
	actions: 
	{
		willTransition: function(transition){
			//on channel change get back to top
			window.scrollTo(0,0);
		}
	}
});



/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');

