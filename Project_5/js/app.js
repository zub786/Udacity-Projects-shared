// By Default defined locations
var locations = [
{ title: 'TriBeCa Artsy Bachelor Pad', location: { lat: 40.7195264, lng: -74.0089934 }, visible: true },
{ title: 'Lake Worth, FL, USA', location: { lat: 26.616756, lng: -80.068451 }, visible: true },
{ title: 'Novi, MI, USA', location: { lat: 42.480591, lng: -83.475494 }, visible: true },
{ title: 'Rochester, MN, USA', location: { lat: 44.016369, lng: -92.475395 }, visible: true },
{ title: 'London, KY, USA', location: { lat: 37.129986, lng: -84.084122 }, visible: true },
{ title: 'Santa Clarita, CA, USA', location: { lat: 34.391663, lng: -118.542587 }, visible: true },
{ title: 'Overland Park, KS, USA', location: { lat: 38.984764, lng: -94.677658 }, visible: true },
{ title: 'St Cloud, MN, USA', location: { lat: 45.560230, lng: -94.172852 }, visible: true },
{ title: 'Santee, CA, USA', location: { lat: 32.838383, lng: -116.973915 }, visible: true },
{ title: 'Bay Point, CA, USA', location: { lat: 38.033878, lng: -121.960709 }, visible: true },
{ title: 'Longmont, CO, USA', location: { lat: 40.167206, lng: -105.101929 }, visible: true }
];
// Create few global variable to access in multiple functions.
var map;
var bounds;
var isStart = true;
// Declaring a new blank array for all the listing markers.
var markers = [];
// Declaring a single object globally to open one window at a time
var largeInfowindow;
// Declaring a single object globally to open one window at a time to exchange some infoWindow information temporarily
var tempInfoWindow;
   
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
function googleError(){
    alert("Something went wrong, Could not load maps successfully");
}
function googleSuccess() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7413549, lng: -73.9980244 },
        zoom: 13
    });
    // Create a single object globally in previously declared global variable tempInfoWindow
    tempInfoWindow = new google.maps.InfoWindow();
    // Create a single object globally in previously declared global variable bounds
    bounds = new google.maps.LatLngBounds();
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        if (locations[i].visible) {
            // Get the position from the location array.
            var position = locations[i].location;
            var title = locations[i].title;
            // Create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({
                map: map,
                position: position,
                title: title,
                animation: google.maps.Animation.DROP,
                id: i
            });
        }
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function () {
            populateInfoWindow(this, tempInfoWindow);
        });
        bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
    // This autocomplete is for use in the search within time entry box.
    var timeAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('textToSearch'), map);
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, InfoWindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (InfoWindow.marker != marker) {
        InfoWindow.marker = marker;
        InfoWindow.setContent('<div>' + marker.title + '</div>');
        InfoWindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        InfoWindow.addListener('closeclick', function () {
            InfoWindow.marker = undefined;
        });
    }
}

var MakeMarker = function (data) {

    this.location = ko.observable(data.location);
    this.title = ko.observable(data.title);
    this.visible = ko.observable(data.visible);
}

var ViewModel = function () {
    var tempArray = [];
    var self = this;
    this.markersList = ko.observableArray([]);
    locations.forEach(function (marker) {
        self.markersList.push(new MakeMarker(marker));
    });
    this.searchBox = ko.observable('');
    // Declaring and initiating a marker object to hold information globally, in order to show window on click on a list item
    var M = new google.maps.Marker();
    // we fire this function on click of items listed in left pane after filtration.
    this.ShowWindow = function (marker) {
        debugger;
        M.setMap(map);
        M.setPosition(marker.location());
        M.title = marker.title();
        tempInfoWindow.setContent('<div>' + marker.title() + '</div>');
        populateInfoWindow(M, tempInfoWindow);
        // after populating window, just zoom map to near the location
        zoomToArea(marker.title(), marker.location());
    }
    // This function takes the input value in the find nearby area text input
    // locates it, and then zooms into that area. This is so that the user can
    // show all listings, then decide to focus on one area of the map.
    function zoomToArea(title, location) {
        // Initialize the geocoder.
        var geocoder = new google.maps.Geocoder();
        // Get the address or place that the user entered.
        var address = title;
        // Make sure the address isn't blank.
        if (address == '') {
            window.alert('You must enter an area, or address.');
        } else {
            // Geocode the address/area entered to get the center. Then, center the map
            // on it and zoom in
            geocoder.geocode(
              {
                  address: address,
                  componentRestrictions: { locality: 'USA' }
              }, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      map.setCenter(location);
                      // map.setZoom(8);
                  } else {
                      window.alert('We could not find that location - try entering a more' +
                          ' specific place.');
                  }
              });
        }
    }
    // This computed function will fire every time page load or change, but it will work in two ways
    // One for if filter text box is empty
    // second for if filter text box has something to filter list of pre defined default locations
    // But on change function will file as you press tab after entering text or select item from dropdown
    this.search = ko.computed(function () {
        debugger;
        M.setMap(null);
        var searchResult = this.searchBox().toLowerCase();
        tempArray = [];
        // First Case
        if (searchResult != "" && searchResult != null) {
            for (var n = 0; n < markers.length; n++) {
                markers[n].setMap(null);
            }
            // Filtering and filling related item in tempArray namaed Array
            for (var i = 0; i < self.markersList().length; i++) {
                var title = self.markersList()[i].title().toLowerCase();
                if (title.indexOf(searchResult) > -1) {
                    tempArray.push(self.markersList()[i]);
                }
            }
            // Making invisible all locations marker by setting their attribute visible to false
            for (var m = 0; m < locations.length; m++) {

                        locations[m].visible = false;
            }
            // Making visible filtered locations marker by setting their attribute visible to true
            for (var l = 0; l < locations.length; l++) {
                for (var j = 0; j < tempArray.length; j++) {
                    if (locations[l].title === tempArray[j].title()) {
                        locations[l].visible = true;
                    }
                }
            }
            markers = [];
            // The following group uses the location array to create an array of markers on initialize.
            for (var k = 0; k < locations.length; k++) {               
                if (locations[k].visible === true) {
                    // Get the position from the location array.
                    var position = locations[k].location;
                    var title = locations[k].title;
                    // Create a marker per location, and put into markers array.
                    var marker = new google.maps.Marker({
                        map: map,
                        position: position,
                        title: title,
                        animation: google.maps.Animation.DROP,
                        id: i
                    });
                    // Push the marker to our array of markers.
                    bounds.extend(marker.position);
                    marker.addListener('click', function () {
                        populateInfoWindow(this, tempInfoWindow);
                    });
                    markers.push(marker);                   
                }
            }
            // Extend the boundaries of the map for each marker
            map.fitBounds(bounds);
            this.search = [];
            return tempArray;
        }
        // Second Case
        else {
            for (var i = 0; i < self.markersList().length; i++) {
                tempArray.push(self.markersList()[i]);
            }
            for (var n = 0; n < markers.length; n++) {
                markers[n].setMap(null);
            }
            markers = [];
            // The following group uses the location array to create an array of markers on initialize.
            for (var k = 0; k < locations.length; k++) {
                
                // Get the position from the location array.
                var position = locations[k].location;
                var title = locations[k].title;
                // Create a marker per location, and put into markers array.
                var marker = new google.maps.Marker({
                    map: map,
                    position: position,
                    title: title,
                    animation: google.maps.Animation.DROP,
                    id: i
                });
                // Push the marker to our array of markers.
                bounds.extend(marker.position);
                marker.addListener('click', function () {
                    populateInfoWindow(this, tempInfoWindow);
                });
                markers.push(marker);
            }
            // Extend the boundaries of the map for each marker
            map.fitBounds(bounds);
            this.search = [];
            return tempArray;
        }
    }, this);
}

$(document).ready(function () {
    ko.applyBindings(new ViewModel());
});


