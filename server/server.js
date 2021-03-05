//================================================================================================================
// SERVER SETUP
//================================================================================================================
const path = require("path")
const express = require("express"); // npm installed
const axios = require('axios');
const config = require('../config.js');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "../client/dist")));
//================================================================================================================
// SERVER ROUTES
//================================================================================================================
app.use(async (req, res) => {
  try {
    let response = await axios({
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/',
      method: req.method,
      url: req.url,
      data: req.body,
      headers: {
        'Authorization': config.TOKEN //this is what will be imported from config file
      }
    });
    res.send(response.data);
  } catch(err) {
    console.log(err.response.data);
    res.sendStatus(500);
  }
});


//================================================================================================================
// SERVER LISTENING
//================================================================================================================
const port = 3000;
app.listen(port, () => {
  console.log(`To get started, visit: http://localhost:${port}`);
});