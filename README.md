#Tweetsaster
##Hey man what's this?

Tweetsaster is a mobile web (prototype) application developed for an ongoing project between the Chilean Natural Research Center for Integrated Natural Disaster Management ([CIGIDEN](http://www.cigiden.cl/en)) and four of the best university of the country.

The idea is to use a database with filtered tweets (not done here) to avoid noise (spam tweets) and provide them in a meaningful and easy to use way to involve older people.

The application is developed with leading edge technologies and frameworks:
* Frontend -> Ember.js
* Backend -> Ruby on Rails, MongoDB 

##Yeah, but.. How does that work?

The application was developed as a prototype for mobile smartphones, as a consequence of that the UX and UI are not designed for other environments.

The backend is a really simple Rails app that fetches tweets from a Mongo database and provide a basic tweeting functionality through the app twitter channel.

##For real?! Let me see something..

The application and the backend are up and working in read-only mode. It means you can browse through some fixtures tweets (only earthquakes) but can't tweet anything (this is done to avoid spam from the scary internet). 

Try it yourself with this [DEMO](http://www.riccardoodone.com/tweetsaster).  

##Amazing!! So which libraries did you use?

* [hook.js](https://github.com/jordansinger/hook.js/) to implement a pull-to-refresh iphone style feature.
* [fastclick.js](https://github.com/ftlabs/fastclick) to eliminate the 300ms delay between a physical tap and the firing of a click event on mobile browsers. [1]
* [ember-query-params](https://github.com/ElteHupkes/ember-query-params) to handle query params.
* [sass-css-importer](https://github.com/chriseppstein/sass-css-importer) to import CSS files from styles.scss

##It's so cool I'm going to fork it. Any ideas for the future?

* Paginate search results (same way the app handles tweets on top or bottom)
* Provide a streaming style auto-update of new tweets from backend without forcing the user to load the page again or pull-to-refresh it
* Use ember "official" query-params
* Increment time passed on every tweet synchronously without having to refresh the page [2]
* Show parsed image from tweets in landscape mode and provide possibility to view them fullscreen
* Implement i18n
* If you need text processing utility functions for Tweets there's [twitter-text-js](https://github.com/twitter/twitter-text-js)

##Gimme the [ ] references!

* [1] [300ms tap delay](http://updates.html5rocks.com/2013/12/300ms-tap-delay-gone-away)
* [2] [good example in the "timer part"] http://code.tutsplus.com/tutorials/ember-components-a-deep-dive--net-35551 

##Thanks man, keep it up!!
 
