var http = require("http");
var util = require("util");

var fiboCalls = [
  "/fibonacci/30",
  "/fibonacci/20",
  "/fibonacci/10",
  "/fibonacci/9",
  "/fibonacci/8",
  "/fibonacci/7",
  "/fibonacci/6",
  "/fibonacci/5",
  "/fibonacci/4",
  "/fibonacci/3",
  "/fibonacci/2",
  "/fibonacci/1"
];

fiboCalls.forEach( path => {
  util.log("Requesting path " + path);
  var req = http.request({
    host: "localhost",
    port: 3002,
    path: path,
    method: "GET"
  }, res => {
    res.on("data", chunk => {
      util.log("BODY " + chunk);
    });
  });
  req.end();
});
