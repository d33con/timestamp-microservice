
// init project
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
var moment = require('moment')

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))
app.use(bodyParser.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/:timestamp", (req, res) => {
  const milliseconds = Number(req.params.timestamp) * 1000;
  const date = moment(milliseconds).format("MMMM Do, YYYY");
  const output = {
    unix: milliseconds,
    natural: date
  }
  if(output.natural !== "Invalid date") {
    res.send(output);
  }
  res.send("null");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
