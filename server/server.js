//================================================================================================================
// SERVER SETUP
//================================================================================================================
const path = require("path")
const express = require("express"); // npm installed
const apiHelper = require('./apihelper.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "../client/dist")));

//================================================================================================================
// SERVER ROUTES
//================================================================================================================

// APP ROUTES //==========================================================

// PRODUCT OVERVIEW ROUTES //=============================================

/* ===================EXAMPLE CLIENT SIDE REQUEST================== */

// getCurrentStyles() {
//   let id = this.props.current.data.id;
//   let extras = 'styles';
//   axios.get('/products', {params: {id, extras}})
//     .then(newStyles => {
//       this.setState({
//         currentStyle: newStyles.data
//       });
//     })
// }


app.get('/products', (req, res) => {
  // params will show up in a req.query object - you can grab their values inside your route handler, and pass them as arguments to the apihelper
  let id = req.query.id;
  let extras = req.query.extras
  apiHelper.getInfoFromAPI('products', id, extras)
    .then(styles => {
      res.send(styles.data);
    })
    .catch(error => console.log('ERROR: ============>', error));
});

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