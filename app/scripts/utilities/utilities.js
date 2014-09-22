//truncate words longer than len with <br>
Tweetsaster.truncStrRec = function(str, index, len) {
  var wordsArray = str.split("<br>");
  if (index > wordsArray.length-1 || wordsArray[index].length < len) {
    return str;
  }
  var word = wordsArray[index];
  var word1 = word.substring(0, len);
  var word2 = word.substring(len, word.length);
  var newStr = word1+ "<br>" + word2;
  wordsArray[index] = newStr;
  return Tweetsaster.truncStrRec(wordsArray.join("<br>"), index+1, len);
};

//prepare dataset to be pushed into localStorage
Tweetsaster.truncStr = function(text) {
  var parsedText = [];
  var maxLen = 27;
  text.split(" ").forEach(function(word) {
    if (word.length > maxLen) {
      newStr = Tweetsaster.truncStrRec(word, 0, maxLen);
      parsedText.push(newStr);
    } else {
      parsedText.push(word);
    }
  });
  text = parsedText.join(" ");
  return text;
};