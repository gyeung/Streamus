﻿define(['backgroundManager', 'radioModeItems', 'radioModeItemView', 'overscroll'], function (backgroundManager, RadioModeItems, RadioModeItemView) {
    'use strict';

    throw "This was causing an infinite loop... double check before re-including";

    var RadioModeView = Backbone.View.extend({
        el: $('#RadioMode'),

        initialize: function () {
            console.log("initializing overscroll");
            //  His instructions say I should be able to achieve direction:horizontal via just css, but I'm unable to get it while drunk.


            //  Initialize the collection we'll use to store items in.
            this.items = new RadioModeItems;
            //  Whenever an item is added to the collection, visually add an item, too.
            this.listenTo(this.items, 'add', this.addItem);
            
            var activeItem = backgroundManager.get('activePlaylistItem');

            if (activeItem !== null) {

                var videoId = activeItem.get('video').get('id');

                //  TODO: Not sure how to center it for now just adding 2 blanks.
                this.items.create({});
                this.items.create({});

                this.items.create({
                    title: activeItem.get('title'),
                    videoImageUrl: 'http://img.youtube.com/vi/' + videoId + '/default.jpg'
                });

                var nextItem = backgroundManager.getPlaylistItemById(activeItem.get('nextItemId'));
                var activePlaylist = backgroundManager.getPlaylistById(activeItem.get('playlistId'));
                
                while (nextItem.get('id') != activePlaylist.get('firstItemId')) {
                    
                    this.items.create({
                        title: nextItem.get('title'),
                        videoImageUrl: 'http://img.youtube.com/vi/' + nextItem.get('video').get('id') + '/default.jpg'
                    });
                    
                    nextItem = backgroundManager.getPlaylistItemById(nextItem.get('nextItemId'));
                }

            }
            
            this.$el.overscroll({
                //showThumbs: false,
                direction: 'horizontal'
            });
            
        },
        
        addItem: function (radioModeItem) {
            var radioModeItemView = new RadioModeItemView({ model: radioModeItem });
            //.find('#overflowWrapper')
            this.$el.append(radioModeItemView.render().el);
        }

    });

    var radioModeView = new RadioModeView;
});