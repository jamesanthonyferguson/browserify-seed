define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var MouseSync  = require('famous/inputs/MouseSync');
    var TouchSync = require('famous/inputs/TouchSync');
    var Modifier = require('famous/core/Modifier');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var GenericSync = require('famous/inputs/GenericSync');


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


        //Sync Stuff
        var position = [0,0];
        GenericSync.register({
            'mouse': MouseSync,
            'touch': TouchSync
        })

        var sync = new GenericSync(['mouse','touch']);


        //Surfaces
        var background = new Surface({
            properties: {
                backgroundColor: '#222',
                zIndex: -5
            }
        })


        this.currentImage = 0;
        this.images = ['images/miranda.png', 'images/heidi.jpeg', 'images/headshot.jpg','/images/headshot3.jpg', '/images/ape-silverback.jpg'];
        this.imageInfo = ["31 Miranda Kerr", "41 Heidi Klum", "43 Marge Simpson", "21 Adam Humphrey", "37 Keira Knightly"];

        //Add photo plus listeners
        _createPhoto.call(this);
        _createPhoto2.call(this);
        
        this.photo.on('mouseup', function(){
            if (position[0] > 150) {
                console.log('liked');
                nextPic.call(that);
            } else if (position[0] < (-150)) {
                console.log('disliked');
                nextPic.call(that);
            }
            position = [0,0];
        })
        
        this.photo.on('touchend', function(){
            if (position[0] > 150) {
                console.log('liked');
                nextPic.call(that);
            } else if (position[0] < (-150)) {
                console.log('disliked');
                nextPic.call(that);
                console.log(that)
            }
            position = [0,0];
        })

        this.photo.pipe(sync);

        sync.on('update', function(data){
            position[0] += data.delta[0];
            position[1] += data.delta[1];
        });


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
          align: [0.55, 0.88]
        });

        var positionModifier3 = new Modifier({
            transform : function(){
                return Transform.translate(position[0], position[1], 0);
            }
        });

        var bgPhotoModifier = new Modifier({
          origin : [0.5, 0.5],
          align: [0.5, 0.55]
        });

        var bgPhotoModifier2 = new Modifier({
          origin : [0.5, 0.5],
          align: [0.5, 0.50]
        });

        var bgPhotoModifier3 = new Modifier({
          origin : [0.5, 0.5],
          align: [0.55, 0.93]
        });
        
        container.add(background);
        //add all elements of background photos
        container.add(bgPhotoModifier).add(this.photo2);
        container.add(bgPhotoModifier2).add(this.photoInside2);
        container.add(bgPhotoModifier3).add(this.photoInfo2);

        //add all elements of first photo
        container.add(centerModifier).add(positionModifier).add(this.photo);
        container.add(centerModifier2).add(positionModifier2).add(this.photoInside);
        container.add(centerModifier3).add(positionModifier3).add(this.photoInfo);
        this.add(container);
        
    }

    function _createPhoto() {

        this.photo = new Surface({
            size: [250,280],
            properties: {
                backgroundColor: '#eee',
                border: '1px solid #222',
                borderRadius: '2px',
                boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
            }
        })

        this.photoInside = new ImageSurface({
            content: this.images[this.currentImage],
            size: [240,240],
            properties: {
                backgroundColor: '#ddd',
                borderRadius: '2px',
                zIndex: 1,
                pointerEvents: 'none'
            }
        })

        this.photoInfo = new Surface({
            content: this.imageInfo[this.currentImage],
            size: [220,30],
            properties: {
                fontSize: '20px',
                fontWeight: 100,
                pointerEvents: 'none'
            }
        })

    }

    function _createPhoto2() {

        this.photo2 = new Surface({
            size: [240,270],
            properties: {
                backgroundColor: '#eee',
                border: '1px solid #222',
                borderRadius: '2px',
                boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)',
                pointerEvents: 'none',
                zIndex: -3
            }
        })

        this.photoInside2 = new ImageSurface({
            content: this.images[this.currentImage +1],
            size: [230,230],
            properties: {
                backgroundColor: '#ddd',
                borderRadius: '2px',
                zIndex: -2,
                pointerEvents: 'none'
            }
        })

        this.photoInfo2 = new Surface({
            content: this.imageInfo[this.currentImage +1],
            size: [210,25],
            properties: {
                fontSize: '18px',
                fontWeight: 100,
                pointerEvents: 'none',
                zIndex: -2
            }
        })

    }

    function nextPic() {
        this.currentImage++;
        if (this.currentImage >= this.images.length) {
            this.currentImage = 0;
        }

        this.photoInside.setContent(this.images[this.currentImage]);
        this.photoInfo.setContent(this.imageInfo[this.currentImage]);
        if (this.currentImage < this.images.length -1) {
            this.photoInside2.setContent(this.images[this.currentImage +1]);
            this.photoInfo2.setContent(this.imageInfo[this.currentImage +1]);
        } else {
            this.photoInside2.setContent(this.images[0]);
            this.photoInfo2.setContent(this.imageInfo[0]);
        }
    }

    // Establishes prototype chain for ContentView class to inherit from View
    ContentView.prototype = Object.create(View.prototype);
    ContentView.prototype.constructor = ContentView;

    // Default options for ContentView class
    ContentView.DEFAULT_OPTIONS = {};

    // Define your helper functions and prototype methods here

    module.exports = ContentView;
});