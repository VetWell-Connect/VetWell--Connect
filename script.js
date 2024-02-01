let map;
let marker;
let autocomplete;

let yogaService;
let yogaPlaceRequest;
const YOGA = "yoga";

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
      radius: 10000,
      keyword : [YOGA]
    };
    yogaService = new google.maps.places.PlacesService(map);
    yogaService.nearbySearch(yogaPlaceRequest, yogaCallback);

   // Meditation Second
   meditationPlaceRequest = {
    location: place.geometry.location,
    radius: 10000,
    keyword : [MEDITATION]
   };
   meditationService = new google.maps.places.PlacesService(map);
   meditationService.nearbySearch(meditationPlaceRequest, meditationCallback)

   // Acupuncture Third
   acupuncturePlaceRequest = {
    location: place.geometry.location,
    radius: 10000,
    keyword : [ACUPUNCTURE]
   };
   acupunctureService = new google.maps.places.PlacesService(map);
   acupunctureService.nearbySearch(acupuncturePlaceRequest, acupunctureCallback)

   // Guided Imagery Fourth
   guidedImageryPlaceRequest = {
    location: place.geometry.location,
    radius: 10000,
    keyword : [GUIDEDIMAGERY]
   };
   guidedImageryService = new google.maps.places.PlacesService(map);
   guidedImageryService.nearbySearch(guidedImageryPlaceRequest, guidedImageryCallback)

   // Massage Therapy Fifth
   massageTherapyPlaceRequest = {
    location: place.geometry.location,
    radius: 10000,
    keyword : [MASSAGETHERAPY]
   };
   massageTherapyService = new google.maps.places.PlacesService(map);
   massageTherapyService.nearbySearch(massageTherapyPlaceRequest, massageTherapyCallback)
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

function yogaCallback(results, status){
  // alert("yoga callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], YOGA);
    }
  }
  else{
    // alert("No Yoga Facilities Found Nearby")
  }
}

function meditationCallback(results, status){
  // alert("meditation callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], MEDITATION);
    }
  }
  else{
    // alert("No Meditation Facilities Found Nearby")
  }
}

function acupunctureCallback(results, status){
  // alert("acupuncture callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], ACUPUNCTURE);
    }
  }
  else{
    // alert("No Acupuncture Facilities Found Nearby")
  }
}

function guidedImageryCallback(results, status){
  // alert("guided imagery callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], GUIDEDIMAGERY);
    }
  }
  else{
    // alert("No Guided Imagery Facilities Found Nearby")
  }
}

function massageTherapyCallback(results, status){
  // alert("massage therapy callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], MASSAGETHERAPY);
    }
  }
  else{
    // alert("No Massage Therapy Facilities Found Nearby")
  }
}

function createMarker(place, placeType) {
  if (!place.geometry || !place.geometry.location) return;
  if( placeType == YOGA){
 
    const marker = new google.maps.Marker({
      position: place.geometry.location,
      icon: icons.yoga.icon,
      map,
    });
    google.maps.event.addListener(marker, "click", () => {
      alert(place.name);
    });
  } else if (placeType == MEDITATION){
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      icon: icons.meditation.icon
    });
    google.maps.event.addListener(marker, "click", () => {
      alert(place.name);
    });
  } else if ( placeType == ACUPUNCTURE){
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      icon: icons.acupuncture.icon
    });
    google.maps.event.addListener(marker, "click", () => {
      alert(place.name);
    });
  } else if (placeType == GUIDEDIMAGERY){
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      icon: icons.guidedImagery.icon
    });
    google.maps.event.addListener(marker, "click", () => {
      alert(place.name);
    });
  } else if (placeType == MASSAGETHERAPY){
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      icon: icons.massageTherapy.icon
    });
    google.maps.event.addListener(marker, "click", () => {
      alert(place.name);
    });
  }
}


window.initMap = initMap;