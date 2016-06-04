$(function(){


//		lat: '-79.387057',
//		lng: '-79.387057',
document.getElementById('list-section').style.display='none';

google.maps.event.addDomListener(window, 'load', initialize());
	/*var saveContainer = $('.save-container'),
		favoriteIcon = saveContainer.find('.glyphicon'),
		favoriteLocationsListGroup = $('.list-group');

	var hasFavoriteLocations = false;
*/



$('.section').click(function(){
	if($(this).html() == 'List'){
		document.getElementById('list-section').style.display='block';
		document.getElementById('map-section').style.display='none';
		$(this).html("Map");
		//alert(1);
	}else{

		document.getElementById('list-section').style.display='none';
		document.getElementById('map-section').style.display='block';
		$(this).html("List");
		//alert(2);
	}
});

	// Initialize a google maps using the gmaps library.



	// Initialize the favorite locations array which is kept in localStorage

			function initialize() {
						//alert(localindex);
						var directionsService = new google.maps.DirectionsService;
				 		var directionsDisplay = new google.maps.DirectionsRenderer;
						var infowindow = new google.maps.InfoWindow({
										content: 'loading...'
											});
						var mapProp = {
						    center:new google.maps.LatLng( '43.653607', '-79.392512'),
						    zoom:14,
						    mapTypeId:google.maps.MapTypeId.ROADMAP
						};
						var elementtemp = String("map");
						var map = new google.maps.Map(document.getElementById(elementtemp),mapProp);
						
						var markerAquarium = new google.maps.Marker({
						   	position: new google.maps.LatLng( '43.642424', '-79.385865'),
						   	map: map,
						   	title: 'Ripley&apos;s Aquarium'
						 	});
						var markerCN = new google.maps.Marker({
						   	position: new google.maps.LatLng( '43.642566', '-79.387057'),
						   	map: map,
						   	title: 'CN Tower'
						 	});
						var markerzoo = new google.maps.Marker({
						   	position: new google.maps.LatLng( '43.817699', '-79.18589'),
						   	map: map,
						   	title: 'Toronto Zoo'
						 	});
						var markerRoyal = new google.maps.Marker({
						   	position: new google.maps.LatLng( '43.66771', '-79.394777'),
						   	map: map,
						   	title: 'Royal Ontario Museum'
						 	});
						var markerGallery = new google.maps.Marker({
						   	position: new google.maps.LatLng( '43.653607', '-79.392512'),
						   	map: map,
						   	title: 'Art Gallery of Ontario'
						 	});
						var markerYorkdale = new google.maps.Marker({
						   	position: new google.maps.LatLng( '43.725887', '-79.453206'),
						   	map: map,
						   	title: 'Yorkdale Mall'
						 	});
						var markerEaton = new google.maps.Marker({
						   	position: new google.maps.LatLng( '43.653597', '-79.381455'),
						   	map: map,
						   	title: 'Eaton Center'
						 	});
						var markerHall = new google.maps.Marker({
						   	position: new google.maps.LatLng( '43.65344', '-79.38409'),
						   	map: map,
						   	title: 'City Hall'
						 	});
						var markerFame = new google.maps.Marker({
						   	position: new google.maps.LatLng( '43.646988', '-79.377264'),
						   	map: map,
						   	title: 'Hockey Hall of Fame'
						 	});
						var markerAir = new google.maps.Marker({
						   	position: new google.maps.LatLng( '43.643466', '-79.379099'),
						   	map: map,
						   	title: 'Air Canada Center'
						 	});


						 markerEaton.addListener('click', labelapear);
						//marker.setMap(mapProp);
						directionsDisplay.setMap(map);
						var onChangeHandler = function(e) {
							//alert();
							var key = e.which || e.keyCode;
							if (key === 13) {
								//alert();
								calculateAndDisplayRoute(directionsService, directionsDisplay);
							}
				   			
				 			};
				 			var elementdirection = String("direction-from");
						document.getElementById(elementdirection).addEventListener('keypress', onChangeHandler);
					  
					}
					function labelapear() {
						  alert('lable appear');
						}
				
					function calculateAndDisplayRoute(directionsService, directionsDisplay) {
					  var elementdirection = String("direction-from" );
					  directionsService.route({
					    origin: new google.maps.LatLng( '43.642566', '-79.387057'),
					    destination: document.getElementById(elementdirection).value,
					    travelMode: google.maps.TravelMode.DRIVING
					  }, function(response, status) {
					    if (status === google.maps.DirectionsStatus.OK) {
					      directionsDisplay.setDirections(response);
					      //alert('hey');
					    } else {
					    	if(status == "NOT_FOUND"){window.alert("The adress you entered is incorrect. Please enter agian!");}
					      
					    }
					  });
					}


/*

	if(!localStorage.hasOwnProperty('favorite-locations')) {
		localStorage.setItem('favorite-locations', JSON.stringify([]));
	}

	hasFavoriteLocations = JSON.parse(localStorage.getItem('favorite-locations')).length ? true : false;

	// Form submit and Search icon handlers
	$('.glyphicon-search').click(showLocationByAddress);
	$('#geocoding_form').submit(showLocationByAddress);

	// Click handler on any of the favorite locations
	$(document).on('click','a.list-group-item', showLocationByCoordinates);

	// Click handler on the favorite(star) icon to become saved or removed
	$(document).on('click', '.glyphicon-star', removeFavoriteLocation);
	$(document).on('click', '.glyphicon-star-empty', saveFavoriteLocation);

	// If there are any favorite locations, append them to the favorite location list

	if(hasFavoriteLocations) {

		var array = JSON.parse(localStorage.getItem('favorite-locations'));

		favoriteLocationsListGroup.empty();
		favoriteLocationsListGroup.append('<span class="list-group-item active">Saved Locations</span>');

		array.forEach(function(item){
			favoriteLocationsListGroup.append('<a class="list-group-item" data-lat="'+item.lat+'" data-lng="'+item.lng+'" data-createdAt="'+item.createdAt+'">'+item.address+'<span class="createdAt">'+moment(item.createdAt).fromNow()+'</span><span class="glyphicon glyphicon-menu-right"></span></a>');
		});

		favoriteLocationsListGroup.show();

	}
	// This function presents the address which was entered in the text field in the map

	function showLocationByAddress(e) {

		e.preventDefault();

		// Getting the coordinates of the entered address

		GMaps.geocode({
			address: $('#address').val().trim(),
			callback: function(results, status) {

				if (status !== 'OK') return;


				var latlng = results[0].geometry.location,
					fullAddress = results[0].formatted_address,
					isLocationFavorite = false,
					locationsArray = JSON.parse(localStorage.getItem('favorite-locations')),
					saveLocation = $('#save-location');

				var map = new GMaps({
					el: '#map',
					lat: latlng.lat(),
					lng: latlng.lng()
				});

				// Adding a marker on the wanted location
				
				map.addMarker({
					lat: latlng.lat(),
					lng: latlng.lng()
				});

				// Checking if this address exists in the favorites array

				if(locationsArray.length) {
					locationsArray.forEach(function (item) {
						if (item.lat == latlng.lat() && item.lng == latlng.lng()) {
							isLocationFavorite = true;
						}
					});
				}

				// Adding the address to the html and setting data attributes with the coordinates
				saveLocation.text(fullAddress).attr({'data-lat': latlng.lat(), 'data-lng': latlng.lng()});

				// Removing the active class from all favorite locations
				favoriteLocationsListGroup.find('a.list-group-item').removeClass('active-location');

				// Changing the icon to become non-favorite
				
				if(!isLocationFavorite) {
					favoriteIcon.removeClass('glyphicon-star').addClass('glyphicon-star-empty');
				}
				else {
					
					// Adding the active class and add the favorite icon on the given favorite location
					favoriteIcon.removeClass('glyphicon-star-empty').addClass('glyphicon-star');

					// Find the entry in the favorite locations list that corresponds 
					// to the current location, and mark it as active.

					favoriteLocationsListGroup.find('a.list-group-item[data-lat="'+latlng.lat()+'"][data-lng="'+latlng.lng()+'"]').addClass('active-location');
				}

				// Show the html of the given location
				saveContainer.show();

			}

		});
	}


	// This functions is called when a favorite location is clicked.
	// It reads the coordinates and shows them in a map

	function showLocationByCoordinates(e) {

		e.preventDefault();

		var elem = $(this),
			location = elem.data();

		// Getting the address from the location's coordinates

		GMaps.geocode({
			location: {lat: location.lat, lng: location.lng},
			callback: function(results, status) {

				if (status !== 'OK') return;

				var fullAddress = results[0].formatted_address,
					saveLocation = $('#save-location');

				var map = new GMaps({
					el: '#map',
					lat: location.lat,
					lng: location.lng
				});

				map.addMarker({
					lat: location.lat,
					lng: location.lng
				});

				// Adding the address to the html and setting
				// data attributes with the location's coordinates

				saveLocation.text(fullAddress);
				saveLocation.attr({
					'data-lat': location.lat,
					'data-lng': location.lng
				});

				// Adding colored background to the active favorite location and
				// removing the old active location

				favoriteLocationsListGroup.find('a.list-group-item').removeClass('active-location');
				favoriteLocationsListGroup.find('a.list-group-item[data-lat="'+location.lat+'"][data-lng="'+location.lng+'"]').addClass('active-location');

				// Add the favorite icon on the given location
				favoriteIcon.removeClass('glyphicon-star-empty').addClass('glyphicon-star');

				// Show the html of the given location
				saveContainer.show();

				// Clear the search field
				$('#address').val('');

			}

		});

	}

	// This function saves a location to favorites and adds it to localStorage

	function saveFavoriteLocation(e){

		e.preventDefault();

		var saveLocation = $('#save-location'),
			locationAddress = saveLocation.text(),
			isLocationFavorite = false,
			locationsArray = JSON.parse(localStorage.getItem('favorite-locations'));

		var location = {
			lat: saveLocation.attr('data-lat'),
			lng: saveLocation.attr('data-lng'),
			createdAt: moment().format()
		};

		// Checking if this location is in the favorites array

		if(locationsArray.length) {
			locationsArray.forEach(function (item) {
				if (item.lat == location.lat && item.lng == location.lng) {
					isLocationFavorite = true;
				}
			});
		}

		// If the given location is not in favorites,
		// add it to the HTML and to localStorage's array

		if(!isLocationFavorite) {

			favoriteLocationsListGroup.append(
				'<a class="list-group-item active-location" data-lat="'+location.lat+'" data-lng="'+location.lng+'" data-createdAt="'+location.createdAt+'">'+
				locationAddress+'<span class="createdAt">'+moment(location.createdAt).fromNow()+'</span>' +
				'<span class="glyphicon glyphicon-menu-right"></span>' +
				'</span></a>');

			favoriteLocationsListGroup.show();

			// Adding the given location to the localStorage's array
			locationsArray.push({
				address: locationAddress,
				lat: location.lat,
				lng: location.lng,
				createdAt: moment().format()
			});

			localStorage.setItem('favorite-locations', JSON.stringify(locationsArray));

			// Make the star icon full, to signify that this location is now favorite
			favoriteIcon.removeClass('glyphicon-star-empty').addClass('glyphicon-star');

			// Now we have at least one favorite location
			hasFavoriteLocations = true;
		}

	}

	// This function removes a favorite location from the favorites list
	// and removes it from localStorage
	
	function removeFavoriteLocation(e){

		e.preventDefault();

		var saveLocation = $('#save-location'),
			isLocationDeleted = false,
			locationsArray = JSON.parse(localStorage.getItem('favorite-locations'));

		var location = {
			lat: saveLocation.attr('data-lat'),
			lng: saveLocation.attr('data-lng')
		};

		// Removing the given location from the localStorage's Array
		if(locationsArray.length) {
			locationsArray.forEach(function (item, index) {
				if (item.lat == location.lat && item.lng == location.lng) {
					locationsArray.splice(index,1);
					isLocationDeleted = true;
				}
			});
		}

		if(isLocationDeleted) {

			// Remove the given location from the favorites list

			favoriteLocationsListGroup.find('a.list-group-item[data-lat="'+location.lat+'"][data-lng="'+location.lng+'"]').remove();

			localStorage.setItem('favorite-locations', JSON.stringify(locationsArray));

			// Removing the favorite icon from the html
			favoriteIcon.removeClass('glyphicon-star').addClass('glyphicon-star-empty');

			if(!locationsArray.length) {
				
				// There are no more favorite locations

				hasFavoriteLocations = false;
				favoriteLocationsListGroup.hide();
			}
			else {
				hasFavoriteLocations = true;
			}

		}

	}*/

});