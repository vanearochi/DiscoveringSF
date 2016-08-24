

//




	var map;
	var placesInfo= [];

	var placesName = ['Museum of Modern Art', 'San Francisco Maritime National Historical Park', 'Mount Davidson Park','Cartoon Art Museum', 'Chinese Historical Society of America Museum',
		'Tank Hill','San Francisco Public Library','Ocean Beach','San Francisco Symphony','Fort Point'];
//ko.applyBindings(myViewModel);

	var place = function(placeName, address, marker){

		console.log(placesInfo)

	}

place()
//console.log()

	function createPlacesData(name, address, marker){
		this.placeName = name,
		this.placeAddress = address,
		this.placeMarker = marker

		this.fullPlaceInfo = ko.observable
		//placesInfo.push({placeName: name, placeAddress: address, placeMarker: marker})
		//console.log(placesInfo)


	}

	myViewModel
//createPlacesData()


	function initMap(){

		 map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 37.773972, lng: -122.431297},
          zoom: 10
        });



		// 'Buena Vista Park', 'Seward Mini Park', 'Fort Baker', 'Vista Point', 'Yerba Buena Island', '1111 minna gallery',,
		// 'Diego Rivera Theatre', 'Anchor Brewing Company', 'Camera Obscura', 'Autodesk Gallery',
		// 'Lafayette Park','San Francisco Armory', 'Cellarmaker Brewing Co.', 'Martin Luther King, Jr. Memorial', ,'GLBT History Museum',
		// 'Sutro Heights Park','Bernal Heights Park','Old Cathedral of St. Mary','SFJazz Center','Grand View Park','Clarion Alley Murals','China Beach',
		// 'Stow Lake Boathouse','San Francisco Ballet',"SS Jeremiah O'Brien",
		// 'USS Pampanito','16th Avenue Tiled Steps','Japanese Tea Garden','Angel Island','Golden Gate Promenade','Baker Beach','Asian Art Museum',
		// 'Walt Disney Family Museum','Twin Peaks','USS San Francisco Memorial','San Francisco Botanical Garden','Grace Cathedral','Lands End',
		// 'San Francisco City Hall','Palace of Fine Arts','Cliff House','Coit Tower','Sutro Baths',
		// 'Crissy Field','Presidio','de Young Museum','Legion of Honor'
	// var infoWindow = new google.maps.InfoWindow({
	// 	//content: "infowindow LKAHDJKSJADLKJLSDJLD"
	// 	minWidth: 200
	// });
	// //var bounds = new google.maps.LatLngBounds();
		var placesService = new google.maps.places.PlacesService(map);
	//This will get the panorama based on the closest location to the marker
	// it just need where to point the camara - heading and pitch

	//StreetViewService.getPanoramaByLocation(marker.position, 50, )

	//var radious = 50;

	// for(var i = 0; i < locations.length; i++){
	// 	var placeLocation =locations[i].location;
	// 	var name = locations[i].title;

	// 	var marker = new google.maps.Marker({
	// 		map: map,
	// 		position: placeLocation,
	// 		title: name,
	// 		//animation : google.maps.Animation.DROP,
	// 		//id: i
	// 	})

	//markers.push(marker);

	// marker.addListener("click", function(){
	// 	//console.log(this.id)
	// 		infoWindow.setContent("<div>" + this.title +"</div>" + "<div id='pano' style='height:100px; width: 100px'></div>")
	// 		this.setAnimation(google.maps.Animation.DROP);

	// 	openInfoWindow(this)
	// 	console.log(this)
	// 	getPlacesInfo(this)
	// })

	// function openInfoWindow(clickedMarker){
	// 	console.log(i)
	// 	console.log(markers)
	// 	console.log(infoWindow.content)

	// 	 infoWindow.open(map, clickedMarker)


	// }

		//streetView.getPanoramaByLocation(marker.position, radius, getStreetView)
			////infoWindow.open(map,marker)
	//};






		for (var i = 0; i < placesName.length; i++) {

			var placeName = placesName[i]

			var placeServices = new google.maps.places.PlacesService(map);

			placeServices.textSearch({query: placeName}, getPlaceInfo)
		};


		function getPlaceInfo(data, status){

			var infoWindowText;
			infoWindow =  new google.maps.InfoWindow();

			if (status == google.maps.places.PlacesServiceStatus.OK) {

				var marker = new google.maps.Marker({
        			map: map,
        			position: data[0].geometry.location
      			});


      			//console.log(markers)
      			var location = data[0].geometry.location;
      			var name= data[0].name;
      			var address = data[0].formatted_address;
      			createPlacesData(name, address, marker)
				getWikiInfo(name)
				var a;

				function getWikiInfo(namePlace){

					a = namePlace.replace(/\s/g, "_")
					var wikiSnippet;

					$.ajax({

						type: "get",
						url:"https://www.wikipedia.org/w/api.php?action=query&list=search&srsearch="+a+"&format=json&callback=wikiCallback",
						dataType: "jsonp",
						success: bla
					})


					function bla(json){

			 		wikiSnippet = json.query.search[0].snippet
					createInfoWinText(wikiSnippet)

					}
				}

				function createInfoWinText(x){
					//console.log(a)
					infoWindowText = "<div>"+name +" </div><div>"+address+"</div><div>"
					+"<div>Rating: "+data[0].rating+"</div><div>"+x+"</div><a href='https://en.wikipedia.org/wiki/"+a+"'>More info</a>";

				}


				google.maps.event.addListener(marker, 'click', function() {

					//console.log(rr)

					// var htmlInfoWindow = "<div>"+data[0].name +" </div><div>"+data[0].formatted_address+"</div><div>"
					// +"<div>Rating: "+data[0].rating+"</div><div></div>";

	        		infoWindow.setContent(infoWindowText);
	        		infoWindow.open(map, this);

	     		});
			}



			var directionsService = new google.maps.DirectionsService();
			var haight = new google.maps.LatLng(37.7699298, -122.4469157);
			var oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
 			directionsDisplay = new google.maps.DirectionsRenderer();
 			directionsDisplay.setMap(map);
   			directionsDisplay.setPanel(document.getElementById("directionsPanel"))

  			function calcRoute() {

	  			var request = {
			    	origin: haight,
			     	destination: oceanBeach,
			      // Note that Javascript allows us to access the constant
			      // using square brackets and a string value as its
			      // "property."
			    	travelMode: google.maps.TravelMode["TRANSIT"]
			 	};

			    directionsService.route(request, function(response, status) {
			    	if (status == google.maps.DirectionsStatus.OK) {
			      		directionsDisplay.setDirections(response);
			      		//console.log("si")
			    	}
		  		});

			}

		///calcRoute()

//console.log(markers)


	// for(var i = 0; i < locations.length; i++){
	// 	var placeLocation =locations[i].location;
	// 	var name = locations[i].title;

	// 	var marker = new google.maps.Marker({
	// 		map: map,
	// 		position: placeLocation,
	// 		title: name,
	// 		//animation : google.maps.Animation.DROP,
	// 		//id: i
	// 	})

	}
//console.log(markers)
	}
	//console.log(markers)
//$(document).ready(function(){
	///console.log(markers)


	//console.log(markers)
	//ko.applyBindings(myViewModel);



		//console.log(position)

//});

