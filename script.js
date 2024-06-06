// script.js
var map;
var markers = [];

function initMap() {
  var dumbo = { lat: 22.957632, lng: 88.542861 };
  var mapOptions = {
    center: dumbo,
    zoom: 10
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Add a search bar
  var searchInput = document.getElementById("search-input");
  var searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", function() {
    var searchQuery = searchInput.value;
    geocodeAddress(searchQuery);
  });

  // Add a marker list
  var markerListUl = document.getElementById("marker-list-ul");
}


function geocodeAddress(address) {
  var latLng;
  // Check if the input string contains a comma (latitude, longitude format)
  if (address.indexOf(',') > -1) {
    var parts = address.split(',');
    latLng = new google.maps.LatLng(parseFloat(parts[0].trim()), parseFloat(parts[1].trim()));
  } else {
    // Otherwise, geocode the address as usual
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function(results, status) {
      if (status === "OK") {
        latLng = results[0].geometry.location;
      } else {
        alert("No results found");
      }
    });
  }
  if (latLng) {
    addMarker(latLng, address);
    map.setCenter(latLng);
    map.setZoom(15); // Zoom in to the desired location
  }
}

function addMarker(latLng, address) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: address
  });
  markers.push(marker);
  var markerListUl = document.getElementById("marker-list-ul");
  var markerListItem = document.createElement("li");
  markerListItem.innerHTML = address;
  markerListUl.appendChild(markerListItem);
  marker.addListener("click", function() {
    map.setCenter(marker.getPosition());
  });
}

function removeMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
  var markerListUl = document.getElementById("marker-list-ul");
  markerListUl.innerHTML = "";
}

document.getElementById("search-button").addEventListener("dblclick", function() {
  removeMarkers();
});
``
