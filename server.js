// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const router = express.Router()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/:timestamp", (req, res) => {
  const millis = Number(req.params.timestamp);
  const date = new Date(millis * 1000);
  const dateString = date.toISOString();
  const year = dateString.substr(0,4);
  const month = dateString.substr(4,2);
  const natural = `${month},${year}`;
  const output = {
    unix: millis * 1000,
    natural
  }
  res.send(output);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
