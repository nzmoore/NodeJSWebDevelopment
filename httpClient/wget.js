var http = require("http");
var url = require("url");
var util = require("util");

var argUrl = process.argv[2];
var parsedUrl = url.parse(argUrl, true);

var options = {
  host: parsedUrl.hostname,
  port: parsedUrl.port,
  path: parsedUrl.path,
  method: "GET"
};

if (parsedUrl.search) {
  options.path += "?" + parsedUrl.search;
}

var req = http.request(options);

req.on("response", res => {
  util.log("Status: " + res.statusCode);
  util.log("Headers: " + util.inspect(res.headers));
  res.setEncoding("utf-8");
  res.on("data", chunk => {util.log("Body: " + chunk); });
  res.on("error", err => { util.log("Response error: " + err); });
});

req.on("error", err => { util.log("Request error: " + err); });
req.end();
