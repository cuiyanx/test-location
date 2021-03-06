function mapLocation(map, BMap, navigator, flag) {
  if (navigator.geolocation) {
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(Location) {
      if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
        // 经纬度不为0
        if (Location.point.lng != 0 && Location.point.lat != 0) {
          map.clearOverlays();
          // 添加覆盖物
          let marker = new BMap.Marker(Location.point);
          map.addOverlay(marker);
          marker.setAnimation(BMAP_ANIMATION_BOUNCE);

          if (flag) {
            // 切换到定位点
            map.panTo(Location.point);
          }

          getCurrentLocation(Location.point);
        } else {
          // 失败，定位城市
          new BMap.LocalCity().get(function(result) {
            map.clearOverlays();
            // 添加覆盖物
            let marker = new BMap.Marker(result.center);
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
            map.setCenter(result.name);
            getCurrentLocation(result.center);
          });
        }
      } else {
        alert("failed: " + geolocation.getStatus());
      }
    }, {enableHighAccuracy: true});
  } else {
    // 失败，定位城市
    new BMap.LocalCity().get(function(result) {
      map.clearOverlays();
      // 添加覆盖物
      let marker = new BMap.Marker(result.center);
      map.addOverlay(marker);
      marker.setAnimation(BMAP_ANIMATION_BOUNCE);
      map.setCenter(result.name);
      getCurrentLocation(result.center);
    });
  }
}

function mapInit(BMap, navigator) {
  let map = new BMap.Map("baiduMap");
  let point = new BMap.Point(116.404, 39.915);

  map.centerAndZoom(point, 16);
  map.enableScrollWheelZoom(true);

  mapLocation(map, BMap, navigator, true);

  setInterval(function(a, b, c, flag) {
    mapLocation(a, b, c, flag);
  }, 3000, map, BMap, navigator, false);
}
