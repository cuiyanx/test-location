function addBMapKey() {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://api.map.baidu.com/api?v=2.0&ak=go4bTjfqC6Hv7vRjVtG3wS5c0jb8VjEs";
  document.head.appendChild(script);
}

addBMapKey();
