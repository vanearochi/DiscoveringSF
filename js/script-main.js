//TODO: Modify css functions for responsiveness
var map;
var placesContainer= ko.observable([
					{ name:'Golden Gate Bridge', location:{lat: 37.8199286, lng: -122.47825510000001}, titleVisible:ko.observable(true)},
					{ name:'Angel Island', location: {lat: 37.860909, lng: -122.43256819999999}, titleVisible:ko.observable(true)},
					{ name:"Golden Gate Park", location: {lat: 37.7694208, lng: -122.48621379999997}, titleVisible:ko.observable(true)},
					{ name:"Fort Point", location: {lat: 37.8105931, lng: -122.4771093}, titleVisible:ko.observable(true)},
					{ name:"Mount Davidson", location: {lat: 37.73833330000001, lng: -122.4533333}, titleVisible:ko.observable(true)},
					{name:"San Francisco Ferry Building", location: {lat: 37.7955469, lng: -122.39341769999999}, titleVisible:ko.observable(true)},
					{name: "Coit Tower", location:{lat: 37.8023949, lng: -122.40582219999999}, titleVisible:ko.observable(true)},
					{name: "Mission District", location:{lat: 37.7598648, lng: -122.41479770000001}, titleVisible:ko.observable(true)},
					{name:"The Castro Theatre", location:{lat: 37.761992, lng: -122.43473590000002}, titleVisible:ko.observable(true)},
					{name:"Alcatraz Island", location:{lat: 37.8269775, lng: -122.4229555}, titleVisible:ko.observable(true)}
				]);



var markerSelected=ko.observable("");
var koAddress = ko.observable("");
var selectedStatus = ko.observable(false);
var askInfoToPlacesLibrary;
var hideMarkers;
var showDirections;
var showAllMarkers;
var hideOrShowMarker;
var setToInitialValues;
var showUserLocation;
var userMarker;

//google.maps.event.trigger(map, 'resize') .

function initMap(){
	http://stackoverflow.com/questions/18444161/google-maps-responsive-resize
	google.maps.event.addDomListener(window, 'resize', function(){
		console.log("sucess change screen size")
		var center = map.getCenter();
     google.maps.event.trigger(map, "resize");
     map.setCenter(center);
	})

	var directionsDisplay;


	//Creating map
	map = new google.maps.Map(document.getElementById('map'), {

    	center: { lat: 37.82, lng: -122.431297},
    	zoom: 12

    });

	//Iterating over placesList to look for it in Google's places library
	//Call createMarker
	for (var i = 0; i < placesContainer().length; i++) {


		var position = placesContainer()[i].location;
		var counter = i + 1;
		createMarker(placesContainer()[i], counter);

	}

	function createMarker(place, counter){

			var labelStr = i.toString();
			var title = place.name;
			var marker = new google.maps.Marker({

	    		position: position,
	    		map: map,
	    		icon: {
	    			//http://map-icons.com/
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




	askInfoToPlacesLibrary = function(marker){

		var name = marker.title;
		var placeServices = new google.maps.places.PlacesService(map);
		placeServices.textSearch({query: name}, placeInformation);
		marker.setAnimation(google.maps.Animation.DROP);

		function placeInformation(data, status){



			if (status == google.maps.places.PlacesServiceStatus.OK) {

				var placeInfo = data[0];
				var address = placeInfo.formatted_address;
				koAddress("");
				koAddress(address);
			}
		}
	};

	function selectThisMarker(){

		markerSelected(this);
		hideMarkers(this);
		askInfoToPlacesLibrary(this);
		selectedStatus(true);

	}

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
			var infoWindow =  new google.maps.InfoWindow();

	  //       var userMarker = new google.maps.Marker({
   //  			map: map,
   //  			position: userLocation,
   //  			visible:true,
   //  			icon: {
  	// 				path: "M22-48h-44v43h16l6 5 6-5h16z",
  	// 				scale: 0.8,
			// 		fillColor: '#1569C7',
			// 		fillOpacity: 0.6,
  	// 				strokeWeight: 1
			// 	}
			// });

            //google.maps.event.addListener(userMarker, 'click', function(){

   //          	infoWindow.setContent("Your location");
			// 	infoWindow.open(map, this);
			// });

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

		    		//userMarker.setVisible(false);
		    		userMarker.setVisible(false)
		    		markerSelected().setVisible(false);
		      		directionsDisplay.setDirections(response);

	    		}
	    		else if(status == google.maps.DirectionsStatus.ZERO_RESULTS){

	    			alert("No route could be found between the origin and destination. Please try another travel mode");
	    		}
	    		else{

	    			alert("Sorry there was an error:" + status);
	    	}
  		});

    };





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

	showAllMarkers = function(){

		selectedStatus(false);
		map.setZoom(12);
		markerSelected().setAnimation(null);
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


	hideOrShowMarker = function(marker, boolean){
		console.log("sucess hide or show markers call")

		marker.setVisible(boolean);

	};

	setToInitialValues= function(){

		map.setZoom(12);
		showAllMarkers();
		markerSelected().setAnimation(null);
	};

	showUserLocation = function(geoposition){
		console.log(geoposition)
		//console.log(markerSelected()(){}

		var latitude= geoposition.coords.latitude;
		var longitud = geoposition.coords.longitude;
		var userLocation = new google.maps.LatLng({lat: latitude, lng: longitud});
		var latLngSF = new google.maps.LatLng({ lat: 37.82, lng: -122.431297});
		 userMarker = new google.maps.Marker({

	    		position: userLocation,
	    		//map: map,
	    		icon: {
	    			//http://map-icons.com/
					path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
					fillColor: '#1569C7',
					fillOpacity: 0.7,
					strokeWeight: 3,
					scale: 0.75,
					labelOrigin:  new google.maps.Point(0, -25)
					},
	    		//title: title,
	    		//id: i,
	    		// label: {
	    		// 	text: labelStr,
	    		// 	fontSize: "18px"
	    		// },
	    		visible: true,
	    		zIndex: 2

	    		//http://stackoverflow.com/questions/34251143/how-to-show-label-on-custom-icon-image-in-google-map-api
	  		});

		var bounds = new google.maps.LatLngBounds();
		if(selectedStatus() === true){

		bounds.extend(markerSelected().getPosition());
		bounds.extend(userLocation)
		map.fitBounds(bounds);
		userMarker.setMap(map)
		}
		else{
			userMarker.setMap(map)
			bounds.extend(latLngSF);
			bounds.extend(userLocation);
			map.fitBounds(bounds);


		}

		//http://stackoverflow.com/questions/36681258/google-maps-unoptimized-marker-fitbounds
		google.maps.event.addListener(map, 'idle', function() {
    		map.panBy(0,0);
		});

		 // userMarker = new google.maps.Marker({

	  //   		position: userLocation,
	  //   		visible: true

	  //   		//http://stackoverflow.com/questions/34251143/how-to-show-label-on-custom-icon-image-in-google-map-api
	  // 		});




		console.log(userMarker.getZIndex())
	}

}



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
	self.showOrHideLocation = ko.observable("Show my location")
	self.textValue = ko.observable("Show all places")



	self.giveWikiInfo = function(name){

	 var nameWithUnderscore = name.replace(/\s/g, "_");


		wikiPromise = $.ajax({

			type: "get",
			url:"https://www.wikipedia.org/w/api.php?action=query&list=search&srsearch="+nameWithUnderscore+"&format=json&callback=wikiCallback",
			dataType: "jsonp",
			error: function(e){
				alert("Sorry there was an error: " + e.status + " " + e.statusText);
			}

		});

		return wikiPromise;
	};


	self.passClickInformation = function(){

		askInfoToPlacesLibrary(this.marker);
		self.hideTitles(this.marker);
		markerSelected(this.marker);
		self.showWikiInfo(this.marker);
		self.infoVisible(true);
		selectedStatus(true);


	};

	self.hideTitles = function(marker){

		hideMarkers(marker);

		for (var i = 0; i < placesContainer().length; i++) {

			if(placesContainer()[i].marker!=marker){

				placesContainer()[i].titleVisible(false);

			}
		}
	};

	self.showAllTitles = function(){

		if(markerSelected()!== ""){

			showAllMarkers();
			self.infoVisible(false);
			self.inputValue("");

			for (var i = 0; i < placesContainer().length; i++) {

				placesContainer()[i].titleVisible(true);

			}
		}

	};


	markerSelected.subscribe(function(marker){

		self.hideTitles(marker);

		if(event.path[0].localName!="span"){

			self.showWikiInfo(marker);
		}
	});

	self.inputValue.subscribe(function(newValue) {

		if(selectedStatus()===true){

			showAllMarkers();
			self.infoVisible(false);
			selectedStatus(false);
		}

		var newValueTrim = newValue.trim();
		var regex = /[ ]{2,}/;

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

	koAddress.subscribe(function(address){

		self.infoVisible(true);
		self.placeAddress(address);
	});

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

	self.callGoogleDirections = function(){

		self.getGeolocation(showDirections)
		self.showOrHideLocation("Show my location")

	};

	self.getUserLocation = function(){


		if(self.showOrHideLocation()==="Show my location"){
			self.showOrHideLocation("Hide my location")
			self.getGeolocation(showUserLocation)
		}
		else{
			self.showOrHideLocation("Show my location");
			console.log(userMarker)
			hideOrShowMarker(userMarker, false)
		}
	}
	self.getGeolocation= function(toWhomDeliverData){

		if("geolocation" in navigator){

			var geo = navigator.geolocation;
			geo.getCurrentPosition(positionCall, failPosition);
		}
		else{

			"Sorry geolocation is not available";
		}

		//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
		function positionCall(data){

			toWhomDeliverData(data);
			console.log(data);

		}

		function failPosition(error){

			alert("Sorry there was an error:" + error.code + " " + error.message);
		}


	}

}



ko.applyBindings(new myViewModel());

