Alarma.TweetsRoute = Ember.Route.extend({
  model: function() {
	  var thisModel = this;
	  function truncStrRec(str, index, len){
		  var wordsArray = str.split("<br>");
		  if(index > wordsArray.length-1 || wordsArray[index].length < len){
			  return str;
		  }
		  var word = wordsArray[index];
		  var word1 = word.substring(0, len);
		  var word2 = word.substring(len, word.length);
		  var newStr = word1+ "<br>" + word2;
		  wordsArray[index] = newStr;
		  return truncStrRec(wordsArray.join("<br>"), index+1, len);
	  }
	  Alarma.tweets.forEach(function(tweet){
		  var parsedText = new Array();
		  var maxLen = 27;
		  tweet.text.split(" ").forEach(function(word){
			  if(word.length > maxLen){
				  newStr = truncStrRec(word, 0, maxLen);
				  //console.log(newStr);
				  parsedText.push(newStr);
			  } else {
				  parsedText.push(word);
			  }
		  });
		  tweet.text = parsedText.join(" ");
	  });
	  
	  Alarma.tweets.forEach(function(tweet){
		  thisModel.store.createRecord('tweet', tweet);
	  });
	  return this.store.find('tweet');
  },
  setupController: function(controller, model) {
	  this.controllerFor('tweets').set('title', 'Terremotos');
  }
});