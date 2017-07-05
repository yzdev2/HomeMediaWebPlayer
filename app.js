function viewModelMain() {
    var self = this;
    self.currentView = ko.observable();
    self.views = ko.observableArray(["Home", "Movies", "Tv-shows"]);
    
    self.title = ko.observable();
    self.array = ko.observableArray();
    
    // Simulate details of list of movies from backend
    self.videoList = ko.observableArray([
        {title:"Movie title1", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2001", selected: ko.observable(false)},
        {title:"Movie title2", img:"/videos/movie2.jpg", video:"/videos/trailer2.mp4", year:"2002", selected: ko.observable(false)},
        {title:"Movie title3", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2001", selected: ko.observable(false)},
        {title:"Movie title4", img:"/videos/movie2.jpg", video:"/videos/trailer2.mp4", year:"2002", selected: ko.observable(false)},
        {title:"Movie title5", img:"/videos/movie1.jpg", video:"/videos/trailer.mp4", year:"2003", selected: ko.observable(false)}
    ]);
    
    /************************************************************************************/
    /************************** Control Video Selection *********************************/
    /************************************************************************************/
    
   
    self.selectedVideo = ko.observable(-1);
    self.expandVideo = function(data, event) {
        data.selected(!data.selected());//toggle the isActive value between true/false
        //alert("Open video at index: " + index);
        self.selectedVideo(index); // store the index of the video thats open
        //var openLink = (selectedVideo === index ? "video-widget-container" : "video-video");
        alert("Hmmm...");
        //$(event.target).hide();
        // change the layout of this element to take up all space horizontally
        
    };
    self.activeIcon = ko.observable(-1);
    self.addMovie = function(){
        this.array.push(this.title());
        this.title("");
    };
    
    
    
    
    
    
    
    
    
    
    ko.components.register('test-component', {
        template: '<p>Enter your name: <input type="text" placeholder="Enter name here" data-bind="value: name"/></p> ' 
                   + '<h1 data-bind="text: name().toUpperCase()">Your Name</h1>\
                   <p>Your Name: <strong data-bind="text: name"></strong></p>',
        viewModel: function(params) {
            this.name = ko.observable(params.initialText || '');
        }
    });
    
    ko.components.register('horizontal-nav', {
        template: '<p>Enter your name: <input type="text" placeholder="Enter name here" data-bind="value: name"/></p> ' 
                   + '<h1 data-bind="text: name().toUpperCase()">Your Name</h1>\
                   <p>Your Name: <strong data-bind="text: name"></strong></p>',
        viewModel: function(params) {
            this.name = ko.observable(params.initialText || '');
        }
    });
       
    ko.components.register('main-video-widget', {
        template: '<div> </div>',
        viewModel: function(params) {
            this.title = ko.observable(params.initialText || '');
            this.year = ko.observable();
        }
    });
} //end of ViewModelMain

var vm = new viewModelMain();

ko.applyBindings(vm);

Sammy(function () {
    /*
    **"#:view" means that sammy takes whatever is after the hash tag 
    **and applies it to the value of "this.params.view"
    */
    this.get('#:view', function () {
        //Set currentView on your view model
        vm.currentView(this.params.view);
    });
}).run('#Home'); //Specify the starting page of your application or leave it blank