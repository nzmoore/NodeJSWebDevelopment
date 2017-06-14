var express = require("express");
var router = express.Router();

var math = require("../math");

router.get("/", function (req, res, next) {
  if (req.query.fibonum) {
    //Calculate diectly on this server
    var num = parseInt(req.query.fibonum);
    if (isNaN(num)) {
      res.render("fibonacci", {
        title: "Calculate Finonacci numbers",
        fibonum: undefined
      });
    } else {
      // Use REST
      var httpreq = require("http").request({
        host: "localhost",
        port: process.env.SERVERPORT,
        path: "/fibonacci/"+Math.floor(num),
        method: "GET"
      },
      httpresp => {
        httpresp.on("data", chunk => {
          var data = JSON.parse(chunk);
          res.render("fibonacci", {
            title: "Calculate Fibonacci numbers",
            fibonum: num,
            fiboval: data.result
          });
        });
        httpresp.on("error", err => { next(err); });
      });
      httpreq.on("error", err => { next(err); });
      httpreq.end();
    }
  } else {
    res.render("fibonacci", {
      title: "Calculate Finonacci numbers",
      fibonum: undefined
    });
  }
});

module.exports = router;
