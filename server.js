// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/", (req,res) => {
  res.json({"unix": Date.now(), "utc": Date()});
})

// your first API endpoint... 
app.get("/api/timestamp/:date", function (req, res) {
  const {date} = req.params;

  if(/\d{5,}/.test(date)) {
    const parsedDate = parseInt(date);
    res.json({"unix": parsedDate, "utc": new Date(parsedDate).toUTCString()})
  } else {
    const dateObject = new Date(date);
    if (dateObject.toString() === 'Invalid Date') {
      res.json({error: "Invalid Date"})
    } else {
      res.json({"unix": new Date(date).valueOf(), "utc": new Date(date).toUTCString()})
    }
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
