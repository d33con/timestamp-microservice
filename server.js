
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
  const timestamp = req.params.timestamp;
  const output = {
      unix: null,
      natural: null
  }
  
  // if timestamp is a number
  if(!isNaN(+timestamp)) {
    const timestampMs = +timestamp * 1000;    

    if(moment(timestampMs).isValid()) {    
      const natural = moment(timestampMs).format("MMMM Do, YYYY");
      output.unix = +timestamp;
      output.natural = natural
    } 

  } else {
      output.unix = moment(timestamp).valueOf() / 1000;
      output.natural = timestamp;
  }

  res.send(`<p class="result">${JSON.stringify(output)}</p>`);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
