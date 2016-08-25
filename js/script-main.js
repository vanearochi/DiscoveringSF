

//




	var map;
	var placesInfo= ko.observableArray();

	var placesName = ['Museum of Modern Art', 'San Francisco Maritime National Historical Park', 'Mount Davidson Park','Cartoon Art Museum', 'Chinese Historical Society of America Museum',
		'Tank Hill','San Francisco Public Library','Ocean Beach','San Francisco Symphony','Fort Point'];


	function initMap(){

		 map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 37.773972, lng: -122.431297},
          zoom: 10
        });

		var placesService = new google.maps.places.PlacesService(map);


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
      			var rating = data[0].rating;

      			//createPlacesData(name, address, marker)

      			//console.log(placesInfo().length)
				getWikiInfo(name)
				var nameWithUnderscore;

				function getWikiInfo(namePlace){

					nameWithUnderscore = namePlace.replace(/\s/g, "_")
					var wikiSnippet;

					$.ajax({

						type: "get",
						url:"https://www.wikipedia.org/w/api.php?action=query&list=search&srsearch="+nameWithUnderscore+"&format=json&callback=wikiCallback",
						dataType: "jsonp",
						success: bla
					})


					function bla(json){

			 		wikiSnippet = json.query.search[0].snippet
					createInfoWinText(wikiSnippet)

					}
				}


				function createInfoWinText(placeSnippet){

					var wikiInfo=placeSnippet;
					//console.log(a)
					infoWindowText = "<div>"+name +" </div><div>"+address+"</div><div>"
					+"<div>Rating: "+rating+"</div><div>"+placeSnippet+"</div><a href='https://en.wikipedia.org/wiki/"+nameWithUnderscore+"'>More info</a>";

					placesInfo.push({placeName: name, placeAddress: address, placeMarker: marker, placeWikiInfo: wikiInfo, placeRating: rating})
				}


				google.maps.event.addListener(marker, 'click', function() {



					 var htmlInfoWindow = "<div>"+data[0].name +" </div><div>"+data[0].formatted_address+"</div><div>"
					 +"<div>Rating: "+data[0].rating+"</div><div></div>";

					infoWindow.setContent(infoWindowText);
	        		infoWindow.open(map, this);

	     		});


      			if(placesInfo().length === 10){
      				myViewModel()
      			}
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
	// 	function createPlacesData(placeName, placeAddress, placeMarker){

	// 	this.pName = ko.observable(placeName);
	// 	//console.log(this.p)
	// 	this.pAddress = ko.observable(placeAddress);
	// 	this.pMarker = ko.observable(placeMarker);
	// 	    // Initially an empty array
	// 	placesInfo.push({name:this.pName, address: this.pAddres, marker: pMarker})


	// 	console.log(placesInfo().length)
	// 	console.log(placesInfo())

	// 	//this.placeMarker = ko.observable(marker);

	// 	// this.fullPlaceInfo = ko.computed(function(){
	// 	// 	console.log(this.pName())
	// 	// 	console.log(this.pAddress())

	// 	// 	return this.pName() +" "+ this.pAddress();

	// 	// }, this);
	// 	//placesInfo.push({placeName: name, placeAddress: address, placeMarker: marker})
	// 	//console.log(placesInfo)


	// }
	// 	ko.applyBindings(createPlacesData);
	//console.log(placesInfo().length)

	//google.maps.event.addListenerOnce( marker, 'tilesloaded', tt())
	}



		function myViewModel(){
			var self = this;
			self.places = placesInfo
			//console.log(placesInfo()[0])

			self.bla = function(){
				//placesInfo.remove(this)
				console.log(this.placeMarker)
				console.log(this.placeName)
				this.placeMarker.setAnimation(google.maps.Animation.BOUNCE);
				var nameWithUnderscore = this.placeName.replace(/\s/g, "_")
				var infoWindowText = "<div>"+this.placeName +" </div><div>"+this.Address+"</div><div>"
					+"<div>Rating: "+this.placeRating+"</div><div>"+this.placeWikiInfo
					+"</div><a href='https://en.wikipedia.org/wiki/"+ nameWithUnderscore
					+"'>More info</a>";

				infoWindow.setContent(infoWindowText);
	        		infoWindow.open(map, this.placeMarker);
				}


			//function showMarkerInfo(){}
		}


					//console.log(a)



		ko.applyBindings(new myViewModel());


