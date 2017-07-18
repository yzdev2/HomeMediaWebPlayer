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
            {id:"1", title:"Lo And Behold - long movie title for testing", description:"Werner Herzog's exploration of the Internet and the connected world.", banner:"/videos/movie1banner.jpg", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2001", selected: ko.observable(false)},
            {id:"2", title:"Movie title 2", description:"When a desperate movie producer fails to get a major star for his bargain basement film, he decides to shoot the film secretly around him.", banner:"/videos/movie2banner.jpg", img:"/videos/movie2.jpg", video:"/videos/trailer2.mp4", year:"2002", selected: ko.observable(false)},
            {id:"3", title:"Lo And Behold", description:"Werner Herzog's exploration of the Internet and the connected world.", banner:"/videos/movie1banner.jpg", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2001", selected: ko.observable(false)},
            {id:"4", title:"Movie title 4", description:"When a desperate movie producer fails to get a major star for his bargain basement film, he decides to shoot the film secretly around him.", banner:"/videos/movie2banner.jpg", img:"/videos/movie2.jpg", video:"/videos/trailer2.mp4", year:"2002", selected: ko.observable(false)},
            {id:"5", title:"Lo And Behold", description:"Werner Herzog's exploration of the Internet and the connected world.", banner:"/videos/movie1banner.jpg", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2003", selected: ko.observable(false)},
            {id:"6", title:"Lo And Behold", description:"Werner Herzog's exploration of the Internet and the connected world.", banner:"/videos/movie1banner.jpg", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2001", selected: ko.observable(false)},
            {id:"7", title:"Movie title 7", description:"When a desperate movie producer fails to get a major star for his bargain basement film, he decides to shoot the film secretly around him.", banner:"/videos/movie2banner.jpg", img:"/videos/movie2.jpg", video:"/videos/trailer2.mp4", year:"2002", selected: ko.observable(false)},
            {id:"8", title:"Lo And Behold", description:"Werner Herzog's exploration of the Internet and the connected world.", banner:"/videos/movie1banner.jpg", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2001", selected: ko.observable(false)},
            {id:"9", title:"Movie title 9", description:"When a desperate movie producer fails to get a major star for his bargain basement film, he decides to shoot the film secretly around him.", banner:"/videos/movie2banner.jpg", img:"/videos/movie2.jpg", video:"/videos/trailer2.mp4", year:"2002", selected: ko.observable(false)},
            {id:"510", title:"Lo And Behold", description:"Werner Herzog's exploration of the Internet and the connected world.", banner:"/videos/movie1banner.jpg", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2003", selected: ko.observable(false)}
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
        
        self.selectedMovie = ko.observable();
        
        self.setMovie = function(id){
            //alert("Index set to: " + id);
            /* Set selected Movie */
            console.log("Id passed in is = " + id);
            for (i=0; i < self.videoList().length; i++){
                if (self.videoList()[i].id === id){
                  self.selectedMovie(self.videoList()[i]);  
                } 
            }
            /*Go to play movie url*/
            window.location.href = "#!/selectedMovie";
            return true;
        }
        
        
        ko.components.register('video-player', {
            viewModel: function(params) {
                // Data: value is either null, 'like', or 'dislike'
                this.moviePath = params.value;
                console.log("params.value = " + params.value);
            },
            template:
                '<video class="video-js" controls style="width:75%">\
                    <source src="/videos/trailer2.mp4"  type="video/mp4">\
                </video>'
        });
        
        
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