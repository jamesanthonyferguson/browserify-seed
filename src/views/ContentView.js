define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var MouseSync  = require("famous/inputs/MouseSync");
    var Modifier = require('famous/core/Modifier');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');

    // Constructor function for our EmptyView class
    function ContentView() {

        // Applies View's constructor function to ContentView class
        View.apply(this, arguments);

        var container = new ContainerSurface({
            size: [undefined,undefined],
            properties: {
                overflow: 'hidden'
            }
        });

        var that = this;

        var position = [0,0];

        var sync = new MouseSync();

        var background = new Surface({
            properties: {
                backgroundColor: '#222'
            }
        })

        var photo = new Surface({
            size: [200,200],
            properties: {
                backgroundColor: '#eee',
                borderRadius: '2px',
                boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
            }
        })

        this.currentImage = 0;
        this.images = ['images/headshot.jpg','/images/headshot3.jpg', '/images/ape-silverback.jpg']

        this.photoInside = new ImageSurface({
            content: this.images[this.currentImage],
            size: [150,150],
            properties: {
                backgroundColor: '#ddd',
                borderRadius: '2px',
                zIndex: 1,
                pointerEvents: 'none'
            }
        })

        this.photoInfo = new Surface({
            content: '27 Adam Humphrey',
            size: [180,30],
            properties: {
                pointerEvents: 'none'
            }
        })

        photo.pipe(sync);

        sync.on('update', function(data){
            position[0] += data.delta[0];
            position[1] += data.delta[1];
            // console.log(sync);
        });

        photo.on('mouseup', function(){
            if (position[0] > 150) {
                console.log('liked');
                nextPic.call(that);
                console.log(that.images[that.currentImage])
            } else if (position[0] < (-150)) {
                console.log('disliked');
                nextPic.call(that);
                console.log(that)
            }
            position = [0,0];
        })
        

        var positionModifier = new Modifier({
            transform : function(){
                return Transform.translate(position[0], position[1], 0);
            }
        });

        var centerModifier = new Modifier({
          origin : [0.5, 0.5],
          align: [0.5, 0.5]
        });

        var centerModifier2 = new Modifier({
          origin : [0.5, 0.5],
          align: [0.5, 0.45]
        });

        var positionModifier2 = new Modifier({
            transform : function(){
                return Transform.translate(position[0], position[1], 0);
            }
        });

        var centerModifier3 = new Modifier({
          origin : [0.5, 0.5],
          align: [0.50, 0.77]
        });

        var positionModifier3 = new Modifier({
            transform : function(){
                return Transform.translate(position[0], position[1], 0);
            }
        });

        
        container.add(background);
        container.add(centerModifier).add(positionModifier).add(photo);
        container.add(centerModifier2).add(positionModifier2).add(this.photoInside);
        container.add(centerModifier3).add(positionModifier3).add(this.photoInfo);
        this.add(container);
        
    }

    function nextPic() {
        this.currentImage++;
        if (this.currentImage >= this.images.length) {
            this.currentImage = 0;
        }
        this.photoInside.setContent(this.images[this.currentImage]);
    }

    // Establishes prototype chain for ContentView class to inherit from View
    ContentView.prototype = Object.create(View.prototype);
    ContentView.prototype.constructor = ContentView;

    // Default options for ContentView class
    ContentView.DEFAULT_OPTIONS = {};

    // Define your helper functions and prototype methods here

    module.exports = ContentView;
});