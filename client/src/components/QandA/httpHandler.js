import axios from 'axios';
const TOKEN = require('../../../../config.js').TOKEN;
const httpHandler = {
  getQuestions: function(product_id, page, count) {
    return axios.get('/qa/questions', {
      params: {
        product_id: product_id
      },
    })
    .catch(err => {
    console.log(err);
    });
  },

  putHelpfulQuestion: function(question_id) {
    return axios.put(`${url}/qa/questions/${question_id}/helpful`, {
      params: {
        question_id: question_id
      },
      headers: {
        'Authorization':  TOKEN //this is what will be imported from config file
      }
    })
    .catch(err => {
    console.log(err);
    });
  }
}

export default httpHandler;