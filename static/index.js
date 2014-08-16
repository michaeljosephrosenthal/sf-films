/*
function initialize() {
  var mapOptions = {
    center: {lat: 37.7749295, lng: -122.4194155},
    zoom: 8
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

 // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
      );
      initialLocation = {lat: 37.7749295, lng: -122.4194155};
      map.setCenter(initialLocation);
    }, function() { handleNoGeolocation(true); });
  } else { handleNoGeolocation(false); }

  function handleNoGeolocation(errorFlag) {
    console.log("Geolocation service failed.");
    initialLocation = {lat: 37.7749295, lng: -122.4194155};
    map.setCenter(initialLocation);
  }
  for (i = 0; i < markers.length; i++) {  
      marker = new google.maps.Marker({
        position: markers[i],
        map: map
      });}
      //*
  var marker = new google.maps.Marker({
      position: {lat: 37.7749295, lng: -122.4194155},
      map: map,
      title:"Hello World!"
  }); ///
}

google.maps.event.addDomListener(window, 'load', initialize);
*/

var App = null;
$(function(){
var Truck = Backbone.Model.extend({
    initialize: function() { },
    clear: function() {
        this.destroy();
    }
});

var TruckView = Backbone.View.extend({

initialize: function(options) {
    this.render();
},
render: function() {
    this.$el.html('<li>'+this.model.get('lat')+", "+this.model.get('lng')+'</li>');
    return this;
}
});

var TruckList = Backbone.Collection.extend({
    url: '/trucks',
    model: Truck,
    initialize: function() { }
});

var TruckListView = Backbone.View.extend({
    el:  $("#trucks"),
    initialize: function(){
        this.model.on('add', this.added_truck, this);
        this.list_container = $('ul', this.$el);
        this.render();
        console.log(this);
    },
    added_truck : function (truck){
        var truck_view = new TruckView({ model: truck });
        $(this.list_container).append(truck_view.render().el);
    },
    render: function(){
        this.model.each(this.added_truck, this);
    }
});

// The Application
// ---------------
var Trucks = new TruckList();
var AppView = Backbone.View.extend({
    el: $("#app"),
    initialize: function(){
        Trucks.fetch();
        var list_view = new TruckListView({model: Trucks});
    }
});
    App = new AppView();
});
