
var map;
var placesList = [ 'Golden Gate Bridge', 'Angel Island', 'Golden Gate Park', 'Fort Point', 'Mount Davidson', 'Ferry Building', 'Coit Tower', 'Mission District', 'Castro Theatre', 'Alcatraz'];
var placesContainer= ko.observable([
					{ name:'Gol{den Gate Bridge', location:{lat: 37.8199286, lng: -122.47825510000001}, titleVisible:ko.observable(true)},
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
var actualMarker;
//suscribe it and as soon as the value change it calls the hide titles, hide markers from pass info function
var labelContainer = ko.observable(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"])

var passTheInfo;
var koAddress = ko.observable("");
//var label;

//add a branch to make do the vegan app and search api and location in places


function initMap(){

	var directionsDisplay;


	//Creating map
	map = new google.maps.Map(document.getElementById('map'), {

    	center: { lat: 37.82, lng: -122.431297},
    	zoom: 12

    });

	//Iterating over placesList to look for it in Google's places library
	//Call createMarker
	for (var i = 0; i < placesContainer().length; i++) {

		var name = placesContainer()[i].name;
		var position = placesContainer()[i].location;
		var counter = i + 1;
		createMarker(placesContainer()[i], counter)

	}

	//var label = 1;

	function createMarker(place, counter){


			var labelStr = i.toString()
			var title = place.name;


			// var latLng = data[0].geometry.location.toJSON();
			// var placeName = data[0].name;
			// console.log(placeName)
			// console.log(latLng)
			//console.log(data)
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
			infoWindow =  new google.maps.InfoWindow();
	  		google.maps.event.addListener(marker, 'click', passTheInfo)
	  		place.marker = marker;

	  		//place.pLabel = label;
	  		//console.log(place)

	  		//counter = counter + 1




	}


	openInfoWindow = function(marker, address, wikiInfo){



		//console.log(infoWindow.marker)
		var htmlBlock = "<div><b>"+marker.title+"</b></div>"+
						"<div>"+ address + "</div>"+
						"<div>"+ wikiInfo +
						"</div><a href='https://en.wikipedia.org/wiki/"+marker.title+"'>More info</a>";
		//console.log(htmlBlock)



		getElementById
		infoWindow.setContent(htmlBlock);
		infoWindow.open(map, marker)

		markerSelected = marker

	}

	askInfoToPlacesLibrary = function(marker){

		//console.log("success click from MV to maps")
		var name = marker.title
		var placeServices = new google.maps.places.PlacesService(map);
		placeServices.textSearch({query: name}, placeInformation)
		marker.setAnimation(google.maps.Animation.BOUNCE);
		function placeInformation(data, status){
			//console.log(data)
			//console.log()
			var domElementForAdress = document.getElementById(name)

			if (status == google.maps.places.PlacesServiceStatus.OK) {

				var placeInfo = data[0]
				var address = placeInfo.formatted_address;
				//console.log(domElementForAdress)
				console.log(address)
				koAddress("")
				koAddress(address)


				//domElementForAdress.appendChild(addressNode)
				//askWikiInfo(address, marker)
			}






			//console.log(address)
			//console.log(types)

		}




	}

		//console.log(address)
		//askWikiInfo(name)

		///function make



	function giveHTMLBlock(array, configuration){
		var span;
		var value = "";
		for (var i = 0; i < array.length; i++) {
			if(configuration==="span"){
				span = document.createElement('span')
				value += ", " + array[i]


			}

		};
		var content = document.createTextNode(value)
		span.appendChild(content)
		return span
	}

	askWikiInfo = function(address, marker){



	    	//console.log(data)

	}

	function passTheInfo(){
		markerSelected(this);
		//console.log(markerSelected())
		hideMarkers(this)

		askInfoToPlacesLibrary(this)





	}

	showDirections = function(geoposition){

			console.log("sucess show dir callGoogleDirections")
			map.setZoom(12)

			var travelMode;
			var latitude= geoposition.coords.latitude;
			var longitud = geoposition.coords.longitude;
			//console.log(marker)
			var userLocation = {lat: latitude, lng: longitud}


			//hidePlaces()


	            var userMarker = new google.maps.Marker({
        			map: map,
        			position: userLocation,
        			icon: {
      				path: "M22-48h-44v43h16l6 5 6-5h16z",
      				scale: 0.8,
  					fillColor: '#1569C7',
  					fillOpacity: 0.6,
      				strokeColor: 'black'
    				}
  				});

	            google.maps.event.addListener(userMarker, 'click', function(){
	            	infoWindow.setContent("Your location")

  					infoWindow.open(map, this)
  				})


  				//showRoute(userLocation)




        	// function(e){

        	// 	window.alert("Sorry we were unable to find your location");

        	// 	//console.log(e)
        	// });


    		//console.log(currentLocation)
    		console.log("sucess show route")
    		var directionsService = new google.maps.DirectionsService();
    		directionsDisplay = new google.maps.DirectionsRenderer();
    		directionsDisplay.setMap(map);
			directionsDisplay.setPanel(document.getElementById('steps'))

				travelMode = document.getElementById('travelMode').value
				console.log(markerSelected().position)
				//console.log(selectedLocation.address())

  				var request = {
			    	origin: userLocation,
			     	destination: markerSelected().position,

			    	travelMode: google.maps.TravelMode[travelMode]
		 		};

		    directionsService.route(request, function(response, status) {
		    	console.log(response)

		    	if (status == google.maps.DirectionsStatus.OK) {
		    		userMarker.setVisible(false)
		    		markerSelected().setVisible(false)
		      		directionsDisplay.setDirections(response);
		      		//console.log("si")
		      		var basePath = response.routes[0].legs[0];

		      		var userLocationAdress = basePath.start_address;
		      		var finalDestinaton = markerSelected.title;
		      		var distance = basePath.distance.text;
		      		var duration = basePath.duration.text





		    	}
		    	else if(status == google.maps.DirectionsStatus.ZERO_RESULTS){
		    		alert("No route could be found between the origin and destination. Please try another travel mode")
		    	}
		    	else{
		    		alert("Sorry there was an error:" + status)
		    		console.log(status)

		    	}
	  		});
	  		//timeToGetThere(userPosition)
	  		var w = document.getElementById('travelMode').value;
	  		console.log(w)



    }





	hideMarkers = function(marker){

		map.setZoom(15)
		//console.log(marker.position)
		map.setCenter(marker.position)




		for (var i = 0; i < placesContainer().length; i++) {
			var place = placesContainer()[i];
			//console.log(placesContainer()[i].marker)
			if(place.marker != marker){
				//console.log("sucess call showhide markers")
				place.marker.setVisible(false)
			}
			//placesContainer[i]
		};
	}

	showAllMarkers = function(){

		map.setZoom(12)
		map.setCenter({ lat: 37.82, lng: -122.431297})
		console.log(directionsDisplay)
		if(directionsDisplay != undefined){
			directionsDisplay.setMap(null)
			directionsDisplay.setPanel(null)
		}
		for (var i = 0; i < placesContainer().length; i++) {
			var place = placesContainer()[i]
			place.marker.setVisible(true)
		}
	};


	hideOrShowMarker = function(place, boolean){

		place.marker.setVisible(boolean)
	};

	setMapZoom = function(){
		map.setZoom(12)
	}








	// Para cerrar infowindows cuando se da click fuera del marcador// This event listener will call addMarker() when the map is clicked.
 //  map.addListener('click', function(event) {
 //    addMarker(event.latLng);
 // https://developers.google.com/maps/documentation/javascript/examples/marker-remove
 //  });
	//stop animation when click
// function toggleBounce() {
//   if (marker.getAnimation() !== null) {
//     marker.setAnimation(null);
//   } else {
//     marker.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }
//https://developers.google.com/maps/documentation/javascript/examples/marker-animations


}



function myViewModel(){


	var self = this
	//self.userLocation = ko.observable("")
	self.addressVisible = ko.observable(false)
	self.infoVisible = ko.observable(false);
	self.inputValue = ko.observable("");
	self.placeAddress = ko.observable("");
	self.wikiInfo = ko.observable("yay")
	self.url = ko.observable("")
	self.goToWikiPage = ko.observable("More Info")
	self.showMyLocation = ko.observable(true)
	//self.addressVisible = ko.observable(false)
	//console.log(markerSelected)
	self.giveWikiInfo = function(name){

	nameWithUnderscore = name.replace(/\s/g, "_")


	wikiPromise = $.ajax({

		type: "get",
		url:"https://www.wikipedia.org/w/api.php?action=query&list=search&srsearch="+nameWithUnderscore+"&format=json&callback=wikiCallback",
		dataType: "jsonp",

	});
	return wikiPromise
}



	self.trial = function(){
		//console.log("click sucess from maps")
	}

	self.passClickInformation = function(){

		askInfoToPlacesLibrary(this.marker)
		self.hideTitles(this.marker)
		markerSelected(this.marker)
		self.showWikiInfo(this.marker)
		self.infoVisible(true)
		//self.getGeolocation()
	}

	self.hideTitles = function(marker){

		hideMarkers(marker)

		for (var i = 0; i < placesContainer().length; i++) {

			if(placesContainer()[i].marker!=marker){
				placesContainer()[i].titleVisible(false)
				//console.log(placesContainer()[i].titleVisible(false))
			}
		};
	}

	self.showAllTitles = function(){
		//console.log("sucess on click show All")
		showAllMarkers()
		self.infoVisible(false)

		for (var i = 0; i < placesContainer().length; i++) {

			placesContainer()[i].titleVisible(true)
		}
	}


	markerSelected.subscribe(function(marker){
		//console.log(event)
		self.hideTitles(marker)
		console.log(event)
		self.showWikiInfo(marker)
	})
	self.inputValue.subscribe(function(newValue) {

		self.infoVisible(false)
		setMapZoom()


		for(var i = 0; i < placesContainer().length; i++){
			var place = placesContainer()[i]
			var regex = /[a-z]/

			console.log(event)


			//hideOrShowMarker(true, true)
			//console.log(self.inputValue().length)
			if(self.inputValue().length > 0 && self.inputValue().search(regex)>=0){
				if(place.name.toLowerCase().includes(self.inputValue().toLowerCase()) === true){

					//console.log(place.name())
					//self.setParameters(place, true, map)
					place.titleVisible(true)
					//hideMarkers(place.marker)
					hideOrShowMarker(place, true)
					//setMarkerVisibility(place, map)
					//setDirectionsVisibility(null)
					//directionsDisplay.setMap(null);

				}

				else{

					//self.setParameters(place, false, null)
					place.titleVisible(false)
					hideOrShowMarker(place, false)
					//setMarkerVisibility(place, null)

				}
			}
			else{
				//selectedLocation.placeDirections(null)
				//self.setParameters(place, true, map)
				//self.showAllPlaces()
					place.titleVisible(true)
					hideOrShowMarker(place, true)
					//setMarkerVisibility(place, map)

			}
		}
	});

	koAddress.subscribe(function(address){
		//console.log(address)
		self.infoVisible(true)
		console.log(self.infoVisible())
		self.placeAddress(address);



	})

	self.showWikiInfo = function(marker){
		wikiPromise = self.giveWikiInfo(marker.title)
	    wikiPromise.then(function(data){
	    	console.log(data)
	    	if(data.query.search.length===0){

	    		alert("Sorry we couldn't find any Wikipedia Information for the place you are looking for")
	    	}
	    	else{
	    		var wikiPlaceInfo = data.query.search[0].snippet

	    		//openInfoWindow(marker, address, wikiPlaceInfo)
	    		self.wikiInfo(wikiPlaceInfo)
	    		var wikiUrl = 'https://en.wikipedia.org/wiki/'+marker.title;
	    		console.log(wikiUrl)
	    		self.url(wikiUrl)
	    	}

		})

	}

	self.getGeolocation = function(){
		console.log("sucess call to geolocation function")
		geo = navigator.geolocation
			var position = geo.getCurrentPosition(positionCall)
			function positionCall(data){
			//showDirections(data)

			self.userLocation(data)
			console.log(data)
		}
		 //console.log(position)
	}

	self.callGoogleDirections = function(){
		console.log("sucess click take me there")
		//console.log(markerSelected().position)

		//showDirections(markerSelected)

		geo = navigator.geolocation
		var position = geo.getCurrentPosition(positionCall)
		//console.log(position)

		function positionCall(data){
			console.log(data)
			showDirections(data)

		}

	}



}



ko.applyBindings(new myViewModel());

