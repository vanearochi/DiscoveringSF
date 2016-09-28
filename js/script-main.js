//TODO: add border bottom to names container
var map;
var placesContainer= ko.observable([
					{ name:'Golden Gate Bridge', location:{lat: 37.8199286, lng: -122.47825510000001}, titleVisible:ko.observable(true)},
					{ name:'Crissy Field', location: {lat: 37.8039, lng: -122.4641}, titleVisible:ko.observable(true)},
					{ name:"Golden Gate Park", location: {lat: 37.7694208, lng: -122.48621379999997}, titleVisible:ko.observable(true)},
					{ name:"Fort Point", location: {lat: 37.8105931, lng: -122.4771093}, titleVisible:ko.observable(true)},
					{ name:"Mount Davidson", location: {lat: 37.73833330000001, lng: -122.4533333}, titleVisible:ko.observable(true)},
					{ name:"San Francisco Ferry Building", location: {lat: 37.7955469, lng: -122.39341769999999}, titleVisible:ko.observable(true)},
					{ name: 'San Francisco Symphony', location:{lat: 37.777629, lng: -122.4906083}, titleVisible:ko.observable(true)},
					{ name:'de Young Museum', location:{lat: 37.7714732, lng: -122.4708642 }, titleVisible:ko.observable(true)},
					{ name:'Bay Bridge', location:{lat: 37.7982799, lng: -122.377777}, titleVisible:ko.observable(true)},
					{ name:'Alcatraz Island', location:{lat: 37.8269775, lng: -122.4229555}, titleVisible:ko.observable(true)}
				]);


var abc = ["A ", "B ", "C ", "D ", "E ", "F ", "G ", "H ", "I ", "J " ];
var markerSelected=ko.observable("");
var koAddress = ko.observable("");
var selectedStatus = ko.observable(false);
var askInfoToPlacesLibrary;
var hideMarkers;
var showDirections;
var showAllMarkers;
var hideOrShowMarker;
var showUserLocation;
var userMarker;
var loadingCurrentLocation = ko.observable(false);
var loadingDirections = ko.observable(false);



function initMap(){

	var directionsDisplay;

	//Creating map
	map = new google.maps.Map(document.getElementById('map'), {
    	center: { lat: 37.82, lng: -122.431297},
    	zoom: 12
    });


	/**
	 * Event listener for map responsiviness.
	 * Tip from: http://stackoverflow.com/questions/18444161/google-maps-responsive-resize
	*/
	google.maps.event.addDomListener(window, 'resize', function(){
		var center = map.getCenter();
     	google.maps.event.trigger(map, "resize");
     	map.setCenter(center);
    	map.setZoom(11);
	});


	/**
	  * Iterate over placesList array to create a marker for each place.
	*/
	for (var i = 0; i < placesContainer().length; i++) {
		var position = placesContainer()[i].location;
		createMarker(placesContainer()[i]);
	}

	/**
	  * Create marker and add an event listener to it
	  *	@param {Object} place- Contains specific information of the place.
	*/
	function createMarker(place){

			var labelStr = String.fromCharCode(65+i);
			var title = place.name;
			var marker = new google.maps.Marker({
	    		position: position,
	    		map: map,
	    		icon: {
	    			//path from http://map-icons.com/
					path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
					fillColor: '#FF1010',
					fillOpacity: 0.7,
					strokeWeight: 3,
					scale: 0.75,
					labelOrigin:  new google.maps.Point(0, -25)
				},
	    		title: title,
	    		id: i,
	    		label: {
	    			text: labelStr,
	    			fontSize: "18px"
	    		},
	    		visible: true,
	    		//http://stackoverflow.com/questions/34251143/how-to-show-label-on-custom-icon-image-in-google-map-api
	  		});
	  		google.maps.event.addListener(marker, 'click', selectThisMarker);
	  		place.marker = marker;
	}

	/**
	  * Marker click event handler.
	*/
	function selectThisMarker(){
		markerSelected(this);
		hideMarkers(this);
		askInfoToPlacesLibrary(this);
		selectedStatus(true);
	}

	/**
	  * Get place's information(address) from Google.
	  * @param {Object} marker - Selected place marker.
	*/
	askInfoToPlacesLibrary = function(marker){
		var name = marker.title;
		var placeServices = new google.maps.places.PlacesService(map);
		placeServices.textSearch({query: name}, placeInformation);
		marker.setAnimation(google.maps.Animation.BOUNCE);

		function placeInformation(data, status){
			marker.setAnimation(null);
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				var placeInfo = data[0];
				var address = placeInfo.formatted_address;
				koAddress("");
				koAddress(address);
			}
		}
	};


	/**
	  * Get directions from user location to place selected from the list.
	  * @param {Object} geoposition.
	*/
	showDirections = function(geoposition){

		if(directionsDisplay !== undefined){
			if(directionsDisplay.map !== undefined){
				directionsDisplay.setMap(null);
				directionsDisplay.setPanel(null);
			}
		}

		var travelMode;
		var latitude= geoposition.coords.latitude;
		var longitud = geoposition.coords.longitude;
		var userLocation = {lat: latitude, lng: longitud};
		var directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('steps'));
		travelMode = document.getElementById('travelMode').value;
		var request = {
	    	origin: userLocation,
	     	destination: markerSelected().position,
	    	travelMode: google.maps.TravelMode[travelMode]
	 	};

    	directionsService.route(request, function(response, status) {
	    	if (status == google.maps.DirectionsStatus.OK) {
	    		if(userMarker !== undefined ){
	    			userMarker.setVisible(false);
	    		}
	    		markerSelected().setVisible(false);
	      		directionsDisplay.setDirections(response);
	      		loadingDirections(false);
    		}
    		else if(status == google.maps.DirectionsStatus.ZERO_RESULTS){
    			loadingDirections(false);
    			alert("No route could be found between the origin and destination. Please try another travel mode");
    		}
    		else{
    			loadingDirections(false);
    			alert("Sorry there was an error:" + status);
    		}
		});
    };




    /**
	  * Hide markers
	  * @param {Object} marker - Selected marker.
	  * It hides all markers from map except the one clicked
    */
	hideMarkers = function(marker){

		map.setZoom(15);
		map.setCenter(marker.position);

		for (var i = 0; i < placesContainer().length; i++) {

			var place = placesContainer()[i];

			if(place.marker != marker){

				place.marker.setVisible(false);
			}
		}
	};

	/**
	  * Show all markers on map.
	  * If there were directions on the map it will remove them.
	*/
	showAllMarkers = function(){

		selectedStatus(false);
		map.setZoom(12);
		map.setCenter({ lat: 37.82, lng: -122.431297});

		if(directionsDisplay !== undefined){
			directionsDisplay.setMap(null);
			directionsDisplay.setPanel(null);
		}
		for (var i = 0; i < placesContainer().length; i++) {
			var place = placesContainer()[i];
			place.marker.setVisible(true);
		}
	};

	/**
	  * Hide or show a marker depeding on the boolean value passed.
	  * @param {Object} marker- Marker that will be shown or hidden.
	  * @param {boolean} boolean - Boolean value to set marker visible property.
	*/
	hideOrShowMarker = function(marker, boolean){

		marker.setVisible(boolean);
	};

	/**
	  * Show marker of User location on map.
	  * @param {Object} geoposition - User's location.
	  * Set bounds of the map depending on user's location.
	*/
	showUserLocation = function(geoposition){

		var latitude= geoposition.coords.latitude;
		var longitud = geoposition.coords.longitude;
		var userLocation = new google.maps.LatLng({lat: latitude, lng: longitud});
		var latLngSF = new google.maps.LatLng({ lat: 37.82, lng: -122.431297});
		var bounds = new google.maps.LatLngBounds();

		userMarker = new google.maps.Marker({
	    		position: userLocation,
	    		//http://stackoverflow.com/questions/34251143/how-to-show-label-on-custom-icon-image-in-google-map-api
	    		icon: {
	    			//path from: http://map-icons.com/
					path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
					fillColor: '#1569C7',
					fillOpacity: 0.7,
					strokeWeight: 3,
					scale: 0.75,
					labelOrigin:  new google.maps.Point(0, -25)
				},
	    		visible: true,
	    		zIndex: 2
	  	});

		if(selectedStatus() === true){
			bounds.extend(markerSelected().getPosition());
			bounds.extend(userLocation);
			map.fitBounds(bounds);
			userMarker.setMap(map);
		}
		else{
			userMarker.setMap(map);
			bounds.extend(latLngSF);
			bounds.extend(userLocation);
			map.fitBounds(bounds);
		}

		//http://stackoverflow.com/questions/36681258/google-maps-unoptimized-marker-fitbounds
		google.maps.event.addListener(map, 'idle', function() {
    		map.panBy(0,0);
		});
	};
}

/** Function binded to Knockout */
function myViewModel(){

	var self = this;
	self.addressVisible = ko.observable(false);
	self.infoVisible = ko.observable(false);
	self.inputValue = ko.observable("");
	self.placeAddress = ko.observable("");
	self.wikiInfo = ko.observable("");
	self.url = ko.observable("");
	self.goToWikiPage = ko.observable("More Info");
	self.showMyLocation = ko.observable(true);
	self.selectedStatus = ko.observable(false);
	self.showOrHideLocation = ko.observable("Show my location");
	self.textValue = ko.observable("Show all places");

	/**
	  * Get wikipedia info of place.
	  * @param {String} name - name's place.
	*/
	self.giveWikiInfo = function(name){

		var nameWithUnderscore = name.replace(/\s/g, "_");

		wikiPromise = $.ajax({
			type: "get",
			url:"https://www.wikipedia.org/w/api.php?action=query&list=search&srsearch="+nameWithUnderscore+"_California&format=json&callback=wikiCallback",
			dataType: "jsonp",
			error: function(e){
				alert("Sorry there was an error: " + e.status + " " + e.statusText);
			}
		});

		return wikiPromise;
	};

	/**
	  * Handler for click on div placeNameContainer.
	  * Call functions and change values to show information of the selected place.
	*/
	self.passClickInformation = function(){

		askInfoToPlacesLibrary(this.marker);
		self.hideTitles(this.marker);
		markerSelected(this.marker);
		self.showWikiInfo(this.marker);
		self.infoVisible(true);
		selectedStatus(true);
	};

	/**
	  * Hide name's places from the list.
	  * @param {Object} marker -selected marker
	 */
	self.hideTitles = function(marker){

		hideMarkers(marker);

		for (var i = 0; i < placesContainer().length; i++) {
			if(placesContainer()[i].marker!=marker){
				placesContainer()[i].titleVisible(false);
			}
		}
	};

	/**
	  * Handler for click on showAllTitles button.
	  * Hide all names from the list except the one from the selected place.
	*/
	self.showAllTitles = function(){

		// if(markerSelected()!== ""){
			if(loadingDirections === true){
				loadingDirections(false);
			}
			showAllMarkers();
			self.infoVisible(false);
			self.inputValue("");
			self.wikiInfo("");
			for (var i = 0; i < placesContainer().length; i++) {
				placesContainer()[i].titleVisible(true);
			}
		// }
	};

	/**
	  * MarkerSelected change callback.
	  * @param {function} anonymous - Callback called when notification happens.
	*/
	markerSelected.subscribe(function(marker){

		self.hideTitles(marker);
		if(event.path[0].localName!="span"){
			self.showWikiInfo(marker);
		}
	});

	/** InputValue change callback.
	  * @param {String} newValue - Value entered on text input.
	*/
	self.inputValue.subscribe(function(newValue) {

		var newValueTrim = newValue.trim();

		if(selectedStatus()===true){
			showAllMarkers();
			self.infoVisible(false);
			selectedStatus(false);
		}

		for(var i = 0; i < placesContainer().length; i++){

			var place = placesContainer()[i];

			if(newValueTrim.length>0){
				if(place.name.toLowerCase().includes(newValueTrim)===true){
					place.titleVisible(true);
					hideOrShowMarker(place.marker, true);
				}
				else{
					place.titleVisible(false);
					hideOrShowMarker(place.marker, false);
				}
			}
			else{
				place.titleVisible(true);
				hideOrShowMarker(place.marker, true);
			}
		}
	});

	/**
	  * koAddress change callback.
	  * @param {String} address- Place's Address to be displayed in DOM
	*/
	koAddress.subscribe(function(address){

		self.infoVisible(true);
		self.placeAddress(address);
	});

	/** Function that handles callback from wikipedia API request.
	  * Assign value to observables to show wikipedia information.
	  * @param {Object} marker - Marker of place selected by user.
	*/
	self.showWikiInfo = function(marker){

		wikiPromise = self.giveWikiInfo(marker.title);
	    wikiPromise.then(function(data){

	    	if(data.query.search.length===0){
	    		alert("Sorry we couldn't find any Wikipedia Information for the place you are looking for");
	    	}
	    	else if(data.query.search.length>0){
	    		var wikiPlaceInfo = data.query.search[0].snippet;
	    		self.wikiInfo(wikiPlaceInfo);
	    		var wikiUrl = 'https://en.wikipedia.org/wiki/'+marker.title;
	    		self.url(wikiUrl);
	    	}
		});
	};

	/** Handles click event of take me there button.
	 *	Ask for geolocation to begin the request for directions.
	*/
	self.callGoogleDirections = function(){

		self.getGeolocation(showDirections);
		self.showOrHideLocation("Show my location");
		loadingDirections(true);
	};

	/** Handles click event on showHideLocation button
	*/
	self.getUserLocation = function(){
			if(self.showOrHideLocation()==="Show my location"){
				loadingCurrentLocation(true);
				self.getGeolocation(showUserLocation);
			}
			else{
				self.showOrHideLocation("Show my location");
				console.log(userMarker);
				hideOrShowMarker(userMarker, false);
			}
	};

	/** Get user's location*/
	self.getGeolocation= function(toWhomDeliverData){

		if("geolocation" in navigator){
			var geo = navigator.geolocation;
			geo.getCurrentPosition(positionCall, failPosition);
		}
		else{
			loadingDirections(false);
			loadingCurrentLocation(false)
			alert("Sorry geolocation is not available");
		}

		//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
		function positionCall(data){

			if(loadingDirections() === false){
				self.showOrHideLocation("Hide my location");
			}
			toWhomDeliverData(data);
	      	loadingCurrentLocation(false);
		}

		function failPosition(error){
			loadingDirections(false);
			loadingCurrentLocation(false)
			alert("Sorry there was an error:" + error.code + " " + error.message);
		}
	};


}

ko.applyBindings(new myViewModel());

