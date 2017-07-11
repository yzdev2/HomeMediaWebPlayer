requirejs.config({
    shim:{
        bootstrap:['jquery'],
        hashchange:['jquery']
    },
    paths:{
        jquery:'lib/jquery',
        knockout:'lib/knockout',
        pager:'lib/pager'
    }
});

requirejs(['jquery','knockout','pager'], function ($, ko,pager) {

    function PagerViewModel(){
        var self = this;
        
        //Title bar navigation options
        self.views = ko.observableArray(["Home", "Movies", "Tv-shows"]);
        
        self.afterFryIsDisplayed = function () {
            $('body').css("background-image","url('/videos/movie2banner.jpg.jpg')");
        };
        self.beforeFryIsHidden = function () {
            $('body').css("background-image","none");
            $('body').stop().css("background-color", "#FFFFFF");
        };
        
        
        // Simulate details of list of movies from backend
        self.videoList = ko.observableArray([
            {id:"1", title:"Movie title 1 - long movie title for testing", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2001", selected: ko.observable(false)},
            {id:"2", title:"Movie title 2", img:"/videos/movie2.jpg", video:"/videos/trailer2.mp4", year:"2002", selected: ko.observable(false)},
            {id:"3", title:"Movie title 3", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2001", selected: ko.observable(false)},
            {id:"4", title:"Movie title 4", img:"/videos/movie2.jpg", video:"/videos/trailer2.mp4", year:"2002", selected: ko.observable(false)},
            {id:"5", title:"Movie title 5", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2003", selected: ko.observable(false)},
            {id:"6", title:"Movie title 6", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2001", selected: ko.observable(false)},
            {id:"7", title:"Movie title 7", img:"/videos/movie2.jpg", video:"/videos/trailer2.mp4", year:"2002", selected: ko.observable(false)},
            {id:"8", title:"Movie title 8", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2001", selected: ko.observable(false)},
            {id:"9", title:"Movie title 9", img:"/videos/movie2.jpg", video:"/videos/trailer2.mp4", year:"2002", selected: ko.observable(false)},
            {id:"510", title:"Movie title 10", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2003", selected: ko.observable(false)}
        ]);
        
        /**
        * Method to flip the tile on mouse over. 
        * 
        */
        self.flipIt = function(index) {
            console.log("Title at index: " + index + " is flipped = " + self.videoList()[index].selected());
            var flipped = self.videoList()[index].selected(); // get current value
            self.videoList()[index].selected(!flipped); // toggle value
        };
        
        self.goToVideo = function(index){
            alert("Title Selected: " + self.videoList()[index].title);
        }
        
        // jQuery selector to change on hiver..
        /*$("div.video-tile").click(function() {
            $this.hide();
            //$(this).css("background-color","red");
        });
        
        $("div.outer-container").click(function() {
            $this.hide();
            //$(this).css("background-color","red");
        });*/
        
    }

    $(function () {
        pager.Href.hash = '#!/';
        pager.extendWithPage(PagerViewModel.prototype);
        ko.applyBindings(new PagerViewModel());
        pager.start();
    });
});