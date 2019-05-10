function getCurrentLocation(text) {
  let currentLocation = document.getElementById("currentLocation");
  currentLocation.textContent = "[" + text.lng + ", " + text.lat + "]";
}
