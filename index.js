function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(37.758895, -122.414724),
    zoom: 8
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(37.758895, -122.414724),
      map: map,
      title:"Hello World!"
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
