function getCurrentLocation(text) {
  let currentLocation = document.getElementById("currentLocation");
  currentLocation.textContent = "当前位置： [" + text.lng + ", " + text.lat + "]";
}
