
//==========================================================================================================
//EXTERNAL API JS (projectRoot/helpers/externalAPIName.js)
//==========================================================================================================
// Note: depending on the API requirements this may alter

const axios = require('axios');
const config = require('../config.js');

let getInfoFromAPI = (endpoint) => {

  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/${endpoint}`,
    headers: {
      'Authorization':  config.TOKEN //this is what will be imported from config file
    }
  };

  return axios(options);

}
//this export will have to be imported via require where you want to use it
module.exports.getInfoFromAPI = getInfoFromAPI;