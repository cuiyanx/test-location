function mapLocation(map, BMap, navigator, flag) {
  if (navigator.geolocation) {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(Location) {
      if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
        // 经纬度不为0
        if (Location.point.lng != 0 && Location.point.lat != 0) {
          // 添加覆盖物
          var mk = new BMap.Marker(Location.point);
          map.addOverlay(mk);

          if (flag) {
            // 切换到定位点
            map.panTo(Location.point);
          }
        } else {
          // 失败，定位城市
          new BMap.LocalCity().get(function(result) {
            // 添加覆盖物
            var mk = new BMap.Marker(result);
            map.addOverlay(mk);
            map.setCenter(result.name);
          });
        }
      } else {
        alert("failed: " + geolocation.getStatus());
      }
    });
  } else {
    // 失败，定位城市
    new BMap.LocalCity().get(function(result) {
      // 添加覆盖物
      var mk = new BMap.Marker(result);
      map.addOverlay(mk);
      map.setCenter(result.name);
    });
  }
}

function mapInit(BMap, navigator) {
  var map = new BMap.Map("baiduMap");
  var point = new BMap.Point(116.404, 39.915);

  map.centerAndZoom(point, 16);
  map.enableScrollWheelZoom(true);

  mapLocation(map, BMap, navigator, true);

  setTimeout(function(a, b, c, flag) {
    mapLocation(a, b, c, flag);
  }, 5000, map, BMap, navigator, true);
}
