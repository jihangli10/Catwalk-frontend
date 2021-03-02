//================================================================================================================
// SERVER SETUP
//================================================================================================================
const path = require("path")
const express = require("express"); // npm installed
const bodyParser = require('body-parser')
const apiHelper = require('./apihelper.js')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../client/dist")));

//================================================================================================================
// SERVER ROUTES
//================================================================================================================

// APP ROUTES //==========================================================

// PRODUCT OVERVIEW ROUTES //=============================================
app.post('/products', (req, res) => {
  var data = apiHelper.getInfoFromAPI('products');
  res.send(data);
})

app.post('/productsList', (req, res) => {
  var data = apiHelper.getStylesFromAPI('products');
  res.send(data);
})
// Q AND A ROUTES //======================================================

// RATING AND REVIEW ROUTES //============================================

// RELATED PRODUCTS AND OUTFITS ROUTES //=================================

//================================================================================================================
// SERVER LISTENING
//================================================================================================================
const port = 3000;
app.listen(port, () => {
  console.log(`To get started, visit: http://localhost:${port}`);
});