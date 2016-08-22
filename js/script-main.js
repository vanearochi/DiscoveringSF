

//$(document).ready(function(){




	var map;
	var markers = [];
	function initMap(){
		 map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 37.773972, lng: -122.431297},
          zoom: 10
        });

	var placesName = ['Lake Merced', 'Alta Plaza Park', 'Mount Sutro Forest','Corona Heights Park', 'Kite Hill Open Space','Tank Hill',
		'San Francisco Maritime National Historical Park','Billy Goat Hill','Transamerica Redwood Park',"Levi's Plaza",'Pioneer Park',
		'Buena Vista Park', 'Seward Mini Park', 'Fort Baker', 'Vista Point', 'Yerba Buena Island', '1111 minna gallery','Mount Davidson Park',
		'Diego Rivera Theatre', 'Anchor Brewing Company', 'Chinese Historical Society of America Museum', 'Camera Obscura', 'Autodesk Gallery',
		'Lafayette Park','San Francisco Armory', 'Cellarmaker Brewing Co.', 'Martin Luther King, Jr. Memorial', 'Cartoon Art Museum','GLBT History Museum',
		'Sutro Heights Park','Bernal Heights Park','Old Cathedral of St. Mary','SFJazz Center','Grand View Park','Clarion Alley Murals','China Beach',
		'San Francisco Public Library','Stow Lake Boathouse','San Francisco Ballet','Ocean Beach','San Francisco Symphony',"SS Jeremiah O'Brien",
		'USS Pampanito','16th Avenue Tiled Steps','Japanese Tea Garden','Angel Island','Golden Gate Promenade','Baker Beach','Asian Art Museum',
		'Walt Disney Family Museum','Twin Peaks','USS San Francisco Memorial','San Francisco Botanical Garden','Grace Cathedral','Lands End',
		'San Francisco Museum of Modern Art','San Francisco City Hall','Fort Point','Palace of Fine Arts','Cliff House','Coit Tower','Sutro Baths',
		'Crissy Field','Presidio','de Young Museum','Legion of Honor']

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
			//console.log(placeName)
			//var request = {
			//	query: placeName
			//}

			//console.log(i)
			var placeServices = new google.maps.places.PlacesService(map);
			placeServices.textSearch({query: placeName}, getPlaceInfo)

				//console.log(place[0].name)
				//console.log(place)
				//console.log(request.query)

		};


		function getPlaceInfo(data, status){
			infoWindow =  new google.maps.InfoWindow();

			if (status == google.maps.places.PlacesServiceStatus.OK) {
				var marker = new google.maps.Marker({
        			map: map,
        			position: data[0].geometry.location
      			});
				console.log(data)
			google.maps.event.addListener(marker, 'click', function() {
				var htmlInfoWindow = "<div>"+data[0].name +" </div><div>"+data[0].formatted_address+"</div><div>"
				+"<div>Rating: "+data[0].rating+"</div>"
        		infoWindow.setContent(htmlInfoWindow);
        		infoWindow.open(map, this);
     		 });
			}


				//placeServices.getDetails({ placeId: data[0].place_id}, getPlacesInfo)

			function getPlacesInfo(place, status){
					console.log(status)
				 if (status === google.maps.places.PlacesServiceStatus.OK) {

				 }
			}

		}



		//"<div>"+data[0].rating+"</div>"

				//console.log(data[0].geometry.location)
				//console.log(data[0].place_id)
				//xsconsole.log(data)
				//TODO:
				//location--> data[0].geometry.location
				//address--> data[0].formatted_address
				//rating --> data[0].rating
				//if since not all have opening hours: data[0].opening_hours.open_now
				//if photo data[0].photos
				// var marker = new google.maps.Marker({
				// map: map,
				// position: placeLocation,
				//ask for details better

	// 		title: name,
	// 		//animation : google.maps.Animation.DROP,
	// 		//id: i
	// 	})


			function a(){

	function bla(json){
		console.log(json)

	}

	var urls = ""
	$.ajax({
		type: "get",
		url:"http://api.bart.gov/api/etd.aspx?cmd=etd&orig=RICH&key=MW9S-E7SL-26DU-VV8V",
		success: bla,
		//oauth_consumer_key: "9XjVJ6alaA66cyywOsZWfEDqWYI",
		//oauth_token: "MlWg54p_LSnlHc6f4VdCGfzuuYvQan1U",
		//oauth_signature_method:"hmac-sha1",
		//oauth_signature: "ye2OZmml96Zxf3aoWPE7Ye1M8Bg",
		//oauth_timestamp: "1471904917",
		//oauth_nonce: ""
	})
	}
	a()


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


		//console.log(position)

//});

