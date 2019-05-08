const fs = require("fs");

const configJSON = JSON.parse(fs.readFileSync("./config.json"));
const MapKeyElement = configJSON.location.baiduMapKey;

document.getElementById("baiduMapKey").src = MapKeyElement;
