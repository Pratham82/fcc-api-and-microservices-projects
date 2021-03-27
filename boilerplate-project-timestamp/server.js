// server.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

// Timestamp endpoint
app.get('/api/timestamp/:date?', (req, res) => {
  // console.log(req.params.date)
  let inputDate = req.params.date === undefined ? new Date() : req.params.date
  let curatedDate = isNaN(inputDate)
    ? new Date(inputDate)
    : new Date(Number(inputDate))
  let finalDate = curatedDate.toUTCString()

  if (finalDate === 'Invalid Date') {
    res.json({
      error: 'Invalid Date',
    })
  }

  const unix = curatedDate.getTime()
  const utc = finalDate
  res.json({
    unix,
    utc,
  })
})

// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port)
// })
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000)
})
