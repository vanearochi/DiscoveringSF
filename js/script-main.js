
var map;
var placesList = [ 'Golden Gate Bridge', 'Angel Island', 'Golden Gate Park', 'Fort Point', 'Mount Davidson', 'Ferry Building', 'Coit Tower', 'Mission District', 'Castro Theatre', 'Alcatraz'];
var placesContainer= [
					{name:'Golden Gate Bridge', location:{lat: 37.8199286, lng: -122.47825510000001}},
					{name:'Angel Island', location: {lat: 37.860909, lng: -122.43256819999999}},
					{name:"Golden Gate Park", location: {lat: 37.7694208, lng: -122.48621379999997}},
					{name:"Fort Point", location: {lat: 37.8105931, lng: -122.4771093}},
					{name:"Mount Davidson", location: {lat: 37.73833330000001, lng: -122.4533333}},
					{name:"San Francisco Ferry Building", location: {lat: 37.7955469, lng: -122.39341769999999}},
					{name: "Coit Tower", location:{lat: 37.8023949, lng: -122.40582219999999}},
					{name: "Mission District", location:{lat: 37.7598648, lng: -122.41479770000001}},
					{name:"The Castro Theatre", location:{lat: 37.761992, lng: -122.43473590000002}},
					{name:"Alcatraz Island", location:{lat: 37.8269775, lng: -122.4229555}}
				]
var markerSelected;

var passTheInfo;



//

function initMap(){

	//Creating map
	map = new google.maps.Map(document.getElementById('map'), {

    	center: { lat: 37.773972, lng: -122.431297},
    	zoom: 10

    });

	//Iterating over placesList to look for it in Google's places library
	//Call createMarker
	for (var i = 0; i < placesContainer.length; i++) {

		var name = placesContainer[i].name;
		var position = placesContainer[i].location;
		createMarker(name, position, placesContainer[i])
	}


	var counter = 0
	function createMarker(name, position, place){



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
					scale: 0.4
					},
	    		title: name,
	    		id: counter

	  		});
			infoWindow =  new google.maps.InfoWindow();
	  		google.maps.event.addListener(marker, 'click', passTheInfo)

	  		place.marker = marker;


	  		counter += 1




	}

	openInfoWindow = function(marker, address, wikiInfo){



		//console.log(infoWindow.marker)
		var htmlBlock = "<div><b>"+marker.title+"</b></div>"+
						"<div>"+ address + "</div>"+
						"<div>"+ wikiInfo +
						"</div><a href='https://en.wikipedia.org/wiki/"+marker.title+"'>More info</a>";
		console.log(htmlBlock)




		infoWindow.setContent(htmlBlock);
		infoWindow.open(map, marker)

		markerSelected = marker

	}

	askInfoToPlacesLibrary = function(marker){
		var name = marker.title
		var placeServices = new google.maps.places.PlacesService(map);
		placeServices.textSearch({query: name}, placeInformation)
		marker.setAnimation(google.maps.Animation.BOUNCE);
		function placeInformation(data, status){
			console.log(data)
			if (status == google.maps.places.PlacesServiceStatus.OK) {

				var placeInfo = data[0]
				var address = placeInfo.formatted_address;
				askWikiInfo(address, marker)
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

		wikiPromise = giveWikiInfo(marker.title)
	    wikiPromise.then(function(data){
	    		var wikiPlaceInfo = data.query.search[0].snippet
	    		console.log(marker.title)
	    		openInfoWindow(marker, address, wikiPlaceInfo)




	    })
	    	//console.log(data)

	}

	function passTheInfo(){


		//console.log("click sucess")
		//console.log(this.title)
		var name = this.title
		askInfoToPlacesLibrary(this)



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

function giveWikiInfo(name){

	nameWithUnderscore = name.replace(/\s/g, "_")


	wikiPromise = $.ajax({

		type: "get",
		url:"https://www.wikipedia.org/w/api.php?action=query&list=search&srsearch="+nameWithUnderscore+"&format=json&callback=wikiCallback",
		dataType: "jsonp",
	});
	return wikiPromise
}

function myViewModel(){

	var self = this
	self.inputValue = ko.observable("");

	self.passClickInformation = function(){

		console.log("sucess open info")
		console.log(this)
		var name
		//passTheInfo(this.name())
		askInfoToPlacesLibrary(this.marker)
	}

	self.inputValue.subscribe(function(newValue) {

		for(var i = 0; i < placesContainer().length; i++){
			var place = placesContainer()[i]
			var regex = /[a-z]/
			//console.log(self.inputValue().length)
			if(self.inputValue().length > 0 && self.inputValue().search(regex)>=0){
				if(place.name().toLowerCase().includes(self.inputValue().toLowerCase()) === true){

					//console.log(place.name())
					//self.setParameters(place, true, map)
					place.showNameOnList(true)
					setMarkerVisibility(place, map)
					setDirectionsVisibility(null)
					//directionsDisplay.setMap(null);

				}

				else{

					//self.setParameters(place, false, null)
					place.showNameOnList(false)
					setMarkerVisibility(place, null)

				}
			}
			else{
				//selectedLocation.placeDirections(null)
				//self.setParameters(place, true, map)
				//self.showAllPlaces()
					place.showNameOnList(true)
					setMarkerVisibility(place, map)

			}
		}
	});



}



ko.applyBindings(new myViewModel());

 //var name = "Balboa Park"
//askInfoToPlacesLibrary(name)

//google.maps.event.addDomListener(window, 'load', askInfoToPlacesLibrary)