define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    var Modifier = require('famous/core/Modifier');

    var HeaderView = require('./HeaderView');
    var ContentView = require('./ContentView');
    var FooterView = require('./FooterView');

    // Constructor function for our EmptyView class
    function AppController() {

        // Applies View's constructor function to AppController class
        View.apply(this, arguments);

        var iphoneSizeModifier = new Modifier(
            {
                size: [320,504]
            });

        var layout = new HeaderFooterLayout({
            headerSize: 50,
            footerSize: 140
        });

        var headerView = new HeaderView();        
        var contentView = new ContentView();
        var footerView = new FooterView();

        layout.header.add(headerView);
        layout.content.add(contentView);
        layout.footer.add(footerView);
        this.add(iphoneSizeModifier).add(layout);
    }

    // Establishes prototype chain for AppController class to inherit from View
    AppController.prototype = Object.create(View.prototype);
    AppController.prototype.constructor = AppController;

    // Default options for AppController class
    AppController.DEFAULT_OPTIONS = {};

    // Define your helper functions and prototype methods here

    module.exports = AppController;
});