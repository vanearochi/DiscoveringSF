

//$(document).ready(function(){


	var map;
	var markers = [];
	function initMap(){
		 map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.773972, lng: -122.431297},
          zoom: 10
        });

	var locations = [
		{title: 'Lake Merced', location:{lat: 37.7197001, lng: -122.5024269}},
		{title:'Alta Plaza Park', location:{lat: 37.7911459, lng: -122.4398128 }},
		{title:'Mount Sutro Forest', location:{lat: 37.7592243 , lng: -122.4594192 }},
		{title:'Corona Heights Park', location:{lat: 37.7653164, lng: -122.4407733  }},
		{title:'Kite Hill Open Space', location:{lat: 37.7582858, lng: -122.4437813  }},
		{title:'Tank Hill Park', location:{lat: 37.7601025, lng: -122.4499741 }},
		{title:'San Francisco Maritime National Historical Park', location:{lat: 37.807743, lng: -122.4263387 }},
		{title:'Billy Goat Hill Park', location:{lat: 37.7419262 , lng: -122.4354381}},
		{title:'Transamerica Redwood Park', location:{lat: 37.7951859, lng: -122.4044045 }},
		{title:"Levi's Plaza", location:{lat: 37.802451 , lng: -122.4042798 }},
		{title:'Pioneer Park', location:{lat: 37.8028617, lng: -122.4081774 }},
		{title:'Buena Vista Park', location:{lat: 37.7682075, lng: -122.4439583 }},
		{title:'Seward Mini Park', location:{lat: 37.7578734, lng: -122.4419054,  }},
		{title:'Fort Baker', location:{lat: 37.8360656, lng: -122.4810866 }},
		{title:'Vista Point', location:{lat: 37.8324455, lng: -122.4816567 }},
		{title:'Yerba Buena Island', location:{lat: 37.8114672 , lng: -122.3701841 }},
		{title:'1111 minna gallery', location:{lat: 37.7873264, lng: -122.4016011 }},
		{title:'Mount Davidson Park', location:{lat: 37.7400904,lng: -122.4573238 }},
		{title:'Diego Rivera Theatre', location:{lat: 37.7275731, lng: -122.4531141  }},
		{title:'Anchor Brewing Company', location:{lat: 37.691067, lng: -122.4637165 }},
		{title:'Chinese Historical Society of America Museum', location:{lat: 37.7938376, lng: -122.411033 }},
		{title:'Camera Obscura', location:{lat: 37.7782844, lng: -122.5164282 }},
		{title:'Autodesk Gallery', location:{lat: 37.7938828, lng: -122.3970065 }},
		{title:'Lafayette Park', location:{lat: 37.7916188, lng: -122.429802 }},
		{title:'San Francisco Armory', location:{lat: 37.7678212, lng: -122.4227637  }},
		{title:'Cellarmaker Brewing Co.', location:{lat: 37.7771752, lng: -122.4129187 }},
		{title:'Martin Luther King, Jr. Memorial', location:{lat: 37.7846283, lng: -122.4045047 }},
		{title:'Cartoon Art Museum', location:{lat: 37.7869157, lng: -122.4031407 }},
		{title:'GLBT History Museum', location:{lat: 37.7607463, lng: -122.437842}},
		{title:'Sutro Heights Park', location:{lat: 37.7777984, lng: -122.5132962  }},
		{title:'Bernal Heights Park', location:{lat: 37.740437, lng: -122.4283289 }},
		//{title:'Queen Wilhelmina Tulip Garden', location:{lat: 37.7701679, lng: -122.5104431 }},
		{title:'Old Cathedral of St. Mary', location:{lat: 37.7928487, lng: -122.4079996 }},
		{title:'SFJazz Center', location:{ lat: 37.7762655, lng: -122.4235646 }},
		{title:'Grand View Park', location:{lat: 37.756267, lng: -122.4740339 }},
		{title:'Clarion Alley Murals', location:{lat: 37.7630469, lng: -122.4225164 }},
		{title:'China Beach', location:{lat: 37.7878863, lng: -122.4931363 }},
		{title:'San Francisco Public Library', location:{lat: 37.7791635 , lng: -122.4333653 }},
		{title:'Stow Lake Boathouse', location:{lat: 37.7707888, lng: -122.479296}},
		{title:'San Francisco Ballet', location:{lat: 37.7987136, lng: -122.4143343 }},
		{title:'Ocean Beach', location:{lat: 37.7690228, lng: -122.514832 }},
		{title:'San Francisco Symphony', location:{lat: 37.7776539, lng: -122.422757 }},
		{title:"SS Jeremiah O'Brien", location:{lat: 37.811068, lng: -122.4203329  }},
		{title:'USS Pampanito', location:{lat: 37.8099534, lng: -122.4186085 }},
		{title:'16th Avenue Tiled Steps', location:{lat: 37.7562747, lng: -122.4753632  }},
		{title:'Japanese Tea Garden', location:{lat: 37.7700956, lng: -122.4726247  }},
		{title:'Angel Island', location:{lat: 37.8623499, lng: -122.4411312 }},
		{title:'Golden Gate Promenade', location:{lat: 37.8048283, lng: -122.462041 }},
		{title:'Baker Beach', location:{lat: 37.7938926, lng: -122.4897051 }},
		{title:'Asian Art Museum', location:{lat: 37.7802156, lng: -122.4184503 }},
		{title:'Walt Disney Family Museum', location:{lat: 37.8013872, lng: -122.4609285 }},
		{title:'Twin Peaks', location:{lat: 37.7532677, lng: -122.460038 }},
		{title:'USS San Francisco Memorial', location:{lat: 37.782801, lng: -122.5137956 }},
		{title:'San Francisco Botanical Garden', location:{lat: 37.7674776, lng: -122.4725242 }},
		{title:'Grace Cathedral', location:{lat: 37.7918387, lng: -122.4155322 }},
		{title:'Lands End', location:{lat: 37.7848878, lng: -122.5096987 }},
		{title:'San Francisco Museum of Modern Art', location:{lat: 37.7857224, lng: -122.4032395 }},
		{title:'San Francisco City Hall', location:{lat: 37.7793501, lng: -122.4209457 }},
		{title:'Fort Point', location:{lat: 37.8105973, lng: -122.479298 }},
		{title:'Palace of Fine Arts', location:{lat: 37.8029159, lng: -122.4505563  }},
		{title:'Cliff House', location:{lat: 37.7784894, lng: -122.516152 }},
		{title:'Coit Tower', location:{lat: 37.8026936, lng: -122.4080248 }},
		{title:'Sutro Baths', location:{lat: 37.7804955, lng: -122.5159028 }},
		{title:'Crissy Field', location:{lat: 37.8039111, lng: -122.4662505 }},
		{title:'Presidio', location:{lat: 37.7989912, lng: -122.4749415 }},
		{title:'de Young Museum', location:{lat: 37.7714732, lng: -122.4708642 }},
		{title:'Legion of Honor', location:{lat: 37.7844703, lng: -122.5030306 }}
	]

	var infoWindow = new google.maps.InfoWindow({
		//content: "infowindow LKAHDJKSJADLKJLSDJLD"
		minWidth: 200
	});
	//var bounds = new google.maps.LatLngBounds();
	var placesService = new google.maps.places.PlacesService(map);
	//
	var streetView= new google.maps.StreetViewService();

	//StreetViewService.getPanoramaByLocation(marker.position, 50, )

	//var radious = 50;

	for(var i = 0; i < locations.length; i++){
		var placeLocation =locations[i].location;
		var name = locations[i].title;

		var marker = new google.maps.Marker({
			map: map,
			position: placeLocation,
			title: name,
			//animation : google.maps.Animation.DROP,
			id: i
		})

	markers.push(marker);

	marker.addListener("click", function(){
		console.log(this)
			infoWindow.setContent("<div>" + this.title +"</div>" + "<div id='pano'>" + +"</div>")
			this.setAnimation(google.maps.Animation.DROP);

		openInfoWindow(this)

	})

	function openInfoWindow(marker){
		console.log(i)
		console.log(markers)
		console.log(infoWindow.content)

		infoWindow.open(map, marker)
		 panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'),
      {
        position: {lat: 37.773972, lng: -122.431297},
        //pov: {heading: 165, pitch: 0},
        zoom: 1
      });
	var bla = panorama.getPano();
	//infoWindow.setContent(bla)
	console.log(bla)


	}



	}


		//console.log(position)
	}
//});

