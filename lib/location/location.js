function mapLocation(map, BMap, navigator, flag) {
  if (navigator.geolocation) {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        if (r.point.lng == 0 && r.point.lat == 0) {
          new BMap.LocalCity().get(function(result) {
            if (flag) {
              map.setCenter(result.name);
            }
          });
        } else {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
        }
      } else {
        alert("failed: " + this.getStatus());
      }
    });
  } else {
    new BMap.LocalCity().get(function(result) {
      if (flag) {
        map.setCenter(result.name);
      }
    });
  }
}

function mapInit(BMap, navigator) {
  var map = new BMap.Map("baiduMap");
  var point = new BMap.Point(116.404, 39.915);

  map.centerAndZoom(point, 16);
  map.enableScrollWheelZoom(true);

  mapLocation(map, BMap, navigator, false);
}
