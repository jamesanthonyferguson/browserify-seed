define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface

    // Constructor function for our EmptyView class
    function FooterView() {

        // Applies View's constructor function to FooterView class
        View.apply(this, arguments);

        var background = new Surface({
            size: [undefined,180],
            properties: {
                backgroundColor: '#222',
                zIndex: 2
            }
        })

        var dislikeButton = new Surface({
            size: [60,60],
            content: '<span class="glyphicon glyphicon-remove"></span>',
            properties: {
                border: '2px solid #EC5347',
                borderRadius: '30px',
                textAlign: 'center',
                color: '#EC5347',
                fontWeight: 'bold',
                lineHeight: '60px',
                fontSize: '30px',
                zIndex: 3
            }
        })

        var infoButton = new Surface({
            size: [100,100],
            content: "i",
            properties: {
                border: '2px solid #FFFFFF',
                borderRadius: '50px',
                textAlign: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
                lineHeight: '100px',
                fontSize: '40px',
                zIndex: 3
            }
        })

        var likeButton = new Surface({
            size: [60,60],
            content: '<span class="glyphicon glyphicon-ok"></span>',
            properties: {
                border: '2px solid #B3F322',
                borderRadius: '30px',
                textAlign: 'center',
                color: '#B3F322',
                fontWeight: 'bold',
                lineHeight: '60px',
                fontSize: '30px',
                zIndex: 3
            }
        })

        var dislikeButtonModifier = new StateModifier({
            transform: Transform.translate(220, 100, 0)
        })

        var infoButtonModifier = new StateModifier({
            transform: Transform.translate(100, 60, 0)
        })

        var likeButtonModifier = new StateModifier({
            transform: Transform.translate(20, 100, 0)
        })

        likeButton.on('click', function(){
            console.log('like');
        })

        dislikeButton.on('click', function(){
            console.log('dislike');
        })

        infoButton.on('click', function(){
            console.log('info');
        })

        this.add(background);
        this.add(dislikeButtonModifier).add(dislikeButton);
        this.add(likeButtonModifier).add(likeButton);
        this.add(infoButtonModifier).add(infoButton);
    }

    // Establishes prototype chain for FooterView class to inherit from View
    FooterView.prototype = Object.create(View.prototype);
    FooterView.prototype.constructor = FooterView;

    // Default options for FooterView class
    FooterView.DEFAULT_OPTIONS = {};

    // Define your helper functions and prototype methods here

    module.exports = FooterView;
});