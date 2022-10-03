const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const path = require("path")
const cors = require("cors")

require('dotenv').config()

//Init Middleware
app.use(express.json({ extended: false}));
app.use(cors());

//Define Routes
app.use('/photo', require('./routes/api/photos'));
app.use('/user', require('./routes/api/users'));

/*app.get('/', (req, res) => {
  res.send('Hello World!')
})*/

app.use(express.static(path.join(__dirname, "./client/dist")))

app.get("*", function(_, res){
  res.sendFile(
    path.join(__dirname, "./client/dist/index.html"),
    function(err){
      if(err){
        res.status(500).send(err);
      }
    }
  )
})

app.listen(port, () => {
  console.log(`my unsplash listening on port ${port}`)
})

module.exports = app;