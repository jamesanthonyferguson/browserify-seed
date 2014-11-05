define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    // Constructor function for our EmptyView class
    function HeaderView() {

        // Applies View's constructor function to HeaderView class
        View.apply(this, arguments);



        var background = new Surface({
            size: [undefined,80],
            properties: {
                backgroundColor: '#EC5347',
                zIndex: 2
            }
        })

        var leftButton = new Surface({
            size: [40,40],
            content: '<span class="glyphicon glyphicon-cog"></span>',
            properties: {
                border: '2px solid #eee',
                color: '#eee',
                borderRadius: '40px',
                textAlign: 'center',
                lineHeight: '40px',
                fontSize: '20px',
                zIndex: 3
            }
        })

        var title = new Surface({
            content: "Famouser",
            size: [undefined,undefined],
            properties: {
                textAlign: 'center',
                lineHeight: '60px',
                fontSize: '40px',
                fontWeight: '100',
                color: '#eee',
                zIndex: 2
            }
        })

        var rightButton = new Surface({
            size: [40,40],
            content: '<span class="glyphicon glyphicon-comment"></span>',
            properties: {
                border: '2px solid #eee',
                color: '#eee',
                borderRadius: '40px',
                zIndex: 3,
                textAlign: 'center',
                lineHeight: '40px',
                fontSize: '20px'
            }
        })

        var rightButtonNew = new Surface({
            size: [10,10],
            content: '<span class="glyphicon glyphicon-heart"></span>',
            properties: {
                textAlign: 'center',
                lineHeight: '10px',
                fontSize: '10px',
                color: '#EC5347',
                zIndex: 4
            }
        })

        var titleModifier = new StateModifier({
            transform: Transform.translate(0, 10, 0)
        })

        var leftButtonModifier = new StateModifier({
            transform: Transform.translate(10, 30, 0)
        })

        var rightButtonModifier = new StateModifier({
            transform: Transform.translate(266, 30, 0)
        })

        var rightButtonNewModifier = new StateModifier({
            transform: Transform.translate(281, 42, 0)
        })

        leftButton.on('tap', function(){
            console.log('left');
            toggleFullScreen();
        })
        
        leftButton.on('click', function(){
            console.log('left');
            toggleFullScreen();
        })


        this.add(background);
        this.add(leftButtonModifier).add(leftButton);
        this.add(titleModifier).add(title);
        this.add(rightButtonModifier).add(rightButton);
        this.add(rightButtonNewModifier).add(rightButtonNew);
    }

    // Establishes prototype chain for HeaderView class to inherit from View
    HeaderView.prototype = Object.create(View.prototype);
    HeaderView.prototype.constructor = HeaderView;

    // Default options for HeaderView class
    HeaderView.DEFAULT_OPTIONS = {};


    function toggleFullScreen() {
      var doc = window.document;
      var docEl = doc.documentElement;

      var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

      if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
      }
      else {
        cancelFullScreen.call(doc);
      }
    }

    // Define your helper functions and prototype methods here

    module.exports = HeaderView;
});