let map;
let marker;
let autocomplete;
let infowindow;

let placeTypeGlobal;

let yogaService;
let yogaPlaceRequest;
const YOGA = "therapeutic yoga";

let meditationService;
let meditationPlaceRequest;
const MEDITATION = "meditation";

let acupunctureService;
let acupuncturePlaceRequest;
const ACUPUNCTURE = "acupuncture";

let guidedImageryService;
let guidedImageryPlaceRequest;
const GUIDEDIMAGERY = "guided imagery";

let massageTherapyService;
let massageTherapyPlaceRequest;
const MASSAGETHERAPY = "massage therapy";

let detailsService;
const iconBase = "http://maps.google.com/mapfiles/ms/icons/";
const icons = {
  yoga: {
    name: "Yoga",
    icon: iconBase + "green-dot.png",
  },
  meditation: {
    name: "Meditation",
    icon: iconBase + "blue-dot.png",
  },
  acupuncture: {
    name: "Acupuncture",
    icon: iconBase + "yellow-dot.png",
  },
  guidedImagery: {
    name: "Guided Imagery",
    icon: iconBase + "orange-dot.png",
  },
  massageTherapy: {
    name: "Massage Therapy",
    icon: iconBase + "pink-dot.png",
  },
}

function initMap() {
  var howard = new google.maps.LatLng(38.9227,-77.0194);

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: howard,
    mapTypeControl: false,
  });
  createLegend();

  const inputText = document.getElementById("autocomplete");

  // Step 0: User Input Address
  autocomplete = new google.maps.places.Autocomplete(
    inputText,
    {
      types: ['geocode'],
      componentRestrictions: {"country": ["US"]},
      fields: ["place_id", "geometry", "name"]
    })
  autocomplete.bindTo('bounds', map);

  marker = new google.maps.Marker({
    map:map
  })

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  autocomplete.addListener("place_changed", onPlaceChanged);
}

function onPlaceChanged(){

  // Step 1: Retrieve User Inputted Address
  var place = autocomplete.getPlace();

  if (!place.geometry){
    inputText.placeholder = "Enter a Location";
  } else{
  // Step 2: Mark User Inputted Addres on Map with "YOU ARE HERE"
    map.setCenter(place.geometry.location);
    marker.setPosition(place.geometry.location);
    marker.setMap(map);
    marker.setLabel("You are Here");

  // Step 3: Search for nearby specific facility
    // Yoga First
    yogaPlaceRequest = {
      location: place.geometry.location,
      radius: 16093.4,
      keyword : [YOGA]
    };
    yogaService = new google.maps.places.PlacesService(map);
    yogaService.nearbySearch(yogaPlaceRequest, yogaSearchCallback);

   // Meditation Second
   meditationPlaceRequest = {
    location: place.geometry.location,
    radius: 16093.4,
    keyword : [MEDITATION]
   };
   meditationService = new google.maps.places.PlacesService(map);
   meditationService.nearbySearch(meditationPlaceRequest, meditationSearchCallback)

   // Acupuncture Third
   acupuncturePlaceRequest = {
    location: place.geometry.location,
    radius: 16093.4,
    keyword : [ACUPUNCTURE]
   };
   acupunctureService = new google.maps.places.PlacesService(map);
   acupunctureService.nearbySearch(acupuncturePlaceRequest, acupunctureSearchCallback)

   // Guided Imagery Fourth
   guidedImageryPlaceRequest = {
    location: place.geometry.location,
    radius: 16093.4,
    keyword : [GUIDEDIMAGERY]
   };
   guidedImageryService = new google.maps.places.PlacesService(map);
   guidedImageryService.nearbySearch(guidedImageryPlaceRequest, guidedImagerySearchCallback)

   // Massage Therapy Fifth
   massageTherapyPlaceRequest = {
    location: place.geometry.location,
    radius: 16093.4,
    keyword : [MASSAGETHERAPY]
   };
   massageTherapyService = new google.maps.places.PlacesService(map);
   massageTherapyService.nearbySearch(massageTherapyPlaceRequest, massageTherapySearchCallback)
  }
}

function createLegend(){
  const legend = document.getElementById("legend");
  for (const key in icons) {
    const type = icons[key];
    const name = type.name;
    const icon = type.icon;
    const div = document.createElement("div");
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
  }
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legend);
}

function yogaSearchCallback(results, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var request = {
        placeId: results[i].place_id,
        fields: ['name', 'rating','reviews', 'website', 'formatted_address', 'formatted_phone_number', 'geometry', 'photos']
      };
      detailsService = new google.maps.places.PlacesService(map);
      detailsService.getDetails(request, yogaDetailsCallback)
    }
  }
  else{
    // alert("No Yoga Facilities Found Nearby")
  }
}

function yogaDetailsCallback(place, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarker(place, YOGA);
  }
}

function meditationSearchCallback(results, status){
  // alert("meditation callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var request = {
        placeId: results[i].place_id,
        fields: ['name', 'rating','reviews', 'website', 'formatted_address', 'formatted_phone_number', 'geometry', 'photos']
      };
      detailsService = new google.maps.places.PlacesService(map);
      detailsService.getDetails(request, meditationDetailsCallback)
    }
  }
  else{
    // alert("No Meditation Facilities Found Nearby")
  }
}
function meditationDetailsCallback(place, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarker(place, MEDITATION);
  }
}

function acupunctureSearchCallback(results, status){
  // alert("acupuncture callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var request = {
        placeId: results[i].place_id,
        fields: ['name', 'rating','reviews', 'website', 'formatted_address', 'formatted_phone_number', 'geometry', 'photos']
      };
      detailsService = new google.maps.places.PlacesService(map);
      detailsService.getDetails(request, acupunctureDetailsCallback)
    }
  }
  else{
    // alert("No Acupuncture Facilities Found Nearby")
  }
}
function acupunctureDetailsCallback(place, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarker(place, ACUPUNCTURE);
  }
}
function guidedImagerySearchCallback(results, status){
  // alert("guided imagery callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var request = {
        placeId: results[i].place_id,
        fields: ['name', 'rating','reviews', 'website', 'formatted_address', 'formatted_phone_number', 'geometry', 'photos']
      };
      detailsService = new google.maps.places.PlacesService(map);
      detailsService.getDetails(request, guidedImageryDetailsCallback)
    }
  }
  else{
    // alert("No Guided Imagery Facilities Found Nearby")
  }
}

function guidedImageryDetailsCallback(place, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarker(place, GUIDEDIMAGERY);
  }
}

function massageTherapySearchCallback(results, status){
  // alert("massage therapy callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var request = {
        placeId: results[i].place_id,
        fields: ['name', 'rating','reviews', 'website', 'formatted_address', 'formatted_phone_number', 'geometry', 'photos']
      };
      detailsService = new google.maps.places.PlacesService(map);
      detailsService.getDetails(request, massageTherapyDetailsCallback)
    }
  }
  else{
    // alert("No Massage Therapy Facilities Found Nearby")
  }
}

function massageTherapyDetailsCallback(place, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarker(place, MASSAGETHERAPY);
  }
}

function createMarker(place, placeType) {
  if (!place.geometry || !place.geometry.location) return;

  let photoHTML = '';
  if (place.photos && place.photos.length > 0) {
    const photo = place.photos[0]; // Assuming you want to display the first photo
    photoHTML = '<img src="' + photo.getUrl({ maxWidth: 200 }) + '">';
  } else {
    photoHTML = '<p>No photo available</p>';
  }

  // Generate HTML for the name
  const nameHTML = '<h1>' + place.name + '</h1>';

  // Generate HTML for the address, phone number, website, rating, and reviews
  let detailsHTML = '<p><b>Address:</b> ' + place.formatted_address + '</p>' +
                    '<p><b>Phone:</b> ' + place.formatted_phone_number + '</p>' +
                    '<p><b>Website:</b> <a href="' + place.website + '">' + place.website + '</a></p>' +
                    '<p><b>Rating:</b> ' + place.rating + '</p>';

  // Add reviews if available
  if (place.reviews && place.reviews.length > 0) {
    detailsHTML += '<h2>Reviews:</h2>';
    place.reviews.forEach(review => {
      detailsHTML += '<p><b>Author:</b> ' + review.author_name + '</p>' +
                     '<p><b>Rating:</b> ' + review.rating + '</p>' +
                     '<p><b>Review:</b> ' + review.text + '</p>';
    });
  } else {
    detailsHTML += '<p>No reviews available</p>';
  }

  // Concatenate all HTML elements
  const contentString =
    '<div id="content">' +
    '<div id="siteNotice"></div>' +
    '<div id="bodyContent">' +
    photoHTML +
    nameHTML +
    detailsHTML +
    '</div>' +
    '</div>';

  if( placeType == YOGA){
 
    const marker = new google.maps.Marker({
      position: place.geometry.location,
      icon: icons.yoga.icon,
      map,
    });

    google.maps.event.addListener(marker, "click", () => {
      
      infowindow = new google.maps.InfoWindow();
      infowindow.setContent(contentString);
      infowindow.setPosition(place.geometry.location);
      infowindow.open(map);
      
    });
  } else if (placeType == MEDITATION){
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      icon: icons.meditation.icon
    });
    google.maps.event.addListener(marker, "click", () => {
      
      infowindow = new google.maps.InfoWindow();
      infowindow.setContent(contentString);
      infowindow.setPosition(place.geometry.location);
      infowindow.open(map);
      
    });
  } else if ( placeType == ACUPUNCTURE){
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      icon: icons.acupuncture.icon
    });
    google.maps.event.addListener(marker, "click", () => {
      
      infowindow = new google.maps.InfoWindow();
      infowindow.setContent(contentString);
      infowindow.setPosition(place.geometry.location);
      infowindow.open(map);
      
    });
  } else if (placeType == GUIDEDIMAGERY){
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      icon: icons.guidedImagery.icon
    });
    google.maps.event.addListener(marker, "click", () => {

      infowindow = new google.maps.InfoWindow();
      infowindow.setContent(contentString);
      infowindow.setPosition(place.geometry.location);
      infowindow.open(map);
      
    });
  } else if (placeType == MASSAGETHERAPY){
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      icon: icons.massageTherapy.icon
    });
    google.maps.event.addListener(marker, "click", () => {

      infowindow = new google.maps.InfoWindow();
      infowindow.setContent(contentString);
      infowindow.setPosition(place.geometry.location);
      infowindow.open(map);
      
    });
  }
}


window.initMap = initMap;