Tweetsaster.SlideshowView = Ember.View.extend({
  classNames: ['bss-slides'],
  templateName: 'views/slideshow',
  pictures: [],

  Slideshow: {
    init: function (el, options) {
      this.counter = 0; // to keep track of current slide
      this.el = el; // current slideshow container    
      this.$items = el.querySelectorAll('figure'); // a collection of all of the slides, caching for performance
      this.numItems = this.$items.length; // total number of slides
      options = options || {}; // if options object not passed in, then set to empty object 
      options.auto = options.auto || false; // if options.auto object not passed in, then set to false
      this.opts = {
        auto: (typeof options.auto === "undefined") ? false : options.auto,
        speed: (typeof options.auto.speed === "undefined") ? 1500 : options.auto.speed,
        pauseOnHover: (typeof options.auto.pauseOnHover === "undefined") ? false : options.auto.pauseOnHover,
        fullScreen: (typeof options.fullScreen === "undefined") ? false : options.fullScreen,
        swipe: (typeof options.swipe === "undefined") ? false : options.swipe
      };
      
      this.$items[0].classList.add('bss-show'); // add show class to first figure 
      this.injectControls(el);
      this.addEventListeners(el);
      if (this.opts.auto) {
        this.autoCycle(this.el, this.opts.speed, this.opts.pauseOnHover);
      }
      if (this.opts.fullScreen) {
        this.addFullScreen(this.el);
      }
      if (this.opts.swipe) {
        this.addSwipe(this.el);
      }
    },
    showCurrent: function (i) {
      // increment or decrement this.counter depending on whether i === 1 or i === -1
      if (i > 0) {
        this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
      } else {
        this.counter = (this.counter - 1 < 0) ? this.numItems - 1 : this.counter - 1;
      }

      // remove .show from whichever element currently has it 
      // http://stackoverflow.com/a/16053538/2006057
      [].forEach.call(this.$items, function (el) {
        el.classList.remove('bss-show');
      });

      // add .show to the one item that's supposed to have it
      this.$items[this.counter].classList.add('bss-show');
    },
    injectControls: function (el) {
    // build and inject prev/next controls
      // first create all the new elements
      var spanPrev = document.createElement("span"),
        spanNext = document.createElement("span"),
        docFrag = document.createDocumentFragment();
  
      // add classes
      spanPrev.classList.add('bss-prev');
      spanNext.classList.add('bss-next');
  
      // add contents
      spanPrev.innerHTML = '&laquo;';
      spanNext.innerHTML = '&raquo;';
      
      // append elements to fragment, then append fragment to DOM
      docFrag.appendChild(spanPrev);
      docFrag.appendChild(spanNext);
      el.appendChild(docFrag);
    },
    addEventListeners: function (el) {
      var that = this;
      el.querySelector('.bss-next').addEventListener('click', function () {
        that.showCurrent(1); // increment & show
      }, false);
    
      el.querySelector('.bss-prev').addEventListener('click', function () {
        that.showCurrent(-1); // decrement & show
      }, false);
      
      el.onkeydown = function (e) {
        e = e || window.event;
        if (e.keyCode === 37) {
          that.showCurrent(-1); // decrement & show
        } else if (e.keyCode === 39) {
          that.showCurrent(1); // increment & show
        }
      };
    },
    autoCycle: function (el, speed, pauseOnHover) {
      var that = this,
        interval = window.setInterval(function () {
          that.showCurrent(1); // increment & show
        }, speed);
      
      if (pauseOnHover) {
        el.addEventListener('mouseover', function () {
          interval = clearInterval(interval);
        }, false);
        el.addEventListener('mouseout', function () {
          interval = window.setInterval(function () {
            that.showCurrent(1); // increment & show
          }, speed);
        }, false);
      } // end pauseonhover
      
    },
    addFullScreen: function(el){
      var that = this,
      fsControl = document.createElement("span");
      
      fsControl.classList.add('bss-fullscreen');
      el.appendChild(fsControl);
      el.querySelector('.bss-fullscreen').addEventListener('click', function () {
        that.toggleFullScreen(el);
      }, false);
    },
    addSwipe: function(el){
      var that = this,
        ht = new Hammer(el);
      ht.on('swiperight', function(e) {
        that.showCurrent(-1); // decrement & show
      });
      ht.on('swipeleft', function(e) {
        that.showCurrent(1); // increment & show
      });
    },
    toggleFullScreen: function(el){
      // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
      if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement &&   
        !document.msFullscreenElement ) {  // current working methods
        if (document.documentElement.requestFullscreen) {
          el.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          el.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          el.webkitRequestFullscreen(el.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    },
    updatePictures: function() {
      var items = this.el.querySelectorAll('figure');
      if (items.length) {
        this.$items = items;
        this.$items[this.counter].classList.add('bss-show');
        this.numItems = items.length;
      }
    }
  }, // end Slideshow object 

  $slideshows: [], // a collection of all of the slideshow

  makeBSS: function (el, options) {
    var elements = document.querySelectorAll(el),
        $slideshow = {};
        
    // make instances of Slideshow as needed
    [].forEach.call(elements, function (el) {
        $slideshow = Object.create(this.Slideshow);
        $slideshow.init(el, options);
        this.$slideshows.push($slideshow);
    }.bind(this));
  },

  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },
  afterRenderEvent: function() {
    if (this.pictures.length <= 0)
      console.log('There is no "pictures" to display in the Slideshow.');
    else
      this.makeBSS('.bss-slides');
  },
  onPicturesChanged: function() {
    var $slideshow = {};
    this.$slideshows.forEach(function($slideshow) {
      Ember.run.schedule('afterRender', $slideshow, $slideshow.updatePictures);
    });
  }.observes('pictures')
});